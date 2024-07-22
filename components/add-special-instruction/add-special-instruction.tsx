"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../button/button";
import "./add-special-instruction.scss";
import Select from "react-select";
import Input from "../input/input";
import MappingAdapter from "../../services/adapters/mapping-adapter";
import { useUserInfo } from "../../services/hooks/useUserInfo";
import { getFileName } from "../../utils/string-utils";
import QuestionnaireAdapter from "../../services/adapters/questionnaire-adapter";
import Multiselect from "multiselect-react-dropdown";

interface AddSpecialInstructionProps {
  onClose: () => void;
  onCreateSpecialInfo: (specialInfo: SpecialInfoType) => void;
}

interface SpecialInfoType {
  form_name: SelectOptionType;
  form_field: SelectOptionType;
  field_operator: SelectOptionType;
  field_expected_value: string;
  form_field_intent: SelectOptionType;
  form_field_value: any[];
}

interface SelectOptionType {
  label?: string;
  value?: string;
  group?: string;
  id?: string;
}

const AddSpecialInstruction: React.FC<AddSpecialInstructionProps> = (
  props
) => {
  const { userInfo } = useUserInfo();
  const { onClose, onCreateSpecialInfo } = props;

  const [selectedPrimaryProgramRule, setSelectedPrimaryProgramRule] = useState<SelectOptionType>({
    label: "Select forms to send",
    value: "",
  });
  const [selectedFormField, setSelectedFormField] = useState<SelectOptionType>({
    label: "Select field",
    value: "",
  });
  const [selectedFormFieldOperator, setSelectedFormFieldOperator] = useState<SelectOptionType>({
    label: "Equal to",
    value: "equals",
  });
  const [selectedRole, setSelectedRole] = useState<SelectOptionType>({
    label: "Select Role",
    value: "",
  });
  const [fieldValue, setFieldValue] = useState<string>("");
  const [formDropDown, setFormDropDown] = useState<boolean>(false);
  const [documentDropDown, setDocumentDropDown] = useState<boolean>(false);
  const [selectedForms, setSelectedForms] = useState<SelectOptionType[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<SelectOptionType[]>([]);
  const [selectedProgramType, setSelectedProgramType] = useState<SelectOptionType>({
    label: "Select Program Type",
    value: "",
  });
  const [forms, setForms] = useState<SelectOptionType[]>([]);
  const [groupForms, setGroupForms] = useState<SelectOptionType[]>([]);
  const [questionCodes, setQuestionCodes] = useState<SelectOptionType[]>([]);
  const [valueError, setValueError] = useState<boolean>(false);

  const formFieldOperationOptions: SelectOptionType[] = [
    { value: "equals", label: "Equal to" },
    { value: "lesser", label: "Less than" },
    { value: "greater", label: "Greater than" },
    { value: "notequal", label: "Not equal" },
  ];

  const roleOptions: SelectOptionType[] = [
    { value: "send_forms", label: "Send Forms" },
    { value: "send_documents", label: "Send Documents" },
  ];

  const documentOptions = [
    { group: "Documents", option: "License", value: "license", id: uuidv4() },
    { group: "Documents", option: "Passport", value: "passport", id: uuidv4() },
  ];

  const programOptions: SelectOptionType[] = [{ value: "none", label: "None" }];

  useEffect(() => {
    const getAllForms = async () => {
      try {
        if (userInfo) {
          let res = await QuestionnaireAdapter.getListingsByPropertyManagerID(userInfo);
          if (res && res.length > 0) {
            setForms(
              res
                .filter((forms) => forms.available && forms.qaId)
                .map((forms) => ({
                  label: getFileName(forms.name),
                  value: forms.qaId,
                }))
            );
            setGroupForms(
              res
                .filter((forms) => forms.available && forms.qaId)
                .map((forms) => ({
                  group: "Forms",
                  option: getFileName(forms.name),
                  id: forms.qaId,
                }))
            );
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllForms();
  }, [userInfo]);

  useEffect(() => {
    const getAllFields = async () => {
      try {
        let res = await MappingAdapter.fetchQuestionCodes(userInfo, ""); //Added empty value for questionnaire id, this special instruction page is going to be removed
        if (res) {
          let _options = res.map((x) => ({ label: x.label, value: x.question_code }));
          setQuestionCodes(_options);
        } else {
          console.log("Fetch question code error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllFields();
  }, [userInfo]);


  const getDataByRole = (role) => {
    if (role === "send_forms") {
      return selectedForms;
    } else if (role === "send_documents") {
      return selectedDocuments;
    } else {
      return [];
    }
  };

  const handleAddSpecialInstruction = () => {
    let specialInfo: SpecialInfoType = {
      form_name: selectedPrimaryProgramRule,
      form_field: selectedFormField,
      field_operator: selectedFormFieldOperator,
      field_expected_value: fieldValue,
      form_field_intent: selectedRole,
      form_field_value: getDataByRole(selectedRole && selectedRole.value),
    };
    onCreateSpecialInfo(specialInfo);
  };

  const handleClose = () => {
    onClose();
  };

  const handleCheckValue = (text: string) => {
    setFieldValue(text);
  };



  const handleRoleChange = (role) => {
    setSelectedRole(role);
    getRoleStatus(role.value);
  };

  const getRoleStatus = (role: string) => {
    if (role === "send_forms") {
      setFormDropDown(true);
      setDocumentDropDown(false);
    } else if (role === "send_documents") {
      setDocumentDropDown(true);
      setFormDropDown(false);
    } else {
      setFormDropDown(false);
      setDocumentDropDown(false);
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

  const onSelectForm = (selectedList: SelectOptionType[], selectedItem: SelectOptionType) => {
    setSelectedForms(selectedList);
  };

  const onRemoveForm = (selectedList: SelectOptionType[], removedItem: SelectOptionType) => {
    setSelectedForms(selectedList);
  };

  const onSelectDocument = (selectedList: SelectOptionType[], selectedItem: SelectOptionType) => {
    setSelectedDocuments(selectedList);
  };

  const onRemoveDocument = (selectedList: SelectOptionType[], removedItem: SelectOptionType) => {
    setSelectedDocuments(selectedList);
  };
  return (
    <div className="add-special-instruction">
      <div className="add-special-instruction__header-section">
        Add a special instruction to Echo allows the system to automatically
        take actions once the tenant contacts the Echo system.
      </div>
      <div className="add-special-instruction__first-row">
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">
            Form Name
          </label>
          <Select
            className="add-special-instruction__select-menu"
            defaultValue={selectedPrimaryProgramRule}
            styles={customStyles}
            onChange={(val) => {
              let data = val;
              if (val == null) {
                data = {
                  value: null,
                  label: "Any",
                };
              }
              setSelectedPrimaryProgramRule(data);
            }}
            options={forms}
            value={selectedPrimaryProgramRule}
            isLoading={forms.length === 0}
            loadingMessage={() => "Loading...."}
          />
        </div>
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">
            Form Field
          </label>
          <Select
            className="add-special-instruction__select-menu"
            defaultValue={selectedFormField}
            styles={customStyles}
            onChange={(val) => {
              let data = val;
              if (val == null) {
                data = {
                  value: null,
                  label: "Any",
                };
              }
              setSelectedFormField(data);
            }}
            options={questionCodes}
            value={selectedFormField}
          />
        </div>
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">
            Field Operator
          </label>
          <Select
            className="add-special-instruction__select-menu"
            defaultValue={selectedFormFieldOperator}
            styles={customStyles}
            onChange={(val) => {
              let data = val;
              if (val == null) {
                data = {
                  value: null,
                  label: "Any",
                };
              }
              setSelectedFormFieldOperator(data);
            }}
            options={formFieldOperationOptions}
            value={selectedFormFieldOperator}
          />
        </div>
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">Value</label>
          <Input
            placeholder="Enter Value"
            label=""
            errored={false}
            onChange={handleCheckValue}
            dataTestId="name-input"
            onBlur={() => { }}
            value={fieldValue}
            name="name"
            type="text"
            inputStyle={{
              width: "90%",
              padding: "10px",
              margin: "4px 0",
              borderRadius: "4px",
            }}
            wrapperStyle={{ margin: 0 }}
            labelStyle={{ margin: 0 }}
          />
        </div>
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">
            Select Roles to Send
          </label>
          <Select
            className="add-special-instruction__select-menu"
            defaultValue={selectedRole}
            onChange={handleRoleChange}
            options={roleOptions}
            value={selectedRole}
            styles={customStyles}
          />
        </div>
        {formDropDown && (
          <div className="add-special-instruction__field">
            <label className="add-special-instruction__select-label">
              Select Forms to Send
            </label>
            <Multiselect
              className={"add-special-instruction__multi-select"}
              options={groupForms}
              selectedValues={selectedForms}
              displayValue="option"
              groupBy="group"
              placeholder="Select forms"
              onSelect={onSelectForm}
              onRemove={onRemoveForm}
              showCheckbox={true}
              hidePlaceholder={selectedForms.length !== 0}
            />
          </div>
        )}
        {documentDropDown && (
          <div className="add-special-instruction__field">
            <label className="add-special-instruction__select-label">
              Select Documents to Send
            </label>
            <Multiselect
              className={"add-special-instruction__multi-select"}
              options={documentOptions}
              selectedValues={selectedDocuments}
              displayValue="option"
              groupBy="group"
              placeholder="Select forms"
              onSelect={onSelectDocument}
              onRemove={onRemoveDocument}
              showCheckbox={true}
              hidePlaceholder={selectedDocuments.length !== 0}
            />
          </div>
        )}
        <div className="add-special-instruction__field">
          <label className="add-special-instruction__select-label">
            Select Program Type
          </label>
          <Select
            className="add-special-instruction__select-menu"
            defaultValue={selectedProgramType}
            styles={customStyles}
            onChange={(val) => {
              let data = val;
              if (val == null) {
                data = {
                  value: null,
                  label: "Any",
                };
              }
              setSelectedProgramType(data);
            }}
            options={programOptions}
            value={selectedProgramType}
          />
        </div>
      </div>
      <div className="add-special-instruction__second-row">
        <Button
          btnText="+ Add Rule"
          btnTheme="primary"
          btnType="outline"
          testID="my-properties-add-button"
          buttonClick={handleAddSpecialInstruction}
        />
      </div>
    </div>
  );
};

export default AddSpecialInstruction;
