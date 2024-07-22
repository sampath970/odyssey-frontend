"use client";
import React, { useEffect, useState } from "react";
import "./user-dashboard.scss";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import Select from "react-select";
import "./shephard.style.scss";
import Cookies from "js-cookie";
import Button from "../../../components/button/button";
import IntroTenantSteps from "../../../components/intro-tenant-steps/intro-tenant-steps";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import { useRouter } from "next/navigation";
import { getFileName } from "../../../utils/string-utils";
import Pending from "../../../public/assets/icons/pending.svg";
import Review from "../../../public/assets/icons/review.svg";
import Signed from "../../../public/assets/icons/signed.svg";
import Completed from "../../../public/assets/icons/signed.svg";
import NotStarted from "../../../public/assets/icons/not-started.svg";
import Rejected from "../../../public/assets/icons/red-cross.svg";
import TableCard from "./sub-components/table-card/table-card";
import FormTable from "../../../components/form-table/form-table";
import MappingAdapter from "../../../services/adapters/mapping-adapter";
import Modal from "../../../components/modal/modal";
import Label, { LabelType, LabelVariant } from "../../../components/label/label";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    zIndex: 5,
    fontSize: "0.9rem",
    fontWeight: "200",
  }),
};

interface UserDashboardProps {}

// The error handler in user-provider.tsx will redirect to this Tenant page.
// If the user is not a tenant, then redirect to dashboard.
const redirectByRole = (userInfo, router) => {
  if (userInfo.role != "tenant") {
    router.push("/dashboard");
  }
};

