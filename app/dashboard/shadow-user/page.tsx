"use client";
import React, { useEffect, useState } from "react";
import "./shadow-user.scss";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import TownHouse from "../../../public/assets/images/townhouse.svg";
import PropertyManagerPFP from "../../../public/assets/icons/property-manager.svg";
import ShadowManagerPFP from "../../../public/assets/icons/propertymanagerpfp.svg";
import Button from "../../../components/button/button";
import Modal from "../../../components/modal/modal";
import Select from "react-select";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import AnimatedCheck from "../../../components/animated-check/animated-check";
import ShadowManagerAdapter from "../../../services/adapters/shadow-manager-adapter";
import AssignedProperties from "../../../public/assets/icons/signed.svg";
import CanceledProperties from "../../../public/assets/icons/remove-property.svg";

const ShadowUser = () => {
  const shadowUserStyle = {
    color: "white",
    margin: "0",
  };
  const { userInfo } = useUserInfo();
  const [propertyManagers, setPropertyManagers] = useState([]);
  const [shadowUsers, setShadowUsers] = useState([]);
  const [currentSelectedPropertyManager, setCurrentSelectedPropertyManager] =
    useState({});
  const [shadowUserAssignSuccessPopup, setShadowUserAssignSuccessPopup] =
    useState(false);
  const [currentPropertyManager, setCurrentPropertyManager] = useState({
    value: "",
    label: "Select property manager",
  });
  const [currentShadowManager, setCurrentShadowManager] = useState({
    value: "",
    label: "Select Shadow Manager",
  });
  const [currentShadowManagerProperties, setCurrentPropertyManagerProperties] =
    useState([]);
  const handlePropertyManagerDropdownChange = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption) {
      setCurrentPropertyManager(selectedOption);
      const selectedManager = propertyManagers.find(
        (manager) => manager.id === selectedOption.value
      );
      console.log(selectedManager);
      fetchProperties(selectedManager);
    } else if (selectedOption === null || selectedOption === undefined) {
      setCurrentPropertyManager({
        value: "",
        label: "Select Property Manager",
      });
      setCurrentShadowManager({
        value: "",
        label: "Select Shadow Manager",
      });
      setCurrentSelectedPropertyManager({});
    } else {
      console.log("Error at property manager drop down change");
    }
  };
  const getAssignedPropertiesOfShadowManager = async (_shadowManagerId) => {
    const getAssignedPropertiesOfShadowManagerResponse =
      await ShadowManagerAdapter.fetchAllShadowManagerProperties(
        _shadowManagerId
      );
    if (getAssignedPropertiesOfShadowManagerResponse.length !== 0) {
      setCurrentPropertyManagerProperties(
        getAssignedPropertiesOfShadowManagerResponse
      );
      //@ts-ignore
      const updatedProperties = currentSelectedPropertyManager.properties.map(
        (property) => {
          if (
            getAssignedPropertiesOfShadowManagerResponse.includes(property.id)
          ) {
            return {
              ...property,
              selected: true,
              assignedToShadowManager: true,
            };
          } else {
            return {
              ...property,
              selected: false,
              assignedToShadowManager: false,
            };
          }
        }
      );

      const updatedManager = {
        ...currentSelectedPropertyManager,
        properties: updatedProperties,
      };

      setCurrentSelectedPropertyManager(updatedManager);
    } else {
      //@ts-ignore
      const updatedProperties = currentSelectedPropertyManager.properties.map(
        (property) => {
          return { ...property, selected: false,assignedToShadowManager: false, };
        }
      );

      const updatedManager = {
        ...currentSelectedPropertyManager,
        properties: updatedProperties,
      };

      setCurrentSelectedPropertyManager(updatedManager);
      console.log("no assigned properties found");
    }
  };
  console.log(currentShadowManagerProperties);
  const handleShadowManagerDropdownChange = (selectedOption) => {
    console.log(selectedOption);
    if (selectedOption) {
      console.log(selectedOption);
      setCurrentShadowManager(selectedOption);
      getAssignedPropertiesOfShadowManager(selectedOption.value);
    } else if (selectedOption === null || selectedOption === undefined) {
      setCurrentShadowManager({
        value: "",
        label: "Select Shadow Manager",
      });
    } else {
      console.log("Error at handleShadowManagerDropdownChange");
    }
  };
  console.log(currentShadowManager);

  const toggleManagedProperty = (propertyName) => {
    setCurrentSelectedPropertyManager((prevManager) => {
      console.log(prevManager);
      //@ts-ignore
      const updatedProperties = prevManager.properties.map((property) => {
        if (property.id === propertyName) {
          console.log("Im here");
          console.log({ ...property, selected: !property.selected });
          return { ...property, selected: !property.selected };
        } else {
          return property;
        }
      });
      console.log(updatedProperties);
      return { ...prevManager, properties: updatedProperties };
    });
  };
  console.log(currentSelectedPropertyManager);
  async function fetchProperties(property_manager) {
    const propertyFetchResponse =
      await PropertyAdapter.fetchPropertiesOfPropertyManager(property_manager);
    console.log(propertyFetchResponse);
    if (propertyFetchResponse) {
      const propertyManagerWithProperties = {
        propertyManager: property_manager, // Assuming property manager info is in the first index
        properties: propertyFetchResponse.map((_properties) => ({
          ..._properties,
          selected: false,
        })), // Assuming fetchProperties returns an array of properties
      };
      setCurrentSelectedPropertyManager(propertyManagerWithProperties);
      setCurrentShadowManager({
        value: "",
        label: "Select Shadow Manager",
      });
      return true;
    } else {
      setCurrentSelectedPropertyManager({});
      return false;
    }
  }
  console.log(currentSelectedPropertyManager);
  const fetchShadowUsers = async (userInfo) => {
    console.log(userInfo);
    const shadowUsersFetchResponse = await TenantAdapter.getAllShadowUsers(
      userInfo
    );
    console.log(shadowUsersFetchResponse);
    setShadowUsers(shadowUsersFetchResponse?.data || []);
  };
  const fetchPropertyManagers = async (userInfo) => {
    console.log(userInfo);
    const propertyManagersFetchResponse =
      await TenantAdapter.getAllPropertyManagers(userInfo);
    console.log(propertyManagersFetchResponse);
    if (propertyManagersFetchResponse) {
      let currentPropertyManagerInfo =
        propertyManagersFetchResponse?.data?.find(
          (_propertyManagerId) => _propertyManagerId.id === userInfo.id
        );
      if (currentPropertyManagerInfo) {
        setPropertyManagers([currentPropertyManagerInfo]);
        setCurrentPropertyManager({
          value: currentPropertyManagerInfo.id,
          label: `${currentPropertyManagerInfo.first_name} ${currentPropertyManagerInfo.last_name} (${currentPropertyManagerInfo.email})`,
        });
        fetchProperties(currentPropertyManagerInfo);
      } else {
        console.log("no current preoprty manager info found");
      }
    } else {
      console.log("Error getting propertyManagersFetchResponse");
    }
  };
  console.log(propertyManagers);
  useEffect(() => {
    if (userInfo) {
      fetchShadowUsers(userInfo);
      fetchPropertyManagers(userInfo);
    } else {
      console.log("userInfo not found");
    }
  }, [userInfo]);
  const propertyManagerOptions = propertyManagers?.map((_managers) => ({
    value: _managers.id,
    label: `${_managers.first_name} ${_managers.last_name} (${_managers.email})`,
  }));
  console.log(propertyManagerOptions);
  const shadowManagerOptions =
    shadowUsers && Array.isArray(shadowUsers)
      ? shadowUsers
          .filter((_shadowUser) => _shadowUser?.first_name && _shadowUser?.id)
          .map((_shadowUser) => ({
            label: `${_shadowUser.first_name} ${_shadowUser.last_name} (${_shadowUser.email})`,
            value: _shadowUser.id,
          }))
      : []; // || [];

  console.log(currentSelectedPropertyManager);
  const handleAssignShadowUserToProperties = async () => {
    const selectedShadowUser = currentShadowManager?.value;
    const selecetedPropertyManager = currentPropertyManager?.value;
    console.log(selectedShadowUser);
    //@ts-ignore
    const selectedProperties = currentSelectedPropertyManager?.properties
      ?.filter((property) => property.selected)
      ?.map((_property) => _property.id);
    //@ts-ignore
    let propertiesToRemove = currentSelectedPropertyManager?.properties
      .filter((property) =>
        currentShadowManagerProperties.includes(property.id)
      )
      .map((property) => property.id);
    const removedProperties = propertiesToRemove
      .filter((propertyId) => !selectedProperties.includes(propertyId))
      .map((propertyId) => propertyId);
    console.log(removedProperties);
    console.log(selectedProperties)
    if (
      selectedShadowUser &&
      selectedProperties &&
      selectedProperties.length !== 0 || removedProperties.length !==0
    ) {
      const shadowUserAssignResponse =
        await PropertyAdapter.assignShadowUserToProperty(
          selectedShadowUser,
          selectedProperties,
          selecetedPropertyManager,
          removedProperties
        );
      if (shadowUserAssignResponse) {
        setShadowUserAssignSuccessPopup(true);
        getAssignedPropertiesOfShadowManager(currentShadowManager?.value);
      } else {
        console.log("Error assigning shadowUserAssignResponse");
      }
    } else {
      console.log("No shadow user or shadow properties found");
    }
  };
  console.log(currentSelectedPropertyManager);
  return (
    <div className="shadow-user">
      <div className="shadow-user__section shadow-user__section-one">
        <div className="shadow-user__header">
          <h1 className="shadow-user__header-text">
            <Label
              type={LabelType.Header}
              text={`Welcome, ${userInfo?.email}`}
              variant={LabelVariant.L4}
              overrideTextStyles={shadowUserStyle}
            />
          </h1>
          <div className="shadow-user__header-label">
            <Label
              type={LabelType.Link}
              text={"Shadow User Mapping"}
              variant={LabelVariant.L1}
              overrideTextStyles={shadowUserStyle}
            />
          </div>
        </div>
        <div className="shadow-user__header-image">
          <div className="shadow-user__image-container">
            <div className="shadow-user__image-wrapper">
              <img
                src="/assets/icons/admin-info.png"
                className="shadow-user__cards-info-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-user__section shadow-user__section-two">
        <div className="shadow-user__table">
          <div className="shadow-user__table-header">
            <div className="shadow-user__table-header-row">Shadow Users</div>
            <div className="shadow-user__table-header-row">
              Property Managers
            </div>
            <div className="shadow-user__table-header-row">Actions</div>
          </div>
          <div className="shadow-user__table-body">
            <div className="shadow-user__table-body-row">
              <div className="shadow-user___table-image">
                <ShadowManagerPFP height="40px" width="40px" />
              </div>
              <div className="shadow-user__shadow-user-select-wrapper">
                <Select
                  defaultValue={currentShadowManager}
                  options={shadowManagerOptions}
                  value={currentShadowManager}
                  onChange={(category) =>
                    handleShadowManagerDropdownChange(category)
                  }
                  isClearable={true}
                  isLoading={shadowManagerOptions?.length === 0}
                  loadingMessage={() => "Loading...."}
                />
              </div>
            </div>
            <div className="shadow-user__table-body-row">
              <div className="shadow-user___table-image">
                <PropertyManagerPFP height="40px" width="40px" />
              </div>
              <div className="shadow-user__property-select-wrapper">
                <Select
                  defaultValue={currentPropertyManager}
                  options={propertyManagerOptions}
                  onChange={(category) =>
                    handlePropertyManagerDropdownChange(category)
                  }
                  // isClearable={true}
                  isLoading={propertyManagers?.length === 0}
                  loadingMessage={() => "Loading...."}
                  value={currentPropertyManager}
                />
              </div>
            </div>
            <div className="shadow-user__table-body-row">
              <Button
                btnText={"Assign"}
                btnType="rounded"
                btnTheme="questionnaire-primary"
                buttonClick={handleAssignShadowUserToProperties}
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      {Object.keys(currentSelectedPropertyManager).length !== 0 && (
        <div className="shadow-user__property-list-wrapper">
          <h2 style={{ marginBottom: "12px" }}>
            {
              //@ts-ignore
              currentSelectedPropertyManager?.propertyManager?.first_name || ""
            }
            's Properties:
          </h2>
          <div className="shadow-user__property-list">
            {
              //@ts-ignore
              currentSelectedPropertyManager?.properties &&
                //@ts-ignore
                currentSelectedPropertyManager?.properties?.map(
                  (property, index) => (
                    <div
                      key={index}
                      className={
                        property.selected
                          ? `shadow-user__card-wrapper shadow-user__card-wrapper--active`
                          : "shadow-user__card-wrapper"
                      }
                      onClick={() => toggleManagedProperty(property.id)}
                    >
                      {property.assignedToShadowManager && property.selected ? (
                        <AssignedProperties className="shadow-user__checked-icon" />
                      ) : property.assignedToShadowManager ? (
                        <CanceledProperties className="shadow-user__cross-icon" />
                      ) : null}
                      <div>
                        <TownHouse height="50px" width="50px" />
                      </div>
                      <strong>{`${property.name ? property.name : ""}  - ${
                        property.address ? property.address : ""
                      }`}</strong>
                      {/* , ${property.city ? property.city : ""}, ${property.state}, ${property.country.label}` */}
                    </div>
                  )
                )
            }
          </div>
        </div>
      )}
      <Modal
        isOpen={shadowUserAssignSuccessPopup}
        setOn={() => setShadowUserAssignSuccessPopup(false)}
        showCloseButton={false}
      >
        <div className="add-shadow-user__success">
          <div className="add-shadow-user__success-header">
            Shadow user has been assigned successfully
          </div>
          <AnimatedCheck />
          <div>
            <Button
              btnText={"Close"}
              btnType="rounded"
              btnTheme="primary"
              buttonClick={() => {
                setShadowUserAssignSuccessPopup(false);
              }}
              buttonStatus={false}
              additionalStyles={{ padding: 0 }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShadowUser;
