import React, { useState, useEffect } from "react";
import "./create-question.scss";
import SunEditor from "suneditor-react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../../components/button/button";
import Close from "../../../../public/assets/icons/close.svg";
import MappingAdapter from "../../../../services/adapters/mapping-adapter";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import UploadInputArray from "../../../../components/upload-input-array/upload-input-array";
import AddField from "../../../../components/add-field/add-field";
import {
  getAnswerType,
  getCurrentQuestionCode,
  getCurrentQuestionType,
  getErrorMsg,
  getHelperText,
  getInputArrayData,
  removeTagsAndnbsp,
} from "../../../../utils/question-utils";
import Input from "../../../../components/input/input";
import CustomClearIndicator from "../../../../components/multi-select/multi-select";

const CreateQuestion = (props) => {
  const { userInfo } = useUserInfo();

  const {
    onCreateQuestion,
    setSideBarStatus,
    sideBarStatus,
    activeQuestionFlow,
    activeQuestionID,
    setActiveQuestionID,
    buttonStatus,
    setButtonStatus,
    setActiveIndex,
    setActiveQuestionFlow,
    activeIndex,
    target,
    flow,
    showCloseIcon = true,
    showCreateQuestion = true,
    questionFieldCode = "",
    questionFieldLabel = "",
    setQuestionFieldCode,
    setQuestionFieldLabel,
    resetStatus = false,
    setResetStatus,
    editFlowQuestions,
    allQuestions = [],
  } = props;
  
  let [answerType, setAnswerType] = useState({
    value: "text_short",
    label: "Text (Short)",
  });
  let [fieldCode, setFieldCode] = useState(null);
  let [questionText, setQuestionText] = useState("");
  let [questionDescription, setQuestionDescription] = useState("");
  const [questionError, setQuestionError] = useState("");
  let [fieldCodeQuestions, setFieldCodeQuestions] = useState([]);
  let [fieldCodeOptions, setFieldCodes] = useState([]);
  
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [needSync, setSyncRequired] = useState(false);
  const [inputArrayData, setInputArrayData] = useState([]);
  const [errorMsgs, setErrorMsgs] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    const getAllFields = async () => {
      try {
        let res = await MappingAdapter.fetchQuestionCodes(userInfo,activeQuestionID);
        if (res) {
          let _options = [];
          let _questions = [];
          res.map((x) => {
            
            let question = { label: x.label, code: x.question_code, text: x.text, description: x.description, answer_type: x.answer_type };
            if (Array.isArray(x.options)) {
              (question as any).options = x.options;
            }
            if (!question.label.isNullOrEmpty && !question.code.isNullOrEmpty) {
              _questions.push(question);
              _options.push({ label: x.label, value: x.question_code });              
            } else {
              console.warn("Invalid question code or label: " + x.question_code + ", " + x.label);
            }
          });
          // This list has all the standard codes as well as their standard questions as well as the active questions. 
          // This is not the same as allQuestions which only has the questions that are part of the current questionnaire.
          setFieldCodeQuestions(_questions);
          setFieldCodes(_options);
          setSyncRequired(false);
        } else {
          console.log("Fetch question code error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllFields();
  }, [userInfo, needSync]);
  console.log(fieldCodeOptions)
  const handleSelectInputType = (label, data) => {
    console.log(`Received data for ${label}:`, data);
    setInputArrayData(data);
  };
  function displayPreviousQuestion(currentQuestion, allQuestions) {
    const previousQuestion = allQuestions?.find(
      (question) => question.id === currentQuestion.source
    );
    if (previousQuestion !== undefined) {
      setSelectedPreviousQuestion({
        value: previousQuestion.id,
        label: removeTagsAndnbsp(previousQuestion.text),
      });
      setSelectedPreviousQuestionOptions(
        previousQuestion.id,
        currentQuestion.id,
        activeQuestionFlow
      );
    } else {
      setSelectedPreviousQuestion({
        value: "",
        label: "Select previous question",
      });
      setSelectedPreviousQuestionOptions("", "", activeQuestionFlow);
    }
    console.log(previousQuestion);
  }
  function displayCurrentQuestion(currentQuestion){
    
    if (currentQuestion && fieldCodeOptions.length!==0) {
      console.log(currentQuestion);
      setActiveQuestion(currentQuestion);
      displayPreviousQuestion(currentQuestion, activeQuestionFlow); // Also sets previous question.
      setQuestionText(currentQuestion.text);
      selectAnswerType(
        getCurrentQuestionType(answerTypeOptions, currentQuestion.answer_type)
      );
      setInputArrayData(getInputArrayData(currentQuestion));
      setQuestionDescription(currentQuestion.description);
      setSelectedFieldCode(
        getCurrentQuestionCode(fieldCodeOptions, currentQuestion.code)
      );
    }else{
      console.log("No category options or currentQuestion found")
    }
  }

  function displayQuestionFromFieldCode(field_code){
    // Check to see if there is already a question in the questionnaire with that code.
    let currentQuestion = allQuestions.find(question => question.code === field_code.value);
    if (!currentQuestion) {
      // Check fieldCodeQuestions here because they include standard questions that are not present in allQuestions.
      currentQuestion = fieldCodeQuestions?.find( (question) => question.code === field_code.value);
    }
    displayCurrentQuestion(currentQuestion);
  }

  useEffect(() => {
    const currentQuestion = activeQuestionFlow?.find(
      (question) => question.id === activeQuestionID
    );

    displayCurrentQuestion(currentQuestion);

  }, [activeQuestionFlow, activeQuestionID, activeQuestion]);
  console.log(inputArrayData);
  useEffect(() => {
    if (activeIndex === 1) {
      setButtonStatus(true);
      setSideBarStatus(false);
      resetQuestionnaire();
    }
  }, [activeIndex]);
  const answerTypeOptions = [
    { value: "text_short", label: "Text (Short)" },
    { value: "text_long", label: "Text (Long)" },
    { value: "radio", label: "True/False (Yes/No)" },
    { value: "multi-select", label: "Multi Select" },
    { value: "number", label: "Number" },
    { value: "currency", label: "Currency" },
    { value: "date", label: "Date" },
    { value: "file", label: "File" },
  ];
  const previousQuestions =
    allQuestions.length !== 0 &&
    allQuestions.map((_question) => ({
      value: _question.id,
      label: removeTagsAndnbsp(_question.text),
    }));

  const [selectedAnswerType, setSelectedAnswerType] = useState({
    value: "text_short",
    label: "Text (Short)",
  });
  const [selectedPreviousQuestion, setSelectedPreviousQuestion] = useState({
    value: "",
    label: "Select previous question",
  });
  const [selectPreviousAnswer, setSelectPreviousAnswer] = useState({
    value: "",
    label: "Select Answer for previous question",
  });
  const [selectedFieldCode, setSelectedFieldCode] = useState(null);
  const selectAnswerType = (category) => {
    try {
      setSelectedAnswerType(category);
      setAnswerType(category);
    } catch (ex) {
      console.error("Error at selectAnswerType");
    }
  };

  const selectFieldCode = (category) => {
    try {
      setSelectedFieldCode(category);
    } catch (ex) {
      console.error("Error at selectFieldCode");
    }
  };
  const hasTextContent = (str) => {
    if (str === null || str === "") return false;
    else str = str.toString();
    const cleanedString = str.replace(/(<([^>]+)>|&nbsp;)/gi, "").trim();
    return cleanedString.length > 0;
  };

  const validateCreateQuestion = (newQuestion) => {
    const errorMessages = [];
    let questionCodeRegex = /^[A-Z]+(?:_[A-Z]+)*$/gm;
    if (!newQuestion.code) {
      errorMessages.push("Please select category");
    }
    if (flow !== "form_mapping" && !newQuestion.answer_type) {
      errorMessages.push("Please select answer type");
    }
    if (flow === "form_mapping") {
      if (questionFieldLabel === "") {
        errorMessages.push("Field label cannot be empty");
      }
    }
    if (flow === "form_mapping") {
      if (!questionCodeRegex.test(questionFieldCode)) {
        errorMessages.push("Field Code is invalid");
      }
    }
    if (!hasTextContent(newQuestion.text.trim())) {
      errorMessages.push("Question text cannot be empty");
    }
    if (!hasTextContent(newQuestion.description.trim())) {
      errorMessages.push("Question description cannot be empty");
    }
    if (
      newQuestion.answer_type === "multi-select" &&
      newQuestion.options.length == 0
    ) {
      errorMessages.push("List items cannot be empty");
    }
    if (newQuestion.answer_type === "radio" && newQuestion.options.length == 0) {
      errorMessages.push("Radio items cannot be empty");
    }
    if (newQuestion.answer_type === "file" && newQuestion.options.length == 0) {
      errorMessages.push("Files cannot be empty");
    }
    if (errorMessages.length > 0) {
      console.log(errorMessages.length);
      setErrorMsgs(errorMessages);
      return false;
    } else {
      return true;
    }
  };
  
  const handleOnEditQuestion = () => {
    console.log("Handle Edit Question called");
    if (activeQuestionFlow !== null) {
      console.log("Active question here");
      onEditQuestion(activeQuestion);
    } else {
      console.log("Active question is null");
    }
  };
  const resetQuestionnaire = () => {
    selectAnswerType({ value: "text_short", label: "Text (Short)" });
    setSelectedFieldCode({});
    setQuestionText("");
    setQuestionDescription("");
    setActiveQuestionID("");
    setInputArrayData([]);
    setIsMultiSelect(false);
    setCurrentOptions([]);
    setSelectPreviousAnswer({
      value: "",
      label: "Select Answer for previous question",
    });
    setSelectedOptions([]);
    setSelectedPreviousQuestion({value:"",label:"Select previous question"});
  };
  console.log(answerType);
  console.log(fieldCode);
  const onEditQuestion = (newQuestion) => {
    
    const editedQuestion = {
      ...newQuestion,
      text: questionText,
      description: questionDescription,
      answer_type: answerType.value,
      code: selectedFieldCode?.value,
      options: getOptions(selectedAnswerType?.value),
      source:selectedPreviousQuestion.value
    };
    onCreateQuestion(editedQuestion,isMultiSelect ? selectedOptions : selectPreviousAnswer,selectedPreviousQuestion);
    setQuestionError("");
    resetQuestionnaire();
  };
  useEffect(() => {
    const resetFileQuestionnaire = () => {
      if (resetStatus) {
        setQuestionText("");
        setQuestionDescription("");
        setInputArrayData([]);
        selectAnswerType({ value: "text_short", label: "Text (Short)" });
        setResetStatus(false);
      }
    };
    resetFileQuestionnaire();
  }, [resetStatus]);
  console.log(selectedPreviousQuestion)
  const getOptions = (selectedAnswerType) => {
    if (
      selectedAnswerType === "multi-select" ||
      selectedAnswerType === "radio" ||
      selectedAnswerType === "file"
    ) {
      let questionOptions = inputArrayData.map((_option) => ({
        value: _option,
        answerType: getAnswerType(selectedAnswerType),
        target:
        //@ts-ignore
          activeQuestion?.options?.find((option) => option.value === _option)
            ?.target || target,
      }));
      return questionOptions;
    } else {
      let questionOptions = [
        {
          value: getAnswerType(selectedAnswerType),
          answerType: selectedAnswerType,
          target: target,
        },
      ];
      return questionOptions;
    }
  };
  const onCreateNewQuestion = () => {
    try {
      let newQuestion : any = {
        ...activeQuestion,
        text: questionText,
        answer_type: answerType?.value,
        code: fieldCode?.value,
        description: questionDescription,
        options: getOptions(selectedAnswerType?.value),
      };
      
      if (validateCreateQuestion(newQuestion)) {
        onEditQuestion(newQuestion);
      } else {
        console.log("Invalid Question");
      }
    } catch (ex) {
      console.error("Error at onCreateNewQuestion");
    }
  };
  const onCreateNewFieldWithQuestion = () => {
    const newQuestion = {
      text: questionText,
      answer_type: answerType.value,
      code: questionFieldCode,
      id: uuidv4(),
      options: getOptions(selectedAnswerType.value),
      description: questionDescription,
    };
    if (validateCreateQuestion(newQuestion)) {
    
      props.onCreateQuestion(newQuestion);
    }
  };
  const handleFieldLabel = (text: string): void => {
    try {
      setQuestionFieldLabel(text);
    } catch (ex) {
      console.error("Error at handleFieldLabel");
    }
  };
  const handleFieldCode = (text: string): void => {
    try {
      setQuestionFieldCode(text);
    } catch (ex) {
      console.error("Error at handleFieldLabel");
    }
  };
  // const customStyles ={

  // }
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      zIndex: 500,
    }),
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      fontSize: "0.9rem",
      fontWeight: "200",
    }),
  };
  function setSelectedPreviousQuestionOptions(_previousQuestionID, _currentQuestionID, allQuestions) {
    // If this is a new question we will not have a _currentQuestionID here.
    if (!_previousQuestionID ) {
      return;
    }
    let previousQuestion =
      allQuestions &&
      allQuestions.find((_question) => _question.id === _previousQuestionID);
    if (previousQuestion) {
      console.log(previousQuestion)
      if(previousQuestion.answer_type === "multi-select"){
        setIsMultiSelect(true);
      }else{
        setIsMultiSelect(false);
      }
      let currentOptions =
        previousQuestion?.options?.length > 0
          ? previousQuestion.options.map((_option) => ({
              label: _option.value,
              value: _option.value,
            }))
          : null;
      
      setCurrentOptions(currentOptions);
      if (_currentQuestionID) {
        // If this is not a new question, then we may have an answer that links to this question. 
        // Find answers to the previous question whose target leads to current question.
        let selectedOption = previousQuestion?.options?.find( (_option) => _option.target === _currentQuestionID);
        if (selectedOption) {
          let chosenOption =  currentOptions.find( (option) => option.value === selectedOption.value);
          setSelectedOptions([chosenOption]);
          setSelectPreviousAnswer({value:chosenOption?.value,label:chosenOption.label})
        }
      }
    }else{
      console.log("no current question found")
    }
  }
  console.log(currentOptions)
  return (
    <div className="">
      <div>
        {sideBarStatus && (
          <div className="side-bar-header">
            <aside className="questions-flow__create">
              <div className="side-bar-header-text">
                Questions
                {showCloseIcon && (
                  <div
                    onClick={() => {
                      setSideBarStatus(false);
                      setButtonStatus(true);
                      resetQuestionnaire();
                    }}
                    className="questions__close-button"
                  >
                    <Close />
                  </div>
                )}
              </div>
              {flow !== "form_mapping" && <div className="side-bar-select-wrapper">
                <label className="side-bar-label">
                  Select Previous Question :
                </label>
                <Select
                  defaultValue={selectedPreviousQuestion}
                  options={previousQuestions}
                  classNames={{
                    control: () => "input_select",
                  }}
                  value={selectedPreviousQuestion}
                  onChange={(val) => {
                    setSelectedPreviousQuestion(val);
                    setSelectedPreviousQuestionOptions(val.value, activeQuestion.id, allQuestions);
                    setErrorMsgs([]);
                  }}
                  styles={customStyles}
                />
              </div>}{" "}

              {flow !== "form_mapping" &&<div className="side-bar-select-wrapper">
                <label className="side-bar-label">
                  Select Answer for Previous Question:
                </label>
                {isMultiSelect ? (
                  <CustomClearIndicator options={currentOptions} setSelectedOptions={setSelectedOptions} selectedOptions={selectedOptions}
                    value={selectedOptions} />
                ) : (
                  <Select
                    defaultValue={selectPreviousAnswer}
                    options={currentOptions}
                    classNames={{
                      control: () => "input_select",
                    }}
                    value={selectPreviousAnswer}
                    onChange={(val) => {
                      setSelectPreviousAnswer(val);
                      setErrorMsgs([]);
                    }}
                    styles={customStyles}
                  />
                )}
              </div>}


              {flow !== "form_mapping" && (
                <div className="side-bar-select-wrapper">
                  <label className="side-bar-label-one">Select Question Code :</label>
                  <Select
                    defaultValue={selectedFieldCode}
                    options={fieldCodeOptions}
                    classNames={{
                      control: () => "input_select",
                    }}
                    value={selectedFieldCode}
                    onChange={(val) => {
                      selectFieldCode(val);
                      setFieldCode(val);
                      displayQuestionFromFieldCode(val);
                    }}
                    styles={customStyles}
                  />
                </div>
              )}

              <div className="side-bar-label-wrapper">
                <label className="side-bar-label-one">
                  Type your questions here
                </label>

                <SunEditor
                  height="100"
                  defaultValue={questionText}
                  setOptions={{ stickyToolbar: -1 }}
                  onChange={(content) => {
                    setQuestionText(content);
                    setErrorMsgs([]);
                  }}
                  setContents={questionText}
                />
                <label className="side-bar-label-two">
                  Type your questions' description here
                </label>
                <SunEditor
                  height="100"
                  setOptions={{ stickyToolbar: -1 }}
                  defaultValue={questionDescription}
                  onChange={(content) => {
                    setQuestionDescription(content);
                    setErrorMsgs([]);
                  }}
                  setContents={questionDescription}
                />
              </div>
              <div className="side-bar-select-wrapper">
                <label className="side-bar-label">Select Answers Type :</label>
                <Select
                  defaultValue={selectedAnswerType}
                  options={answerTypeOptions}
                  classNames={{
                    control: () => "input_select",
                  }}
                  value={selectedAnswerType}
                  onChange={(val) => {
                    selectAnswerType(val);
                    setErrorMsgs([]);
                  }}
                  styles={customStyles}
                />
              </div>
              {selectedAnswerType && (selectedAnswerType.value === "multi-select" ||
                selectedAnswerType.value == "radio" ||
                selectedAnswerType.value === "file") && (
                <UploadInputArray
                  label="exampleLabel"
                  iconType="exampleIcon"
                  errorMsg={getErrorMsg(selectedAnswerType.value)}
                  helperText={getHelperText(selectedAnswerType?.value)}
                  placeHolder="Type here"
                  items={inputArrayData}
                  inputDataType="text"
                  displayName="Item"
                  setErrorMsgs={setErrorMsgs}
                  onSelectInputType={handleSelectInputType}
                />
              )}



              {showCreateQuestion && (
                <Button
                  btnText={activeQuestionID === "" ? "Create" : "Save"}
                  btnTheme="secondary"
                  additionalStyles={{ padding: "0 12px" }}
                  buttonClick={
                    activeQuestionID === ""
                      ? onCreateNewQuestion
                      : handleOnEditQuestion
                  }
                  testID="questions-create"
                />
              )}
              {flow == "form_mapping" && (
                <>
                  <Input
                    type="text"
                    label={"Field name"}
                    value={questionFieldLabel}
                    name="fieldName"
                    placeholder="Field Name"
                    onChange={handleFieldLabel}
                  />
                  <Input
                    type="text"
                    label={"Field code"}
                    value={questionFieldCode}
                    name="fieldCode"
                    placeholder="FIELD_CODE"
                    onChange={handleFieldCode}
                  />
                  <div className="create-question__add-field">
                    <Button
                      btnText={"Add Field"}
                      btnTheme="secondary"
                      additionalStyles={{ padding: "0 12px" }}
                      buttonClick={onCreateNewFieldWithQuestion}
                      testID="questions-create"
                    />
                  </div>
                </>
              )}
              <div className="error-message__wrapper">
                {errorMsgs.length !== 0 &&
                  errorMsgs.map((_error) => (
                    <div className="error-message">{`* ${_error}`}</div>
                  ))}
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* {buttonStatus && (
        <div>
          <Button
            btnText="Create"
            btnType="outline"
            btnTheme="secondary"
            buttonClick={() => {
              setActiveIndex(0);
              setSideBarStatus(true);
              setButtonStatus(false);
            }}
            testID="questions-create-button"
          />
        </div>
      )} */}
    </div>
  );
};

export default CreateQuestion;
