"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../../../../components/button/button";
import Input from "../../../../components/input/input";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import { useAllProperties } from "../../../../services/hooks/useAllProperties";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import "./add-property.scss";
import Select from "react-select";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import { formatPhoneNumber } from "../../../../utils/string-utils";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import { formatFaxNumber } from "../../../../utils/property-utils";

const AddProperty = (props) => {
  const { push } = useRouter();
  const {
    onClose,
    handleInputChange,
    propertyInfo,
    addStatus = false,
    setAddStatus,
  } = props;
  const { userInfo } = useUserInfo();
  const { setAllProperties } = useAllProperties();

  let [addPropertyErrors, setErrors] = useState([]);

  const [propertyNameError, setPropertyNameError] = useState(false);
  const [propertyLegalNameError, setPropertyLegalNameError] = useState(false);
  const [propertyAddressError, setPropertyAddressError] = useState(false);
  const [propertyCityError, setPropertyCityError] = useState(false);
  const [propertyCountyError, setPropertyCountyError] = useState(false);
  const [propertyStateError, setPropertyStateError] = useState(false);
  const [propertyPostalcodeError, setPropertyPostalcodeError] = useState(false);
  const [propertyPhoneNumberError, setPropertyPhoneNumberError] =
    useState(false);
  const [propertyFaxNumberError, setPropertyFaxNumberError] = useState(false);
  const [propertyEmailError, setPropertyEmailError] = useState(false);
  const [propertyBillingEmailError, setPropertyBillingEmailError] =
    useState(false);
  const [propertyWebsiteError, setPropertyWebsiteError] = useState(false);
  const [propertyTotalUnitsError, setPropertyTotalUnitsError] = useState(false);
  const [name, setName] = useState(propertyInfo?.name || "");
  const [legalName, setLegalName] = useState(propertyInfo?.legal_name || "");
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [managementAgencyName, setManagementAgencyName] = useState(
    propertyInfo?.management_agency_name || ""
  );
  const [address, setAddress] = useState(propertyInfo?.address || "");
  const [city, setCity] = useState(propertyInfo?.city || "");
  const [county, setCounty] = useState(propertyInfo?.county || "");
  const [state, setState] = useState(propertyInfo?.state || "");
  const [selectedCountry, setSelectedCountry] = useState(
    propertyInfo?.country || {
      value: "canada",
      label: "Canada",
    }
  );
  const [currentProperty, setCurrentProperty] = useState("");
  const [postalcode, setPostalcode] = useState(propertyInfo?.postalcode || "");
  const [phoneNumber, setPhoneNumber] = useState(
    formatPhoneNumber(propertyInfo?.phone_number) || ""
  );

  const [faxNumber, setFaxNumber] = useState(formatPhoneNumber(propertyInfo?.fax_number) || "");
  const [email, setEmail] = useState(propertyInfo?.email || "");
  const [billingEmail, setBillingEmail] = useState(
    propertyInfo?.billing_email || ""
  );
  const [website, setWebsite] = useState(propertyInfo?.website || "");
  const [noOfUnits, setNoOfUnits] = useState(propertyInfo?.no_of_units || "");
  const [isAddingProperty,setIsAddingProperty] = useState(false)
  const countryOptions = [
    { label: "USA", value: "united_states" },
    { label: "Canada", value: "canada" },
  ];

  console.log(propertyInfo);
  const validateAddProperty = () => {
    try {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const UrlRegex =
        /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
      const PhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
      const errors = [];
      if (name == "") {
        setPropertyNameError(true);
        errors.push("Property name cannot be empty");
      } else {
        setPropertyNameError(false);
      }
      if (legalName == "") {
        setPropertyLegalNameError(true);
        errors.push("Legal name cannot be empty");
      } else {
        setPropertyLegalNameError(false);
      }
      if (address == "") {
        setPropertyAddressError(true);
        errors.push("Address cannot be empty");
      } else {
        setPropertyAddressError(false);
      }
      if (city == "") {
        setPropertyCityError(true);
        errors.push("City cannot be empty");
      } else {
        setPropertyCityError(false);
      }

      if (selectedCountry == null) {
        errors.push("Please select a country");
      } else {
        setPropertyCountyError(false);

        if (selectedCountry.value === "canada" && county === "") {
          setPropertyCountyError(true);
          errors.push("County cannot be empty");
        }
      }
      if (state == "") {
        setPropertyStateError(true);
        errors.push("State cannot be empty");
      } else {
        setPropertyStateError(false);
      }

      if (postalcode == "") {
        setPropertyPostalcodeError(true);
        errors.push("Postal code cannot be empty");
      } else {
        setPropertyPostalcodeError(false);
      }
      if (phoneNumber === "" || !PhoneRegex.test(phoneNumber)) {
        console.log("Invalid phone number:", phoneNumber);
        setPropertyPhoneNumberError(true);
        errors.push("Phone number is not valid");
      } else {
        console.log("Valid phone number:", phoneNumber);
        console.log(phoneNumber);
        console.log(phoneNumber.length);
        setPropertyPhoneNumberError(false);
      }
      if (email !== "" && !emailRegex.test(email)) {
        setPropertyEmailError(true);
        errors.push("Email is not valid");
      } else {
        setPropertyEmailError(false);
      }
      if (billingEmail !== "" && !emailRegex.test(email)) {
        setPropertyBillingEmailError(true);
        errors.push("Email is not valid");
      } else {
        setPropertyBillingEmailError(false);
      }
      if (website !== "" && !UrlRegex.test(website)) {
        setPropertyWebsiteError(true);
        errors.push("Check if there is a typo in " + website);
      } else {
        setPropertyWebsiteError(false);
      }
    if (faxNumber === "" || !PhoneRegex.test(faxNumber)) {
      console.log("Invalid fax number:", faxNumber);
      setPropertyFaxNumberError(true);
      errors.push("fax number is not valid");
    } else {
      console.log("Valid faxNumber:", faxNumber);
      console.log(faxNumber);
      console.log(faxNumber.length);
      setPropertyFaxNumberError(false);
    }
      if (noOfUnits == "") {
        setPropertyTotalUnitsError(true);
        errors.push("No of units cannot be empty");
      } else {
        setPropertyTotalUnitsError(false);
      }

      if (errors.length > 0) {
        setErrors(errors);
        return false;
      } else {
        setErrors([]);
        setIsAddingProperty(true);
        return true;
      }
    } catch (ex) {
      console.error("Error at validateAddProperty");
    }
  };
  const foramtPhone = (_phoneNumber) => {
    let phoneNumber = _phoneNumber;
    let formatPhone = phoneNumber.replace(/\D/g, "");
    return formatPhone;
  };
  

  // Example usage:

  console.log(faxNumber);
  const onAddNewProperty = async () => {
    try {
      if (props.addPropertyFlow) {
        if (validateAddProperty()) {
          let newProperty = {
            name: name,
            legal_name: legalName,
            address: address,
            city: city,
            state: state,
            country: selectedCountry,
            county: county,
            postalcode: postalcode,
            phone_number: foramtPhone(phoneNumber),
            fax_number: foramtPhone(faxNumber),
            email: email,
            website: website,
            billing_email: billingEmail,
            management_agency_name: managementAgencyName,
            no_of_units: noOfUnits,
            property_manager_id: userInfo.sub,
          };
          //make service call
          const data = await PropertyAdapter.addProperty(newProperty, userInfo);
          console.log(data);

          if (data) {
            setAddStatus(true);
            setIsAddingProperty(false);
            props.updateModalTitle("Success!");
            setCurrentProperty(data?.id);
            const data1 = await PropertyAdapter.fetchAllProperties(userInfo);
            setAllProperties(data1);
          }
        }
      } else {
        if (validateAddProperty()) {
          let existingProperty = {
            id: propertyInfo.id,
            name: name,
            legal_name: legalName,
            address: address,
            city: city,
            state: state,
            country: selectedCountry,
            postalcode: postalcode,
            county: county,
            phone_number: foramtPhone(phoneNumber),
            fax_number: formatFaxNumber(faxNumber),
            email: email,
            website: website,
            no_of_units: noOfUnits,
            billing_email: billingEmail,
            management_agency_name: managementAgencyName,
            property_manager_id: propertyInfo.property_manager_id,
          };
          //make service call
          const response = await PropertyAdapter.editProperty(
            existingProperty,
            userInfo,
            propertyInfo
          );
          console.log(response);
          if (response) {
            setAddStatus(true);
            setCurrentProperty(response);
            props.updateModalTitle("Saved!");
            const allPropertiesData = await PropertyAdapter.fetchAllProperties(
              userInfo
            );
            setAllProperties(allPropertiesData);
          }
          console.log(response);
        }
      }
    } catch (ex) {
      setErrors(ex?.response?.response?.errors);
    }
  };

  const handleNameChange = (text) => {
    try {
      setName(text);
    } catch (ex) {
      console.error("Error at validateAddProperty");
    }
  };
  const handleLegalNameChange = (text) => {
    try {
      setLegalName(text);
    } catch (ex) {
      console.error("Error at handleLegalName Change");
    }
  };
  const handleAgencyNameChange = (text) => {
    try {
      setManagementAgencyName(text);
    } catch (ex) {
      console.error("Error at Management Agency Name");
    }
  };
  const handleAddressChange = (text) => {
    try {
      setAddress(text);
    } catch (ex) {
      console.error("Error at handleAddressChange");
    }
  };
  const handleCityChange = (text) => {
    try {
      setCity(text);
    } catch (ex) {
      console.error("Error at handleCityChange");
    }
  };
  const handleCountyChange = (text) => {
    try {
      setCounty(text);
    } catch (ex) {
      console.error("Error at handleCountyChange");
    }
  };
  const handleStateChange = (text) => {
    try {
      setState(text);
    } catch (ex) {
      console.error("Error at handleStateChange");
    }
  };
  const handlePostalcodeChange = (text) => {
    console.log(text);
    try {
      setPostalcode(text);
    } catch (ex) {
      console.error("Error at handlePostalcodeChange");
    }
  };
  const handlePhoneNumberChange = (number) => {
    try {
      setPhoneNumber(number);
    } catch (ex) {
      console.error("Error at handlePhoneNumberChange");
    }
  };
  const handleFaxNumberChange = (number) => {
    try {
      setFaxNumber(number);
    } catch (ex) {
      console.error("Error at handleFaxNumberChange");
    }
  };
  const handleEmailChange = (email) => {
    try {
      setEmail(email);
    } catch (ex) {
      console.error("Error at handlePostalcodeChange");
    }
  };
  const handleBillingEmailChange = (email) => {
    try {
      setBillingEmail(email);
    } catch (ex) {
      console.error("Error at handlePostalcodeChange");
    }
  };
  const handleWebsiteChange = (text) => {
    try {
      setWebsite(text);
    } catch (ex) {
      console.error("Error at handlePostalcodeChange");
    }
  };
  const handleNoOfUnitsChange = (number) => {
    try {
      setNoOfUnits(number);
    } catch (ex) {
      console.error("Error at handlePostalcodeChange");
    }
  };

  const countryChange = (category) => {
    setSelectedCountry(category);
    console.log(category);
  };
  const handleCheckBox = () => {
    if (name !== "") {
      setIsChecked(!isChecked);
      setLegalName(isChecked ? "" : name);
    } else {
      setIsChecked(!isChecked);
      setLegalName("");
    }
  };
  const handleEmailCheckBox = () => {
    if (email !== "") {
      console.log(email);
      setIsEmailChecked(!isEmailChecked);
      setBillingEmail(isEmailChecked ? "" : email);
    } else {
      setIsEmailChecked(!isEmailChecked);
      setBillingEmail("");
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
  const handleKeyDownForPhone = (e) => {
    const charCode = e.which || e.keyCode;
    const currentInputLength = phoneNumber.length;
    console.log(currentInputLength);
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105) ||
      charCode === 8 || // Backspace
      charCode === 9 || // Tab
      charCode === 46 ||// Delete
      charCode === 37 ||  // Left
      charCode === 39   // Right
    ) {
      if (
        currentInputLength >= 14 &&
        charCode !== 8 &&
        charCode !== 46 &&
        charCode !== 9 && 
        charCode !== 37 &&
        charCode !== 39
      ) {
        e.preventDefault();
      }
    } else {
      // Prevent input for other keys
      e.preventDefault();
    }
  };
  const handleKeyDownForFax = (e) => {
    const charCode = e.which || e.keyCode;
    const currentInputLength = faxNumber.length;
    console.log(currentInputLength);
    if (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 96 && charCode <= 105) ||
      charCode === 8 || // Backspace
      charCode === 9 || // Tab
      charCode === 46 ||  // Delete
      charCode === 37 ||  // Left
      charCode === 39   // Right

    ) {
      if (
        currentInputLength >= 14 &&
        charCode !== 8 &&
        charCode !== 46 &&
        charCode !== 9 &&
        charCode !== 37 &&
        charCode !== 39
      ) {
        e.preventDefault();
      }
    } else {
      // Prevent input for other keys
      e.preventDefault();
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      fontSize: "0.9rem",
      fontWeight: "200",
    }),
  };
  console.log(faxNumber)
  return (
    <>
      {addStatus == false && (
        <div className="add-property" data-testid="add-property">
          <div
            className="add-property__header-wrapper"
            data-testid="header-wrapper"
          >
            <div className="add-property__header-section"></div>
          </div>
          <div className="add-property__content" data-testid="property-content">
            <div className="add-property__name" data-testid="property-name">
              <Input
                errored={propertyNameError}
                onChange={handleNameChange}
                dataTestId="name-input"
                onBlur={() => {}}
                value={name}
                name="name"
                type="text"
                label="Property Name"
                wrapperStyle={{ marginTop: "12px" }}
                inputStyle={{
                  width: "280px",
                }}
                placeholder="ABC Housing limited"
              />
              <div>
                <Input
                  errored={propertyLegalNameError}
                  onChange={handleLegalNameChange}
                  onBlur={() => {}}
                  value={legalName}
                  name="name"
                  type="text"
                  wrapperStyle={{ marginTop: "12px" }}
                  inputStyle={{
                    width: "280px",
                  }}
                  label="Property Legal Name (if different)"
                  placeholder="ABC Housing limited"
                />
                <div className="add-property__legal-name">
                  <input
                    className="add-property__legal-name-checkbox"
                    type="checkbox"
                    name="checkbox"
                    id="legal_name"
                    onChange={handleCheckBox}
                  />
                  <label
                    htmlFor="legal_name"
                    className="add-property__legal-name-checkbox-label"
                  >
                    Check if legal name is same as property name
                  </label>
                </div>
              </div>
              <Input
                onChange={handleAgencyNameChange}
                onBlur={() => {}}
                value={managementAgencyName}
                name="name"
                type="text"
                label="Management Agency Name"
                wrapperStyle={{ marginTop: "12px" }}
                inputStyle={{
                  width: "280px",
                }}
                placeholder="ABC Housing limited"
              />
            </div>
            <div
              className="add-property__address"
              data-testid="property-address"
            >
              <Input
                errored={propertyAddressError}
                onChange={handleAddressChange}
                onBlur={() => {}}
                value={address}
                name="address-box"
                type="text"
                label="Address"
                inputStyle={{
                  width: "280px",
                }}
                placeholder="1 M H Manhattan NY"
              />
              <Input
                errored={propertyCityError}
                onChange={handleCityChange}
                dataTestId={"city-input"}
                onBlur={() => {}}
                value={city}
                name="city"
                type="text"
                label="City"
                inputStyle={{
                  width: "155px",
                }}
                placeholder="Green city"
              />
              <Input
                errored={propertyCountyError}
                onChange={handleCountyChange}
                dataTestId="county-input"
                onBlur={() => {}}
                value={county}
                name="county"
                type="text"
                label="County"
                inputStyle={{
                  width: "155px",
                }}
                placeholder="Orange city"
              />
              <Input
                errored={propertyStateError}
                onChange={handleStateChange}
                dataTestId="state-input"
                onBlur={() => {}}
                value={state}
                name="state"
                type="text"
                label="State/Province"
                placeholder="Texas"
                inputStyle={{
                  width: "155px",
                }}
              />
            </div>
            <div className="add-property__units-input-wrapper">
              <div className="add-property__select-wrapper">
                <div className="add-property__select-label">
                  <Label
                    type={LabelType.Header}
                    text={"Select country"}
                    variant={LabelVariant.L2}
                  />
                </div>
                <div className="add-property__select">
                  <Select
                    defaultValue={selectedCountry}
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={(category) => countryChange(category)}
                    isClearable={true}
                    styles={customStyles}
                  />
                </div>
              </div>

              <Input
                errored={propertyPostalcodeError}
                onChange={handlePostalcodeChange}
                onBlur={() => {}}
                value={postalcode}
                dataTestId="postalcode-input"
                name="postalcode"
                type="text"
                onKeyDown={handleKeyDown}
                label="Postal code"
                placeholder="92407"
                inputStyle={{
                  width: "155px",
                }}
              />
              <Input
                errored={propertyTotalUnitsError}
                onChange={handleNoOfUnitsChange}
                onKeyDown={handleKeyDown}
                onBlur={() => {}}
                value={noOfUnits}
                name="noOfUnits"
                type="text"
                label="Number of Units"
                inputStyle={{
                  width: "120px",
                }}
                placeholder="234"
                min="1"
              />

              <Input
                errored={propertyPhoneNumberError}
                onChange={handlePhoneNumberChange}
                onBlur={() => {}}
                value={phoneNumber}
                onKeyDown={handleKeyDownForPhone}
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phoneNumber}
                name="phone-number"
                type="phone"
                label="Phone Number"
                inputStyle={{
                  width: "155px",
                }}
                placeholder="(123) 456-7890"
              />
            </div>

            <div
              className="add-property__contact"
              data-testid="property-contact"
            >
              <Input
                errored={propertyFaxNumberError}
                onChange={handleFaxNumberChange}
                onBlur={() => {}}
                value={faxNumber}
                onKeyDown={handleKeyDownForFax}
                setFaxNumber={setFaxNumber}
                faxNumber={faxNumber}
                name="fax-number"
                type="fax"
                label="Fax Number"
                inputStyle={{
                  width: "120px",
                }}
                placeholder="(123) 456-7890"
              />
              <Input
                errored={propertyEmailError}
                onChange={handleEmailChange}
                onBlur={() => {}}
                value={email}
                dataTestId={"email-input"}
                name="email"
                type="email"
                label="E-Mail Address"
                placeholder="abc@demo.com"
                inputStyle={{
                  width: "240px",
                }}
              />
              <div>
                <Input
                  errored={propertyBillingEmailError}
                  onChange={handleBillingEmailChange}
                  onBlur={() => {}}
                  value={billingEmail}
                  dataTestId={"billing-email-input"}
                  name="email"
                  type="email"
                  label="Billing Email Address"
                  placeholder="abc@demo.com"
                  inputStyle={{
                    width: "240px",
                  }}
                />

                <div className="add-property__billing-email">
                  <input
                    className="add-property__billing-email-checkbox"
                    type="checkbox"
                    name="checkbox"
                    onChange={handleEmailCheckBox}
                  />
                  <label
                    htmlFor="billing_email"
                    className="add-property__billing-email-checkbox-label"
                  >
                    Check if Billing Email is same as Email
                  </label>
                </div>
              </div>
              <div className="add-property__name" data-testid="property-name">
                <Input
                  errored={propertyWebsiteError}
                  onChange={handleWebsiteChange}
                  onBlur={() => {}}
                  value={website}
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="www.abc.com"
                  inputStyle={{
                    width: "280px",
                  }}
                />
              </div>
            </div>

            <div
              className="add-property__units"
              data-testid="property-units"
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
                color: "green",
              }}
            ></div>

            {addPropertyErrors?.length > 0 && (
              <ul className="error-list">
                {addPropertyErrors?.map((_error) => {
                  return <li className="error-list__item">{<>{_error}</>}</li>;
                })}
              </ul>
            )}
            <div
              className="add-property__modal-footer"
              data-testid="property-modal"
            >
              <Button
                btnText={props.buttonText}
                buttonStatus={isAddingProperty}
                btnTheme="primary"
                btnType="rounded"
                testID="properties-button"
                buttonClick={onAddNewProperty}
                additionalStyles={{ paddingBottom: "0px", paddingTop: "0px" }}
              />
            </div>
          </div>
        </div>
      )}

      {addStatus == true && (
        <div className="add-property__popup-wrapper">
          <div className="add-property__content" data-testid="property-modal">
            <div className="add-property__popup">
            <Label
              type={LabelType.Header}
              text={`Your property details have been
              ${props.addPropertyFlow ? "added" : "saved"} successfully`}
              variant={LabelVariant.L2}
              overrideTextStyles={{marginTop:"1rem"}}
            />
              
            </div>
            <div className="add-property__popup-wrapper-content">
              <AnimatedCheck />
            </div>

            <div className="add-property__modal-footer">
              <Button
                btnText="Close"
                btnTheme="primary"
                btnType="rounded"
                testID="properties-close-button"
                buttonClick={() => onClose(currentProperty)}
                additionalStyles={{ paddingBottom: "0px", paddingTop: "0px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProperty;
