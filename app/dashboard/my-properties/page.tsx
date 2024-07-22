"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../../components/card/card";
import "./my-properties.scss";
import Button from "../../../components/button/button";
import SearchBar from "../../../components/search-bar/search-bar";
import Modal, { ModalTypes } from "../../../components/modal/modal";
import AddProperty from "./add-property/add-property";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import TownHouse from "../../../public/assets/images/townhouse.svg";
import Select from "react-select";
import Search from "../../../public/assets/icons/search.svg";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import ToggleOn from "../../../public/assets/icons/toggle-on.svg";
import ToggleOff from "../../../public/assets/icons/toggle-off.svg";
import { AccessPermission, validate } from "../../_auth/permissions";

import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
const MyProperties = (props) => {
  const { allProperties , setAllProperties} = useAllProperties();
  
  const { userInfo } = useUserInfo();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (expanded) {
      setFilteredProperties(recentProperties);
    } else {
      setFilteredProperties(allProperties);
    }
  }, [userInfo, allProperties, expanded]);
  
  const { push } = useRouter();

  const [shouldShowAddProperty, setShowAddProperty] = useState(false);
  const [deletedProperties, setDeletedProperties] = useState([]);
  const [showDeleteProperties, setShowDeleteProperties] = useState(false);
  const [searchBarStatus, setSearchBarStatus] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState(null);
  const [modalTitle, setModalTitle] = useState("Add Property");
  const [propertyActionText, setPropertyActionText] = useState("Add Property");
  const [propertyTitle, setPropertyTitle] = useState("Active Properties");
  const [isAddFlow, setIsAddPropertyFlow] = useState(true);
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [needSync, setSyncRequired] = useState(false);
  const [addStatus, setAddStatus] = useState(false);
  const [currentPropertyManager, setCurrentPropertyManager] = useState({
    value: "",
    label: "Select property manager",
  });
  const [propertyManagers,setPropertyManagers] = useState([])
  const [currentSelectedPropertyManager,setCurrentSelectedPropertyManager] = useState({})

  const [propertyStatus, setPropertyStatus] = useState(false);
  // useEffect(() => {
  //   async function fetchPropertyById(id) {
  //     const data = await PropertyAdapter.getPropertyByID(id);
  //     return data[0];
  //   }
  //   async function fetchRentalsByPropertyId(id) {
  //     const rentalRecord = await PropertyAdapter.getRentalsByPropertyID(id);
  //     if (rentalRecord) {
  //       return rentalRecord;
  //     }
  //   }
  // }, [needSync]);
  const fetchPropertyManagers = async (userInfo) => {
    // console.log(userInfo);
    const users = userInfo.permissions.options?.users;
    const propertyManagersFetchResponses = [];

    for (const userId of users) {
        const propertyManagerFetchResponse = await TenantAdapter.getTenantById(userId);
        propertyManagersFetchResponses.push(propertyManagerFetchResponse);
    }
    const flattenedPropertyManagers = [].concat(...propertyManagersFetchResponses);
    setPropertyManagers(flattenedPropertyManagers);
};

  useEffect(() => {
    //@ts-ignore
    if (userInfo && userInfo?.role === "ShadowManager") {
      fetchPropertyManagers(userInfo);
    } else {
      // console.log("User is not a Shadow Manager");
    }
  }, [userInfo]);
  let recentProperties = allProperties?.slice(-3);
  let properties = expanded ? recentProperties : allProperties;
  const handleListExpand = () => {
    try {
      if (expanded) {
        setFilteredProperties(recentProperties);
      } else {
        setFilteredProperties(allProperties);
      }
      setExpanded(!expanded);
    } catch (ex) {
      console.error("Error at handleListExpand");
    }
  };
  const handleAddPropertyClose = (data) => {
    try {
      setShowAddProperty(false);
      
      push("/dashboard/property-details/" + data);
    } catch (ex) {
      console.error("Error at handleAddPropertyClose");
    }
  };

  const handleEditProperty = (data) => {
    try {
      setModalTitle("Edit Property");
      setShowAddProperty(true);
      setPropertyInfo(data);
      setPropertyActionText("Save");
      setIsAddPropertyFlow(false);
      setAddStatus(false)

    } catch (ex) {
      console.error("Error at handleEditProperty");
    }
  };

  const navigateToPropertyDetails = (property) => {
    try {
      push("/dashboard/property-details/" + property.id);
    } catch (ex) {
      console.error("Error at navigateToPropertyDetails");
    }
  };

  const handleAddProperty = () => {
    try {
      setModalTitle("Add Property");
      setShowAddProperty(true);
      setPropertyInfo({});
      setPropertyActionText("Add Property");
      setIsAddPropertyFlow(true);
      setSyncRequired(true);
      setAddStatus(false)
    } catch (ex) {
      console.error("Error at handleAddProperty");
    }
  };
  const handleSearchProperties = () => {};
  const handleSearchIconClick = () => {
    try {
      if (searchBarStatus) {
        setSearchBarStatus(false);
      } else {
        setSearchBarStatus(true);
      }
    } catch (ex) {
      console.error("Error at handleSearchIconClick");
    }
  };
  // const propertyOptions = allProperties.map(_city => [{
  //   value: _city.id,
  //   label: _city.state,
  // }])

  const citySet = new Set();

  const cityOption = allProperties
    ?.filter((_city) => {
      if (!citySet.has(_city.city)) {
        citySet.add(_city.city);
        return true;
      }
      return false;
    })
    .map((_city) => ({
      value: _city.city,
      label: _city.city,
    }));
  const filteredCityOptions = cityOption?.filter(
    (option) => option?.label?.trim() !== ""
  );

  const stateSet = new Set();

  const stateOption = allProperties
    ?.filter((_state) => {
      if (!stateSet.has(_state.state)) {
        stateSet.add(_state.state);
        return true;
      }
      return false;
    })
    .map((_city) => ({
      value: _city.state,
      label: _city.state,
    }));
  
  const filteredStateOptions = stateOption?.filter(
    (option) => option?.label?.trim() !== ""
  );
  
  const countrySet = new Set();
  const countryOption = allProperties
    ?.filter((_country) => {
      if (!countrySet.has(_country.country)) {
        countrySet.add(_country.country);
        return true;
      }
      return false;
    })
    .map((_country) => _country.country);
  

  const filteredCountryOptions = countryOption?.filter((option) => {
    

    return typeof option?.label === "string" && option.label.trim() !== "";
  });
  
  const nameSet = new Set();
  const nameOption = allProperties
    ?.filter((_name) => {
      if (!nameSet.has(_name.name)) {
        nameSet.add(_name.name);
        return true;
      }
      return false;
    })
    .map((_name) => ({
      value: _name.name,
      label: _name.name,
    }));
  
  const filteredNameOptions = nameOption?.filter(
    (option) => option?.label?.trim() !== "" && option?.label !== undefined
  );
  const [selectedCityOption, setSelectedCityOption] = useState({
    value: null,
    label: "Select City",
  });
  const [selectedStateOption, setSelectedStateOption] = useState({
    value: null,
    label: "Select State",
  });
  const [selectedCountryOption, setSelectedCountryOption] = useState({
    value: null,
    label: "Select Country",
  });
  const [selectedNameOption, setSelectedNameOption] = useState({
    value: null,
    label: "Select Name",
  });
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #2f549b",
      // width: "200px",
      marginLeft: "5px",
      height: "38px",
      fontSize: "1rem",
      fontWeight: 200,
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#2f549b",
    },
  });
  const validateMyPropertiesFilter = () => {
    let isValid = false;
    if (selectedCityOption.value != null) {
      isValid = true;
    }
    if (selectedCountryOption.value != null) {
      isValid = true;
    }
    if (selectedStateOption.value != null) {
      isValid = true;
    }
    if (selectedNameOption.value != null) {
      isValid = true;
    }
    return isValid;
  };
  const resetSearch = () => {
    setSelectedCityOption({ value: null, label: "Select City" });
    setSelectedStateOption({ value: null, label: "Select State" });
    setSelectedNameOption({ value: null, label: "Select Name" });
    setSelectedCountryOption({ value: null, label: "Select Country" });
  };
  const handleSearch = async () => {
    resetSearch();
    if (!validateMyPropertiesFilter()) {
      setFilteredProperties([]);
    }

    const filtered = allProperties.filter((property) => {
      let filterCity = true;
      let filterState = true;
      let filterCountry = true;
      let filterName = true;
      if (selectedCityOption.value !== null) {
        filterCity = property.city === selectedCityOption.value;
      }
      if (selectedStateOption.value !== null) {
        filterState = property.state === selectedStateOption.value;
      }
      if (selectedCountryOption.value !== null) {
        filterCountry = property.country.value === selectedCountryOption.value;
      }
      if (selectedNameOption.value !== null) {
        filterName = property.name === selectedNameOption.value;
      }
      return filterCity && filterState && filterCountry && filterName;
    });
    setFilteredProperties(filtered);
    // console.log("Filtered: " + JSON.stringify(filtered));
  };
  async function handleViewDeleteProperties() {
    setShowDeleteProperties(true);
    let deletedProperties = await PropertyAdapter.fetchAllDeletedProperties(
      userInfo
    );
    
    setDeletedProperties(deletedProperties);
    setPropertyTitle("Deleted Properties");
  }
  async function handleViewActiveProperties() {
    setShowDeleteProperties(false);
    setPropertyTitle("Active Properties");
  }
  const renderCloseBUtton = (title) => {
    switch (title) {
      case "Add Property":
        return true;

      case "Edit Property":
        return true;
      case "Success!":
        return false;
      case "Saved!":
        return false;
    }
  };
  const propertyStyles = {
    marginLeft: "3px",
  };
  const propertyManagerOptions = propertyManagers?.map((_managers) => ({
    value: _managers.id,
    label: `${_managers.first_name} ${_managers.last_name} (${_managers.email})`,
  }));
  const handlePropertyManagerDropdownChange = (selectedOption) => {
    // console.log(selectedOption)
    if(selectedOption){
      setCurrentPropertyManager(selectedOption);
      const selectedManager = propertyManagers.find(
        (manager) => manager.id === selectedOption.value
      );
      // console.log(selectedManager);
      fetchPropertiesForShadowManagerByPMID(selectedManager);
    } else if (selectedOption === null || selectedOption === undefined){
      setCurrentPropertyManager({
        value: "",
        label: "Select Property Manager",
      })
      setAllProperties([])
    }else{
      console.log("Error at property manager drop down change")
    }
  };

  async function fetchPropertiesForShadowManagerByPMID(_selectedManager){
    let selectedPropertyManagerId = _selectedManager?.id;
    let propertyManagerInfo = {
      id : selectedPropertyManagerId
    }
    let selectedPropertyManagerPropertiesResponse = await PropertyAdapter.fetchPropertiesOfPropertyManager(propertyManagerInfo);
    // console.log(selectedPropertyManagerPropertiesResponse)
    if(selectedPropertyManagerPropertiesResponse){
      setAllProperties(selectedPropertyManagerPropertiesResponse)
    }else{
      console.log("error at selectedPropertyManagerPropertiesResponse")
    }
  }

  // console.log(userInfo)
  let writeOnlyPermission = validate([AccessPermission.Write], userInfo ? userInfo.permissions : { permissions: 0 })
  return (
    <>
      <div className="my-properties" data-testid="my-properties-section">
        {writeOnlyPermission && (  
        <div className="my-properties__add-properties-section">
            <Button
              btnText="+ Add Properties"
              btnTheme="secondary"
              btnType="outline"
              testID="my-properties-add-button"
              buttonClick={handleAddProperty}
            />
        </div>
        )}
          
        {propertyStatus == false && (
          <div
            className="my-properties__add-properties-filter-section"
            data-testid="properties-filter-section"
          >
            <div>
              <div
                className="my-properties__filter-input-wrapper"
                data-testid="property-drop-down-wrapper"
              >
                <div>
                  <div className="my-properties__add-properties-filter-section-header">
                    <Label
                      type={LabelType.Header}
                      text={"Property Name"}
                      variant={LabelVariant.L2}
                      overrideTextStyles={propertyStyles}
                    />
                  </div>
                  <Select
                    defaultValue={selectedNameOption}
                    onChange={(val) => {
                      let data = val;
                      if (val == null) {
                        data = {
                          value: null,

                          label: "Select Name",
                        };
                      }
                      setSelectedNameOption(data);
                    }}
                    classNames={{
                      control: () => "my-properties__select",
                    }}
                    styles={customStyles} // Apply custom styles
                    theme={customTheme}
                    options={filteredNameOptions}
                    value={selectedNameOption}
                    isClearable={true}
                  />
                </div>
                <div>
                  <div className="my-properties__add-properties-filter-section-header">
                    <Label
                      type={LabelType.Header}
                      text={"City"}
                      variant={LabelVariant.L2}
                      overrideTextStyles={propertyStyles}
                    />
                  </div>
                  <Select
                    defaultValue={selectedCityOption}
                    onChange={(val) => {
                      let data = val;
                      if (val == null) {
                        data = {
                          value: null,
                          label: "Select City",
                        };
                      }
                      setSelectedCityOption(data);
                    }}
                    classNames={{
                      control: () => "my-properties__select",
                    }}
                    styles={customStyles} // Apply custom styles
                    theme={customTheme}
                    options={filteredCityOptions}
                    value={selectedCityOption}
                    isClearable={true}
                  />
                </div>
                <div>
                  <div className="my-properties__add-properties-filter-section-header">
                    <Label
                      type={LabelType.Header}
                      text={"State/Province"}
                      variant={LabelVariant.L2}
                      overrideTextStyles={propertyStyles}
                    />
                  </div>
                  <Select
                    defaultValue={selectedStateOption}
                    onChange={(val) => {
                      let data = val;
                      if (val == null) {
                        data = {
                          value: null,
                          label: "Select State",
                        };
                      }
                      setSelectedStateOption(data);
                    }}
                    classNames={{
                      control: () => "my-properties__select",
                    }}
                    styles={customStyles} // Apply custom styles
                    theme={customTheme}
                    options={filteredStateOptions}
                    value={selectedStateOption}
                    isClearable={true}
                    
                  />
                </div>
                <div>
                  <div className="my-properties__add-properties-filter-section-header">
                    <Label
                      type={LabelType.Header}
                      text={"Country"}
                      variant={LabelVariant.L2}
                      overrideTextStyles={propertyStyles}
                    />
                  </div>
                  <Select
                    defaultValue={selectedCountryOption}
                    onChange={(val) => {
                      let data = val;
                      if (val == null) {
                        data = {
                          value: null,
                          label: "Select Country",
                        };
                      }
                      setSelectedCountryOption(data);
                    }}
                    classNames={{
                      control: () => "my-properties__select",
                    }}
                    styles={customStyles} // Apply custom styles
                    theme={customTheme}
                    options={filteredCountryOptions?.reduce(
                      (uniqueOptions, option) => {
                        const existingOption = uniqueOptions.find(
                          (uniqueOption) =>
                            uniqueOption.label === option.label &&
                            uniqueOption.value === option.value
                        );

                        if (!existingOption) {
                          uniqueOptions.push({
                            label: option.label,
                            value: option.value,
                          });
                        }
                        
                        return uniqueOptions;
                      },
                      []
                    )}
                    value={selectedCountryOption}
                    isClearable={true}
                  />
                </div>
              </div>
            </div>
            <Button
              btnText={<Search fill="white" />}
              buttonClick={handleSearch}
              btnType="success"
              btnTheme="search"
              testID="properties-filter-search"
            />
          </div>
        )}
        <div className="my-properties__header-wrapper">
          <div className="my-properties__header-text">
            <Label
              type={LabelType.Body}
              text={"Properties"}
              variant={LabelVariant.L4}
              overrideTextStyles={propertyStyles}
            />
          </div>
        </div>
        <div className="my-properties__delete-toggle">
          {
          //@ts-ignore
          userInfo && userInfo?.role === "ShadowManager" && 
          <div className="my-properties__property-manager-select-wrapper">
          <Label
                      type={LabelType.Header}
                      text={"Property Manager"}
                      variant={LabelVariant.L2}
                      overrideTextStyles={propertyStyles}
                    />          
        <Select
                  defaultValue={currentPropertyManager}
                  options={propertyManagerOptions}
                  onChange={(category) => handlePropertyManagerDropdownChange(category)}
                  isClearable={true}
                  isLoading={propertyManagers?.length === 0}
                  loadingMessage={() => "Loading...."}
                  value={currentPropertyManager}
          />
          </div>}
         {writeOnlyPermission&& <div className="my-properties__toggle-button-wrapper">

          <Label
            type={LabelType.Body}
            text={propertyTitle}
            variant={LabelVariant.L4}
            overrideTextStyles={propertyStyles}
          />

          {showDeleteProperties ? (
            <ToggleOff onClick={handleViewActiveProperties} />
          ) : (
            <ToggleOn onClick={handleViewDeleteProperties} />
          )}
          </div>}
        </div>
        {!showDeleteProperties && (
          <div className="my-properties__section-one">
            {filteredProperties?.length === 0 && properties?.length == 0 && (
              <Label
                type={LabelType.Header}
                text={"No Properties Found"}
                variant={LabelVariant.L2}
                overrideTextStyles={propertyStyles}
              />
            )}
            {filteredProperties?.length == 0
              ? properties?.map((_data, index) => (
                  <Card
                    key={index}
                    cardTitle={_data.name}
                    cardAddress={_data.address}
                    cardUnit={_data?.units?.length}
                    cardClick={() => navigateToPropertyDetails(_data)}
                    cardType="property"
                    cardImgSrc=""
                    cardDefault={<TownHouse />}
                    editClick={() => handleEditProperty(_data)}
                    userInfo={userInfo}
                  />
                ))
              : filteredProperties?.map((_data, index) => (
                  <Card
                    key={index}
                    cardTitle={_data.name}
                    cardAddress={_data.address}
                    cardUnit={_data?.units?.length}
                    cardClick={() => navigateToPropertyDetails(_data)}
                    cardType="property"
                    cardImgSrc=""
                    cardDefault={<TownHouse />}
                    editClick={() => handleEditProperty(_data)}
                    userInfo={userInfo}
                  />
                ))}
          </div>
        )}
        {showDeleteProperties && (
          <div className="my-properties__section-one">
            {deletedProperties?.length === 0 && <div>No Properties Found</div>}
            {deletedProperties?.map((_data, index) => (
              <Card
                key={index}
                cardTitle={_data.name}
                cardAddress={_data.address}
                cardUnit={_data?.units?.length}
                cardClick={() => navigateToPropertyDetails(_data)}
                cardType="property"
                cardImgSrc=""
                cardDefault={<TownHouse />}
                editClick={() => handleEditProperty(_data)}
              />
            ))}
          </div>
        )}
        <div className="my-properties__view-all-listing-button">
          <Button
            btnText={expanded ? "View all Properties" : "Show Less"}
            btnTheme="primary"
            btnType="rounded"
            testID="properties-button"
            buttonClick={handleListExpand}
          />
        </div>
        <Modal
          dataTestId="property-modal-close"
          isOpen={shouldShowAddProperty}
          title={modalTitle}
          showCloseButton={renderCloseBUtton(modalTitle)}
          setOn={() => setShowAddProperty(false)}
          size={addStatus ? ModalTypes.Xmedium : ModalTypes.Large}
        >
          <AddProperty
            size={addStatus ? ModalTypes.Medium : ModalTypes.Large}
            onClose={handleAddPropertyClose}
            updateModalTitle={setModalTitle}
            propertyInfo={propertyInfo}
            buttonText={propertyActionText}
            addPropertyFlow={isAddFlow}
            addStatus={addStatus}
            setAddStatus={setAddStatus}
          />
        </Modal>
      </div>
    </>
  );
};

export default MyProperties;
