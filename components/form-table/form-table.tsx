"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../button/button"; // Import Button component if not already imported
import {
  getButtonStatusText,
  getButtonStatusTextforPM,
} from "../../utils/user-dashboard-utils";
import Send from "../../public/assets/icons/send-icon.svg";
import "./form-table.scss";
import { getFileName } from "../../utils/string-utils";
import Delete from "../../public/assets/icons/garbage.svg";
import UploadInputArray from "../upload-input-array/upload-input-array";
import Select from "react-select";
import Form from "../../public/assets/icons/pdf.svg";
import Modal, { ModalTypes } from "../modal/modal";
import QuestionnaireAdapter from "../../services/adapters/questionnaire-adapter";
import { getOptions } from "../../utils/table-utils";
import { v4 as uuidv4 } from "uuid";
import { useQuestionnaires } from "../../services/hooks/useQuestionnaires";
import MappingAdapter from "../../services/adapters/mapping-adapter";
import Back from "../../public/assets/icons/back_icon.svg";
import { FaPlus } from "react-icons/fa";
import Input from "../input/input";
import { LabelType } from "../label/label";
import TextArea from "../text_area/text_area";
import { FaPlusCircle } from "react-icons/fa";
function FormTable(props) {
  const {
    formInfo,
    handleNavigateToRentalForm,
    getFileIconByStatus,
    propertyID = "",
    rentalID = "",
    userInfo,
    handleDeleteForm,
    flow = "",
    writeOnlyPermission = true,
    tenantID = "",
    navigateToForm,
    unitId = "",
    navigateToSignedForm,
    currentQuestion = null,
    createTask = false,
    setCreateTask = () => {},
    setSyncRequired = () => {},
  } = props;
  console.log("FormTableProps", props);
  const handleDeleteRow = (formID) => {
    handleDeleteForm(formID, tenantID, rentalID);
  };
  const handleSelectInputType = (label, data) => {
    console.log(`Received data for ${label}:`, data);
    setAttachments(data);
  };
  const [questionnaireTitle, setQuestionnaireTitle] = useState("");
  const [isQuestionnaireTitleError, setIsQuestionnaireTitleError] =
    useState(false);
  const [questionnaireTitleErrorMessage, setQuestionnaireTitleErrorMessage] =
    useState("");
  const [questionText, setQuestionText] = useState("");
  const [isQuestionTextError, setIsQuestionTextError] = useState(false);
  const [questionTextErrorMessage, setQuestionTextErrorMessage] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [isQuestionDescriptionError, setIsQuestionDescriptionError] =
    useState(false);
  const [questionDescriptionErrorMessage, setQuestionDescriptionErrorMessage] =
    useState("");
  const [attachments, setAttachments] = useState([]);
  const [isAttachmentsError, setIsAttachmentsError] = useState(false);
  const [attachmentsErrorMessage, setAttachmentsErrorMessage] = useState("");
  const [errorMsgs, setErrorMsgs] = useState([]);
  const { setRefetchQuestions, questionSyncRequired } = useQuestionnaires();
  const quesOptions = [{ label: "File", value: "file" }];
  const isValidate = () => {
    let isValid = true;
    if (attachments.length === 0) {
      setIsAttachmentsError(true);
      setAttachmentsErrorMessage("*Attachments cannot be empty");
      isValid = false;
    } else {
      setIsAttachmentsError(false);
    }
    if (questionnaireTitle === "") {
      setIsQuestionnaireTitleError(true);
      setQuestionnaireTitleErrorMessage("*Questionnaire Title cannot be empty");
      isValid = false;
    } else {
      setIsQuestionnaireTitleError(false);
    }
    if (questionText === "") {
      setIsQuestionTextError(true);
      setQuestionTextErrorMessage("*Question text cannot be empty");
      isValid = false;
    } else {
      setIsQuestionTextError(false);
    }
    if (questionDescription === "") {
      setIsQuestionDescriptionError(true);
      setQuestionDescriptionErrorMessage("*Question text cannot be empty");
      isValid = false;
    } else {
      setIsQuestionDescriptionError(false);
    }
    return isValid;
  };
  console.log(errorMsgs);
  const handleCreateAndAssignTask = async (e) => {
    e.stopPropagation();
    if (isValidate()) {
      let question = {
        ...currentQuestion,
        code: currentQuestion?.question_code,
        question_id: "root",
        options: getOptions(attachments),
        text: questionText,
        description: questionDescription,
      };
      let questionnaire = { title: questionnaireTitle, questions: [question] };
      let createQuestionResponse = await QuestionnaireAdapter.addQuestionnaire(
        questionnaire,
        userInfo
      );
      console.log(createQuestionResponse);
      if (createQuestionResponse) {
        setRefetchQuestions(true);
      }
      if (!questionSyncRequired) {
        let result = await QuestionnaireAdapter.sendClientForm(rentalID, {
          createTaskFlow: true,
          required_forms: [
            {
              name: questionnaireTitle,
              qaId: createQuestionResponse?.id,
            },
          ],
          tenant_ids: [tenantID],
        },unitId);
        if(result){
          console.log(result);
          setSyncRequired(true);
          setQuestionnaireTitle("");
          setQuestionText("");
          setQuestionDescription("");
          setAttachments([]);
          setCreateTask(false);
        }else{
          console.log("Do none")
        }
      } else {
        console.log("Question might not be created yet");
      }
    }
    // setCreateTask(false);
    // setInputArrayData([]);
  };
  const handleQuestionnaireChange = (_title) => {
    console.log(_title);
    setQuestionnaireTitle(_title);
    setQuestionnaireTitleErrorMessage("");
    setIsQuestionnaireTitleError(false);
  };
  const handleQuestionTextChange = (_text) => {
    setQuestionText(_text);
  };

  const handleQuestionDescriptionChange = (_description) => {
    setQuestionDescription(_description);
  };

  return createTask ? (
    <div className="create-tasks">
      <div className="form-table__create-text" >
        <div className="form-table__icon" onClick={() => setCreateTask(!createTask)}>
          <Back  />
        </div>
        <div className="form-table__check-icon">
          <FaPlus color="white" onClick={(e) => {
            handleCreateAndAssignTask(e);
          }}/>
        </div>
        <div>
          <label className="form-table__create-text">Create Task</label>
        </div>
      </div>
      <div
        className="create-tasks__section-wrapper">
        <div className="create-tasks__input-wrapper">
          <Input
            type="text"
            label="Questionnaire title"
            name="question_text"
            errorText={questionnaireTitleErrorMessage}
            placeholder="Enter questionnaire title"
            value={questionnaireTitle}
            labelStyle={{ fontSize: "0.7rem" }}
            wrapperStyle={{ padding: 0, margin: 0 }}
            errored={isQuestionnaireTitleError}
            onChange={handleQuestionnaireChange}
            onFocus={()=>
              {setIsQuestionnaireTitleError(false);
              setQuestionnaireTitleErrorMessage("");
            }
            }
            labelType={LabelType.SubHeader}
            inputStyle={{
              outline: "none",
              // height: "50px",
              width: "95%",
              background: "rgb(250,250,250)",
              border: "none",
              borderBottom: isQuestionnaireTitleError
                ? "1px solid red"
                : "1px solid transparent",
            }}
          />
        </div>
        <div
          className="create-tasks__input-wrapper"
          style={{ display: "flex", gap: "12px" }}
        >
          <TextArea
            value={questionText}
            errored={isQuestionTextError}
            errorMessage={questionTextErrorMessage}
            onChangeText={handleQuestionTextChange}
            onFocus={() => {
              setIsQuestionTextError(false);
              setQuestionTextErrorMessage("");
            }}
            placeholder="Enter Question Text"
            extraTextAreaStyles={{
              width: "90%",
              background: "rgb(250,250,250)",
              border: "none",
              marginRight: "12px",
              borderBottom: isQuestionTextError
                ? "1px solid red"
                : "1px solid transparent",
            }}
            label="Question Text"
          />
          <TextArea
            errored={isQuestionDescriptionError}
            errorMessage={questionDescriptionErrorMessage}
            value={questionDescription}
            onChangeText={handleQuestionDescriptionChange}
            placeholder="Enter Question Description"
            onFocus={() => {
              setIsQuestionDescriptionError(false);
              setQuestionDescriptionErrorMessage("");
            }}
            extraTextAreaStyles={{
              width: "90%",
              background: "rgb(250,250,250)",
              border: "none",
              borderBottom: isQuestionDescriptionError
                ? "1px solid red"
                : "1px solid transparent",
            }}
            label="Question Description"
          />
        </div>
        <div>
          <UploadInputArray
            label="exampleLabel"
            iconType="exampleIcon"
            errorMsg={"*Attachment name cannot be empty"}
            formHelperText={"Attachments"}
            placeHolder="Enter attachment name"
            items={attachments}
            inputDataType="text"
            displayName="Item"
            setErrorMsgs={setErrorMsgs}
            onSelectInputType={handleSelectInputType}
            errorMsgForAttachmentsNotFilled={attachmentsErrorMessage}
            onInputFocus={() => {
              setAttachmentsErrorMessage("");
              setIsAttachmentsError(false);
            }}
            flow="form_table"
            inputStyle={{
              border: "none",
              borderBottom: "1px solid transparent",
              outline: "none",
              width: "46.5%",
              padding: "12px 0",
              background: "rgb(250,250,250)",
              paddingLeft: "12px",
            }}
            extraItemArrayWrapperStyles={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "12px",
              border: "0.5px solid lightgray",
              width: "45%",
              padding: "12px",
            }}
            extraInputArrayStyles={{ margin: 0 }}
            extraItemStyles={{ margin: 0 }}
            extraItemWrapperStyles={{
              width: "90%",
              padding: "12px",
              margin: 0,
              gap: "12px",
              flexDirection: "column",
            }}
            errorMessageStyle={{
              color: "#db4537",
              fontSize: "0.9rem",
              padding: 0,
            }}
          />
        </div>
      </div>
      <div className="create-tasks__button">
        <Button
          btnText={"Create Task"}
          buttonClick={(e) => {
            handleCreateAndAssignTask(e);
          }}
          btnTheme="primary"
          btnType="rectangle"
          additionalStyles={{ padding: 0 }}
        />
      </div>
    </div>
  ) : (
    <div className="table-responsive">
      <table className="table table-hover" id="pc-dt-simple">
        <thead className="table-header-div">
          <tr>
            {<th className="table-header-text">Form Name</th>}
            {writeOnlyPermission && (
              <th className="table-header-text">Actions</th>
            )}
            {<th className="table-header-text">Status</th>}
            {writeOnlyPermission && flow === "property-manager" && (
              <th className="table-header-text">Dismiss</th>
            )}
          </tr>
        </thead>
        <tbody>
          {formInfo &&
            formInfo.map((_form, index) => (
              <tr key={_form.file_id}>
                <td className="table-body-tabs">
                  <div className="row align-items-center">
                    <div className="col-auto pe-0"></div>
                    <div className="col">
                      <h6 className="mb-2">
                        <span className="text-truncate w-100">{`${index + 1}) ${
                          _form.qaTitle || _form.qaName
                        }`}</span>
                      </h6>
                    </div>
                  </div>
                </td>
                {writeOnlyPermission && (
                  <td className="table-body-tabs">
                    <span className="table-body-action">
                      {flow === "property-manager" && !createTask && (
                        <div
                          style={{
                            marginRight: "4px",
                            display: "inline-block",
                          }}
                        >
                          <Button
                            btnText={getButtonStatusTextforPM(_form)}
                            btnType="rounded"
                            buttonClick={() => {
                              if (_form.status === "pending") {
                                navigateToForm(
                                  _form.formID,
                                  tenantID,
                                  rentalID,
                                  propertyID,
                                  unitId
                                );
                              } else if (_form.status === "signed") {
                                navigateToSignedForm(
                                  _form.formID,
                                  tenantID,
                                  rentalID,
                                  propertyID,
                                  unitId
                                );
                              } else {
                                console.log("no actions");
                              }
                            }}
                            buttonStatus={
                              !(
                                _form.status === "pending" ||
                                _form.status === "signed"
                              )
                            }
                            btnTheme={"task-table-primary"}
                            additionalStyles={{ padding: 0 }}
                          />
                        </div>
                      )}
                      {flow !== "property-manager" && !createTask && (
                        <Button
                          btnText={getButtonStatusText(_form)}
                          btnType="rounded"
                          buttonClick={() => {
                            handleNavigateToRentalForm(
                              _form.file_status,
                              rentalID,
                              userInfo?.id,
                              _form.file_id
                            );
                          }}
                          buttonStatus={
                            _form.file_status !== "new" &&
                            _form.file_status !== "reject" &&
                            _form.file_status !== "review" &&
                            _form.file_status !== "submitted"
                          }
                          btnTheme={
                            _form.file_status === "signed" ||
                            _form.file_status === "submitted"
                              ? "task-table-success"
                              : "questionnaire-task-table-primary"
                          }
                          additionalStyles={{ padding: 0 }}
                        />
                      )}
                    </span>
                  </td>
                )}

                <td className="text-end f-w-600">
                  <div
                    className="table__body-tab"
                    style={{
                      justifyContent:
                        flow === "property-manager" ? "flex-start" : "center",
                    }}
                  >
                    {getFileIconByStatus(
                      flow === "property-manager"
                        ? _form.status
                        : _form.file_status
                    )}
                    {_form.file_status === "reject" || _form.status === "reject"
                      ? "Changes requested"
                      : _form.file_status || _form.status}
                  </div>
                </td>
                {writeOnlyPermission && flow === "property-manager" && (
                  <td className="table-body-tabs">
                    <span className="table-body-action">
                      <Delete onClick={() => handleDeleteRow(_form.formID)} />
                    </span>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormTable;
