"use client";
import React, { Ref, forwardRef, useState } from "react";
import "./add-shadow-user.scss";
import { useRouter } from "next/navigation";
import Input from "../../../components/input/input";
import DatePicker from "react-datepicker";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import Button from "../../../components/button/button";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import AnimatedCheck from "../../../components/animated-check/animated-check";
interface ExampleCustomInputProps {
  value: string;
  onClick?: () => void;
}
const AddShadowUser = (props) => {
  const { setShowShadowUserPopup, setShadowUserAdded, shadowUserAdded } = props;
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [postalcode, setPostalcode] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [companyIdError, setCompanyIdError] = useState(false);
  const [postalcodeError, setPostalcodeError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [addShadowUserErrors, setAddShadowUserErrors] = useState([]);
  const { push } = useRouter();
  const validateAddShadowUser = () => {
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
      if (companyId == "") {
        errors.push("Company Id cannot be empty");
        setCompanyIdError(true);
      } else {
        setCompanyIdError(false);
      }
      if (postalcode == "") {
        errors.push("Postalcode cannot be empty");
        setPostalcodeError(true);
      } else {
        setPostalcodeError(false);
      }
      if (errors.length > 0) {
        setAddShadowUserErrors(errors);
        return false;
      } else {
        setAddShadowUserErrors([]);
        return true;
      }
    } catch (ex) {
      console.error("Error at AddPropertyManager Validate Errors");
    }
  };
  const handleFirstNameChange = (_firstName) => {
    try {
      setFirstName(_firstName);
    } catch (error) {
      console.log("Error at handleFirstNameChange");
    }
  };
  const handleMiddleNameChange = (_firstName) => {
    try {
      setMiddleName(_firstName);
    } catch (error) {
      console.log("Error at handleFirstNameChange");
    }
  };
  const handleLastNameChange = (_firstName) => {
    try {
      setLastName(_firstName);
    } catch (error) {
      console.log("Error at handleFirstNameChange");
    }
  };
  const handleEmailChange = (_newEmail) => {
    try {
      setEmail(_newEmail);
    } catch (ex) {
      console.error("Error at handleEmailChange");
    }
  };
  const handleCompanyIdChange = (_newCompanyId) => {
    try {
      setCompanyId(_newCompanyId);
    } catch (ex) {
      console.error("Error at handleCompanyIdChange");
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
  const handleCityChange = (_newCity) => {
    try {
      setCity(_newCity);
    } catch (ex) {
      console.error("Error at handleCityChange");
    }
  };
  const handlePostalcodeChange = (_newPostalcode) => {
    try {
      setPostalcode(_newPostalcode);
    } catch (ex) {
      console.error("Error at handleCityChange");
    }
  };
  // const handleDateOfBirthChange = (_newCity) => {
  //   try {
  //     setDateOfBirth(_newCity);
  //   } catch (ex) {
  //     console.error("Error at handleCityChange");
  //   }
  // };
  const handleAddShadowUser = async () => {
    if (validateAddShadowUser()) {
      let role = "ShadowManager"; //role is based on accessRoles from backend
      let shadowUser = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        company_id: companyId,
        address,
        city,
        state,
        role,
        // date_of_birth: dateOfBirth,
        postalcode,
        email,
      };
      setButtonDisabled(true);
      let shadowUserOptions = { items: ["isActive", "isAdmin"] };
      const createShadowUserResponse = await TenantAdapter.createShadowUser(
        shadowUser,
        shadowUserOptions
      );
      if (createShadowUserResponse?.isAlreadyExists) {
        let errors = [];
        errors.push("Shadow User with this email Id already exists");
        setAddShadowUserErrors(errors);
      } else if (!createShadowUserResponse?.isAlreadyExists) {
        setShadowUserAdded(true);
      } else {
        console.log("Error adding shadow user");
      }
      setButtonDisabled(false);
      console.log(createShadowUserResponse);
    }
  };
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    ExampleCustomInputProps
  >(({ value, onClick }, ref: Ref<HTMLButtonElement>) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));
  return shadowUserAdded ? (
    <div className="add-shadow-user__success">
      <div className="add-shadow-user__success-header">
        Shadow User has been created Successfully
      </div>
      <AnimatedCheck />
      <div>
        <Button
          btnText={"Close"}
          btnType="rounded"
          btnTheme="primary"
          buttonClick={() => {
            setShadowUserAdded(false);
            setShowShadowUserPopup(false);
          }}
          buttonStatus={false}
          additionalStyles={{ padding: 0 }}
        />
      </div>
    </div>
  ) : (
    <div className="add-shadow-user">
      <div className="add-shadow-user__content">
        <fieldset className="add-shadow-user__personal-info-wrapper">
          <legend className="add-shadow-user__personal-info-legend">
            Shadow User Details
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
          <Input
            errored={companyIdError}
            onChange={handleCompanyIdChange}
            dataTestId={"company-id"}
            onBlur={() => {}}
            value={companyId}
            name="company-id"
            type="text"
            label="Company ID"
            placeholder="12332"
            inputStyle={{
              width: "150px",
            }}
          />
          <Input
            errored={addressError}
            onChange={handleAddressChange}
            dataTestId={"address-input"}
            onBlur={() => {}}
            value={address}
            name="address"
            type="text"
            label="Address"
            placeholder="1 M Mancity"
            inputStyle={{
              width: "150px",
            }}
          />
          <Input
            errored={cityError}
            onChange={handleCityChange}
            dataTestId={"city-input"}
            onBlur={() => {}}
            value={city}
            name="city"
            type="text"
            label="City"
            placeholder="Toronto"
            inputStyle={{
              width: "150px",
            }}
          />
          <Input
            errored={stateError}
            onChange={handleStateChange}
            dataTestId={"state-input"}
            onBlur={() => {}}
            value={state}
            name="state"
            type="text"
            label="State"
            placeholder="New Brunswick"
            inputStyle={{
              width: "150px",
            }}
          />
          <Input
            errored={postalcodeError}
            onChange={handlePostalcodeChange}
            dataTestId={"postal-code"}
            onBlur={() => {}}
            value={postalcode}
            name="postalcode"
            type="text"
            label="Postal code"
            placeholder="2121212"
            inputStyle={{
              width: "150px",
            }}
          />
          {/* <div>
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
                selected={dateOfBirth}
                onChange={handleDateOfBirthChange}
                customInput={
                  <ExampleCustomInput value={dateOfBirth.toDateString()} />
                }
              />
            </div>
          </div> */}
          <Input
            errored={emailError}
            onChange={handleEmailChange}
            dataTestId={"email-input"}
            onBlur={() => {}}
            value={email}
            name="email"
            type="text"
            label="Email"
            placeholder="smith@gmail.com"
            inputStyle={{
              width: "150px",
            }}
          />
        </fieldset>
        {addShadowUserErrors &&
          Array.isArray(addShadowUserErrors) &&
          addShadowUserErrors.length > 0 && (
            <ul className="add-shadow-user__error-list">
              {addShadowUserErrors.map((_error, index) => (
                <li className="add-shadow-user__error-list-item" key={index}>
                  <>{_error}</>
                </li>
              ))}
            </ul>
          )}
      </div>
      <div className="add-shadow-user__footer">
        <Button
          btnText={"Add Shadow User"}
          btnType="rounded"
          btnTheme="primary"
          buttonClick={handleAddShadowUser}
          buttonStatus={buttonDisabled}
          additionalStyles={{ padding: 0 }}
        />
      </div>
    </div>
  );
};

export default AddShadowUser;
