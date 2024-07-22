"use client";

import React, { useState, useEffect } from "react";
import "./rental-form.scss";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import PropertyAdapter from "../../../services/adapters/properties-adapter";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import Info from "../../../public/assets/icons/info.svg";
import FloatingMenu from "../../../components/floating-menu/floating-menu";
import Modal, { ModalTypes } from "../../../components/modal/modal";
import SignatureInput from "../../../components/signature-input/signature-input";
import { useAllProperties } from "../../../services/hooks/useAllProperties";
import Radio from "../../../components/radio/radio";
import Checkbox from "../../../components/checkbox/checkbox";
import AnimatedCheck from "../../../components/animated-check/animated-check";
import QuestionProofsUpload from "../../../components/question-proofs-upload/question-proofs-upload";
import { useRouter } from "next/navigation";
import TenantAdapter from "../../../services/adapters/tenants-adapter";
import { getFileName } from "../../../utils/string-utils";
import LoadingBar from "react-top-loading-bar";

interface RentalFormProps {
  params?: any;
  onClose?: any;
  rentalID?: any;
  propertyID?: any;
  submitButtonStatus?: boolean;
  searchParams?: any;
  activeTenant?: any;
  activeRental?: any;
  activeProperty?: any;
  activeQuestionnaire?: any;
}
const additionalInputStyle = {
  // width: "25rem",
  outlineColor: "rgb(242, 225, 193)",
};
const RentalForm = (props: RentalFormProps) => {
  const { activeRental, activeProperty, activeTenant, activeQuestionnaire } = props;
  const [text, setText] = useState("");
  const [fieldsWithValues, setErrors] = useState({});
  const [errorStatus, setErrorStatus] = useState("");
  const [inputErrorStatus, setInputErrorStatus] = useState("");
  const { setActiveRental, setActiveTenant, setActiveProperty } =
    useAllProperties();
  let propertyID = activeProperty?.map((_property) => _property.property_id);
  let currentProperty =
    propertyID && propertyID.length > 0 ? propertyID[0] : null;
  const [isErrored, setIsErrored] = useState(false);
  const [isInputErrored, setIsInputErrored] = useState(false);
  const [answer, setAnswer] = useState({});
  const [isSuccessfulSubmit, setSubmitStatus] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questionnaire_list, setQuestionniares] = useState(null);
  const [currentQuestionnaireID, setCurrentQuestionnaireID] = useState(null);
  const [questionIndexSync, setQuestionIndexSync] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [questionFlowStarted, setQuestionFlowStarted] = useState(false);
  const [propertyManagerName, setPropertyManagerName] = useState("");
  const [currentQuestionToCheck, setCurrentQuestionToCheck] = useState(null);
  const [formTitles, setFormTitles] = useState([]);
  const [currentPreviousQuestion,setCurrentPreviousQuestion] = useState(null);
  const [isPrevAnsFetched,setIsPrevAnsFetched] = useState(false);
  const [progress,setProgress] = useState(0);
  const { userInfo } = useUserInfo();
  let rentalID = activeRental;
  let tenantID = activeTenant;
  if (rentalID) setActiveRental(activeRental);
  if (tenantID) setActiveTenant(activeTenant);
  const router = useRouter();

  const extractQuestions = (qaSet) => {
    const extractedQuestions = [];

    qaSet?.forEach((item) => {
      if (item.hasOwnProperty("questions")) {
        extractedQuestions.push(...item.questions);
      }
    });
    return extractedQuestions;
  };
  const getForms = (requiredQAs) => {
    if (requiredQAs && requiredQAs.length !== 0) {
      const filteredCollection = requiredQAs.filter(
        (item) => item.tenant_id === activeTenant
      );
      console.log(filteredCollection);
      if (filteredCollection) {
        const titles = filteredCollection?.map((item) =>
          item.requiredForms.map((form) => getFileName(form.title))
        );
        console.log(titles);
        if (titles) {
          const flattenedTitles = [].concat(...titles);
          console.log(flattenedTitles);
          setFormTitles(flattenedTitles);
        } else {
          console.log("No Titles Found");
        }
      } else {
        console.log("No filtered collection found");
      }
    } else {
      console.log("No required qas found");
    }
  };
  const getCurrentQuestion = (questionIndex, allQuestions) => {
    if (allQuestions.length !== 0) {
      console.log(allQuestions);
      let currentQuestion = allQuestions[questionIndex];
      setCurrentQuestionToCheck(currentQuestion);
    } else {
      console.log(allQuestions);
    }
  };
  console.log(currentQuestionToCheck);
  console.log(answer);
  async function getPropertyDetails(property) {
    if (property?.property_id && property?.property_id !== "") {
      getForms(property?.requiredQAs);
      let getPropertyResponse = await PropertyAdapter.getPropertyByID(
        property?.property_id
      );
      if (getPropertyResponse) {
        let propertyManagerID = getPropertyResponse[0].property_manager_id;
        let propertyManagerDetailsResponse = await TenantAdapter.getTenantById(
          propertyManagerID
        );
        if (propertyManagerDetailsResponse) {
          let propertyManagerName = `${propertyManagerDetailsResponse[0]?.first_name} ${propertyManagerDetailsResponse[0]?.last_name}`;
          setPropertyManagerName(propertyManagerName);
        } else {
          console.log("No response in propertyManagerDetailsResponse");
        }
      } else {
        console.log("I am not able to find the property details by ID.");
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setProgress(20);
      try {
        let result = await QuestionnaireAdapter.getQuestionnaireByRentalID(
          activeRental,
          activeTenant,
          activeQuestionnaire
        );
        if (result && result?.qaSet && result?.qaSet?.length > 0) {
          setQuestionniares({
            questionnaire: result.qaSet,
            nextQa: result.nextQA,
          });
          let _allQuestions = extractQuestions(result.qaSet);

          //@ts-ignore
          setAllQuestions(_allQuestions);
          //@ts-ignore
          const rootQuestionIndex = _allQuestions?.findIndex(
            (question) => question.id === result?.nextQA?.question_id
          );
          setQuestionIndexSync(true);

          if (rootQuestionIndex !== -1) {
            setProgress(100)
            let activeQuestionnaireID = result?.nextQA?.questionnaire_id;
            setCurrentQuestionnaireID(activeQuestionnaireID);
            setCurrentQuestionIndex(rootQuestionIndex);
            setQuestionIndexSync(false);
            getCurrentQuestion(rootQuestionIndex, _allQuestions);
          }
        } else {
          console.log("No questionnaire data found");
        }
      } catch (error) {
        console.error("Error fetching questionnaire data:", error);
      }
    };

    const fetchRentalInfo = async () => {
      try {
        let result = await PropertyAdapter.getPropertyByRentalID(activeRental);
        console.log(result);
        if (result) {
          console.log(result);
          setActiveProperty(result);
          let property = result[0];
          console.log(property);
          if (property) {
            await getPropertyDetails(property);
          } else {
            console.log("No property id found");
          }
        } else {
          console.log("No rental property data found");
        }
      } catch (error) {
        console.error("Error fetching rental property data:", error);
      }
    };

    fetchData();
    fetchRentalInfo();
    
  }, [isSuccessfulSubmit, activeRental, activeTenant]);
  useEffect(()=>{
    if(!isPrevAnsFetched){
    fetchAnswers(tenantID,rentalID);
    }else{
      console.log("answers fetched")
    }
  },[rentalID,tenantID,isPrevAnsFetched])
    async function fetchAnswers(tenant_id: string,rental_id:string) {
        const data = await QuestionnaireAdapter.getAnswersByTenantID(tenant_id,rental_id);
        console.log(data)
        console.log(data?.[0])
        if (data && data[0]) {
          setAnswer(data[0]?.answer);
          setIsPrevAnsFetched(true);
        }
    }
  //@ts-ignore
  console.log(answer?.answer);
  const { onClose } = props;
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleDateOfBirthChange = (date: any, id, code, target, actualQues) => {
    setIsErrored(false);
    setErrorStatus("");
    console.log(date);
    // var d = date === null ? return "" : new Date(date);
    if (date !== null) {
      var d = new Date(date);
      let formattedDate = [
        ("0" + (d.getMonth() + 1)).slice(-2),
        ("0" + d.getDate()).slice(-2),
        d.getFullYear(),
      ].join("/");
      try {
        // setDateOfBirth(date);
        setAnswer((prev) => {
          return {
            ...prev,
            [code]: {
              value: [
                { value: formattedDate, answerType: "date", target: target },
              ],
              data_type: "date",
              qaId:actualQues?.id
            },
          };
        });
      } catch (ex) {
        console.error("Error at handleDateOfBirthChange");
      }
    } else {
      try {
        // setDateOfBirth(date);
        setAnswer((prev) => {
          return {
            ...prev,
            [code]: {
              value: [{ value: null, answerType: "date", target: target }],
              data_type: "date",
              qaId:actualQues?.id
            },
          };
        });
      } catch (ex) {
        console.error("Error at handleDateOfBirthChange");
      }
    }
  };
  const isYearInAllowedRange = (year: number) => {
    return year <= 2007;
  };

  const handleChange = (e, target,actualQues) => {
    setIsInputErrored(false);
    setInputErrorStatus("");
    setIsErrored(false);
    setErrorStatus("");
    try {
      if (e?.type) {
        const { name, value, type } = e?.target;

        setAnswer((prev) => {
          return {
            ...prev,
            [name]: {
              value: [
                {
                  value: value,
                  answerType: type,
                  target: target,
                },
              ],
              data_type: type,
              qaId:actualQues?.id
            },
          };
        });

        // setErrors((prevErrors) => ({ ...prevErrors, [name]: true }));
        // setErrorStatus(true);
      }
    } catch (ex) {
      console.error("Error at handleChange");
    }
  };

  const handleRadioChange = (name: string, value: string, type, target,actualQues) => {
    console.log("value", value);
    setIsErrored(false);
    setErrorStatus("")
    setAnswer((prev) => ({
      ...prev,
      [name]: { value: [value], data_type: type,qaId:actualQues?.id },
    }));
  };
  const getCurrentQuestionnaire = (questionId) => {
    // let foundQuestionnaire = null;

    // questionnaire_list.questionnaire?.forEach((questionnaire) => {
    //   const foundQuestion = questionnaire?.questions.find(
    //     (question) => question.id === questionId
    //   );
    //   if (foundQuestion) {
    //     foundQuestionnaire = questionnaire;
    //     return;
    //   }
    // });
    if (questionId && currentQuestionnaireID !== null) {
      addAnswers(questionId, currentQuestionnaireID);
    } else {
      console.log("Current question id and question id is empty");
    }
    // if (questionFlowStarted) {
    // } else {
    //   addAnswers(questionId, foundQuestionnaire?.id);
    // }
  };
  const addAnswers = async (questionId, questionnaireID) => {
    let addAnswer_response = await QuestionnaireAdapter.addAnswers(
      { answer: answer },
      tenantID,
      rentalID,
      questionId,
      questionnaireID
    );
    console.log(addAnswer_response);
    setCurrentPreviousQuestion(questionId);
    if (addAnswer_response?.question_id) {
      updateIndex(
        addAnswer_response.question_id,
        addAnswer_response.questionnaire_id
      );
    } else if (addAnswer_response?.question_id === null) {
      setShowSuccessModal(true);
      console.log(addAnswer_response);
    } else {
      setShowSuccessModal(true);
      console.log(addAnswer_response);
      console.log("Add answers response not found");
    }
  };
  const updateIndex = (id, questionnaire_id) => {
    let nextQues = allQuestions.findIndex((_questions) => _questions.id === id);
    console.log(answer);
    // setAnswer()
    setCurrentQuestionnaireID(questionnaire_id);
    setQuestionFlowStarted(true);
    setCurrentQuestionIndex(nextQues);
    getCurrentQuestion(nextQues, allQuestions);
    setLoading(false);
  };
  const handleMultiSelect = (option, id, type,actualQues) => {
    setIsErrored(false);
    setErrorStatus("")
    const isOptionSelected =
      answer[id]?.value && answer[id]?.value.includes(option);
    setAnswer((prevAnswers) => ({
      ...prevAnswers,
      [id]: {
        value: isOptionSelected
          ? prevAnswers[id].value.filter(
            (selectedOption) => selectedOption !== option
          )
          : [...(prevAnswers[id]?.value || []), option],
        data_type: type,
        qaId:actualQues.id
      },
    }));
  };
  const resetAllErrors = () =>{
    setIsInputErrored(false);
    setIsErrored(false);
    setErrorStatus("");
    setInputErrorStatus("");
  }
  const handlePrevious = (allQuestions, currentQuestionIndex) => {
    debugger;
    resetAllErrors();
    let currentQuestionID = allQuestions[currentQuestionIndex].id; 
    let currentAnswers = answer;
    console.log(currentAnswers);
    let currentPrevQuesID = getQaIdFromFilteredObject(currentQuestionID,currentAnswers);
    if(currentPrevQuesID){
      let currentPrevIndex = allQuestions.findIndex(_question=>_question.id === currentPrevQuesID);
      if (currentPrevIndex !== -1) {
        setCurrentQuestionIndex(currentPrevIndex);
        getCurrentQuestion(currentPrevIndex, allQuestions);
        return;
      }
    }
    console.log(currentPrevQuesID)
    function getQaIdFromFilteredObject(currentQuestionID, currentAnswers) {
      for (const key in currentAnswers) {
          if (currentAnswers.hasOwnProperty(key)) {
              const element = currentAnswers[key];
              if (Array.isArray(element.value) && element.value.length > 0) {
                  const targetValue = element.value[0].target;
                  if (targetValue === currentQuestionID) {
                      return element.qaId;
                  }
              }
          }
      }
      return null;
  }
    
  }

  
  console.log(answer);
  const getNextQuestionLogic = (allQuestions, currentQuestionIndex) => {
    try {
      if (currentQuestionIndex === 0 || currentQuestionIndex) {
        const currentQuestion = allQuestions[currentQuestionIndex];
        console.log(currentQuestion);
        setLoading(true);
        if (currentQuestion) {
          getCurrentQuestionnaire(currentQuestion?.id);
        } else {
          console.log("No current question found");
        }
      } else {
        console.log("Error next questions");
      }
    } catch (ex) {
      console.error("Error at handleNext:", ex);
    }
  };
  console.log(answer);
  const handleNext = (allQuestions, currentQuestionIndex, answer) => {
    console.log(answer);
    console.log(currentQuestionToCheck);
    let condition = answer.hasOwnProperty(currentQuestionToCheck?.code);
    let code = currentQuestionToCheck?.code;
    if (condition) {
      if (
        answer[code].data_type === "text" ||
        answer[code].data_type === "textarea" ||
        answer[code].data_type === "boolean" ||
        answer[code].data_type === "number"
      ) {
        if (answer[code].value[0].value !== "") {
          getNextQuestionLogic(allQuestions, currentQuestionIndex);
        } else {
          console.log("Field is required");
          setIsInputErrored(true);
          setInputErrorStatus("*Field is required")
        }
      } else if (answer[code].data_type === "file") {
        if (
          answer[code].value.length === currentQuestionToCheck.options.length
        ) {
          getNextQuestionLogic(allQuestions, currentQuestionIndex);
        } else {
          console.log("Files are need to be filled");
          setIsErrored(true);
          setErrorStatus("*Please upload all the files to continue")
        }
      } else if (answer[code].data_type === "array") {
        if (answer[code].value.length !== 0) {
          getNextQuestionLogic(allQuestions, currentQuestionIndex);
        } else {
          console.log("Please select atleast one option to proceed.");
          setIsErrored(true);
          setErrorStatus("*Please select atleast one option to proceed.")
        }
      } else if (answer[code].data_type === "date") {
        if (answer[code].value[0].value !== null) {
          getNextQuestionLogic(allQuestions, currentQuestionIndex);
        } else {
          console.log("Please select valid date to continue.");
          setIsErrored(true);
          setErrorStatus("*Please select valid date to continue")
        }
      } else {
        console.log("lets check the default logic");
      }
    } else {
      setIsErrored(true);
      setErrorStatus("*Field is required");
      console.log("No answer code found");
    }
  };
  console.log("answer", answer);
  const renderInput = (type, code, id, options,actualQuestion) => {
    console.log(actualQuestion)
    let value = answer[code]?.value[0]?.value;
    console.log(value);
    try {
      switch (type) {
        case "text_short":
          return (
            <Input
              propagateEvent={true}
              label={""}
              value={value !== undefined ? value : ""}
              placeholder=""
              type="text"
              name={code}
              errored={isInputErrored}
              errorText={inputErrorStatus}
              inputStyle={additionalInputStyle}
              onChange={(e) => handleChange(e, options[0].target,actualQuestion)}
            />
          );
        case "text_long":
          return (
            <>
              <textarea
                name={code}
                value={value}
                className="form__text-area"
                style={{ border: isInputErrored ? "1px solid red" : "1px solid lightgray" }}
                onChange={(e) => handleChange(e, options[0].target,actualQuestion)}
              />
              {inputErrorStatus && isInputErrored && <div style={{ color: "tomato", marginTop: "0.1rem", fontSize: "0.8rem" }}>*Field is required</div>}
            </>
          );

        case "radio":
          console.log("options", options);
          console.log(value);
          return (
            <div className="form__radio-wrapper">
              {options?.map((_options) => (
                <Radio
                  key={_options.id}
                  value={value}
                  name={code}
                  label={_options.value}
                  onChange={() =>
                    handleRadioChange(
                      code,
                      _options,
                      _options.answerType,
                      _options.target,
                      actualQuestion
                    )
                  }
                />
              ))}
            </div>
          );
        case "multi-select":
          return (
            <div className="rental-form__check-box-wrapper">
              {options?.map((_options) => (
                <Checkbox
                  key={_options.id}
                  name={code}
                  label={_options.value}
                  checked={(answer[code]?.value || []).includes(_options)}
                  onChange={() =>
                    handleMultiSelect(_options, code, _options.answerType,actualQuestion)
                  }
                />
              ))}
            </div>
          );
        case "number":
          return (
            <Input
              propagateEvent={true}
              label={""}
              value={value !== undefined ? value : ""}
              placeholder=""
              type="number"
              name={code}
              errored={isInputErrored}
              errorText={inputErrorStatus}
              inputStyle={additionalInputStyle}
              onChange={(e) => handleChange(e, options[0].target,actualQuestion)}
            />
          );
        case "date":
          return (
            <div className="rental-form__date-picker">
              <DatePicker
                className={isErrored ? "date-picker--errored" : "date-picker"}
                dateFormat="MM/dd/yyyy"
                selected={
                  value === undefined || value === null ? "" : new Date(value)
                }
                // value={}
                onChange={(date) =>
                  handleDateOfBirthChange(date, id, code, options[0].target,actualQuestion)
                }
                pickNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                isClearable={
                  value !== undefined && value !== "" && value !== null
                }
                scrollableYearDropdown
                yearDropdownItem={isYearInAllowedRange}
                yearDropdownItemNumber={2}
              />
            </div>
          );
        case "file":
          return (
            <QuestionProofsUpload
              code={code}
              files={options}
              rentalID={rentalID}
              tenantID={tenantID}
              activeProperty={currentProperty}
              answers={answer}
              setAnswer={setAnswer}
              setIsErrored={setIsErrored}
              setErrorStatus={setErrorStatus}
              actualQues={actualQuestion}
            />
          );
        default:
          return (
            <Input
              propagateEvent={true}
              label={""}
              value={value !== undefined ? value : ""}
              placeholder=""
              type="text"
              name={code}
              errored={isInputErrored}
              errorText={inputErrorStatus}
              onChange={(e) => handleChange(e, options[0].target,actualQuestion)}
            />
          );
      }
    } catch (ex) {
      console.error("Error at renderInput");
    }
  };

  const onClosePopup = () => {
    // window.close();
    router.back();
    setShowSuccessModal(false);
  };
  console.log(answer);
  console.log(currentQuestionIndex);
  return (
    <>
    <LoadingBar color='#32579e' style={{height:"3px"}} progress={progress} onLoaderFinished={() => setProgress(0)} />
    <div className={`rental-form ${loading ? "loader-content" : ""}`}>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      {/* {allQuestions.length === 0 && currentQuestionIndex === null && (
        <div className="no-questions-wrapper">
          {formTitles &&
            formTitles.map((_formtitle, index) => (
              <div className="no-questions-wrapper__header">
                {`${index + 1} ) ${_formtitle}`}
              </div>
            ))}
          <div className="no-questions-wrapper__list">
            <div className="no-questions-wrapper__list-item">
              <div className="no-questions-wrapper__list-item-header">
                Sent by
              </div>{" "}
              <div className="no-questions-wrapper__list-item-content">
                {propertyManagerName}
              </div>
            </div>
            <div className="no-questions-wrapper__list-item">
              <div className="no-questions-wrapper__list-item-header">
                Recieved on
              </div>
              <div className="no-questions-wrapper__list-item-content">
                Feb 15, 2024, 2:24 PM GMT+5.30
              </div>
            </div>
            <div className="no-questions-wrapper__list-item">
              <div className="no-questions-wrapper__list-item-header">
                Last updated
              </div>
              <div className="no-questions-wrapper__list-item-content">
                Feb 15, 2024, 2:24 PM GMT+5.30
              </div>
            </div>
            <div className="no-questions-wrapper__contact">
              <div className="no-questions-wrapper__contact-header">
                Contract status
              </div>
              <div className="no-questions-wrapper__contact-details">
                The contract has been executed. We have emailed you an executed
                copy of the contract.
              </div>
            </div>
            <div className="no-questions-wrapper__tasks">
              <div className="no-questions-wrapper__tasks-header">My Tasks</div>
              <div className="no-questions-wrapper__tasks-details">
                <div className="no-questions-wrapper__tasks-details-dot">
                  ⚪
                </div>
                <div className="no-questions-wrapper__tasks-details-dot">
                  There are no pending actions on you
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      {allQuestions &&
        allQuestions.length !== 0 &&
        currentQuestionIndex !== null && (
          <div className="rental-form__wrapper">
            <div className="rental-form__input-wrapper">
              <div className="form__input-field-wrapper">
                <div className="form__input-header">
                  {/* <div>{`${currentQuestionIndex + 1}. `} </div> */}
                  <div className={"form__input-wrapper"}>
                    <div
                      className="form__input-label"
                      dangerouslySetInnerHTML={{
                        __html: allQuestions[currentQuestionIndex]?.text,
                      }}
                    ></div>
                    <div className="form__input-float-text-wrapper">
                      <div
                        className="form__input-float-text"
                        dangerouslySetInnerHTML={{
                          __html:
                            allQuestions[currentQuestionIndex]?.description,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <label>
                  {renderInput(
                    allQuestions[currentQuestionIndex]?.answer_type,
                    allQuestions[currentQuestionIndex]?.code,
                    allQuestions[currentQuestionIndex]?.id,
                    allQuestions[currentQuestionIndex]?.options,
                    allQuestions[currentQuestionIndex]
                  )}
                </label>
                {errorStatus && isErrored &&
                  <div style={{ color: "tomato", marginTop: "1rem", fontSize: "0.8rem" }}>{errorStatus}</div>
                }
              </div>
            </div>
            <div className="rental-form__footer-buttons">
              <div className="rental-form__next">
                <Button
                  buttonStatus={allQuestions[currentQuestionIndex]?.question_id === "root"}
                  btnType="rounded"
                  btnText={"Previous"}
                  buttonClick={() =>
                    handlePrevious(allQuestions, currentQuestionIndex)
                  }
                  additionalStyles={{ padding: 0 }}
                />
              </div>
              <div className="rental-form__page-index">
                {/* ( {currentQuestionIndex + 1} of {allQuestions.length} ) */}
              </div>

              <div className="rental-form__submit">
                {/* {currentQuestionIndex === allQuestions.length - 1 ? (
                    <Button
                      btnType="rounded"
                      btnText="Submit"
                      btnTheme="primary"
                      buttonClick={handleSubmit}
                      testID={""}
                      additionalStyles={{ padding: 0 }}
                    />
                  ) :   */}
                <Button
                  btnType="rounded"
                  btnText="Next"
                  btnTheme="primary"
                  buttonClick={() =>
                    handleNext(allQuestions, currentQuestionIndex, answer)
                  }
                  testID={""}
                  additionalStyles={{ padding: 0 }}
                />
                {/* } */}
              </div>
            </div>
          </div>
        )}
      <Modal isOpen={showSuccessModal} title="Submitted Successfully!">
        <div className="rental-form__success-popup">
          <div className="rental-form__submitted-line">Your document(s) have been submitted for review</div>
          <div>
            <AnimatedCheck />
          </div>
          <div className="rental-form__success-popup-footer">
            <Button
              additionalStyles={{ padding: 0 }}
              buttonClick={onClosePopup}
              btnText="close"
              btnType="rectangle"
              btnTheme="primary"
            />
          </div>
        </div>
      </Modal>

      {/* <div className={`rental-form ${loading ? 'loader-content' : ''}`}> */}
      {/* {loading && ( */}

      {/* )} */}
    </div>
    </>
  );
};

export default RentalForm;
