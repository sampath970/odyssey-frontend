"use client";

import React, { useState, forwardRef, Ref, HTMLProps, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../../components/button/button";
import Input from "../../../../components/input/input";
import "./add-tenant.scss";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
import { useAllTenants } from "../../../../services/hooks/useAllTenants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import { RelationShipStatus } from "../../../../enum/enum";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import { getButtonText } from "../../../../utils/add-tenant-utils";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import LoadingBar from "react-top-loading-bar";

interface ExampleCustomInputProps {
  value: string;
  onClick?: () => void;
}

const renderRaceOption = (value, isSelected, onSelectRace, onRemoveRace) => (
  <div className={`multiselect-option ${isSelected ? "selected" : ""}`}>
    <input
      type="checkbox"
      className="multiselect-checkbox"
      checked={isSelected}
      onChange={() => (isSelected ? onRemoveRace(value) : onSelectRace(value))}
    />
    <span>{value.value}</span>
  </div>
);
const AddTenant = (props) => {
  const { setAllTenants } = useAllTenants();
  const {
    onClose,
    tenantInfo,
    propertyInfo,
    message,
    role,
    autoAssign,
    rentalID,
    setModalTitle,
    addStatus,
    setAddStatus,
    deleteStatus,
    setDeleteStatus,
    flow = "",
  } = props;
  console.log("tenant info", tenantInfo);
  const [dateOfBirth, setDateOfBirth] = useState(
    tenantInfo?.date_of_birth ? new Date(tenantInfo.date_of_birth) : new Date()
  );
  const [moveInDate, setMoveInDate] = useState(
    tenantInfo?.move_in_date ? new Date(tenantInfo.move_in_date) : new Date()
  );
  const [certificationDate, setCertificationDate] = useState(
    tenantInfo?.certification_date
      ? new Date(tenantInfo.certification_date)
      : new Date()
  );
  const [residentId, setResidentId] = useState(
    tenantInfo?.resident_id ? tenantInfo.resident_id : ""
  );
  const [email, setEmail] = useState(tenantInfo?.email ? tenantInfo.email : "");
  const [firstName, setFirstName] = useState(
    tenantInfo?.first_name ? tenantInfo.first_name : ""
  );
  const [middleName, setMiddleName] = useState(
    tenantInfo?.middle_name ? tenantInfo.middle_name : ""
  );
  const [lastName, setLastName] = useState(
    tenantInfo?.last_name ? tenantInfo.last_name : ""
  );
  const [ssnNumber, setSsnNumber] = useState(
    tenantInfo?.ssn_number ? tenantInfo.ssn_number : ""
  );
  const [address, setAddress] = useState(
    tenantInfo?.address ? tenantInfo.address : ""
  );
  // const [address, setAddress] = useState('')
  const [city, setCity] = useState(tenantInfo?.city ? tenantInfo.city : "");
  const [unitNumber, setUnitNumber] = useState(
    tenantInfo?.unit_number ? tenantInfo.unit_number : ""
  );
  const [state, setState] = useState(tenantInfo?.state ? tenantInfo.state : "");
  const [postalcode, setPostalcode] = useState(
    tenantInfo?.postalcode ? tenantInfo.postalcode : ""
  );
  const [county, setCounty] = useState(
    tenantInfo?.county ? tenantInfo.county : ""
  );
  const [country, setCountry] = useState(
    tenantInfo?.country ? tenantInfo.country : ""
  );
  const [telNumber, setTelNumber] = useState(
    tenantInfo?.tel_number ? tenantInfo.tel_number : ""
  );
  const [idNumber, setIdNumber] = useState(
    tenantInfo?.id_number ? tenantInfo.id_number : ""
  );
  const [idState, setIdState] = useState(
    tenantInfo?.id_state ? tenantInfo.id_state : ""
  );
  const [companyId, setCompanyId] = useState(
    tenantInfo?.company_id ? tenantInfo.company_id : ""
  );
  const [houseSize, setHouseSize] = useState(
    tenantInfo?.house_size ? tenantInfo.house_size : ""
  );
  const [householdRelationship, setHouseholdRelationship] = useState(
    tenantInfo?.relationship?.value === "other"
      ? tenantInfo.household_relationship
      : ""
  );
  const [tenantID, setTenantID] = useState(tenantInfo?.id ? tenantInfo.id : "");
  const [relationshipError, setRelationshipError] = useState(false);
  const [tenantAffordableError, setTenantAffordableError] = useState(false);
  const [affordablePlaceHolder, setAffordablePlaceHolder] = useState(false);
  const [otherOptionVisibility, setOtherOptionsVisibility] = useState(true);
  const [ssnNumberError, setSsnNumberError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState(false);
  const [countyError, setCountyError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [unitNumberError, setUnitNumberError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [idNoError, setIdNoError] = useState(false);
  const [idStateError, setIdStateError] = useState(false);
  const [companyIdError, setCompanyIdError] = useState(false);
  const [houseSizeError, setHouseSizeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [tenantEthnicityError, setTenantEthnicityError] = useState(false);
  const [ethnicityplaceholder] = useState(false);
  const [raceplaceholder, setRaceplaceholder] = useState(false);
  const [tenantRaceError, setTenantRaceError] = useState(false);
  const [isDependant, setDependant] = useState(false);
  const [isUnbornChild, setUnbornChild] = useState(false);
  const [residentIdError, setResidentIdError] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleDateOfBirthChange = (date) => {
    setDateOfBirth(date);
  };
  const handleMoveInDateChange = (date) => {
    setMoveInDate(date);
  };
  const handleCertificationDateChange = (date) => {
    setCertificationDate(date);
  };

  const { userInfo } = useUserInfo();
  const [addTenantErrors, setErrors] = useState([]);
  const [addPropertyManagerErrors, setAddPropertyManagerErrors] = useState([]);
  const onAddNewTenant = async () => {
    debugger;
    setProgress(20);
    try {
      let newUserInfo = {};
      if (role === "property_manager" || role === "customer_support_agent") {
        if (validateAddPropertyManager()) {
          newUserInfo = {
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            address: address,
            city: city,
            state: state,
            country: country,
            county: county,
            company_id: companyId,
            postalcode: postalcode,
            email: email,
            role: role,
          };
          setButtonDisabled(true);
        } else {
          console.log("validation error");
        }
      } else if (validateAddTenants()) {
        newUserInfo = {
          resident_id: residentId,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          ssn_number: ssnNumber,
          address: address,
          city: city,
          state: state,
          postalcode: postalcode,
          country: country,
          county: county,
          ethnicity: selectedEthnicity,
          race: selectedRaces,
          tel_number: foramtTelNumber(telNumber),
          id_number: idNumber,
          id_state: idState,
          identification_type: identificationType,
          house_size: houseSize,
          date_of_birth: dateOfBirth,
          relationship: relationship,
          household_relationship: householdRelationship,
          affordable_option: affordableOption,
          disable: disable,
          unit_number: unitNumber, // This duplicates the rental information but we need it for display purposes.
          student_status: studentStatus,
          email: email,
          role: "tenant",
          move_in_date: moveInDate,
          certification_date: certificationDate,
        };
      }
      let response = null;
      if (Object.keys(newUserInfo).length !== 0) {
        if (props.addTenantFlow) {
          response = await TenantAdapter.addTenant(newUserInfo, userInfo);
        } else if (props.addPropertyManagerFlow || props.addCustomerAgentFlow) {
          response = await TenantAdapter.addPropertyManager(
            newUserInfo,
            userInfo
          );
        } else {
          response = await TenantAdapter.editTenant(
            newUserInfo,
            userInfo,
            tenantID
          );
        }
      }

      if (response?.isAlreadyExists) {
        let errorList = [];
        if (Array.isArray(response?.error)) {
          errorList = ["ID already exists"];
        } else {
          errorList = ["ID already exists"];
        }
        if (errorList?.length > 0) {
          setErrors(errorList);
        } else {
          setErrors([]);
        }
      } else if (autoAssign && response?.id) {
        setAddStatus(true);
        let rental_info = {
          rental_id: props?.rentalID?.rental_id,
          tenant_id: response?.id,
          property_id: props?.propertyInfo?.id,
          unit_number: unitNumber,
          unit_id: props?.unitInfo?.id,
          move_in_date: moveInDate,
          certification_date: certificationDate,
        };
        if (
          rental_info.tenant_id &&
          rental_info.property_id &&
          rental_info.unit_id
        ) {
          // This code is called when a new tenant is added directly to a unit.
          let assign_tenant = await TenantAdapter.assignTenant(rental_info);

          console.log(assign_tenant);
          const response = await TenantAdapter.fetchAllTenants(userInfo);

          setAllTenants(response);
        } else {
          console.log("Rental id not found");
        }
      } else if (response) {
        setAddStatus(true);
        const response = await TenantAdapter.fetchAllTenants(userInfo);

        setAllTenants(response);
      } else {
        console.log("Add tenant error");
      }
      setProgress(100);
    } catch (ex) {
      console.log(ex);
      setErrors(ex?.response?.response?.errors);
    }
    setButtonDisabled(false);
  };
  const onHandelDelete = () => {
    setShowDeleteModal(true);
  };
  const onDeleteUser = async () => {
    let removeUserResponse = await TenantAdapter.deleteTenant(
      userInfo,
      tenantID
    );

    setModalTitle("Delete user");
    setDeleteStatus(true);
    setShowDeleteModal(false);
    // setModelTitle("Deleted Successful!")
    const response = await TenantAdapter.fetchAllTenants(userInfo);

    setAllTenants(response);
    if (removeUserResponse?.message) {
    } else if (removeUserResponse?.error) {
      console.log("error in delete tenant");
    } else {
      console.log("onDeleteUser error");
    }
  };

  const [relationship, setSelectedRelationship] = useState(
    tenantInfo?.relationship || {
      value: "head_of_household",
      label: "Head of Household",
    }
  );
  const relationshipOptions = [
    { value: "co_head", label: "Co-Head" },
    { value: "aide", label: "Live-In Aide" },
    { value: "other", label: "Other" },
    { value: "head_of_household", label: "Head of Household" },
    { value: "dependent", label: "Dependent" },
    { value: "unborn_child", label: "Unborn Child" },
  ];
  useEffect(() => {
    if (tenantInfo?.relationship?.value === RelationShipStatus.Dependent) {
      setDependant(true);
      setUnbornChild(false);
    } else if (
      tenantInfo?.relationship?.value === RelationShipStatus.UnbornChild
    ) {
      setUnbornChild(true);
      setDependant(false);
    } else {
      setDependant(false);
      setUnbornChild(false);
    }
  }, [tenantInfo?.relationship]);

  const onSelectAffordable = (selectedList, selectedItem) => {
    setSelectedAffordableOption(selectedList);
    setAffordablePlaceHolder(true);
  };
  // const onSelectAffordable = (selectedList, selectedItem) => {
  //   if (selectedItem.option === "Not applicable") {
  //     setSelectedAffordableOption([selectedItem]);
  //   } else {
  //     const filteredList = selectedList.filter(item => item.option == "Not applicable");
  //     setSelectedAffordableOption(filteredList.concat(selectedItem));
  //   }
  // };

  const onRemoveAffordable = (selectedList, removedItem) => {
    setSelectedAffordableOption(selectedList);
  };
  const [affordableOption, setSelectedAffordableOption] = useState(
    tenantInfo?.affordable_option || []
  );

  const affordableOptions = [
    { option: "HOME", group: "LIHTC" },
    { option: "Tax Exempt Bond", group: "LIHTC" },
    { option: "AHDP", group: "LIHTC" },
    { option: "Other", group: "LIHTC" },
    { option: "Project Based Section 8", group: "HUD" },
    { option: "Section 236", group: "HUD" },
    { option: "Rent Supplement", group: "HUD" },
    { option: "BMIR", group: "HUD" },
    { option: "Project Rental Assistance Contracts", group: "HUD" },
    { option: "Project Assistance Contracts", group: "HUD" },
    { option: "Relocation Acquisition Policies", group: "HUD" },
    { option: "HUD/LIHTC (Blended)", group: "HUD/LIHTC (Blended)" },
    { option: "Local “Other” Programs", group: "Local “Other” Programs" },
    { option: "Not applicable", group: "Not applicable" },
  ];
  const [selectedRaces, setSelectedRaces] = useState(tenantInfo?.race || []);

  const raceOptions = [
    { option: "American Indian or Alaska Native" },
    { option: "Asian" },
    { option: "Black or African American" },
    { option: "Native Hawaiian or Other Pacific Islander" },
    { option: "White" },
    { option: "Prefer Not to Answer" },
  ];

  const onSelectRace = (selectedList, selectedItem) => {
    setSelectedRaces([selectedItem]);
    setRaceplaceholder(true);
  };

  const onRemoveRace = (selectedList, removedItem) => {
    setSelectedRaces([]);
  };
  const [selectedEthnicity, setSelectedEthnicity] = useState(
    tenantInfo?.ethnicity || []
  );

  const ethnicityOptions = [
    { value: "hispanic", label: "Hispanic" },
    { value: "non_hispanic", label: "Non Hispanic" },
    { value: "prefer_not_to_answer", label: "Prefer Not to Answer" },
  ];

  const onSelectEthnicity = (selectedItem) => {
    setSelectedEthnicity(selectedItem);
  };

  const onRemoveEthnicity = (selectedList, removedItem) => {
    setSelectedEthnicity(selectedList);
  };

  const [disable, setDisable] = useState(
    tenantInfo?.disable || {
      value: "no",
      label: "No",
    }
  );
  const disableOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" },
  ];
  const selectDisable = (category) => {
    try {
      setDisable(category);
    } catch (ex) {
      console.error("Error at selectQuestionType");
    }
  };
  const [identificationType, setIdentificationType] = useState(
    tenantInfo?.identification_type || {
      value: "id_proof",
      label: "Identity documents",
    }
  );
  const identificationTypeOptions = [
    { value: "id_proof", label: "Identity documents" },
    { value: "passport", label: "Passport" },
  ];
  const selectIdentification = (category) => {
    try {
      setIdentificationType(category);
    } catch (ex) {
      console.error("Error at selectIdentificationType");
    }
  };

  const [studentStatus, setStudentStatus] = useState(
    tenantInfo?.student_status || {
      value: "not_applicable",
      label: "Not Applicable",
    }
  );
  const studentOptions = [
    { value: "full_time", label: "Full-Time" },
    { value: "part_time", label: "Part-Time" },
    { value: "not_applicable", label: "Not Applicable" },
  ];
  const selectStudentStatus = (category) => {
    try {
      setStudentStatus(category);
    } catch (ex) {
      console.error("Error at selectQuestionType");
    }
  };
  const validateAddPropertyManager = () => {
    try {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const errors = [];
      if (firstName == "") {
        errors.push("First Name cannot be empty");
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
      if (lastName == "") {
        errors.push("Last Name cannot be empty");
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }
      if (!emailRegex.test(email)) {
        errors.push("Email is not valid");
        setEmailError(true);
      } else {
        setEmailError(false);
      }

      if (address == "") {
        errors.push("Address cannot be empty");
        setAddressError(true);
      } else {
        setAddressError(false);
      }
      if (city == "") {
        errors.push("City cannot be empty");
        setCityError(true);
      } else {
        setCityError(false);
      }
      if (state == "") {
        errors.push("State cannot be empty");
        setStateError(true);
      } else {
        setStateError(false);
      }
      if (country == "") {
        errors.push("Country cannot be empty");
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (companyId == "") {
        errors.push("Company Id cannot be empty");
        setCompanyIdError(true);
      } else {
        setCompanyIdError(false);
      }
      if (postalcode == "") {
        errors.push("Postalcode cannot be empty");
        setPostalCodeError(true);
      } else {
        setPostalCodeError(false);
      }
      if (errors.length > 0) {
        setAddPropertyManagerErrors(errors);
        return false;
      } else {
        setAddPropertyManagerErrors([]);
        return true;
      }
    } catch (ex) {
      console.error("Error at AddPropertyManager Validate Errors");
    }
  };

  const validateAddTenants = () => {
    try {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const errors = [];
      if (firstName == "") {
        errors.push("First Name cannot be empty");
        setFirstNameError(true);
      } else {
        setFirstNameError(false);
      }
      if (lastName == "") {
        errors.push("Last Name cannot be empty");
        setLastNameError(true);
      } else {
        setLastNameError(false);
      }

      if (
        relationship.value === "head_of_household" &&
        !emailRegex.test(email)
      ) {
        errors.push("Email is not valid");
        setEmailError(true);
      } else {
        setEmailError(false);
      }
      // if (isDependant || (isUnbornChild && idNumber == "")) {
      //   setIdNoError(false);
      // } else {
      //   if (idNumber == "") {
      //     setIdNoError(true);
      //     errors.push("Id Number cannot be empty");
      //   }
      //   else{
      //     setIdNoError(false)
      //   }
      // }
      // if (isDependant || (isUnbornChild && idState == "")) {
      //   setIdStateError(false);
      // } else {
      //   if (idState == "") {
      //     setIdStateError(true);
      //     errors.push("Id State cannot be empty");
      //   }else{
      //     setIdStateError(false)
      //   }
      // }

      if (houseSize == "") {
        errors.push("Household Size cannot be empty");
        setHouseSizeError(true);
      } else {
        setHouseSizeError(false);
      }
      if (isDependant || (isUnbornChild && residentId == "")) {
        setResidentIdError(false);
      } else {
        if (residentId == "") {
          setResidentIdError(true);
          errors.push("Resident id cannot be empty");
        } else {
          setResidentIdError(false);
        }
      }
      if (relationship.value === "other" && householdRelationship === "") {
        errors.push("Other Relationship cannot be empty");
        setRelationshipError(true);
      } else {
        if (relationship.value == RelationShipStatus.Dependent) {
          setRelationshipError(false);
        }
      }
      if (isDependant ||  flow === "tenant_page_add_flow" ||(isUnbornChild && unitNumber == "")) {
        setUnitNumberError(false);
      } else {
        if (unitNumber == "") {
          setUnitNumberError(true);
          errors.push("Unit Number  cannot be empty");
        } else {
          setUnitNumberError(false);
        }
      }
      if (
        relationship.value === "head_of_household" &&
        affordableOption.length === 0
      ) {
        setTenantAffordableError(true);
        console.log(affordableOption);
        errors.push("Affordable Program cannot be empty");
      } else {
        console.log(affordableOption);
        setTenantAffordableError(false);
      }
      if (selectedEthnicity.length === 0) {
        setTenantEthnicityError(true);
        console.log(ethnicityOptions);
        errors.push("Ethnicity cannot be empty");
      } else {
        setTenantEthnicityError(false);
      }
      if (selectedRaces.length === 0) {
        setTenantRaceError(true);
        console.log(raceOptions);
        errors.push("Race cannot be empty");
      } else {
        setTenantRaceError(false);
      }
      if (flow !== "tenant_page_add_flow" && address == "") {
        errors.push("Address cannot be empty");
        setAddressError(true);
      } else {
        setAddressError(false);
      }
      if (flow !== "tenant_page_add_flow" && city == "") {
        errors.push("City cannot be empty");
        setCityError(true);
      } else {
        setCityError(false);
      }
      if (flow !== "tenant_page_add_flow" && state == "") {
        errors.push("State cannot be empty");
        setStateError(true);
      } else {
        setStateError(false);
      }
      if (flow !== "tenant_page_add_flow" && postalcode == "") {
        errors.push("Postalcode cannot be empty");
        setPostalCodeError(true);
      } else {
        setPostalCodeError(false);
      }
      if (flow !== "tenant_page_add_flow" && county == "") {
        errors.push("County cannot be empty");
        setCountyError(true);
      } else {
        setCountyError(false);
      }
      if (
        (isDependant || isUnbornChild || flow === "tenant_page_add_flow") &&
        telNumber === ""
      ) {
        console.log(telNumber);
        setTelephoneError(false);
      } else {
        if (telNumber === "" || telNumber?.length < 10) {
          console.log(telNumber.length);
          setTelephoneError(true);
          errors.push("Telephone Number cannot be empty");
        } else {
          setTelephoneError(false);
        }
      }
      console.log(errors);

      if (flow !== "tenant_page_add_flow" && country == "") {
        errors.push("Country cannot be empty");
        setCountryError(true);
      } else {
        setCountryError(false);
      }
      if (errors.length > 0) {
        setErrors(errors);
        return false;
      } else {
        setErrors([]);
        return true;
      }
    } catch (ex) {
      console.error("Error at validateAddTenants");
    }
  };
  const handleKeyDown = (e) => {
    const charCode = e.which || e.keyCode;
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105) ||
      charCode === 8 ||
      charCode === 9 ||
      charCode === 46
    ) {
      return true;
    }
    e.preventDefault();
  };
  const handleResidentIdChange = (_newRentalId) => {
    try {
      setResidentId(_newRentalId);
    } catch (ex) {
      console.error("Error at handleResidentIdChange", ex);
    }
  };

  const handleFirstNameChange = (_newFirstName) => {
    try {
      setFirstName(_newFirstName);
    } catch (ex) {
      console.error("Error at handleFirstNameChange", ex);
    }
  };

  const handleMiddleNameChange = (_newMiddleName) => {
    try {
      setMiddleName(_newMiddleName);
    } catch (ex) {
      console.error("Error at handleMiddleNameChange", ex);
    }
  };
  const handleLastNameChange = (_newLastName) => {
    try {
      setLastName(_newLastName);
    } catch (ex) {
      console.error("Error at handleLastNameChange");
    }
  };
  const handleAddressChange = (_newAddress) => {
    try {
      setAddress(_newAddress);
    } catch (ex) {
      console.error("Error at handleAddressChange");
    }
  };
  const handleStateChange = (_newState) => {
    try {
      setState(_newState);
    } catch (ex) {
      console.error("Error at handleStateChange");
    }
  };
  const handleUnitNumberChange = (_newUnitNumber) => {
    try {
      setUnitNumber(_newUnitNumber);
    } catch (ex) {
      console.error("Error at handleUnitNumberChange");
    }
  };
  const handleCityChange = (_newCity) => {
    try {
      setCity(_newCity);
    } catch (ex) {
      console.error("Error at handleCityChange");
    }
  };
  const handlePostalCodeChange = (_newPostalcode) => {
    try {
      setPostalcode(_newPostalcode);
    } catch (ex) {
      console.error("Error at handlePostalCodeChange");
    }
  };
  const handleCompanyIdChange = (_newCompanyId) => {
    try {
      setCompanyId(_newCompanyId);
    } catch (ex) {
      console.error("Error at handleCompanyIdChange");
    }
  };
  const handleCountyChange = (_newCounty) => {
    try {
      setCounty(_newCounty);
    } catch (ex) {
      console.error("Error at handleCountyChange");
    }
  };
  const handleCountryChange = (_newCountry) => {
    try {
      setCountry(_newCountry);
    } catch (ex) {
      console.error("Error at handleCountryChange");
    }
  };
  const handleTelephoneChange = (_number) => {
    try {
      setTelNumber(_number);
    } catch (ex) {
      console.error("Error at handleTelephoneChange");
    }
  };
  const handleIdNoChange = (_newIdNumber) => {
    try {
      setIdNumber(_newIdNumber);
    } catch (ex) {
      console.error("Error at handleIdNoChange");
    }
  };
  const handleIdStateChange = (_newIdState) => {
    try {
      setIdState(_newIdState);
    } catch (ex) {
      console.error("Error at handleIdStateChange");
    }
  };
  const handleHouseSizeChange = (_newHouseSize) => {
    try {
      setHouseSize(_newHouseSize);
    } catch (ex) {
      console.error("Error at handleHouseSizeChange");
    }
  };
  const handleSsnNumberChange = (_newSsnNumber) => {
    try {
      setSsnNumber(_newSsnNumber);
    } catch (ex) {
      console.error("Error at handleSsnNumberChange");
    }
  };

  const handleEmailChange = (_newEmail) => {
    try {
      setEmail(_newEmail);
    } catch (ex) {
      console.error("Error at handleEmailChange");
    }
  };

  const handleRelationshipChange = (_newHouseholdChange) => {
    try {
      setHouseholdRelationship(_newHouseholdChange);
    } catch (ex) {
      console.error("Error at validateAddProperty");
    }
  };

  const selectRelationship = (val) => {
    try {
      setSelectedRelationship(val);
      if (val.value === RelationShipStatus.Dependent) {
        setDependant(true);
        setUnbornChild(false);
      } else if (val.value === RelationShipStatus.UnbornChild) {
        setUnbornChild(true);
        setDependant(false);
      } else {
        setDependant(false);
        setUnbornChild(false);
      }
    } catch (ex) {
      console.error("Error at selectRelationship", ex);
    }
  };
  const onClosePopup = () => {
    setShowDeleteModal(false);
  };

  const foramtTelNumber = (_telNumber) => {
    let telNumber = _telNumber;
    let formatTel = telNumber.replace(/\D/g, "");
    return formatTel;
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      fontSize: "1rem",
      fontWeight: 200,
    }),
  };

  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick }, ref: Ref<HTMLButtonElement>) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  let showAddSuccessMessage = !deleteStatus && !addStatus;
  return (
    <>
      {showAddSuccessMessage && (
        <div className="add-tenant" response-testid="add-tenant">
          <div className="add-tenant__header-wrapper">
            <div className="add-tenant__header-section"></div>
          </div>
          <div className="add-tenant__content">
            <fieldset className="add-tenant__personal-info-wrapper">
              <LoadingBar
                color="#32579e"
                style={{ height: "6px" }}
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
              />
              <legend className="add-tenant__personal-info-legend">
                Personal Info
              </legend>
              <Input
                errored={firstNameError}
                onChange={handleFirstNameChange}
                onBlur={() => {}}
                value={firstName}
                dataTestId={"first-name-input"}
                name="firstName"
                type="text"
                label="First Name"
                placeholder="Mary"
                inputStyle={{
                  width: "150px",
                }}
              />
              <Input
                onChange={handleMiddleNameChange}
                onBlur={() => {}}
                value={middleName}
                name="middleName"
                type="text"
                label="Middle Name"
                placeholder="Elizabeth"
                inputStyle={{
                  width: "150px",
                }}
              />
              <Input
                errored={lastNameError}
                onChange={handleLastNameChange}
                dataTestId={"last-name-input"}
                onBlur={() => {}}
                value={lastName}
                name="lastName"
                type="text"
                label="Last Name"
                placeholder="Smith"
                inputStyle={{
                  width: "150px",
                }}
              />
              {role === "tenant" && (
                <Input
                  errored={ssnNumberError}
                  onChange={handleSsnNumberChange}
                  onBlur={() => {}}
                  dataTestId={"ssn-input"}
                  value={ssnNumber}
                  setSsnNumber={setSsnNumber}
                  ssnNumber={ssnNumber}
                  name="ssnNumber"
                  type="text"
                  label="SS Number"
                  placeholder="XXX-XX-XXXX"
                  inputStyle={{
                    width: "150px",
                  }}
                />
              )}
              <Input
                errored={emailError}
                onChange={handleEmailChange}
                onBlur={() => {}}
                dataTestId={"email-input"}
                value={email}
                name="email"
                type="email"
                label="Email Address"
                placeholder="smith@demo.com"
                inputStyle={{
                  width: "150px",
                }}
              />

              {role === "tenant" && (
                <div>
                  <div className="date-picker-wrapper">
                    <Label
                      type={LabelType.Header}
                      text={"Date Of Birth"}
                      variant={LabelVariant.L2}
                    />
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      fixedHeight
                      dropdownMode="select"
                      dateFormat="MM/dd/yyyy"
                      selected={dateOfBirth}
                      onChange={handleDateOfBirthChange}
                      customInput={
                        <ExampleCustomInput
                          value={dateOfBirth.toDateString()}
                        />
                      }
                    />
                  </div>
                </div>
              )}
              {role === "tenant" && (
                <div>
                  <div className="date-picker-wrapper">
                    <Label
                      type={LabelType.Header}
                      text={"Move In Date"}
                      variant={LabelVariant.L2}
                    />
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      fixedHeight
                      dropdownMode="select"
                      dateFormat="MM/dd/yyyy"
                      selected={moveInDate}
                      onChange={handleMoveInDateChange}
                      customInput={
                        <ExampleCustomInput value={moveInDate.toDateString()} />
                      }
                    />
                  </div>
                </div>
              )}
              {role === "tenant" && (
                <div>
                  <div className="date-picker-wrapper">
                    <Label
                      type={LabelType.Header}
                      text={"Certification Date"}
                      variant={LabelVariant.L2}
                    />
                    <DatePicker
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      fixedHeight
                      dropdownMode="select"
                      dateFormat="MM/dd/yyyy"
                      selected={certificationDate}
                      onChange={handleCertificationDateChange}
                      customInput={
                        <ExampleCustomInput
                          value={certificationDate.toDateString()}
                        />
                      }
                    />
                  </div>
                </div>
              )}

              {role === "tenant" && (
                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Identification Type"}
                    variant={LabelVariant.L2}
                  />
                  <Select
                    defaultValue={identificationType}
                    options={identificationTypeOptions}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                    })}
                    classNames={{
                      control: () => "add-tenant__select",
                    }}
                    value={identificationType}
                    onChange={(val) => {
                      selectIdentification(val);
                    }}
                    styles={customStyles}
                  />
                </div>
              )}
              {role === "tenant" && (
                <Input
                  errored={idNoError}
                  onChange={handleIdNoChange}
                  onBlur={() => {}}
                  value={idNumber}
                  name="idNumber"
                  type="text"
                  label="Identification Number"
                  placeholder="XX-XXXXXXX"
                  inputStyle={{
                    width: "150px",
                  }}
                />
              )}
              {role === "tenant" && (
                <Input
                  errored={idStateError}
                  onChange={handleIdStateChange}
                  onBlur={() => {}}
                  value={idState}
                  name="idState"
                  type="text"
                  label="Identification State"
                  placeholder=""
                  inputStyle={{
                    width: "150px",
                  }}
                />
              )}
            </fieldset>
            {role === "tenant" && (
              <fieldset className="add-tenant__household-info-wrapper">
                <legend className="add-tenant__household-info-legend">
                  Household Info
                </legend>
                <Input
                  errored={houseSizeError}
                  onChange={handleHouseSizeChange}
                  onBlur={() => {}}
                  value={houseSize}
                  min={0}
                  onKeyDown={handleKeyDown}
                  name="houseSize"
                  type="number"
                  label="Household Size"
                  placeholder="E.g.,2"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <Input
                  errored={residentIdError}
                  onChange={handleResidentIdChange}
                  onBlur={() => {}}
                  value={residentId}
                  name="residentId"
                  type="text"
                  label="Resident ID Number"
                  placeholder="RA0302123456"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Household Role"}
                    variant={LabelVariant.L2}
                  />
                  <Select
                    defaultValue={relationship}
                    options={relationshipOptions}
                    styles={customStyles}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                    })}
                    classNames={{
                      control: () => "add-tenant__select",
                    }}
                    value={relationship}
                    onChange={(val) => {
                      selectRelationship(val);
                    }}
                  />
                </div>
                {relationship.value === "other" && (
                  <Input
                    errored={relationshipError}
                    onChange={handleRelationshipChange}
                    value={householdRelationship}
                    name="otherRelationship"
                    type="text"
                    label="Other Relationship"
                    placeholder="Enter other relationship"
                    inputStyle={{
                      width: "150px",
                    }}
                  />
                )}

                {relationship.value === "head_of_household" && (
                  <div className="add-tenant__select-wrapper">
                    <Label
                      type={LabelType.Header}
                      text={"Affordable Program Type"}
                      variant={LabelVariant.L2}
                    />

                    <Multiselect
                      className={
                        tenantAffordableError
                          ? "multi-select--error"
                          : "multi-select"
                      }
                      options={affordableOptions}
                      selectedValues={affordableOption}
                      displayValue="option"
                      groupBy="group"
                      placeholder="Select"
                      onSelect={onSelectAffordable}
                      onRemove={onRemoveAffordable}
                      showCheckbox={true}
                      hidePlaceholder={affordablePlaceHolder}
                    />
                  </div>
                )}
                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Race"}
                    variant={LabelVariant.L2}
                  />
                  <Multiselect
                    className={
                      tenantRaceError ? "multi-select--error" : "multi-select"
                    }
                    options={raceOptions}
                    selectedValues={selectedRaces}
                    displayValue="option"
                    placeholder="Select"
                    onSelect={onSelectRace}
                    onRemove={onRemoveRace}
                    showCheckbox={true}
                    hidePlaceholder={raceplaceholder}
                  />
                </div>

                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Ethnicity"}
                    variant={LabelVariant.L2}
                  />
                  <Select
                    defaultValue=""
                    options={ethnicityOptions}
                    styles={{
                      ...customStyles,
                      control: (provided, state) => ({
                        ...provided,
                        border: tenantEthnicityError ? "1px solid red" : "",
                      }),
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                    })}
                    classNames={{
                      control: () => "add-tenant__select",
                    }}
                    value={selectedEthnicity}
                    onChange={(val) => {
                      onSelectEthnicity(val);
                    }}
                  />
                </div>
                {(props.addTenantFlow || !props.addTenantFlow) &&
                flow !== "tenant_page_add_flow" ? (
                  <Input
                    errored={unitNumberError}
                    onChange={handleUnitNumberChange}
                    onBlur={() => {}}
                    value={unitNumber}
                    dataTestId={"unit-number-input"}
                    name="unitNumber"
                    type="text"
                    label="Unit Number"
                    placeholder="#45"
                    inputStyle={{
                      width: "150px",
                    }}
                  />
                ) : null}
                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Disabled Status"}
                    variant={LabelVariant.L2}
                  />
                  <Select
                    defaultValue={disable}
                    options={disableOptions}
                    styles={customStyles}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                    })}
                    classNames={{
                      control: () => "add-tenant__select",
                    }}
                    value={disable}
                    onChange={(val) => {
                      selectDisable(val);
                    }}
                  />
                </div>
                <div className="add-tenant__select-wrapper">
                  <Label
                    type={LabelType.Header}
                    text={"Student Status"}
                    variant={LabelVariant.L2}
                  />
                  <Select
                    defaultValue={studentStatus}
                    options={studentOptions}
                    styles={customStyles}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                    })}
                    classNames={{
                      control: () => "add-tenant__select",
                    }}
                    value={studentStatus}
                    onChange={(val) => {
                      selectStudentStatus(val);
                    }}
                  />
                </div>
              </fieldset>
            )}
            {(props.addTenantFlow || !props.addTenantFlow) &&
            flow !== "tenant_page_add_flow" ? (
              <fieldset className="add-tenant__contact-info-wrapper">
                <legend className="add-tenant__contact-info-legend">
                  Contact Info
                </legend>
                <Input
                  errored={addressError}
                  onChange={handleAddressChange}
                  onBlur={() => {}}
                  value={address}
                  name="address"
                  type="text"
                  label="Address"
                  placeholder="1 M H Manhattan NY"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <Input
                  errored={cityError}
                  onChange={handleCityChange}
                  onBlur={() => {}}
                  value={city}
                  name="city"
                  type="text"
                  label="City"
                  placeholder="Green City"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <Input
                  errored={stateError}
                  onChange={handleStateChange}
                  onBlur={() => {}}
                  value={state}
                  name="state"
                  type="text"
                  label="State/Province"
                  placeholder="Texas"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                {role === "tenant" && (
                  <Input
                    errored={telephoneError}
                    onChange={handleTelephoneChange}
                    onBlur={() => {}}
                    dataTestId={"phone-number-input"}
                    value={telNumber}
                    setTelNumber={setTelNumber}
                    telNumber={telNumber}
                    name="telNumber"
                    type="tel"
                    label="Phone Number"
                    placeholder="+12125551234"
                    inputStyle={{
                      width: "150px",
                    }}
                  />
                )}
                <Input
                  errored={postalCodeError}
                  onChange={handlePostalCodeChange}
                  onBlur={() => {}}
                  onKeyDown={handleKeyDown}
                  value={postalcode}
                  name="postalcode"
                  type="text"
                  label="Postal Code"
                  placeholder="987654"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <Input
                  errored={countyError}
                  onChange={handleCountyChange}
                  onBlur={() => {}}
                  value={county}
                  name="country"
                  type="text"
                  label="County"
                  placeholder="United States"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                <Input
                  errored={countryError}
                  onChange={handleCountryChange}
                  onBlur={() => {}}
                  value={country}
                  name="nation"
                  type="text"
                  label="Nation/Country"
                  placeholder="USA"
                  inputStyle={{
                    width: "150px",
                  }}
                />
                {(role === "property_manager" ||
                  role === "customer_support_agent") && (
                  <Input
                    errored={companyIdError}
                    onChange={handleCompanyIdChange}
                    onBlur={() => {}}
                    value={companyId}
                    name="companyId"
                    type="text"
                    label="Company ID"
                    placeholder="XXX-XXX-XXX"
                    inputStyle={{
                      width: "150px",
                    }}
                  />
                )}
              </fieldset>
            ) : null}
          </div>
          {addPropertyManagerErrors &&
            Array.isArray(addPropertyManagerErrors) &&
            addPropertyManagerErrors.length > 0 && (
              <ul className="error-list">
                {addPropertyManagerErrors.map((_error, index) => (
                  <li className="error-list__item" key={index}>
                    <>{_error}</>
                  </li>
                ))}
              </ul>
            )}

          {addTenantErrors &&
            Array.isArray(addTenantErrors) &&
            addTenantErrors.length > 0 && (
              <ul className="error-list">
                {addTenantErrors.map((_error, index) => (
                  <li className="error-list__item" key={index}>
                    <>{_error}</>
                  </li>
                ))}
              </ul>
            )}

          <div
            className="add-tenant__modal-footer"
            response-testid="modal-footer"
          >
            <Button
              btnText={getButtonText(role)}
              btnTheme="primary"
              btnType="rounded"
              buttonClick={onAddNewTenant}
              buttonStatus={buttonDisabled}
              testID="add-tenants-button"
              additionalStyles={{ paddingBottom: "0px" }}
            />
            {!props.addTenantFlow &&
              !props.addPropertyManagerFlow &&
              !props.addCustomerAgentFlow && (
                <Button
                  btnText={"Delete"}
                  btnTheme="questionnaire-card"
                  btnType="rounded"
                  buttonClick={onHandelDelete}
                  testID="add-tenants-button"
                  additionalStyles={{ paddingBottom: "0px" }}
                />
              )}
          </div>
        </div>
      )}
      <Modal
        showCloseButton={false}
        isOpen={showDeleteModal}
        title="Delete User !!"
        size={ModalTypes.Small}
      >
        <div className="add-tenant__successfully-deleted-popup">
          Are you sure! You want to delete this user ?
          <div className="popup_footer">
            <Button
              buttonClick={onDeleteUser}
              btnText="Yes"
              btnType="rectangle"
              btnTheme="primary"
            />
            <Button
              buttonClick={onClosePopup}
              btnText="No"
              btnType="rectangle"
              btnTheme="secondary"
            />
          </div>
        </div>
      </Modal>
      {addStatus && (
        <div>
          <div className="add-tenant__content" response-testid="tenant-content">
            <div className="add-tenant__popup">
              {message ||
                ` ${
                  props.addTenantFlow ||
                  props.addPropertyManagerFlow ||
                  props.addCustomerAgentFlow
                    ? `${
                        role == "property_manager"
                          ? "Property Manager Added"
                          : "Tenant added"
                      }`
                    : "Resident Edited"
                } successfully`}
            </div>
            <AnimatedCheck />

            <div className="add-tenant__modal-footer">
              <Button
                btnText="Close"
                btnTheme="primary"
                btnType="rounded"
                buttonClick={props.onClose}
                testID="add-tenants-close-button"
                additionalStyles={{ paddingBottom: "0px", paddingTop: "0px" }}
              />
            </div>
          </div>
        </div>
      )}
      {deleteStatus && (
        <div>
          <div className="add-tenant__content" response-testid="tenant-content">
            <div>{"User Deleted Successfully"}</div>
            <AnimatedCheck />
          </div>
          <div className="add-tenant__modal-footer">
            <Button
              btnText="Close"
              btnTheme="primary"
              btnType="rounded"
              buttonClick={props.onClose}
              testID="add-tenants-close-button"
              additionalStyles={{ paddingBottom: "0px", paddingTop: "0px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddTenant;