const UserDashboard: React.FC<UserDashboardProps> = () => {
  const updateUserNegotiatedIntro = async () => {
    await Cookies.set("intro_seen", true, { secure: true, sameSite: "strict" });
  };

  const userButtonStyle = {
    paddingTop: "0rem",
    paddingRight: "0rem",
    paddingBottom: "0rem",
    paddingLeft: "0rem",
  };
  const [unitList, setUnitList] = useState([]);
  const [propertyName, setPropertyName] = useState("");
  const [submittedFormsCount, setSubmittedFormsCount] = useState(0);
  const [newDocumentsCount, setNewDocumentsCount] = useState(0);
  const [certificationStatus, setCertificationStatus] = useState("");
  const [rentalID, setRentalID] = useState("");
  const [label, setLabel] = useState("");
  const [activeUnit, setActiveUnit] = useState("");
  const [formInfo, setFormInfo] = useState([]);
  const [isSignedFields, setIsSignedFields] = useState(false);
  const [buttonStatus, setButtonstatus] = useState(null);
  const { userInfo } = useUserInfo();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [formID, setFormID] = useState("");
  const handleOpenModal = (formID) => {
    setShowReviewModal(true);
    setFormID(formID);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  const [selectedUnit, setSelectedUnit] = useState({
    value: null,
    label: "Select Unit",
  });
  const [displayIntro, setIntro] = useState(false);
  const {
    activeRental,
    setActiveRental,
    setActiveProperty,
    setActiveTenant,
    activeProperty,
  } = useAllProperties();
  // console.log(activeRental);
  // console.log(userInfo);
  useEffect(() => {
    if (userInfo) {
      redirectByRole(userInfo, router);
      setActiveTenant(userInfo?.id);
    } else {
      console.log("No user info found");
    }
  }, [userInfo]);
  const getCertificationStatus = (unitId) => {
    let selectedUnit = unitList.find((units) => units.id === unitId);
    setCertificationStatus(selectedUnit?.status);
  };
  // console.log(certificationStatus);
  // console.log(propertyName);
  const unitListOptions = unitList?.map((_units) => ({
    label: _units.unit_id,
    value: _units.id,
  }));
  // console.log(unitListOptions);
  const getRental = (id) => {
    let selectedUnit = unitList.find((unit) => unit.id === id);
    setRentalID(selectedUnit?.rental_id);
    setActiveRental(selectedUnit?.rental_id);
  };
  // console.log(activeRental);
  const router = useRouter();
  const unitChange = (category) => {
    // console.log("category", category);
    setSelectedUnit(category);
    if (category) getCertificationStatus(category.value);
    if (category) getRental(category.value);
    const selectedUnitObject = unitList?.find(
      (unit) => unit.id === category?.value
    );
    // console.log("Selected Unit Object:", selectedUnitObject);
    if (selectedUnitObject && selectedUnitObject.property) {
      setPropertyName(selectedUnitObject.property.name);
    } else {
      setPropertyName("");
    }
  };
  // console.log(propertyName);
  // useEffect(() => {
  //   const fetchRentalInfo = async (rentalId) => {
  //     try {
  //       if (rentalID !== null) {
  //         let result = await PropertyAdapter.getPropertyByRentalID(rentalID);
  //         // console.log(result);
  //         if (result) {
  //           setActiveProperty(result);
  //           setActiveRental(result[0]?.id);
  //         } else {
  //           console.log("No rental property data found");
  //         }
  //       } else {
  //         console.log("No rental Id found");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching rental property data:", error);
  //     }
  //   };
  //   fetchRentalInfo(activeRental);
  // }, [activeRental]);
  // console.log(activeProperty);
  const countForms = (data) => {
    let submittedCount = 0;
    let newCount = 0;
    let submittedStatus = "";
    let newStatus = "";
    data.forEach((item) => {
      item.requiredQAs.forEach((qa) => {
        qa.requiredForms.forEach((form) => {
          if (form.status === "pending") {
            submittedCount++;
            submittedStatus = "pending";
          } else if (form.status === "new") {
            newCount++;
            newStatus = "new";
          }
        });
      });
    });

    setSubmittedFormsCount(submittedCount);
    setNewDocumentsCount(newCount);
  };
  // console.log(userInfo);
  useEffect(() => {
    const fetchRentalByTenant = async (userInfo) => {
      try {
        //let shouldShowIntro = Cookies.get("intro_seen");
        // if (!shouldShowIntro) {
        //   setIntro(true);
        // }
        // We don't have a user ID, so we can't fetch any data.
        if (!userInfo || !userInfo.id) {
          return null;
        }
        const data = await TenantAdapter.getRentalByTenantId(userInfo?.id);
        const uniquePropertyIds = new Set();
        const propertyPromises = data.map(async (item) => {
          const propertyId = item.property_id;
          try {
            if (!uniquePropertyIds.has(propertyId)) {
              uniquePropertyIds.add(propertyId);
              const property = await PropertyAdapter.getPropertyByID(
                propertyId
              );
              return property;
            } else {
              return null;
            }
          } catch (error) {
            console.error("Error fetching property:", error);
            return null;
          }
        });
        const properties = await Promise.all(
          propertyPromises
            .filter((property) => property !== null)
            .flatMap((propertyArray) => propertyArray)
        );
        // console.log(properties);
        const uniqueProperties = properties
          ?.filter((property) => property !== null)
          .flatMap((propertyArray) => propertyArray);
        if (data && uniqueProperties) {
          const resultArray = data.reduce((result, item1) => {
            const propertyMatch = uniqueProperties.find((property) => {
              const matchingUnit =
                property?.units &&
                property.units.find((unit) => unit.id === item1.unit_id);
              return matchingUnit;
            });
            if (propertyMatch) {
              const matchingUnit = propertyMatch.units.find(
                (unit) => unit.id === item1.unit_id
              );
              const resultItem = {
                ...matchingUnit,
                rental_id: item1.id,
                status: item1.certification_status || "",
                property: propertyMatch,
              };
              result.push(resultItem);
            }
            countForms(data);
            return result;
          }, []);
          // console.log(resultArray);
          setUnitList(resultArray);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRentalByTenant(userInfo);
  }, [userInfo]);
  useEffect(() => {
    // console.log(unitList);
    if (!activeRental) {
      unitChange({
        label: unitList[0]?.unit_id,
        value: unitList[0]?.id,
      });
    }
  }, [unitList]);
  const handleNavigateToRentalForm = (
    certificationStatus,
    rentalID,
    tenantID,
    formID
  ) => {
    // console.log("formID",formID)
    switch (certificationStatus) {
      case "started":
      case "new":
        // console.log(certificationStatus);
        router.push(`/users-dashboard/certification-module/${formID}`);
        break;
      case "reject":
        handleOpenModal(formID);
        // console.log(certificationStatus);

        break;
      case "":
        // console.log(certificationStatus);
        router.push("/users-dashboard/certification-module");
        break;
      case "pending":
        router.push("/users-dashboard/certification-module");
        break;
      case "review":
        router.push(`/users-dashboard/tenant_sign_page/${formID}`);
        // const url = `/tenant-forms/${tenantID}Rental${rentalID}?search=${formID}`;
        // window.open(url, "_blank");
        break;
      case "completed":
        router.push(`/users-dashboard/my-documents`);
        break;
      default:
        router.push(`/users-dashboard/my-documents`);
        break;
    }
  };
  const annualCertificationStatus = (certificationStatus) => {
    switch (certificationStatus) {
      case "started":
        return "Complete your Annual Certification";
      case "progress":
        return "Pick up where you left off";
      case "review":
        return "Pick up where you left off";
      case "completed":
        return "Pick up where you left off";

      default:
        return "";
    }
  };
  const buttonCertificationStatus = (certificationStatus) => {
    switch (certificationStatus) {
      case "started":
        return "Start Now";
      case "progress":
        return "Continue";
      case "review":
        return "Continue";
      case "completed":
        return "Continue";
      default:
        return "Start Now";
    }
  };
  const handleNextButtonClick = (formID) => {
    router.push(`/users-dashboard/certification-module/${formID}`);
  };
  useEffect(() => {
    if (activeRental) {
      fetchRentalInfo(activeRental);
    } else {
      console.log("No rental details found");
    }
  }, [activeRental]);
  const fetchRentalInfo = async (activeRental) => {
    let result = await PropertyAdapter.getPropertyByRentalID(activeRental);
    if (result) {
      setActiveProperty(result);
      setActiveRental(result[0]?.id);
      let requiredQAs = result[0]?.requiredQAs;
      getForms(requiredQAs);
    } else {
      console.log("No result found");
    }
  };
  const getForms = async (requiredQAs) => {
    try {
      if (requiredQAs && requiredQAs.length !== 0 && userInfo) {
        const filteredCollection = requiredQAs.filter(
          (item) => item.tenant_id === userInfo?.id
        );

        if (filteredCollection && filteredCollection.length !== 0) {
          const titlesPromises = filteredCollection.map(async (item) => {
            const formInfos = await Promise.all(
              item.requiredForms.map(async (form) => ({
                file_name: getFileName(form.title),
                hasSigned: await getSignedFields(form.title),
                file_status: form.status,
                file_id: form.formID,
                qaTitle: form?.qaTitle,
              }))
            );
            return formInfos;
          });

          const titlesArray = await Promise.all(titlesPromises);
          const flattenedTitles = [].concat(...titlesArray);
          setFormInfo(flattenedTitles);
        } else {
          console.log("No filtered collection found");
        }
      } else {
        setFormInfo([]);
        console.log("No required qas found");
      }
    } catch (error) {
      console.error("Error in getForms:", error);
    }
  };

  const getSignedFields = async (formTitle) => {
    let data = await MappingAdapter.getMappingByFormId(formTitle);
    if (data) {
      let filteredFields = data[0]?.fields.filter(
        (field) => field.question_code === "TENANT_SIGNATURE"
      );
      if (filteredFields?.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log("No data found");
    }
  };
  // console.log(formInfo);
  const getFileIconByStatus = (status) => {
    switch (status) {
      case "pending":
        return <Pending style={{ height: "20px" }} />;
      case "review":
        return <Review style={{ height: "20px" }} />;
      case "signed":
        return <Signed style={{ height: "20px" }} />;
      case "submitted":
        return <Completed style={{ height: "20px" }} />;
      case "reject":
        return <Rejected style={{ height: "20px" }} />;
      case "new":
      default:
        return <NotStarted style={{ marginLeft: "4px", height: "20px" }} />;
    }
  };
  return (
    <div className="user-dashboard">
      <div className="user-dashboard__section user-dashboard__section-one">
        <div className="user-dashboard__header">
          <h1 className="user-dashboard__header-text">
            Welcome, {userInfo?.email}
          </h1>
          <div className="user-dashboard__header-gap"></div>
          <div className="user-dashboard__header-button">
            {/* <Button
              btnText={buttonCertificationStatus(certificationStatus)}
              buttonClick={() =>
                handleNavigateToRentalForm(
                  certificationStatus,
                  rentalID,
                  userInfo?.id
                )
              }
              testID="user-dashboard-button"
              btnTheme="users-page-secondary"
              btnType="rounded"
              additionalStyles={userButtonStyle}
            /> */}
          </div>
        </div>
        <div className="user-dashboard__header-image">
          <div className="user-dashboard__image-container">
            <div className="user-dashboard__image-wrapper">
              <img
                src="/assets/images/building.png"
                className="user-dashboard__image"
                alt="building"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="user-dashboard__section user-dashboard__section-three">
        {unitList.length > 0 ? (
          <div>
            <div className="user-dashboard__cards-wrapper">
              <div className="user-dashboard__cards">
                <div className="user-dashboard__cards-details-units">
                  <div className="user-dashboard__cards-title-units-select-wrapper">
                    <label className="user-dashboard__cards-title-select-label-no">
                      Unit No
                    </label>
                    <div
                      className="user-dashboard__cards-details-units-options"
                      id="unit-no"
                    >
                      <Select
                        styles={customStyles}
                        defaultValue={selectedUnit}
                        options={unitListOptions}
                        value={selectedUnit}
                        onChange={(category) => unitChange(category)}
                        isClearable={true}
                        isLoading={unitListOptions.length === 0}
                        loadingMessage={() => "Loading...."}
                      />
                    </div>
                  </div>
                </div>
                <div className="user-dashboard__cards">
                  <div className="user-dashboard__cards-details-units">
                    <label className="user-dashboard__cards-title-select-label-no">
                      Property Details
                    </label>
                    <div className="user-dashboard__cards-title-select-label-no-name">
                      {propertyName}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-dashboard__cards-stepbar">
              {/* <ProgressSteps
                certificationStatus={certificationStatus}
                tenantID={userInfo?.id}
                rental_id={rentalID}
                selectedUnit={selectedUnit}
                setLabel={setLabel}
                setButtonstatus={setButtonstatus}
              /> */}
            </div>
          </div>
        ) : (
          <div className="user-dashboard__cards-units">No Units Found</div>
        )}
        {displayIntro && (
          <IntroTenantSteps onCallback={updateUserNegotiatedIntro} />
        )}
      </div>
      <div className="user-dashboard__section user-dashboard__section-two">
        <div className="user-table__header-text">My Tasks</div>
        <div className="user-table__mobile-view">
          {formInfo &&
            formInfo.map((_form) => (
              <TableCard
                formInfo={_form}
                handleNavigateToRentalForm={handleNavigateToRentalForm}
                rentalID={rentalID}
                userInfo={userInfo}
                showModal={showReviewModal}
              />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Modal
            isOpen={showReviewModal}
            setOn={()=>setShowReviewModal(false)}
            showCloseButton={false}
          >
            <div className="user-table__review-modal">
              <Label
                  type={LabelType.Header}
                  text={"You might have to click through all questions in the form"}
                  variant={LabelVariant.L4}
                />
                <div className="user-table__review-modal--buttons">

              <Button
                additionalStyles={{ padding: 0 }}
                buttonClick={() => handleNextButtonClick(formID)}
                btnText="Next"
                btnType="rectangle"
                btnTheme="primary"
              />
              <Button
                additionalStyles={{ padding: 0 }}
                buttonClick={() => setShowReviewModal(false)}
                btnText="Close"
                btnType="rectangle"
                btnTheme="secondary"
              />
                </div>
            </div>
          </Modal>
        </div>
        <div className="user-default-table">
          <FormTable
            formInfo={formInfo}
            handleNavigateToRentalForm={handleNavigateToRentalForm}
            getFileIconByStatus={getFileIconByStatus}
            rentalID={rentalID}
            userInfo={userInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
