"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import Button from "../../../../components/button/button";
import Input from "../../../../components/input/input";
import "./add-units.scss";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import AnimatedCheck from "../../../../components/animated-check/animated-check";

import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import UnAuthorisedPopup from "../../../../components/unauthorized-popup/unauthorized-popup";

const AddUnits = (props) => {
  const {
    onClose,
    refetchProperty,
    editUnitFlow,
    unitInfo,
    setShowEditUnit,
    addUnitStatus,
    setaddUnitStatus,
    editUnitStatus,
    setEditUnitStatus,
    unAuthorisedError,
    setUnAuthorisedError,
  } = props;
  const [isAddingUnit,setIsAddingUnit] = useState(false);

  console.log(editUnitFlow);
  const { push } = useRouter();
  const onAddingNewUnit = async () => {
    try {
      if (validateAddUnits()) {
        let result = await PropertyAdapter.addUnits(props.propertyID, {
          unit_id: unit,
          unit_type: unitType,
          bedroom_count: noOfBedroom,
          no_of_bathroom: noOfBathroom,
        });

        if (result) {
          setaddUnitStatus(true);
          setIsAddingUnit(false);
          let property = await PropertyAdapter.getPropertyByID(
            props.propertyID
          );
          refetchProperty(true);
          props.setProperty(property[0]);
        }else{
          setIsAddingUnit(false);
          setaddUnitStatus(false);
          setUnAuthorisedError(true);
          console.log("Error adding units")
        }
      } else {
        console.log("check your details");
      }
    } catch (ex) {
      console.error("Error at onAddingNewUnit");
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

  const validateAddUnits = () => {
    try {
      if (unit == "") {
        setUnitErrorText("Unit number cannot be empty");
      }
      if (noOfBedroom == "") {
        setBedroomCountError("Bedroom count cannot be empty");
      }
      if (noOfBathroom == "") {
        setBathroomCountError("Bathroom count cannot be empty");
      }

      if (unit == "" || noOfBedroom == "" || noOfBathroom == "") {
        return false;
      } else {
        setIsAddingUnit(true);
        return true;
      }
    } catch (ex) {
      console.log("Error at validateAddUnits");
    }
  };
  const [unit, setUnit] = useState(unitInfo ? unitInfo.unit_id : "");
  const [unitType, setUnitType] = useState(unitInfo ? unitInfo.unit_type : "");
  const [noOfBedroom, setNoOfBedroom] = useState(
    unitInfo ? unitInfo.bedroom_count : ""
  );
  const [noOfBathroom, setNoOfBathroom] = useState(
    unitInfo ? unitInfo.no_of_bathroom : ""
  );
  const [unitErrorText, setUnitErrorText] = useState("");
  const [bedroomCountError, setBedroomCountError] = useState("");
  const [bedCountError, setBedCountError] = useState("");
  const [bathroomCountError, setBathroomCountError] = useState("");
  const handleUnitChange = (_newUnit) => {
    console.log(_newUnit);
    try {
      setUnit(_newUnit);
      setUnitErrorText("");
    } catch (ex) {
      console.log("Error at handleUnitChange", ex);
    }
  };
  console.log(unit);

  const handleUnitTypeChange = (_newUnitType) => {
    try {
      setUnitType(_newUnitType);
    } catch (ex) {
      console.log("Error at handleUnitTypeChange", ex);
    }
  };

  const handleBedroomChange = (_noOfBedroom) => {
    try {
      setNoOfBedroom(_noOfBedroom);
      setBedroomCountError("");
    } catch (ex) {
      console.error("Error at handleBedroomChange", ex);
    }
  };
  const handleBathroomChange = (_noOfBathroom) => {
    try {
      setNoOfBathroom(_noOfBathroom);
      setBathroomCountError("");
    } catch (ex) {
      console.error("Error at handleBathroomChange", ex);
    }
  };
  const onEditingUnit = async () => {
    if (validateAddUnits()) {
      let result = await PropertyAdapter.editUnit(
        props.propertyID,
        props.unitId,
        {
          unit_id: unit,
          unit_type: unitType,
          bedroom_count: noOfBedroom,
          no_of_bathroom: noOfBathroom,
        },
        props.userInfo
      );
      console.log(result);
      if (result?.id) {
        refetchProperty(true);
        setEditUnitStatus(true);
        // setShowEditUnit(false)
        // let property = await PropertyAdapter.getPropertyByID(props.propertyID);
        // refetchProperty(true);
      }else{
        setIsAddingUnit(false);
        setEditUnitStatus(false);
        setUnAuthorisedError(true);
      }
    }
  };
  console.log(addUnitStatus);
  console.log(editUnitStatus);
  console.log(unAuthorisedError);
  const handleUnauthorisedErrorClose = () =>{
    if(editUnitFlow){
      setShowEditUnit(false);
      setEditUnitStatus(false);
      setUnAuthorisedError(false);
    }else{
      setUnAuthorisedError(false);
      onClose();
    }
      
  }
  return (
    <>
      <div className="add-unit">
        <div className="add-unit__header-wrapper">
          
          {addUnitStatus == false && editUnitStatus == false && unAuthorisedError === false && (
            <>
              <div>
                <Input
                  errorText={unitErrorText}
                  onChange={handleUnitChange}
                  value={unit}
                  name="unit-box"
                  type="text"
                  label="Unit Number"
                  placeholder="N200"
                  inputStyle={{
                    width: "82px",
                  }}
                />

                <Input
                  onChange={handleUnitTypeChange}
                  value={unitType}
                  name="unit-Type"
                  type="text"
                  label="Unit Code"
                  placeholder="One_A925"
                  inputStyle={{
                    width: "82px",
                  }}
                />
                <Input
                  errorText={bedroomCountError}
                  onChange={handleBedroomChange}
                  value={noOfBedroom}
                  min={0}
                  onKeyDown={handleKeyDown}
                  name="bedroom_count"
                  type="number"
                  label="Bedroom(s) count"
                  placeholder="1"
                  inputStyle={{
                    width: "82px",
                  }}
                />
                <Input
                  errorText={bathroomCountError}
                  onChange={handleBathroomChange}
                  value={noOfBathroom}
                  min={0}
                  onKeyDown={handleKeyDown}
                  name="no_of_bed"
                  type="number"
                  label="Bathroom(s) count"
                  placeholder="1"
                  inputStyle={{
                    width: "82px",
                  }}
                />
              </div>
              <div className="Add-btn">
                <Button
                  btnText={editUnitFlow ? "Edit Units" : "Add Units"}
                  btnTheme="primary"
                  btnType="rounded"
                  testID="tenants-button"
                  buttonStatus={isAddingUnit}
                  buttonClick={editUnitFlow ? onEditingUnit : onAddingNewUnit}
                  additionalStyles={{ paddingBottom: "0px" }}
                />
              </div>
            </>
          )}
          </div>
       
        {addUnitStatus == true && (
          <div className="Add-btn">
            <div className="popup-text">
              <Label
                type={LabelType.Header}
                text={"Your Unit(s) Saved Successfully!"}
                variant={LabelVariant.L2}
              />
            </div>
            <AnimatedCheck />
            <Button
              btnText="Close"
              btnTheme="primary"
              btnType="rounded"
              testID="tenants-button"
              buttonClick={onClose}
            />
          </div>
        )}
        </div>
        
        {editUnitStatus === true && (
          <div className="Add-btn">
            <div className="popup-text">
              <Label
                type={LabelType.Header}
                text={"Your Unit(s) Edited Successfully!"}
                variant={LabelVariant.L2}
              />
            </div>
            <AnimatedCheck />
            <Button
              btnText="Close"
              btnTheme="primary"
              btnType="rounded"
              testID="tenants-button"
              buttonClick={() => {
                setShowEditUnit(false);
                setEditUnitStatus(false);
              }}
            />
          </div>
        )}
        {unAuthorisedError === true && (
          <UnAuthorisedPopup errorHeaderText={editUnitFlow ? "Error Editing Units":"Error Adding Units"} handleUnAuthorizedClose={handleUnauthorisedErrorClose} />
        )}
     
    </>
  );
};

export default AddUnits;
