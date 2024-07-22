"use client";

import { render } from "react-dom";
import Container from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React, { useEffect, useState } from "react";
import "./questions-flow.scss";
import CreateQuestion from "./create-question/create-question";
import Button from "../../../components/button/button";
import { useQuestionnaires } from "../../../services/hooks/useQuestionnaires";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import EditableText from "../../../components/editable-text/editable-text";
import Modal, { ModalTypes } from "../../../components/modal/modal";
import { useRouter } from "next/navigation";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import AnimatedCheck from "../../../components/animated-check/animated-check";
import QuestionnaireAssign from "../../../components/questionnaire-assign/questionnaire-assign";
import QuestionnaireCard from "../../../components/questionnaire-card/questionnaire-card";
import Tabs from "../../../components/tabs/tabs";
import Panel from "../../../components/tabs/panels";
import FlowChart from "../../../components/flow-chart/flow-chart";
import Select from "react-select";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";
import {
  addQuestionToQuestionnaire,
  assignRootSourceAndTargetToQuestions,
  evaluateQuestions,
} from "../../../utils/question-utils";
import Warning from "../../../public/assets/icons/warning.svg";
import FloatingMenu from "../../../components/floating-menu/floating-menu";
interface CategoryOption {
  value: string;
  label: string;
}
const QuestionsFlow: React.FC = (props) => {
  const [title, setTitle] = useState<string>("");
  const [edittext, setEditText] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [questionError, setQuestionError] = useState(false);
  const [questionTitleError, setQuestionTitleError] = useState(false);
  const { setQuestionniareList, questionnaire_list, activeQA } =
    useQuestionnaires();
  const [publishStatus, setPublishStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editFlow, setEditFlow] = useState(false);
  let { userInfo } = useUserInfo();
  const { push } = useRouter();
  const [editFlowQuestions, setEditFlowQuestions] = useState([]);
  const [validationResult, setValidationResult] = useState(false);
  const [all_questions, setAllQuestions] = useState(editFlowQuestions || []);
  const [showMapModal, setShowMapModal] = useState(false);
  const [currentForm, setCurrentForm] = useState("");
  const [activeQuestionnaireID, setActiveQuestionnaireID] = useState(null);
  const [sideBarStatus, setsideBarStatus] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [activeQuestionFlow, setActiveQuestionFlow] = useState(null);
  let [activeQuestionID, setActiveQuestionID] = useState("");
  const [maxHeight, setMaxHeight] = useState(600);
  const [selectedCategoryType, setSelectedCategoryType] = useState({
    label: "Select Branch Level",
    value: "",
  });
  const [target, setTarget] = useState(null);

  setTitle;
  useEffect(() => {
    let _qaItem = questionnaire_list.find((_item) => _item.id == activeQA);
    console.log(_qaItem);
    if (_qaItem) {
      setTitle(_qaItem.title);
      validateAllQuestionsForTarget(_qaItem.questions);
      setEditFlowQuestions(_qaItem.questions);
      setEditFlow(true);
    }
  }, [activeQA]);
  const validateAllQuestionsForTarget = (_questions) => {
    const validIds = new Set(_questions.map(item => item.id));
    let _questionsCopy = _questions;
    _questionsCopy.forEach(item => {
      // Check if options exist
      if (item.options) {
        item.options.forEach(option => {
          // Check if the target exists and if its corresponding question_id is valid
          if (option.target && !validIds.has(option.target)) {
            option.target = null; // Clear the target if invalid
          }
        });
      }
    });
    setAllQuestions(_questionsCopy);
    setActiveQuestionFlow(_questionsCopy);
    validateCurrentQuestions(_questionsCopy);
  }


  const validateCurrentQuestions = (_questions) => {
    let _validatedQuestions = assignRootSourceAndTargetToQuestions(_questions);
    let result = evaluateQuestions(_validatedQuestions);
    setValidationResult(result);
  };
  console.log(validationResult);
  useEffect(() => {
    setEditFlowQuestions(all_questions);
    setActiveQuestionFlow(all_questions);
    if (all_questions.length !== 0) {
      validateCurrentQuestions(all_questions)
    } else {
      console.log("Do none")
    }
  }, [all_questions]);
  useEffect(() => {
    if (window) {
      setMaxHeight(window.innerHeight - 110);
    }
    const handleResize = () => {
      if (window) {
        setMaxHeight(window.innerHeight - 110);
      } else {
        console.log("window is not defined");
      }
    };
    if (window) {
      window.addEventListener("resize", handleResize);
    } else {
      console.log("window is not defined");
    }
    return () => {
      if (window) {
        window.removeEventListener("resize", handleResize);
      } else {
        console.log("window is not defined");
      }
    };
  }, []);

  const handleChange = (index) => {
    setActiveIndex(index);
  };
  console.log("all_questions", all_questions);
  const categoryTypeOptions: CategoryOption[] = [
    { value: "level_one", label: "Level 1" },
    { value: "level_two", label: "Level 2" },
    { value: "level_three", label: "Level 3" },
    { value: "full", label: "Full" },
  ];

  const onSaveQuestion = (
    newQuestion: any,
    prevQuesAnswer,
    prevQuesInfo
  ) => {
    console.log(prevQuesAnswer);
    console.log(newQuestion);
    try {
      if (newQuestion) {
        let updatedQuestions = addQuestionToQuestionnaire(
          all_questions, newQuestion, prevQuesAnswer, prevQuesInfo
        );
        setAllQuestions(updatedQuestions);
        if (editFlow) {
          onEditQuestionnaire(updatedQuestions, false);
        } else {
          onPublishQuestionnare(updatedQuestions, false);
        }
      } else {
        console.log("Check new question");
      }
    } catch (ex) {
      console.error("Error at onCreateNewQuestion");
    }
  };


  const filterQuestions = (questions: any[], questionID: string) => {
    console.log(questions);
    const filteredQuestions = questions.filter((question) => {
      if (question.id === questionID) {
        console.log(questions);
        return false; // Exclude the question from the filtered array
      }
      // Update source and options
      if (question.source === questionID) {
        question.source = null;
      }
      if (question.options) {
        question.options.forEach((option) => {
          if (option.target === questionID) {
            option.target = null;
          }
        });
      }
      return true; // Include the question in the filtered array
    });
    return filteredQuestions;
  };

  const onDeleteQuestion = (questionID: string) => {
    try {
      setAllQuestions((prevQuestions) =>
        filterQuestions(prevQuestions, questionID)
      );
    } catch (ex) {
      console.error("Error at onDeleteQuestion", ex);
    }
  };
  const validateQuestionnaire = () => {
    try {
      if (title == "") {
        setQuestionTitleError(true);
      } else {
        setQuestionTitleError(false);
      }
      if (all_questions.length == 0) {
        setQuestionError(true);
      } else {
        setQuestionError(false);
        return true;
      }
    } catch (ex) {
      console.error("Error at validateQuestionnaire");
    }
  };

  const handlePublishPopup = () => {
    try {
      setPublishStatus(false);
      push("/dashboard/questionnaire/any");
    } catch (ex) {
      console.error("Error at handlePublishPopup");
    }
  };
  const handleFormAssign = () => {
    try {
      setPublishStatus(false);
      setShowMapModal(true);
      setCurrentForm("");
    } catch (ex) {
      console.error("Error at handleFormAssign", ex);
    }
  };
  console.log(setActiveQuestionnaireID);

  const handleEditPopup = () => {
    try {
      setEditStatus(false);
      push("/dashboard/questionnaire/any");
    } catch (ex) {
      console.error("Error at handlePublishPopup");
    }
  };

  const checkForFileTypeQuestions = (all_questions) => {
    console.log(all_questions);
    if (all_questions.length !== 0) {
      let fileTypeQuestions = all_questions.filter(
        (_question) => _question.answer_type === "file"
      );
      if (fileTypeQuestions.length !== 0) {
        fileTypeQuestions.forEach((question) => {
          let foundTarget = null;
          question.options.forEach((option) => {
            if (option.target !== null) {
              foundTarget = option.target;
            }
          });
          if (foundTarget !== null) {
            question.options.forEach((option) => {
              if (option.target === null) {
                option.target = foundTarget;
              }
            });
          }
        });
        if (fileTypeQuestions.length !== 0) {
          all_questions.forEach((question, index) => {
            if (fileTypeQuestions.includes(question)) {
              all_questions[index] = question;
            }
          });
          setAllQuestions(all_questions);
          return true;
        }
      } else {
        return true;
      }
    }
    return true;
  };

  const onEditQuestionnaire = async (all_questions, flagToShowPopup) => {
    try {
      if (validateQuestionnaire() && checkForFileTypeQuestions(all_questions)) {
        let updatedQuestionnaire = {
          title: title,
          questions: all_questions,
        };
        let data = await QuestionnaireAdapter.editQuestionnaire(
          updatedQuestionnaire,
          userInfo,
          activeQA
        );
        if (data) {
          const data = await QuestionnaireAdapter.fetchAllQuestionnaires(
            userInfo
          );
          setQuestionniareList(data);
          if (flagToShowPopup) {
            setEditStatus(true);
            setAllQuestions([]);
          }
        } else {
          console.log("error");
        }
      } else {
        console.log("Please fix the errors in your form before proceeding");
      }
    } catch {
      console.error("Error at Edit Questionnare");
    }
  };
  const onPublishQuestionnare = async (all_questions, flagToShowPopup) => {
    try {
      if (validateQuestionnaire()) {
        let newQuestionnaire = {
          title: title,
          questions: all_questions,
        };
        const addQuestionnaireResponse =
          await QuestionnaireAdapter.addQuestionnaire(
            newQuestionnaire,
            userInfo
          );
        if (addQuestionnaireResponse) {
          const data = await QuestionnaireAdapter.fetchAllQuestionnaires(
            userInfo
          );
          setQuestionniareList(data);
          if (flagToShowPopup) {
            setPublishStatus(true);
            setAllQuestions([]);
            setActiveQuestionnaireID(addQuestionnaireResponse.id);
            console.log(setActiveQuestionnaireID);
          }
        } else {
          console.log("error");
        }
      } else {
        console.log("Please fill out all fields correctly before publishing!");
      }
    } catch (ex) {
      console.error("Error at onPublishQuestionnare");
    }
  };
  const handleCloseMapModal = () => {
    try {
      setShowMapModal(false);
    } catch (ex) {
      console.error("Error at handleCloseMapModal");
    }
  };
  const onSaveTitle = (title) => {
    try {
      setTitle(title);
    } catch (ex) {
      console.error("Error at onSaveTitle");
    }
  };
  const handleAssignQuestion = async (userInfo, formID) => {
    let data = await QuestionnaireAdapter.assignQuestionnaireToForm(
      userInfo,
      formID,
      activeQuestionnaireID
    );
    if (data) {
      const qaList = await QuestionnaireAdapter.fetchAllQuestionnaires(
        userInfo
      );
      setQuestionniareList(qaList);
      setShowMapModal(false);
    }
    console.log(data);
  };
  const publishButtonStyle = {
    padding: 0,
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "38px",
      fontSize: "0.9rem",
      fontWeight: "200",
    }),
  };

  return (
    <>
      <Tabs
        additionalWrapperStyle={{ width: "100%", height: "100%" }}
        additionalStyles={{ margin: "14px 14px 0 14px" }}
        selectedIndex={activeIndex}
        additionalTabStyles={{ height: "inherit" }}
        handleChange={handleChange}
      >
        <Panel title="Questions" onClick={() => { }}>
          <div className="questions-flow-wrapper">
            <div className="questions-flow-header">
              <div className="questions-flow-section-one">
                <div className="questions-flow-header-section">
                  <div className="questions-flow-header-align">
                    <h3 className="questions-flow-header-text">
                      <EditableText
                        initialText={title}
                        onSave={onSaveTitle}
                        setQuestionTitleError={setQuestionTitleError}
                      />
                    </h3>
                    {questionTitleError && (
                      <label className="questions-flow-header-error">
                        <sup className="question-flow-error-star">*</sup>
                        Questionnaire title cannot be empty
                      </label>
                    )}
                  </div>
                  <div className="questions-flow-header-button">
                    <Button
                      btnText={editFlow ? "Save" : "Publish"}
                      buttonClick={() => {
                        editFlow
                          ? onEditQuestionnaire(all_questions, true)
                          : onPublishQuestionnare(all_questions, true);
                      }}
                      additionalStyles={publishButtonStyle}
                      btnTheme="primary"
                      testID="publish-button"
                    />
                    {questionError && (
                      <label className="questions-flow-header-error">
                        <sup className="question-flow-error-star">*</sup>Each
                        questionnaire should contain atleast one question
                      </label>
                    )}
                  </div>
                  {!validationResult && (
                    <FloatingMenu
                      menuTriggerComponent={
                        <div>
                          <Warning style={{ cursor: "pointer" }} />
                        </div>
                      }
                    >
                      <div style={{ padding: 12, width: 200 }}>
                        You have some unfinished business flows
                      </div>
                    </FloatingMenu>
                  )}
                </div>
                {buttonStatus && (
                  <div className="questions-flow-header-button">
                    <Button
                      btnText="Create"
                      btnType="outline"
                      btnTheme="secondary"
                      buttonClick={() => {
                        setActiveIndex(0);
                        setsideBarStatus(true);
                        setButtonStatus(false);
                      }}
                      testID="questions-create-button"
                    />
                  </div>
                )}
              </div>

              <div className="questions-flow">
                <div className="question-tile-wrapper">
                  <DndProvider backend={HTML5Backend}>
                    <Container
                      //@ts-ignore
                      questionnaire={all_questions}
                      deleteQuestion={onDeleteQuestion}
                      sideBarstatus={sideBarStatus}
                      setSideBarStatus={setsideBarStatus}
                      setButtonStatus={setButtonStatus}
                      activeQuestionFlow={activeQuestionFlow}
                      setActiveQuestionFlow={setActiveQuestionFlow}
                      activeQuestionID={activeQuestionID}
                      setActiveQuestionID={setActiveQuestionID}
                    />
                  </DndProvider>
                </div>
              </div>
            </div>
            <div
              className="side-bar__wrapper"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              <CreateQuestion
                // flow={""}
                target={target}
                allQuestions={all_questions}
                editFlowQuestions={editFlowQuestions}
                setActiveIndex={setActiveIndex}
                onCreateQuestion={onSaveQuestion}
                sideBarStatus={sideBarStatus}
                setSideBarStatus={setsideBarStatus}
                activeQuestionFlow={activeQuestionFlow}
                setActiveQuestionFlow={setActiveQuestionFlow}
                setActiveQuestionID={setActiveQuestionID}
                activeQuestionID={activeQuestionID}
                buttonStatus={buttonStatus}
                setButtonStatus={setButtonStatus}
                activeIndex={activeIndex}
              />
            </div>
          </div>
          <div>
            {showMapModal && (
              <Modal
                showCloseButton={true}
                isOpen={showMapModal}
                setOn={handleCloseMapModal}
                title={"Assign Questionnaire to Forms"}
                size={ModalTypes.Xmedium}
              >
                {userInfo && (
                  <QuestionnaireAssign
                    userInfo={userInfo}
                    handleAssignQuestion={() =>
                      handleAssignQuestion(userInfo, currentForm)
                    }
                    currentForm={currentForm}
                    setCurrentForm={setCurrentForm}
                  />
                )}
              </Modal>
            )}
          </div>
        </Panel>
        <Panel title="Flow Designer" onClick={() => { }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              backgroundColor: "#f3f3f3",
              height: "inherit",
            }}
          >
            <div
              style={{
                marginTop: "12px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "300px", margin: "12px" }}>
                <Select
                  defaultValue={selectedCategoryType}
                  options={categoryTypeOptions}
                  styles={customStyles}
                  classNames={{
                    control: () => "input_select",
                  }}
                  value={selectedCategoryType}
                  onChange={(val) => {
                    setSelectedCategoryType(val);
                  }}
                />
              </div>
              <div style={{ marginTop: "12px" }}>
                <Button
                  btnText={"Save"}
                  btnType="rounded"
                  btnTheme="primary"
                  buttonClick={() => {
                    if (editFlow) {
                      onEditQuestionnaire(all_questions, true);
                    } else {
                      onPublishQuestionnare(all_questions, true);
                    }
                  }}
                />
              </div>
            </div>
            <FlowChart
              all_questions={all_questions}
              setAllQuestions={setAllQuestions}
            />
          </div>
        </Panel>
      </Tabs>
      <Modal
        isOpen={editFlow ? editStatus : publishStatus}
        title="Completed!"
        setOn={editFlow ? handleEditPopup : handlePublishPopup}
        showCloseButton={false}
        size={ModalTypes.Xmedium}
      >
        <div className="questions-flow-success-popup">
          {!editFlow ? (
            <>
              Hurray! your new questionnaire "{title}" is created.
              <div className="questions-flow-success-popup-status">
                Would you like to link this questionnaire to a form?
              </div>
            </>
          ) : (
            <Label
              type={LabelType.Header}
              text={"The form has been saved successfully"}
              variant={LabelVariant.L2}
            />
          )}
          <AnimatedCheck />
          {editFlow && (
            <div className="questions-flow__close-button">
              <Button
                btnText="Close"
                btnTheme="primary"
                btnType="rounded"
                testID="properties-button"
                buttonClick={editFlow ? handleEditPopup : handlePublishPopup}
              />
            </div>
          )}
          {editFlow
            ? editStatus
            : publishStatus == true && (
              <div>
                <div className="publish-questions__footer">
                  <div className="publish-questions__footer-section">
                    <Button
                      btnText="Yes"
                      btnTheme="questionnaire"
                      btnType="rounded"
                      testID="properties-button"
                      additionalStyles={{
                        paddingTop: 0,
                        width: "120px",
                      }}
                      buttonClick={
                        editFlow ? handleEditPopup : handleFormAssign
                      }
                    />
                  </div>
                  <div className="publish-questions__footer-section">
                    <Button
                      btnText="I'll do later"
                      btnTheme="questionnaire-card"
                      btnType="rounded"
                      testID="properties-button"
                      additionalStyles={{ paddingTop: 0 }}
                      buttonClick={
                        editFlow ? handleEditPopup : handlePublishPopup
                      }
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </Modal>
    </>
  );
};

export default QuestionsFlow;
