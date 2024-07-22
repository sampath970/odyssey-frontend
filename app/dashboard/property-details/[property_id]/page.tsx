"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./property-details.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import AppConfig from "../../../../config/application.config";
import DonutChart from "../../../../components/donut-chart/donut-chart";
import TableView from "../../../../components/table/table";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import AddUnits from "../add-units/add-units";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import { useAllProperties } from "../../../../services/hooks/useAllProperties";
import { useNotifications } from "../../../../services/hooks/useNotifications";
import { useAllTenants } from "../../../../services/hooks/useAllTenants";
import PropertyDetailsPopup from "../property-details-popup/property-details-popup";
import FormsRequested from "../forms-requested/forms-requested";
import QuestionnaireAdapter from "../../../../services/adapters/questionnaire-adapter";
import FormsUploaded from "../forms-uploaded/forms-uploaded";
import FloatingMenu from "../../../../components/floating-menu/floating-menu";
import AddTenant from "../../tenant-section/add-tenant/add-tenant";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import ProofsUploaded from "../proofs-uploaded/proofs-uploaded";
import TenantInfo from "../tenant-info/tenant-info";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
import Tabs from "../../../../components/tabs/tabs";
import Panel from "../../../../components/tabs/panels";
import SpecialInstructions from "../../special-instructions/page";
import FormMapping from "../../form-mapping/page";
import Home from "../../../../public/assets/icons/home.svg";
import SpecialInstructionsIcon from "../../../../public/assets/icons/special-info.svg";
import ManagementOnlyIcon from "../../../../public/assets/icons/management_only.svg";
import Form from "../../../../public/assets/icons/form.svg";
import Delete from "../../../../public/assets/icons/garbage.svg";
import Notification from "../../../../public/assets/icons/notification.svg";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { sortArrayByUnitId } from "../../../_utils/page_utils";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import SignedDocuments from "../signed-documents/signed-documents";
import ReviewedDocuments from "../reviewed-documents/reviewed-documents";
import Notifications from "../../notifications/page";
import { getNotificationsCount } from "../../../../utils/property-utils";
import FileDownloadLink from "../../../../components/file-download-link/file-download-link";
import { AccessPermission, validate } from "../../../_auth/permissions";
import UnitDocuments from "../unit-documents/unit-documents";
import HeadOfHouseHold from "../head-of-household/head-of-household";
import {
  ContentID,
  checkCompliance,
  formatDateToDDMMYYYY,
  getBoxColor,
} from "../../../../utils/add-tenant-utils";
import HouseholdUnityNetwork from "../household-unity-network/household-unity-network";
import AllDocuments from "../all-documents/all-documents";
import ManagementOnly from "../management_only/management_only";
import MappingAdapter from "../../../../services/adapters/mapping-adapter";
import { useQuestionnaires } from "../../../../services/hooks/useQuestionnaires";
interface PropertyDetailsProps {
  params?: any;
  searchParams?: any;
}
const PropertyDetails = ({ params, searchParams }: PropertyDetailsProps) => {
  const { push } = useRouter();
  const { autoLaunch, launchUnitID = "", tenant_id, tab_index } = searchParams;
  const {
    activeProperty,
    setActiveProperty,
    setRefreshProperties,
    setActiveRental,
  } = useAllProperties();
  const { fetchNewNotifications, notifications } = useNotifications();
  const [showAddUnits, setShowAddUnits] = useState(false);
  const [property, setProperty] = useState(null);
  const [allUnits, setAllUnits] = useState([]);
  const [displayUnits, setDisplayUnits] = useState([]);
  const [recentUnits, setRecentUnits] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [unitDetail, setUnitDetail] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [active_tenant, setActiveUnitForTask] = useState({ id: tenant_id });
  const [showUploadPopup, setUploadPopupState] = useState(false);
  const [activeUnitInfo, setActiveUnitInfo] = useState(null);
  const [modalID, setModalID] = useState(null);
  const [notificationsLength, setNotificationsLength] = useState(0);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [modalTitle, setModalTitle] = useState("Household Details");
  const [tenantModalTitle, setTenantModalTitle] = useState("");
  const [deletePropertyModalDescription, setDeletePropertyModalDescription] =
    useState("Are you sure want to disable this property ?");
  const [deletePropertyModalTitle, setDeletePropertyModalTitle] = useState(
    "Disable property !!"
  );
  const [needSync, syncProperty] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [firstTimeLaunch, setFirstTimeLaunch] = useState(false);
  const [activeTenant, setActiveTenant] = useState({});
  const [activeHeadOfHousehold, setActiveHeadOfHouseHold] = useState({});
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(params);
  // console.log(activeProperty);
  // console.log(activeHeadOfHousehold);
  
  let newCertifications = displayUnits.filter(
    (_unit) =>
      checkCompliance(_unit.certification_date) === "Compliant"
  ).length;
  let initiatedCertifications = displayUnits.filter(
    (_unit) =>
      checkCompliance(_unit.certification_date) === "Processing"
  ).length;
  let processingCertifications = displayUnits.filter(
    (_unit) =>
      checkCompliance(_unit.certification_date) === "Non-Compliant"
  ).length;
  const { userInfo } = useUserInfo();
  const { allTenants, setSyncRequired } = useAllTenants();
  const [form, setForm] = useState([]);
  const [all_tenants, setAllTenants] = useState(allTenants);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPopupIndex, setSelectedPopupIndex] = useState(0);
  const [addUnitStatus, setaddUnitStatus] = useState(false);
  const [editUnitStatus, setEditUnitStatus] = useState(false);
  const [unAuthorisedError, setUnAuthorisedError] = useState(false);
  const [currentFlow, setCurrentFlow] = useState("");
  const handleChange = (index) => {
    setSelectedIndex(index);
  };
  const { questionnaire_list } = useQuestionnaires();
  const questionnaireName = (qaId) => {
    if (questionnaire_list && questionnaire_list.length > 0) {
      const matchingQuestionnaire = questionnaire_list.find(
        (questionnaire) => questionnaire.id === qaId
      );
      return matchingQuestionnaire ? matchingQuestionnaire.title : "Unknown";
    } else {
      return "Unknown";
    }
  };
  const getSignedFields = async (formTitle) => {
    let data = await MappingAdapter.getMappingByFormId(formTitle);
    if (data) {
      let filteredFields = data[0]?.fields.filter(
        (field) => field.question_code === "PROPERTY_MANAGER_SIGNATURE"
      );
      if (filteredFields?.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log("No data found");
    }
    console.log(data);
  };

  useEffect(() => {
    async function fetchForms() {
      try {
        let fetchFormsResponse =
          await QuestionnaireAdapter.getListingsByPropertyManagerID(userInfo);
        if (fetchFormsResponse) {
          let _forms = await Promise.all(
            fetchFormsResponse.map(async (_form) => {
              if (_form) {
                try {
                  const hasSigned = await getSignedFields(_form.formID);
                  return {
                    ..._form,
                    hasSigned,
                    qaName: questionnaireName(_form.qaId),
                  };
                } catch (error) {
                  console.error(`Error processing form: ${_form.title}`, error);
                  return null;
                }
              } else {
                return null;
              }
            })
          );
          setForm(_forms.filter((form) => form !== null));
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    }
    if (userInfo && questionnaire_list?.length !== 0) {
      fetchForms();
    } else {
      console.log("userInfo & questionnaire_list might be empty");
    }
    if (userInfo?.sub) {
      setSyncRequired(true);
    }
  }, [userInfo, questionnaire_list]);


  const getAllActiveTenants = (activeProperty) => {
    let activeTenants = [];
    if (activeProperty && activeProperty?.units && activeUnitInfo) {
      let activeUnit = activeProperty.units.find(
        (unit) => unit?.id === activeUnitInfo.id
      );
      if (
        activeUnit &&
        Array.isArray(activeUnit.tenant_id) &&
        Array.isArray(allTenants) &&
        allTenants.length !== 0
      ) {
        activeTenants = allTenants?.filter((tenant) => {
          return activeUnit.tenant_id.includes(tenant.id);
        });
      } else {
        console.log("Invalid active unit or missing tenant data.");
      }
    } else {
      console.log(
        "Invalid active property, units, or missing active unit info."
      );
    }
    return activeTenants;
  };
  const getHeadOfHouseHold = (unit) => {
    // console.log(unit)
    // Returns null when allTenants is not available
    if (!allTenants || !Array.isArray(allTenants) || allTenants.length === 0) {
      console.log("No tenants available.");
      return null;
    } else {
      // Extract tenant IDs from the unit
      const tenantIDs = unit?.tenant_id;

      // Ensure tenantIDs is not null or undefined
      if (tenantIDs && Array.isArray(tenantIDs)) {
        // Filter tenantInfoWithIds based on tenant IDs
        const tenantInfoWithIds = allTenants.filter((tenant) =>
          tenantIDs.includes(tenant.id)
        );

        // Filter head persons based on relationship value
        const headPersons = tenantInfoWithIds.filter(
          (person) =>
            person.relationship &&
            person.relationship.value === "head_of_household"
        );

        if (headPersons.length > 0) {
          return headPersons;
        } else {
          console.log("No head of household found for the provided unit.");
          return null;
        }
      } else {
        console.log("Tenant IDs are missing or invalid for the provided unit.");
        return null;
      }
    }
  };
  const getAllTenantsFromUnit = (unit) => {
    // console.log(unit)
    // Returns null when allTenants is not available
    if (!allTenants || !Array.isArray(allTenants) || allTenants.length === 0) {
      console.log("No tenants available.");
      return null;
    } else {
      // Extract tenant IDs from the unit
      const tenantIDs = unit?.tenant_id;

      // Ensure tenantIDs is not null or undefined
      if (tenantIDs && Array.isArray(tenantIDs)) {
        // Filter tenantInfoWithIds based on tenant IDs
        const tenantInfoWithIds = allTenants.filter((tenant) =>
          tenantIDs.includes(tenant.id)
        );
        return tenantInfoWithIds;
      } else {
        console.log("Tenant IDs are missing or invalid for the provided unit.");
        return null;
      }
    }
  };

  const getHeadOfHouseholdInfo = (unit) => {
    const headOfHousehold = getHeadOfHouseHold(unit);

    if (headOfHousehold && headOfHousehold.length > 0) {
      const head = headOfHousehold[0];
      return {
        first_name: head.first_name,
        last_name: head.last_name,
        certification_date: head.certification_date,
      };
    } else {
      return null;
    }
  };

  const getHeadOfHouseholdTelephoneNumber = (unit) => {
    const headOfHousehold = getHeadOfHouseHold(unit);

    if (headOfHousehold) {
      const headOfHouseholdTelephoneNumber = headOfHousehold.map(
        (household) => household.tel_number
      );
      return headOfHouseholdTelephoneNumber.join(", ");
    } else {
      console.log("No head of household found.");
      return null;
    }
  };

  const handleHideAddUnits = () => {
    try {
      setShowAddUnits(false);
      setEditUnitStatus(false);
      setUnAuthorisedError(false);
    } catch (ex) {
      console.log("Error at handleHideAddUnits");
    }
  };
  const handleCloseBulkUploadPopup = () => {
    try {
      setUploadStatus(false);
      setUploadPopupState(false);
      syncProperty(true);
    } catch (ex) {
      console.log("Error at  handleCloseBulkUploadPopup");
    }
  };

  const handleAddNewTenant = () => {
    try {
      setModalID("add_tenant");
      setShowBackIcon(true);
      setModalTitle("Add New Tenant");
    } catch (ex) {
      console.log("Error at  handleCloseBulkUploadPopup");
    }
  };

  const handleBackToDetailsPopup = () => {
    if (modalID === "head_of_house_hold") {
      setModalID("unit_no");
    } else if (modalID === "all_tenants_linked_with_head_of_household") {
      setModalID("head_of_house_hold");
    } else if (modalID === "all_documents") {
      setModalID("all_tenants_linked_with_head_of_household");
    } else if (modalID === "signed_documents") {
      setModalID("all_tenants_linked_with_head_of_household");
    } else if (modalID === "proofs_uploaded") {
      setModalID("all_tenants_linked_with_head_of_household");
    } else if (modalID === "reviewed_documents") {
      setModalID("all_tenants_linked_with_head_of_household");
    } else {
      try {
        setModalID(null);
        setActiveTenant({});
        setShowBackIcon(false);
        setAddStatus(false);
        setEditStatus(false);
        setDeleteStatus(false);
        setSelectedPopupIndex(selectedPopupIndex);
      } catch (ex) {
        console.log("Error at  handleCloseBulkUploadPopup");
      }
    }
  };
  // console.log(activeTenant)
  const handleHideDetailPopup = () => {
    setUnitDetail(false);
    setAddStatus(false);
    setEditStatus(false);
    setDeleteStatus(false);
    setActiveUnitInfo(null);
    setModalID(null);
  };
  const handleFormClose = () => {
    setSelectedPopupIndex(0);
    setUnitDetail(false);
    setModalID(null);
    setShowBackIcon(false);
    setModalTitle("Household Details");
  };

  const saveUpdatedProperty = (property) => {
    try {
      setActiveProperty(property);
      let filteredArray = [];
      property.map((x) => {
        filteredArray.push({
          unitID: { id: x.id, type: "private" },
          unit_no: x.unit_no,
          certification_status: x.certification_status,
          unit_id: x.unit_id,
          head_of_household: getHeadOfHouseholdInfo(x),
          tel_number: getHeadOfHouseholdTelephoneNumber(x),
        });
      });
      // console.log(filteredArray);
      let recentUnits = filteredArray?.slice(-10);
      setRecentUnits(recentUnits);
      let displayUnits = filteredArray;
      setAllUnits(displayUnits);
      setDisplayUnits(displayUnits);
      setActiveProperty(property);
    } catch (ex) {
      console.error("Error at saveUpdatedProperty");
    }
  };
  // console.log(allUnits);
  const handleSetUploadPopup = () => {
    try {
      if (showUploadPopup == false) {
        setUploadPopupState(true);
      } else {
        setUploadPopupState(false);
      }
    } catch (ex) {
      console.log("Error at handleSetUploadPopup");
    }
  };

  const handleFileUploadChange = (event) => {
    // console.log(event);
    try {
      if (event && event.target && event.target.files) {
        const file = event.target.files[0];

        if (file && (file.type === "csv" || file.name.endsWith(".csv"))) {
          setSelectedFile(file);
          setFileUploadError(null);
        } else {
          console.error("Invalid file type. Please choose a CSV file.");
          setSelectedFile(null);
          setFileUploadError("Invalid file type. Please choose a CSV file.");
        }
      } else {
        setSelectedFile(null);
        setFileUploadError("Invalid file information.");
      }
    } catch (ex) {
      // An error occurred during file handling, set an error message and log the error
      setFileUploadError(
        "An error occurred while handling the file. Please try again."
      );
      console.error("Error at handleFileUploadChange", ex);
    }
  };

  const handleBulkUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("Please choose a CSV file.");
        return;
      }

      const formData = new FormData();
      formData.append("myFile", selectedFile, selectedFile.name);

      const { data } = await axios.post(
        AppConfig.svc + `bulk_upload_units/`,
        formData,
        {
          params: {
            property_id: params["property_id"],
            property_manager_id: userInfo.sub,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data) {
        setUploadStatus(true);
      }
    } catch (ex) {
      console.error("Error at handleBulkUpload", ex);
    }
  };

  // Format the rentals information into units information
  const processUnits = (units) => {
    const processedUnits = [];
    units?.map((x) => {
      const headOfHouseholdInfo = getHeadOfHouseholdInfo(x);
      const tenantInfo = getAllTenantsFromUnit(x);
      processedUnits.push({
        unitID: { id: x.id, type: "private" },
        unit_id: x.unit_id,
        head_of_household: headOfHouseholdInfo
          ? `${
              headOfHouseholdInfo.first_name
                ? headOfHouseholdInfo.first_name
                : ""
            } ${
              headOfHouseholdInfo?.last_name
                ? headOfHouseholdInfo?.last_name
                : ""
            }`
          : null,
        certification_date:
          headOfHouseholdInfo && headOfHouseholdInfo?.certification_date
            ? formatDateToDDMMYYYY(headOfHouseholdInfo?.certification_date)
            : tenantInfo && tenantInfo[0] && tenantInfo[0]?.certification_date
            ? formatDateToDDMMYYYY(tenantInfo?.[0]?.certification_date)
            : "",
        tel_number: getHeadOfHouseholdTelephoneNumber(x),
        certificationDate : x.certificationDate,
        certification_status: x.certification_status,
      });
    });
    processedUnits.sort((a, b) => a.unit_id - b.unit_id);
    const sorted_units = sortArrayByUnitId(processedUnits);
    return sorted_units;
  };
  useEffect(() => {
    fetchNewNotifications(true);
  }, []);
  async function getTenantDetailsById(rentalDetails, allTenants) {
    // Parameter validation
    if (
      !rentalDetails ||
      !Array.isArray(rentalDetails) ||
      !allTenants ||
      !Array.isArray(allTenants)
    ) {
      console.log("Invalid parameters. Arrays expected.");
    }

    // Empty check
    if (
      rentalDetails.length === 0 ||
      !allTenants ||
      Array.isArray(allTenants && allTenants.length === 0)
    ) {
      // This is the case for a property that has just been added manually.
      // No units, no tenants, no rentals.
      console.log("Input arrays are empty.");
      return [];
    }

    // Check property existence
    const tenantIds = rentalDetails.flatMap((item) => item.tenant_id);
    if (tenantIds.some((id) => !id)) {
      // Might not have tenants yet.
      console.log("Some rental details are missing tenant IDs.");
      return [];
    }
    // console.log(allTenants)
    // Array flattening
    const allTenantIds =
      (Array.isArray(allTenants) &&
        allTenants?.map((item) => item.id).flat()) ||
      [];
    // console.log(allTenantIds)
    // Filtered IDs check
    const filteredIDs = tenantIds.filter((id) => !allTenantIds.includes(id));
    if (filteredIDs.length === 0) {
      return []; // No need to fetch details
    }

    // Fetch tenant details
    const getMultipleTenantsResponse =
      await TenantAdapter.getMultipleTenantInfoById(filteredIDs, userInfo);

    // Response check
    if (
      !getMultipleTenantsResponse ||
      getMultipleTenantsResponse.length === 0
    ) {
      console.log("No tenant details found for the provided IDs.");
    }
    // console.log(allTenants)
    let _allTenants = Array.isArray(allTenants) ? allTenants : [];
    // Merge current tenants with fetched tenants
    const currentTenants = [
      ..._allTenants,
      ...(Array.isArray(getMultipleTenantsResponse)
        ? getMultipleTenantsResponse
        : []),
    ];
    // console.log(currentTenants)
    setAllTenants(currentTenants);

    return filteredIDs;
  }
  useEffect(() => {
    if (autoLaunch) {
      setFirstTimeLaunch(true);
    }
  }, []);
  useEffect(() => {
    if (autoLaunch && activeProperty && firstTimeLaunch) {
      handleViewClick({ unitID: { id: launchUnitID } });
      changePopupTabIndex(tab_index);
    }
  }, [autoLaunch, activeProperty]);
  const changePopupTabIndex = (tab_index) => {
    if (typeof tab_index === "string") {
      tab_index = parseInt(tab_index, 10);
      setSelectedPopupIndex(tab_index);
    } else {
      setSelectedPopupIndex(tab_index);
    }
  };
  useEffect(() => {
    async function fetchPropertyById(id) {
      const data = await PropertyAdapter.getPropertyByID(id);
      // This sometimes gets a 401 error when the frontend does not send cookies - WHY????
      // Requests before and after do send the the id_token and access_token cookies. Mystery...
      // Seems to happen (only?) on a browser refresh.
      if (data && data.length > 0) {
        return data[0];
      }
      return null;
    }

    async function fetchRentalsByPropertyId(id) {
      const rentalRecord = await PropertyAdapter.getRentalsByPropertyID(id);
      if (rentalRecord) {
        getTenantDetailsById(rentalRecord, allTenants);
        return rentalRecord;
      }
    }

    function processRentals(rentalInfo, unit_id) {
      let rental_rows = rentalInfo?.filter(
        // This now returns all matches
        (_record) => _record.unit_id == unit_id
      );
      let unit: any = {};

      unit.tenant_id = [];
      unit.requiredQAs = [];

      // Put rental rows into unit
      rental_rows?.forEach((rental_row) => {
        // Just take one of these for now.
        unit.rental_id = rental_row.id;
        unit.attachments = rental_row.attachments;
        unit.certification_status = rental_row.certification_status;
        unit.certificationDate = rental_row.certification_date ? rental_row.certification_date : "";

        // Collect all the values.
        if (rental_row.tenant_id) {
          unit.tenant_id = [
            ...new Set([...unit.tenant_id, ...rental_row.tenant_id]),
          ];
        }
        unit.requiredQAs = unit.requiredQAs.concat(
          rental_row.requiredQAs || []
        );
      });

      return unit;
    }

    async function fetchDetailsFromAllSources(id) {
      setIsLoading(true);
      let propertyInfo = await fetchPropertyById(id);
      let rentalInfo = await fetchRentalsByPropertyId(id);
      const tenantsInfo = await TenantAdapter.fetchAllTenants(userInfo);
      for (let i = 0; i < propertyInfo?.units?.length; i++) {
        let findUnitID = propertyInfo?.units?.[i]?.id;
        // Handle rental records for each tenant in the unit
        let processed_unit = processRentals(rentalInfo, findUnitID);
        Object.assign(propertyInfo.units[i], processed_unit);
      }
      const processedUnits = processUnits(propertyInfo?.units);
      if (activeUnitInfo !== null && propertyInfo) {
        const editedUnitInfo = propertyInfo?.units?.find(
          (unit) => unit?.id === activeUnitInfo?.id
        );
        setActiveUnitInfo(editedUnitInfo);
      }
      setRecentUnits(processedUnits.slice(-10));
      setDisplayUnits(processedUnits);
      setAllUnits(processedUnits);
      setActiveProperty(propertyInfo);
      syncProperty(false);
      renderModaLTitle();
      renderShowBackIcon();
      getAllActiveTenants(activeProperty);
      getHeadOfHouseHold(propertyInfo?.units);
      setTenants(tenantsInfo);
      processUnits(propertyInfo?.units);
      setIsLoading(false);
    }

    fetchDetailsFromAllSources(params["property_id"]);
  }, [needSync, modalID, allTenants]);
  const getUnitInfo = (details) => {
    let unitInfo = activeProperty?.units.find(
      (_unit) => _unit.id == details.unitID.id
    );
    setActiveRental(unitInfo?.rental_id);
    setActiveUnitInfo(unitInfo);
    return unitInfo;
  };
  const getUnitInfoForManagement = (details) => {
    let _res = getUnitInfo(details);
    return _res;
  };
  const handleViewClick = (details) => {
    getUnitInfo(details);
    setUnitDetail(true);
  };
  useEffect(() => {
    if (expanded) {
      setDisplayUnits(allUnits);
    } else {
      setDisplayUnits(recentUnits);
    }
  }, [expanded]);
  const handleListExpand = () => {
    try {
      setExpanded(!expanded);
    } catch (ex) {
      console.error("Error at handleListExpand");
    }
    setExpanded(!expanded);
  };

  const handleUpdateRequiredFormList = async (
    rental_id: any,
    tenantIds: any
  ) => {
    let selected_forms = form.filter((_form) => _form.checked);
    // console.log(selected_forms);
    if (rental_id) {
      let result = await QuestionnaireAdapter.sendClientForm(rental_id, {
        createTaskFlow: false,
        required_forms: selected_forms,
        tenant_ids: tenantIds,
      }, activeUnitInfo?.id);
      if (result) {
        // console.log(result);
        syncProperty(true);
      }
      fetchNewNotifications(true);
      setModalID("success");
      setModalTitle("Client forms sent");
    }
  };
  const handleAddUnit = () => {
    try {
      setShowAddUnits(true);
      setaddUnitStatus(false);
    } catch (ex) {
      console.error("Error at handleAddUnit");
    }
  };
  const renderFloatingMenu = (id) => {
    return (
      <div className="floating">
        <ul className="floating-menu">
          <li className="floating-menu__item">View</li>
        </ul>
      </div>
    );
  };
  const renderModaLTitle = () => {
    let contentID = modalID;
    switch (contentID) {
      case "success":
        return ContentID.SUCCESS;
      case "uploaded":
        return ContentID.UPLOADED;
      case "signed_documents":
        return ContentID.SIGNED_DOCUMENTS;
      case "reviewed_documents":
        return ContentID.REVIEWED_DOCUMENTS;
      case "proofs_uploaded":
        return ContentID.PROOFS_UPLOADED;
      case "add_tenant":
        return ContentID.ADD_TENANT;
      case "view_more":
        return ContentID.VIEW_MORE;
      case "edit_tenant":
        return ContentID.EDIT_TENANT;
      case "unit_no":
        return ContentID.UNIT_NO; //can be changed to ----
      default:
        return ContentID.UNIT_NO;
    }
  };
  const renderShowBackIcon = () => {
    let contentID = modalID;
    switch (contentID) {
      case "success":
        return true;
      case "uploaded":
        return true;
      case "signed_documents":
        return true;
      case "reviewed_documents":
        return true;
      case "proofs_uploaded":
        return true;
      case "add_tenant":
        return true;
      case "view_more":
        return true;
      case "edit_tenant":
        return true;
      case "unit_no":
        return true;
      case "head_of_house_hold":
        return true;
      case "all_tenants_linked_with_head_of_household":
        return true;
      case "all_documents":
        return true;
      default:
        return false;
    }
  };
  const renderShowCloseButton = () => {
    let contentID = modalID;
    switch (contentID) {
      case "success":
        return true;
      case "uploaded":
        return true;
      case "signed_documents":
        return true;
      case "reviewed_documents":
        return true;
      case "proofs_uploaded":
        return true;
      case "add_tenant":
        return false;
      case "view_more":
        return true;
      case "edit_tenant":
        return true;
      case "unit_no":
        return true;
      case "head_of_house_hold":
        return true;
      case "all_tenants_linked_with_head_of_household":
        return true;
      case "all_documents":
        return true;
      default:
        return true;
    }
  };
  const determineModalSize = () => {
    if (editUnitStatus) {
      return ModalTypes.Medium;
    } else if (addUnitStatus) {
      return ModalTypes.Medium;
    } else if (deleteStatus) {
      return ModalTypes.Medium;
    } else {
      return ModalTypes.Xmedium;
    }
  };
  const determineModalSizeDelete = () => {
    if (!deleteStatus) {
      return ModalTypes.Small;
    } else {
      return ModalTypes.Xmedium;
    }
  };
  const renderModalContent = () => {
    // console.log(activeUnitInfo)
    let contentID = modalID;
    let activeTenants = getAllActiveTenants(activeProperty);
    switch (contentID) {
      case "success":
        return <FormsRequested onFormClose={handleFormClose} form={form} />;
      case "signed_documents":
        return (
          <SignedDocuments
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            activeTenant={activeTenant}
          />
        );
      case "unit_no":
        return (
          <UnitDocuments
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            updateModalId={setModalID}
            modalID={modalID}
            currentFlow={currentFlow}
          />
        );
      case "head_of_house_hold":
        return (
          <HeadOfHouseHold
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            updateModalId={setModalID}
            modalID={modalID}
            currentFlow={currentFlow}
            setActiveHeadOfHouseHold={setActiveHeadOfHouseHold}
          />
        );
      case "all_tenants_linked_with_head_of_household":
        return (
          <HouseholdUnityNetwork
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            updateModalId={setModalID}
            modalID={modalID}
            setActiveTenant={setActiveTenant}
            activeTenant={activeTenant}
            currentFlow={currentFlow}
            activeHeadOfHousehold={activeHeadOfHousehold}
          />
        );
      case "all_documents":
        return (
          <AllDocuments
            setActiveTenant={setActiveTenant}
            activeTenant={activeTenant}
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            updateModalId={setModalID}
            modalID={modalID}
            currentFlow={currentFlow}
            setCurrentFlow={setCurrentFlow}
            activeHeadOfHousehold={activeHeadOfHousehold}
          />
        );
      case "reviewed_documents":
        return (
          <ReviewedDocuments
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            activeTenant={activeTenant}
          />
        );
      case "uploaded":
        return (
          <FormsUploaded
            //@ts-ignore
            rentalId={activeUnitInfo.rental_id}
            tenantInfo={activeTenants}
            activeTenant={activeTenant}
            formList={form}
            unitInfo={activeUnitInfo}
            propertyID={params.property_id}
            setRequiredQA={handleUpdateRequiredFormList}
          />
        );
      case "add_tenant":
        let headOfHousehold = activeTenants.find(
          (_tenant) => _tenant.relationship.value === "head_of_household"
        );
        let _tenantInfo = {
          resident_id: activeProperty.residentId,
          unit_number: activeUnitInfo !== null ? activeUnitInfo.unit_id : "", // Duplicates the rental information
          sse_number: activeProperty.sseNumber,
          first_name: activeProperty.firstName,
          middle_name: activeProperty.middleName,
          last_name: activeProperty.lastName,
          ssn_number: activeProperty.ssnNumber,
          address: activeProperty.address,
          city: activeProperty.city,
          state: activeProperty.state,
          postalcode: activeProperty.postalcode,
          country: activeProperty.country?.label,
          tel_number: activeProperty.telNumber,
          id_number: activeProperty.idNumber,
          id_sate: activeProperty.idState,
          house_size: headOfHousehold
            ? headOfHousehold.house_size
            : activeTenants[0]?.house_size || "",
          race: activeProperty.race,
          ethnicity: activeProperty.ethnicity,
          date_of_birth: activeProperty.dateOfBirth,
          relationship: activeProperty.relationship,
          disable: activeProperty.disable,
          student_status: activeProperty.studentStatus,
          county: activeProperty.county,
          role: "tenant",
        };
        // console.log(activeProperty);
        return (
          <AddTenant
            tenantInfo={_tenantInfo}
            propertyInfo={activeProperty}
            unitInfo={activeUnitInfo}
            addTenantFlow={true}
            message={"A new member has been added successfully"}
            onClose={handleBackToDetailsPopup}
            autoAssign={true}
            rentalID={activeUnitInfo}
            addStatus={addStatus}
            setAddStatus={setAddStatus}
            deleteStatus={deleteStatus}
            role={"tenant"}
            setDeleteStatus={setDeleteStatus}
          />
        );
      case "proofs_uploaded":
        return (
          <ProofsUploaded
            tenantInfo={activeTenants}
            unitInfo={activeUnitInfo}
            propertyInfo={activeProperty}
            flow={"property-manager"}
            activeTenant={activeTenant}
          />
        );
      case "view_more":
        return (
          <TenantInfo
            tenantInfo={getAllActiveTenants(activeProperty)}
            updateModalId={setModalID}
            modalID={"modalID"}
          />
        );
      case "edit_tenant":
        return (
          <AddTenant
            tenantInfo={activeTenant}
            addTenantFlow={false}
            message={"Saved successfully"}
            onClose={handleBackToDetailsPopup}
            // autoAssign={true}
            role={"tenant"}
            rentalID={activeUnitInfo}
            addStatus={addStatus}
            setAddStatus={setAddStatus}
            deleteStatus={deleteStatus}
            setDeleteStatus={setDeleteStatus}
            setModalTitle={setTenantModalTitle}
          />
        );
      default:
        return (
          <PropertyDetailsPopup
            form={form}
            updateModalId={setModalID}
            modalID={modalID}
            propertyInfo={activeProperty}
            unitInfo={activeUnitInfo}
            tenantInfo={activeTenants}
            handleSelect={handleSelect}
            handleAddTenant={handleAddNewTenant}
            setRequiredQA={handleUpdateRequiredFormList}
            needSync={needSync}
            syncProperty={syncProperty}
            userInfo={userInfo}
            autoAssign={true}
            selectedPopupIndex={selectedPopupIndex}
            setSelectedPopupIndex={setSelectedPopupIndex}
            setUnitDetail={setUnitDetail}
            setActiveTenant={setActiveTenant}
            activeTenant={activeTenant}
            _activeTenant={active_tenant}
            unAuthorisedError={unAuthorisedError}
            setUnAuthorisedError={setUnAuthorisedError}
            currentFlow={currentFlow}
            setCurrentFlow={setCurrentFlow}
            propertyID={params["property_id"]}
            unitID={activeUnitInfo !== null ? activeUnitInfo?.id : launchUnitID}
            firstTimeLaunch={firstTimeLaunch}
            setFirstTimeLaunch={setFirstTimeLaunch}
          />
        );
    }
  };
  const confirmDeleteProperty = () => {
    // console.log(activeProperty);
    if (activeProperty.property_status === "active") {
      setDeletePropertyModalTitle("Disable property !!");
      setDeletePropertyModalDescription(
        "Are you sure want to disable this property ?"
      );
    } else {
      setDeletePropertyModalTitle("Activate property !!");
      setDeletePropertyModalDescription(
        "Are you sure want to activate this property ?"
      );
    }

    setShowDeleteModal(true);
  };
  const onClosePopup = () => {
    setShowDeleteModal(false);
  };
  const navigateToMyProperty = () => {
    try {
      setShowDeleteModal(false);
      setRefreshProperties(true);
      push("/dashboard/my-properties");
    } catch (ex) {
      console.error("Error at navigateToMyProperty");
    }
  };
  async function onDeleteProperty() {
    // console.log(activeProperty);
    // console.log(params.property_id);
    let delete_property = await PropertyAdapter.softDeleteProperty(
      params.property_id,
      userInfo
    );
    // console.log(delete_property);
    if (delete_property.success) {
      setDeleteStatus(true);
      if (activeProperty.property_status === "active") {
        setDeletePropertyModalTitle("Disable property !!");
        setDeletePropertyModalDescription("Property Disabled Successfully !!");
      } else {
        setDeletePropertyModalTitle("Activate property !!");
        setDeletePropertyModalDescription("Property Activated Successfully !!");
      }
      console.log("property disabled successfully");
    }
  }

  const handleSelect = (id) => {
    // Create a new array with the updated card state
    const updatedCards = form.map((card) => {
      if (card.enabled) {
        if (card.id === id) {
          return { ...card, checked: !card.checked };
        }
      }

      return card;
    });
    setForm(updatedCards);
  };

  const formatTableData = displayUnits.map(
    ({ certification_status, certification_date, certificationDate, ...rest }) => rest
  );
  // console.log(activeProperty);
  let country = null;
  if (activeProperty?.country?.label) {
    country = activeProperty?.country?.label;
  } else if (activeProperty?.country) {
    country = activeProperty?.country;
  }
  // console.log(displayUnits)
  let writeOnlyPermission = validate(
    [AccessPermission.Write],
    userInfo ? userInfo.permissions : { permissions: 0 }
  );
  console.log(isLoading);
  const unitSkeletons = [];
  for (let i = 0; i <= 5; i++) {
    unitSkeletons.push(
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="skeleton-block">
          <Skeleton
            height={10}
            width={42}
            baseColor="#cdd7eb"
            borderRadius={0}
          />
        </div>
        <Skeleton
          className="units"
          width={40}
          height={40}
          baseColor="#cdd7eb"
          borderRadius={0}
          style={{ marginRight: "20px" }}
        />
      </div>
    );
  }
  return (
    <div className="property-details__wrapper">
      <div className="property-details__header">
        {isLoading ? (
          <div style={{ display: "flex", gap: 12 }}>
            <Skeleton
              width={100}
              height={20}
              baseColor="#cdd7eb"
              borderRadius={0}
            />
            <Skeleton
              width={100}
              height={20}
              baseColor="#cdd7eb"
              borderRadius={0}
            />
          </div>
        ) : (
          <div>
            <Label
              type={LabelType.Body}
              text={activeProperty?.legal_name}
              variant={LabelVariant.L4}
            />
          </div>
        )}
        {writeOnlyPermission && (
          <div
            className="property-details__special-instructions"
            onClick={confirmDeleteProperty}
          >
            <div className="property-details__delete">
              <Delete onClick={confirmDeleteProperty} />
            </div>

            <div className="property-details__special-instructions-text">
              {activeProperty?.property_status == "active"
                ? "Disable Property"
                : "Activate Property"}
            </div>
          </div>
        )}
      </div>
      <div className="property-details__tabs">
        <Tabs
          additionalStyles={{ margin: "14px 14px 0 14px" }}
          selectedIndex={selectedIndex}
          handleChange={handleChange}
        >
          <Panel
            title={
              isLoading ? (
                <div className="panel-title-skeleton">
                  <Skeleton width={30} height={20} baseColor="#cdd7eb" />
                  <Skeleton width={100} height={20} baseColor="#cdd7eb" />
                </div>
              ) : (
                <div className="panel-title">
                  <Home />
                  <Label
                    type={LabelType.Header}
                    text={"Home"}
                    variant={LabelVariant.L2}
                  />
                </div>
              )
            }
            onClick={() => {}}
            index={0}
          >
            <div className="property-details">
              <div
                className="property-details__section"
                style={{ gridArea: "item1" }}
              >
                <div className="property-details__section-block-one">
                  <div className="property-details__section-block-one-content--one">
                    <div className="property-details__section-header-title">
                      {isLoading ? (
                        <div>
                          <Label
                            type={LabelType.Body}
                            text={`Total Units : `}
                            variant={LabelVariant.L4}
                          />
                          <Skeleton
                            width={20}
                            height={20}
                            baseColor="#cdd7eb"
                          />
                        </div>
                      ) : (
                        <Label
                          type={LabelType.Body}
                          text={`Total Units : ${
                            activeProperty?.units?.length == undefined
                              ? 0
                              : `${activeProperty?.units?.length}`
                          }`}
                          variant={LabelVariant.L4}
                        />
                      )}
                    </div>
                    <div>
                      {!isLoading ? (
                        <DonutChart
                          series={[
                            initiatedCertifications,
                            newCertifications,
                            //@ts-ignore
                            processingCertifications,
                          ]}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "12px 0",
                          }}
                        >
                          <Skeleton
                            width={120}
                            height={120}
                            circle
                            style={{}}
                            baseColor="#cdd7eb"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="property-details__section-block-one-content--two">
                    <div className="property-details__section-block-one-content--two-inset">
                      <div className="property-details__section-content">
                        <div className="property-details__section-content-telephone">
                          🏠
                          <Label
                            type={LabelType.Header}
                            text={"Address"}
                            variant={LabelVariant.L4}
                            overrideTextStyles={{ marginLeft: "8px" }}
                          />
                        </div>
                        {isLoading ? (
                          <div className="property-details__section-content-address">
                            <div className="property-details__section-content-details">
                              <Skeleton
                                width={150}
                                height={20}
                                baseColor="#cdd7eb"
                              />
                            </div>
                            <div className="property-details__section-content-details">
                              <Skeleton
                                width={150}
                                height={20}
                                baseColor="#cdd7eb"
                              />
                            </div>
                            <div className="property-details__section-content-details">
                              <Skeleton
                                width={150}
                                height={20}
                                baseColor="#cdd7eb"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="property-details__section-content-address">
                            <div className="property-details__section-content-details">
                              <Label
                                type={LabelType.Header}
                                text={`${activeProperty?.address},`}
                                variant={LabelVariant.L2}
                              />
                            </div>
                            <div className="property-details__section-content-details">
                              <div>
                                <Label
                                  type={LabelType.Header}
                                  text={`${activeProperty?.city},`}
                                  variant={LabelVariant.L2}
                                />
                              </div>
                              <Label
                                type={LabelType.Header}
                                text={`${activeProperty?.state},`}
                                variant={LabelVariant.L2}
                              />
                              <Label
                                type={LabelType.Header}
                                text={`${activeProperty?.postalcode},`}
                                variant={LabelVariant.L2}
                              />
                            </div>
                            <div className="property-details__section-content-details">
                              <Label
                                type={LabelType.Header}
                                text={country}
                                variant={LabelVariant.L2}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="property-details__section-content">
                        <div className="property-details__section-content-telephone">
                          ☎️
                          <Label
                            type={LabelType.Header}
                            text={"Phone Number"}
                            variant={LabelVariant.L4}
                            overrideTextStyles={{ marginLeft: "8px" }}
                          />
                        </div>
                      </div>

                      {isLoading ? (
                        <div className="property-details__section-content-address">
                          <div className="property-details__section-content-details">
                            <Skeleton
                              width={150}
                              height={20}
                              baseColor="#cdd7eb"
                            />
                          </div>
                        </div>
                      ) : (
                        activeProperty?.phone_number &&
                        activeProperty?.phone_number !== "" && (
                          <div className="property-details__section-content">
                            <div className="property-details__section-content-header">
                              <div className="property-details__section-content-details">
                                <Label
                                  type={LabelType.Header}
                                  text={`${activeProperty?.phone_number}${
                                    activeProperty?.fax_number &&
                                    activeProperty?.fax_number !== ""
                                      ? ""
                                      : ""
                                  }`}
                                  variant={LabelVariant.L2}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <div className="property-details__section-content">
                        <div className="property-details__section-content-fax">
                          📠
                          <Label
                            type={LabelType.Header}
                            text={"Fax Number"}
                            variant={LabelVariant.L4}
                            overrideTextStyles={{ marginLeft: "8px" }}
                          />
                        </div>
                      </div>

                      {isLoading ? (
                        <div className="property-details__section-content-address">
                          <div className="property-details__section-content-details">
                            <Skeleton
                              width={150}
                              height={20}
                              baseColor="#cdd7eb"
                            />
                          </div>
                        </div>
                      ) : (
                        activeProperty?.fax_number &&
                        activeProperty?.fax_number !== "" && (
                          <div className="property-details__section-content">
                            <div className="property-details__section-content-header">
                              <div className="property-details__section-content-details">
                                <Label
                                  type={LabelType.Header}
                                  text={`${activeProperty?.fax_number}${
                                    activeProperty?.email &&
                                    activeProperty?.email !== ""
                                      ? ""
                                      : ""
                                  }`}
                                  variant={LabelVariant.L2}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}

                      <div className="property-details__section-content">
                        <div className="property-details__section-content-email">
                          📧{" "}
                          <Label
                            type={LabelType.Header}
                            text={"Email"}
                            variant={LabelVariant.L4}
                            overrideTextStyles={{ marginLeft: "8px" }}
                          />
                        </div>
                      </div>

                      {isLoading ? (
                        <div className="property-details__section-content-address">
                          <div className="property-details__section-content-details">
                            <Skeleton
                              width={150}
                              height={20}
                              baseColor="#cdd7eb"
                            />
                          </div>
                        </div>
                      ) : (
                        activeProperty?.email &&
                        activeProperty?.email !== "" && (
                          <div className="property-details__section-content">
                            <div className="property-details__section-content-header">
                              <div className="property-details__section-content-details">
                                <Label
                                  type={LabelType.Header}
                                  text={`${activeProperty?.email}`}
                                  variant={LabelVariant.L2}
                                />
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="property-details__section-block-two">
                  <TableView
                    showAddNewButton={true}
                    showAddBulkUpload={writeOnlyPermission ? true : false}
                    tableListButtonText={
                      expanded ? "show less" : "View all units"
                    }
                    showAllListingButton={
                      displayUnits.length >= 10 ? true : false
                    }
                    isLoading={isLoading}
                    handleListingView={handleListExpand}
                    showViewDetails={() => true}
                    onViewDetails={handleViewClick}
                    floatingMenu={renderFloatingMenu}
                    showFloatingViewMenu={false}
                    showSerialNumber={false}
                    secondaryButtonClick={handleSetUploadPopup}
                    addNew={handleAddUnit}
                    tableName="Units"
                    tableHeader={[
                      { text: "Unit No", key: "unit_no", type: "number" },
                      {
                        text: "Head of Household",
                        key: "head_of_household",
                        type: "string",
                      },
                      {
                        text: "Telephone Number",
                        key: "tel_number",
                        type: "number",
                      },
                    ]}
                    tableData={formatTableData}
                  />
                </div>
              </div>

              <div
                className="property-details__section"
                style={{ gridArea: "item2" }}
              >
                <div className="property-details__section-tile">
                  {isLoading ? (
                    <div
                      className="property-details__section-tile--skeleton-wrapper"
                      style={{ marginRight: "6px", marginLeft: "0px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "12px",
                          justifySelf: "flex-end",
                        }}
                      >
                        <Skeleton
                          width={100}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                        <Skeleton
                          width={20}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="property-details__section-tile--one">
                      <div className="image-content">
                        <div className="image-amt">
                          <Label
                            type={LabelType.Header}
                            text={"Compliant"}
                            variant={LabelVariant.L3}
                          />
                        </div>
                        <div className="count-up">
                          <CountUp
                            startVal={0}
                            end={newCertifications}
                            duration={5.75}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {isLoading ? (
                    <div
                      className="property-details__section-tile--skeleton-wrapper"
                      style={{ marginRight: "6px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "12px",
                          justifySelf: "flex-end",
                        }}
                      >
                        <Skeleton
                          width={100}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                        <Skeleton
                          width={20}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="property-details__section-tile--two">
                      <div className="image-content">
                        <div className="image-amt">
                          <Label
                            type={LabelType.Header}
                            text={"Processing"}
                            variant={LabelVariant.L3}
                          />
                        </div>
                        <div className="count-up">
                          <CountUp
                            startVal={0}
                            end={initiatedCertifications}
                            duration={5.75}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {isLoading ? (
                    <div className="property-details__section-tile--skeleton-wrapper">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "12px",
                          justifySelf: "flex-end",
                        }}
                      >
                        <Skeleton
                          width={100}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                        <Skeleton
                          width={20}
                          height={20}
                          borderRadius={0}
                          baseColor="#acc1eb"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="property-details__section-tile--three">
                      <div className="image-content">
                        <div className="image-amt">
                          <Label
                            type={LabelType.Header}
                            text={"Non Compliant"}
                            variant={LabelVariant.L3}
                          />
                        </div>
                        <div className="count-up">
                          <CountUp
                            startVal={0}
                            //@ts-ignore
                            end={processingCertifications}
                            duration={5.75}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="property-details__section-list">
                  <div className="property-details__section-heading--two">
                    <Label
                      type={LabelType.Header}
                      text={"Unit Certification Status"}
                      variant={LabelVariant.L4}
                    />
                  </div>
                  <div className="unit-status">
                    {isLoading
                      ? unitSkeletons
                      : displayUnits.map(function (_unit, i) {
                          let certificationStatus =
                            _unit.certification_status == "started" ||
                            _unit.certification_status === "review" ||
                            _unit.certification_status === "progress" ||
                            _unit.certification_status === "completed" ||
                            _unit.certification_status === "reject"
                              ? "started"
                              : "completed";
                          let backgroundColorForBox = getBoxColor(
                            _unit.certification_date
                          );
                          return (
                            <div className="status" key={i}>
                              <div className="block">
                                <Label
                                  type={LabelType.SubHeader}
                                  text={`${_unit.unit_id}`}
                                  variant={LabelVariant.L2}
                                />
                              </div>
                              <FloatingMenu
                                floatDirection="left"
                                menuTriggerComponent={
                                  <div
                                    style={{
                                      backgroundImage: backgroundColorForBox,
                                    }}
                                    className={"units "}
                                    onClick={() => handleViewClick(_unit)}
                                  ></div>
                                }
                              >
                                <div className="units-status">
                                  <div>
                                    Head of Household :{" "}
                                    <span className="units-status-info">
                                      {_unit.head_of_household}
                                    </span>
                                  </div>
                                  <div>
                                    Telephone Number :{" "}
                                    <span className="units-status-info">
                                      {_unit.tel_number}
                                    </span>
                                  </div>
                                </div>
                              </FloatingMenu>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </Panel>
          {writeOnlyPermission && (
            <Panel
              onClick={() => {}}
              title={
                isLoading ? (
                  <div className="panel-title-skeleton">
                    <Skeleton width={30} height={20} baseColor="#cdd7eb" />
                    <Skeleton width={100} height={20} baseColor="#cdd7eb" />
                  </div>
                ) : (
                  <div className="panel-title">
                    <SpecialInstructionsIcon />
                    <Label
                      type={LabelType.Header}
                      text={"Special Instructions"}
                      variant={LabelVariant.L2}
                    />
                  </div>
                )
              }
            >
              <SpecialInstructions
                activeProperty={activeProperty}
                userInfo={userInfo}
                activePropertyID={params.property_id}
              />
            </Panel>
          )}
          {writeOnlyPermission && (
            <Panel
              onClick={() => {}}
              title={
                isLoading ? (
                  <div className="panel-title-skeleton">
                    <Skeleton width={30} height={20} baseColor="#cdd7eb" />
                    <Skeleton width={100} height={20} baseColor="#cdd7eb" />
                  </div>
                ) : (
                  <div className="panel-title">
                    <Notification style={{ width: "20px", height: "20px" }} />
                    {getNotificationsCount(
                      notifications,
                      activeProperty?.id
                    ) === 0 ? null : (
                      <div className="notifications__circle-badge">
                        {getNotificationsCount(
                          notifications,
                          activeProperty?.id
                        )}
                      </div>
                    )}
                    <Label
                      type={LabelType.Header}
                      text={"Notifications"}
                      variant={LabelVariant.L2}
                    />
                  </div>
                )
              }
            >
              <div style={{ maxHeight: "800px", overflow: "auto" }}>
                <Notifications
                  role="property-page"
                  propertyID={params.property_id}
                />
              </div>
            </Panel>
          )}
          <Panel
            onClick={() => {}}
            title={
              isLoading ? (
                <div className="panel-title-skeleton">
                  <Skeleton width={30} height={20} baseColor="#cdd7eb" />
                  <Skeleton width={100} height={20} baseColor="#cdd7eb" />
                </div>
              ) : (
                <div className="panel-title">
                  <ManagementOnlyIcon />
                  <Label
                    type={LabelType.Header}
                    text={"Management Only"}
                    variant={LabelVariant.L2}
                  />
                </div>
              )
            }
          >
            <ManagementOnly
              activeUnit={activeUnitInfo}
              activeProperty={activeProperty}
              displayUnits={displayUnits}
              handleViewClick={getUnitInfoForManagement}
              getAllActiveTenants={getAllActiveTenants}
            />
          </Panel>
        </Tabs>
      </div>

      <Modal
        isOpen={showDeleteModal}
        title={deletePropertyModalTitle}
        size={determineModalSizeDelete()}
      >
        <div className="property-details__successfully-deleted-popup">
          <Label
            type={LabelType.Header}
            text={deletePropertyModalDescription}
            variant={LabelVariant.L2}
          />

          <div className="property-details__successfully-deleted-popup-footer">
            {deleteStatus == true && (
              <>
                <AnimatedCheck />
                <Button
                  additionalStyles={{ padding: 0 }}
                  buttonClick={navigateToMyProperty}
                  btnText="Close"
                  btnType="rectangle"
                  btnTheme="primary"
                />
              </>
            )}
            {!deleteStatus && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button
                  additionalStyles={{ padding: 0 }}
                  buttonClick={onDeleteProperty}
                  btnText="yes"
                  btnType="rectangle"
                  btnTheme="primary"
                />
                <Button
                  additionalStyles={{ padding: 0 }}
                  buttonClick={onClosePopup}
                  btnText="No"
                  btnType="rectangle"
                  btnTheme="secondary"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={showAddUnits}
        title={unAuthorisedError ? "" : "Add Unit(s)"}
        setOn={handleHideAddUnits}
        showCloseButton={unAuthorisedError ? false : true}
        size={determineModalSize()}
      >
        <AddUnits
          onClose={handleHideAddUnits}
          propertyID={params?.["property_id"]}
          setProperty={saveUpdatedProperty}
          refetchProperty={syncProperty}
          addUnitStatus={addUnitStatus}
          setaddUnitStatus={setaddUnitStatus}
          editUnitStatus={editUnitStatus}
          setEditUnitStatus={setEditUnitStatus}
          unAuthorisedError={unAuthorisedError}
          setUnAuthorisedError={setUnAuthorisedError}
        />
      </Modal>
      <Modal
        showBackButton={renderShowBackIcon()}
        showCloseButton={renderShowCloseButton()}
        navigateBack={handleBackToDetailsPopup}
        isOpen={unitDetail}
        title={renderModaLTitle()}
        setOn={handleHideDetailPopup}
        size={ModalTypes.Xmedium}
      >
        <div>{renderModalContent()}</div>
      </Modal>

      <Modal
        isOpen={showUploadPopup}
        title={uploadStatus ? "Success" : "Upload file"}
        setOn={handleSetUploadPopup}
        size={uploadStatus ? ModalTypes.Medium : ModalTypes.Xmedium}
      >
        <>
          {uploadStatus == false && (
            <div>
              <Input
                name="file"
                label=""
                errorText=""
                onChange={handleFileUploadChange}
                placeholder="choose your file"
                type="file"
                value={null}
              />
              {fileUploadError && (
                <div className="error-message">{fileUploadError}</div>
              )}
              <div className="upload-csv">
                <Button
                  btnText="Upload"
                  btnType="outline"
                  btnTheme="primary"
                  buttonClick={handleBulkUpload}
                  testID="upload_csv"
                ></Button>
              </div>
              <FileDownloadLink
                filePath={`/assets/files/sample-template.csv`}
              />
            </div>
          )}
          {uploadStatus == true && (
            <div>
              <div className="property-details-wrapper ">
                <div className="property-details-section">
                  <div>Your Unit(s) Added Successfully!</div>
                </div>
                <div>
                  <AnimatedCheck />
                </div>
                <div className="property-details ">
                  <Button
                    btnText="Close"
                    btnTheme="primary"
                    btnType="rounded"
                    testID="properties-button"
                    buttonClick={handleCloseBulkUploadPopup}
                    additionalStyles={{ paddingBottom: "0px" }}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default PropertyDetails;
