"use client";
import React, { useEffect, useRef, useState } from "react";
import Drop from "../Drop";
import { Document, Page, pdfjs } from "react-pdf";
import { v4 as uuidv4 } from "uuid";
import PagingControl from "../components/PagingControl";
import { BigButton } from "../components/BigButton";
import DragIcon from "../../../../public/assets/icons/drag.svg";
import { blobToURL } from "../utils/Utils";
import { PDFDocument, rgb } from "pdf-lib";
import DraggableText from "../components/DraggableText";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "./form-editor.scss";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import MappingAdapter from "../../../../services/adapters/mapping-adapter";
import Close from "../../../../public/assets/icons/close.svg";
import Resize from "../../../../public/assets/icons/resize.svg";
import Back from "../../../../public/assets/icons/back_icon.svg";
import Check from "../../../../public/assets/icons/check.svg";
import { FaInfo } from "react-icons/fa6";
import AddField from "../../../../components/add-field/add-field";
import AddSignDialog from "../components/add-sign-dialog";
import PropertyAdapter from "../../../../services/adapters/properties-adapter";
import QuestionnaireAdapter from "../../../../services/adapters/questionnaire-adapter";
import Cookies from "js-cookie";
import {
  addAnswersToField,
  addCheckBoxToForm,
  addImageToForm,
  addSignToField,
  defaultFieldNames,
  defaultOfficeOnlyFieldNames,
  downloadURI,
  findQuestionByCode,
  getBackgroundColorForField,
  getDisplayStatusForField,
  getEditableStatusForField,
  getDay,
  getFieldValue,
  getModalBodyMessage,
  getModalMessage,
  getModalTitle,
  getPaddingForField,
  getTopValueForField,
  removeFileExtension,
  getOfficeFieldsCount,
  setPagesVisited,
  filterFieldsByPageToOneShot,
  getBackgroundColorForMapField,
  getBorderForMapField,
} from "../../../../utils/form-editor-utils";
import CreateQuestion from "../../questions-flow/create-question/create-question";
import Tabs from "../../../../components/tabs/tabs";
import Panel from "../../../../components/tabs/panels";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import Button from "../../../../components/button/button";
import { getFileName } from "../../../../utils/string-utils";
import { useQuestionnaires } from "../../../../services/hooks/useQuestionnaires";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import TenantAdapter from "../../../../services/adapters/tenants-adapter";
import Accordion from "../../../../components/accordion/accordion";
import Input from "../../../../components/input/input";
import FloatingMenu from "../../../../components/floating-menu/floating-menu";
import { removeTagsAndnbsp } from "../../../../utils/question-utils";
import LoadingBar from "react-top-loading-bar";
import { useRouter } from "next/navigation";
import IntroTenantForms from "../../../../components/intro-tenant-forms/intro-tenant-forms";
const FormEditor = (props) => {
  const {
    currentFile,
    setShowEditor,
    setCurrentFile,
    role,
    answers,
    formID,
    rentalID,
    tenantID,
    propertyID,
    unitID = "",
    propertyManagerID,
    questionSync,
    setQuestionSyncRequired,
    mappedForm = "",
    flow = "",
    showBackIcon = false,
    prevButtonId,
    nextButtonId,
  } = props;
  const styles = {
    container: {
      maxWidth: 900,
      margin: "0 auto",
    },
    sigBlock: {
      display: "inline-block",
      border: "1px solid #000",
    },
    documentBlock: {
      margin: "20px auto",
      marginTop: 8,
    },
  };
  async function handleReview(tenantID, rentalID, formID, pdf, propertyId) {
    setShowReviewPopup(true);
    const data = await QuestionnaireAdapter.reviewQuestionnaireForm(
      tenantID,
      rentalID,
      formID
    );
    if (data) {
      uploadPropertyManagerReviewedForm(
        rentalID,
        tenantID,
        propertyId,
        pdf,
        userInfo?.id
      );
    } else {
      console.log("Error reviewing form");
    }
  }
  const updateUserNegotiatedIntro = () => {
    Cookies.set("intro_seen", true, { secure: true, sameSite: "strict" });
  };

  const [pdf, setPdf] = useState("");
  const [pageNum, setPageNum] = useState(-1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [fieldText, setFieldText] = useState("");
  const [position, setPosition] = useState(null);
  const [customFields, setCustomFields] = useState([]);
  const [propertyFields, setPropertyFields] = useState([]);
  const [tenantFields, setTenantFields] = useState([]);
  const [studentFields, setStudentFields] = useState([]);
  const [incomeFields, setIncomeFields] = useState([]);
  const [assetFields, setAssetFields] = useState([]);
  const [odysseyFields, setOdysseyFields] = useState([]);
  const [inputWidth, setInputWidth] = useState(0);
  const [inputHeight, setInputHeight] = useState(0);
  const [fieldLabelError, setFieldLabelError] = useState(false);
  const [fieldCodeError, setFieldCodeError] = useState(false);
  const [combinationError, setCombinationError] = useState(false);
  const [needSync, setSyncRequired] = useState(false);
  const [formData, setFormData] = useState([]);
  const [fieldsOnCurrentPage, setFieldsOnCurrentPage] = useState([]);
  const [answersOnCurrentPage, setAnswersOnCurrentPage] = useState([]);
  const [rejectMessage, setRejectMessage] = useState("");
  const [file, setFile] = useState("");
  const [fileID, setFileID] = useState(currentFile);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);
  const [authorizeDialogVisible, setAuthorizeDialogVisible] = useState(false);
  const [signatureFields, setSignatureFields] = useState([]);
  const [signatureURL, setSignatureURL] = useState(null);
  const [autoDate, setAutoDate] = useState(true);
  const [fieldTabIndex, setFieldTabIndex] = useState(0);
  const documentRef = useRef(null);
  const { userInfo } = useUserInfo();
  const [filteredFieldLabels, setFilteredFieldLabels] = useState([]);
  const [questionFieldCode, setQuestionFieldCode] = useState("");
  const [questionFieldLabel, setQuestionFieldLabel] = useState("");
  const [activeQuestionID, setActiveQuestionID] = useState("");
  const [answersPrepopulated, setAnswersPrepopulated] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [questionnaireSuccessPopup, setQuestionnaireSuccessPopup] =
    useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(false);
  const { questionnaire_list, setQuestionniareList, setRefetchQuestions } =
    useQuestionnaires();
  const [currentUpdatedPosition, setCurrentUpdatedPosition] = useState([]);
  const [finishStatus, setFinishStatus] = useState(false);
  const [resetStatus, setResetStatus] = useState(false);
  const [currentQues, setCurrentQues] = useState(null);
  const [optionsCount, setOptionsCount] = useState(0);
  const [mappingsCount, setMappingsCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [signatureFlow, setSignatureFlow] = useState(false);
  const [propertyMapFlow, setPropertyMapFlow] = useState(false);
  const [tenantMapFlow, setTenantMapFlow] = useState(false);
  const [customMapFlow, setCustomMapFlow] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [rejectStatus, setRejectStatus] = useState(false);
  const [rejectError, setRejectError] = useState(false);
  const [rejectErrorMessage, setRejectErrorMessage] = useState("");
  const [fieldErrorPopup, setFieldErrorPopup] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [officeFieldFlow, setOfficeFieldFlow] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [showPopupModal, setShowPopupModal] = useState(false);
  const [triggerFieldsOnCurrentPage, setTriggerFieldsOnCurrentPage] =
    useState(false);
  const [previousPdf, setPreviousPdf] = useState(""); //To reset to old state
  const [officeFieldAnswers, setOfficeFieldAnswers] = useState([]);
  const [answerSyncRequired, setAnswerSyncRequired] = useState(false);
  const [officeOnlyFields, setOfficeOnlyFields] = useState(
    defaultOfficeOnlyFieldNames
  );
  const [fieldsFetched, setFieldsFetched] = useState(false);
  const [fieldsWithAnswers, setFieldsWithAnswers] = useState([]);
  // const [pageVisited,setPageVisited] = useState([0]);
  let displayTutorialScreen = Cookies.get("intro_seen") != "true";

  const handleRejectMessageChange = (text) => {
    setRejectError(false);
    setRejectMessage(text);
    setRejectErrorMessage("");
  };
  const router = useRouter();
  const handleSearch = (searchText) => {
    if (searchText.trim() !== "") {
      const filteredFields = customFields
        .filter((_fields) => {
          const label = String(_fields.label).toLowerCase();
          const searchTextLowerCase = String(searchText).toLowerCase();
          return label.includes(searchTextLowerCase);
        })
        .map((_fields) => ({
          id: _fields.id,
          label: _fields.label,
          question_code: _fields.question_code,
        }));
      setFilteredFieldLabels(filteredFields);
    } else {
      setFilteredFieldLabels([]);
    }
  };
  const handleSwitchFieldsTab = (tabIndex) => {
    setFieldTabIndex(tabIndex);
  };
  const separateFieldsByResponse = (codes, questionnaireList) => {
    let propertyFieldCodes = [];
    let tenantFieldCodes = [];
    let customFieldCodes = [];
    let odysseyFieldCodes = [];
    let studentFieldCodes = [];
    let incomeFieldCodes = [];
    let assetFieldCodes = [];

    codes.forEach((_code) => {
      if (_code.field_type === "property") {
        propertyFieldCodes.push(_code);
      } else if (_code.field_type === "tenant") {
        tenantFieldCodes.push(_code);
      } else if (_code.field_type === "ODYSSEY") {
        odysseyFieldCodes.push(_code);
      } else if (_code.field_type === "STUDENT") {
        studentFieldCodes.push(_code);
      } else if (_code.field_type === "INCOME") {
        incomeFieldCodes.push(_code);
      } else if (_code.field_type === "ASSET") {
        assetFieldCodes.push(_code);
      } else if (_code.field_type === "custom_field") {
        if (_code?.text) {
          customFieldCodes.push(_code);
        } else {
          console.log("Custom field with no question text not found");
        }
      }
    });
    setCustomFields(customFieldCodes);
    setPropertyFields(propertyFieldCodes);
    setTenantFields(tenantFieldCodes);
    setOdysseyFields(odysseyFieldCodes);
    setStudentFields(studentFieldCodes);
    setIncomeFields(incomeFieldCodes);
    setAssetFields(assetFieldCodes);
  };

  useEffect(() => {
    const getAllFields = async () => {
      try {
        if (activeQuestionID) {
          let getFieldCodesResponse = await MappingAdapter.fetchQuestionCodes(
            userInfo,
            activeQuestionID
          );
          if (getFieldCodesResponse) {
            separateFieldsByResponse(getFieldCodesResponse, questionnaire_list);
            setSyncRequired(false);
          } else {
            console.log("Fetch question code error");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    getAllFields();
  }, [needSync, activeQuestionID]);
  const getCurrentQuestionByFieldType = (
    _questionnaire_list,
    _fieldText,
    _fields
  ) => {
    if (
      _fields.field_type === "STUDENT" ||
      _fields.field_type === "ASSET" ||
      _fields.field_type === "INCOME" ||
      _fields.field_type === "ODYSSEY" ||
      (_fields.field_type === "custom_field" && _fields.text)
    ) {
      return {
        answer_type: _fields.answer_type,
        code: _fields.code,
        description: _fields.description,
        id: _fields.id,
        options: _fields.options,
        text: _fields.text,
        field_type: _fields.field_type,
      };
    } else {
      let _currentQues = findQuestionByCode(_questionnaire_list, _fieldText);
      return _currentQues;
    }
  };
  const getFieldToMap = (fieldText, _fields) => {
    if (fieldText !== "") {
      const currentQuestion = getCurrentQuestionByFieldType(
        questionnaire_list,
        fieldText,
        _fields
      );
      if (currentQuestion !== null) {
        setCurrentQues(currentQuestion);
        setOptionsCount(currentQuestion?.options?.length);
        setTextInputVisible(true);
        setFieldText(fieldText);
      } else if (
        _fields.field_type === "property" ||
        _fields.field_type === "tenant" ||
        _fields.field_type === "signature" ||
        _fields.field_type === "office_only_field"
      ) {
        setOptionsCount(1);
        setFieldText(fieldText);
        setTextInputVisible(true);
      } else {
        setFieldText("");
        setOptionsCount(1);
        setTextInputVisible(false);
      }
    } else {
      console.log("No field text found");
    }
  };
  const getSignatureFields = (_formData, role) => {
    let signatureCode;
    if (role === "tenant-page") {
      signatureCode = "TENANT_SIGNATURE";
    } else if (role === "property-page") {
      signatureCode = "PROPERTY_MANAGER_SIGNATURE";
    } else {
      console.error("Invalid role");
      return;
    }
    let filteredFields = _formData[0]?.fields.filter(
      (field) => field.question_code === signatureCode
    );
    setSignatureFields(filteredFields || []);
  };

  useEffect(() => {
    async function fetchFile() {
      if (currentFile !== "" && pdf === "" && !pdfLoaded) {
        setProgress(20);
        let data = await PropertyAdapter.downloadDocuments(currentFile);
        if (data) {
          const formattedBlob = await blobToURL(data);
          setPdf(formattedBlob);
          setPreviousPdf(formattedBlob);
          setAnswerSyncRequired(true);
          setAnswersPrepopulated(false);
          setProgress(70);
        } else {
          console.log("Blob to url error");
        }
      } else {
        console.log("Current file is empty");
      }
    }
    fetchFile();
  }, [currentFile]);

  useEffect(() => {
    async function fetchMapping() {
      // Check if the role is "property-page" and mappedForm is not empty
      if (
        (role === "property-page" || role === "tenant-page") &&
        mappedForm !== ""
      ) {
        let data = await MappingAdapter.getMappingByFormId(mappedForm);
        if (data) {
          setFormData(data);
          getSignatureFields(data, role);
          setSyncRequired(false);
        } else {
          console.log("Get mapping by form id is empty");
        }
      } else if (currentFile !== "") {
        // If role is not "property-page" or mappedForm is empty, but currentFile is not empty
        let data = await MappingAdapter.getMappingByFormId(currentFile);

        if (data) {
          setFormData(data);
          getSignatureFields(data, role);
          setSyncRequired(false);
        } else {
          console.log("Get mapping by form id is empty");
        }
      } else {
        console.log("Current file is empty");
      }
    }

    fetchMapping();
  }, [currentFile, needSync]);
  useEffect(() => {
    async function processFields(formData) {
      try {
        if (pdf !== "" && formData && answers && !fieldsFetched) {
          const allFieldsWithAnswers = await filterFieldsByPageToOneShot(
            formData,
            answers,
            role,
            pdf
          );
          setFieldsWithAnswers(allFieldsWithAnswers);
          setFieldsFetched(true);
          setAnswerSyncRequired(false);
          setAnswersPrepopulated(false);
        } else {
        }
      } catch (error) {
        console.log("An error occurred:", error);
        // Handle the error
      }
    }
    processFields(formData);
  }, [formData, answers, pdf, answerSyncRequired]);
  useEffect(() => {
    function filterFieldsByPage(formData) {
      const fieldsOnPage = [];
      formData &&
        formData.forEach((form) => {
          if (form && form.fields && form.fields.length) {
            form.fields.forEach((field) => {
              const position = field.position;
              const absolutePosition = {
                left: position[0].X,
                top: position[0].Y,
                bottom: position[0].Y,
                width: position[1].X - position[0].X,
                height: position[1].Y - position[2].Y,
              };
              if (field.pg_no === pageNum) {
                const fieldExist = officeFieldAnswers.find(
                  (code) => code.id === field.id
                );
                fieldsOnPage.push({
                  question_code: fieldExist
                    ? fieldExist.text
                    : field.question_code || "",
                  question_value: field.question_value,
                  position: absolutePosition,
                  id: field.id,
                });
              } else {
                console.log("Page number error");
              }
            });
          }
        });
      setTriggerFieldsOnCurrentPage(false);
      setFieldsOnCurrentPage(fieldsOnPage);
      return fieldsOnPage;
    }
    filterFieldsByPage(formData);
  }, [pageNum, formData, triggerFieldsOnCurrentPage]);
  useEffect(() => {
    function filterFieldsByPage(formData, answers, role, pageNum) {
      if (
        role === "rental-page" ||
        role === "tenant-page" ||
        role === "property-page"
      ) {
        const fieldsOnPage = [];
        formData.forEach((form) => {
          form?.fields?.forEach((field) => {
            const position = field.position;
            const absolutePosition = {
              left: position[0].X,
              bottom: position[0].Y,
              width: position[1].X - position[0].X,
              height: position[1].Y - position[2].Y,
            };
            if (
              answers &&
              answers[field?.question_code] &&
              answers[field?.question_code].value
            ) {
              const answerType = answers[field?.question_code]?.data_type;
              // array or boolean - by making this I avoided extra loop to get the perfect answers according to the field_value
              if (
                field.pg_no === pageNum &&
                (answerType === "array" || answerType === "boolean")
              ) {
                const questionValue = field.question_value;
                answers[field?.question_code]?.value?.forEach((answer) => {
                  // Answer's value is included in the field's question value or not
                  if (questionValue?.includes(answer?.value)) {
                    fieldsOnPage.push({
                      answer: answer.value,
                      position: absolutePosition,
                      id: field.id,
                      type: answerType,
                    });
                  }
                });
              } else {
                const answer = answers[field.question_code]?.value[0]?.value;
                // rest of the fields => same old procedure
                if (field.pg_no === pageNum) {
                  fieldsOnPage.push({
                    answer: answer,
                    position: absolutePosition,
                    id: field.id,
                    type: answerType,
                  });
                }
              }
            }
          });
        });
        setAnswersOnCurrentPage(fieldsOnPage);
        return fieldsOnPage;
      }
    }
    filterFieldsByPage(formData, answers, role, pageNum);
  }, [formData, fieldsOnCurrentPage]);
  useEffect(() => {
    const delayInMilliseconds = 2000; // 10000 seconds to milliseconds
    const timerId = setTimeout(() => {
      if (pageNum === -1 && pdf && answerSyncRequired) {
        setPageNum(0);
        setPdfLoaded(true);
        setProgress(100);
      } else {
        console.log("do none");
        setProgress(100);
      }
    }, delayInMilliseconds);

    return () => clearTimeout(timerId);
  }, [pdf]);
  const generatePdfWithAnswers = async (
    fieldsWithAnswers,
    pdf,
    role,
    signatureURL
  ) => {
    if (fieldsWithAnswers && pdf && role === "rental-page") {
      const pdfDoc = await PDFDocument?.load(pdf);
      for (let i = 0; i < fieldsWithAnswers.length - 1; i++) {
        const pageNum = i;
        const currentPageFields = fieldsWithAnswers[i];
        if (currentPageFields.length === 0) {
          continue;
        }
        for (let j = 0; j < currentPageFields.length; j++) {
          const field = currentPageFields[j];
          if (
            (field.type === "boolean" || field.type === "array") &&
            !answersPrepopulated
          ) {
            addCheckBoxToForm(
              field?.position?.left,
              field?.position?.bottom,
              field?.position?.height,
              field?.position?.width,
              pdfDoc,
              pageNum
            );
          } else if (!answersPrepopulated) {
            addAnswersToField(
              field?.answer,
              field?.position?.left,
              field?.position?.bottom,
              pdfDoc,
              pageNum
            );
          } else {
            console.log("do none");
          }
        }
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)]);
      const URL = await blobToURL(blob);
      setPdf(URL);
      setPreviousPdf(URL);
      setAnswersPrepopulated(true);
      setAnswerSyncRequired(false);
      setPageNum(0);
      setPdfLoaded(true);
    } else {
      console.log("PDF is empty or role is not valid");
    }
  };
  const generatePdfWithSignature = async (
    formData,
    pdf,
    signatureURL,
    role
  ) => {
    if (
      formData?.[0]?.fields &&
      pdf &&
      signatureURL &&
      (role === "tenant-page" || role === "property-page")
    ) {
      const pdfDoc = await PDFDocument.load(pdf);
      const totalPages = pdfDoc.getPageCount();

      // Initializing an array to store fields for each page
      const fieldsPerPage = Array.from({ length: totalPages }, () => []);
      // Group fields by page number
      formData[0]?.fields?.forEach((field) => {
        if (field.pg_no >= 0 && field.pg_no < totalPages) {
          fieldsPerPage[field.pg_no].push(field);
        }
      });
      for (let i = 0; i < totalPages; i++) {
        const pageNum = i;
        const currentPageFields = fieldsPerPage[i];
        if (currentPageFields.length === 0) {
          continue;
        }
        const signatureFieldCode =
          role === "tenant-page"
            ? "TENANT_SIGNATURE"
            : "PROPERTY_MANAGER_SIGNATURE";
        const signatureField = currentPageFields.find(
          (field) => field.question_code === signatureFieldCode
        );
        if (signatureField) {
          const absolutePosition = {
            left: signatureField?.position[0]?.X,
            bottom: signatureField?.position[0]?.Y,
            width:
              signatureField?.position[1]?.X - signatureField?.position[0]?.X,
            height:
              signatureField?.position[1]?.Y - signatureField?.position[2]?.Y,
          };
          addImageToForm(
            signatureURL,
            absolutePosition.left,
            absolutePosition.bottom,
            absolutePosition.height,
            absolutePosition.width,
            pdfDoc,
            pageNum
          );
          addSignToField(
            `Signed ${getDay()}`,
            absolutePosition.left,
            absolutePosition.bottom,
            pdfDoc,
            pageNum
          );
        }
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)]);
      const URL = await blobToURL(blob);
      setPdf(URL);
      if (role === "tenant-page") {
        uploadSignedForm(rentalID, tenantID, propertyID, URL);
      } else {
        uploadPropertyManagerSignedForm(
          rentalID,
          tenantID,
          propertyID,
          URL,
          userInfo?.id
        );
      }
    } else {
      console.log("PDF is empty, signatureURL is missing, or role is invalid");
      return null;
    }
  };

  const generatePdfWithAnswersForOfficeFields = async (
    officeFieldAnswers,
    pdf
  ) => {
    try {
      const pdfDoc = await PDFDocument.load(pdf);
      const totalPages = pdfDoc.getPageCount();

      for (let i = 0; i < totalPages - 1; i++) {
        const pageNum = i; // Adjust page number starting from 1
        const currentPageFields = officeFieldAnswers.filter(
          (answer) => answer.pageNumber === pageNum
        ); // Filter answers for current page
        if (currentPageFields.length === 0) {
          continue;
        }
        for (let j = 0; j < currentPageFields.length; j++) {
          const field = currentPageFields[j];
          addAnswersToField(
            field?.text,
            field?.position.left,
            field?.position.right,
            pdfDoc,
            pageNum
          );
        }
      }

      // Save the modified PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)]);
      const URL = await blobToURL(blob);
      setPdf(URL);
    } catch (error) {
      console.error("Error generating PDF with answers:", error);
      throw error;
    }
  };
  useEffect(() => {
    generatePdfWithAnswers(fieldsWithAnswers, pdf, role, signatureURL);
  }, [fieldsWithAnswers, role, signatureURL, currentFile, answerSyncRequired]);
  const getValue = (questionCurrent) => {
    if (questionCurrent?.options?.length > 0) {
      const value = questionCurrent.options[currentIndex]?.value;
      setCurrentIndex((prev) => prev + 1);
      return value;
    }
  };
  const getQuestionValue = (currentQuestion) => {
    switch (currentQuestion) {
      case "tenant":
        return "tenant";
      case "property":
        return "property";
      case "signature":
        return "signature";
      case "office_only_field":
        return "office_only";
      default:
        return getValue(currentQuestion);
    }
  };

  const addMapping = async (
    inputWidth,
    inputHeight,
    file,
    newX,
    newY,
    fieldText,
    pageNum,
    currentQuestion
  ) => {
    let firstCoordinate = {
      X: newX + document.documentElement.scrollLeft,
      Y: newY - document.documentElement.scrollTop,
    };
    let secondCoordinate = {
      X: newX + inputWidth + document.documentElement.scrollLeft,
      Y: newY,
    };
    let thirdCoordinate = {
      X: newX + document.documentElement.scrollLeft,
      Y: newY - inputHeight,
    };
    let forthCoordinate = {
      X: newX + document.documentElement.scrollLeft + inputWidth,
      Y: newY - inputHeight,
    };
    let mappingField = {
      form_id: file,
      fields: [
        {
          id: uuidv4(),
          pg_no: pageNum,
          position: [
            firstCoordinate,
            secondCoordinate,
            thirdCoordinate,
            forthCoordinate,
          ],
          question_code: fieldText,
          question_value: getQuestionValue(currentQuestion),
          field_type: currentQuestion.field_type
            ? currentQuestion.field_type
            : getFieldValue(currentQuestion),
        },
      ],
      form_title: file,
    };
    let data = await MappingAdapter.addMapping(mappingField, userInfo);
    if (data) {
      setSyncRequired(true);
      setSignatureFlow(false);
    } else {
      console.log("Add Mapping Data is empty");
    }
  };
  const removeMapping = async (questionCodeId) => {
    let formInfo = null;
    if (formData) {
      if (Array.isArray(formData)) {
        if (formData.length > 1) {
          formInfo = formData[1];
        } else {
          formInfo = formData[0];
        }
      }
      let data = await MappingAdapter.removeMapping(
        formInfo.form_id,
        questionCodeId,
        userInfo
      );
      if (data) {
        setSyncRequired(true);
      } else {
        console.log("Updating fields error");
      }
    } else {
      console.log("Remove mapping error");
    }
  };
  const toggleCloseStatus = (index) => {
    const updatedFields = fieldsOnCurrentPage.map((field, fieldIndex) => ({
      ...field,
      showCloseIcon: fieldIndex === index ? !field.showCloseIcon : false,
      isHighLightText: fieldIndex === index ? !field.isHighLightText : false,
      showResizeIcon: fieldIndex === index ? !field.showResizeIcon : false,
      showInput: fieldIndex === index ? !field.showInput : false,
      isResizing: fieldIndex === index ? field.isResizing : false,
    }));
    setFieldsOnCurrentPage(updatedFields);
  };
  const handleResize = (index) => {
    const updatedFields = [...fieldsOnCurrentPage];

    updatedFields[index] = {
      ...updatedFields[index],
      isResizing: !updatedFields[index].isResizing, // Toggle isResizing
      showCheckedIcon: !updatedFields[index].showCheckedIcon,
    };

    setFieldsOnCurrentPage(updatedFields);
  };
  const updateMapping = async (e, id, currentFile, position) => {
    e.preventDefault();
    if (currentUpdatedPosition) {
      const data = await MappingAdapter.updateMapping(
        id,
        currentFile,
        position,
        userInfo
      );
    }
  };

  const validateOfficeOnlyField = (flow) => {
    const officeOnlyFieldCount = getOfficeFieldsCount(
      formData,
      officeFieldAnswers
    );
    if (
      flow === "review" &&
      role === "rental-page" &&
      officeOnlyFieldCount > 0
    ) {
      setShowPopupModal(true);
      return true;
    } else if (flow === "review") {
      setShowReviewPopup(true);
    }
    return false;
  };

  useEffect(() => {
    if (
      signatureURL !== null &&
      (role === "tenant-page" || role === "property-page")
    ) {
      setPageNum(0);
      const intervalId = setInterval(() => {
        setPageNum((prevCount) => {
          const newCount = totalPages === 1 ? 0 : prevCount + 1;
          if (prevCount === 0 && totalPages === 1) {
            clearInterval(intervalId);
            setShowUploadPopup(true);
          } else if (newCount === totalPages - 1) {
            clearInterval(intervalId);
            setShowUploadPopup(true);
          }
          return newCount;
        });
      }, 3000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [signatureURL]);
  const signOnUpload = () => {
    if (role === "property-page") {
      uploadPropertyManagerSignedForm(
        rentalID,
        tenantID,
        propertyID,
        pdf,
        propertyManagerID
      );
    } else {
      uploadSignedForm(rentalID, tenantID, propertyID, pdf);
    }
  };

  useEffect(() => {
    async function initializeQuestionnaire(currentFile) {
      if (currentFile !== "" && role === "form-mapping") {
        let data = await MappingAdapter.initializeQuestionnaireForFormMapping(
          currentFile,
          userInfo
        );
        if (data) {
          // setEditStatus(true);
          const response = await QuestionnaireAdapter.fetchAllQuestionnaires(
            userInfo
          );
          setQuestionniareList(response);
          setActiveQuestionID(data?.questionnaire_id);
          setQuestionSyncRequired(false);
          setSyncRequired(true);
        }
      }
    }
    initializeQuestionnaire(currentFile);
  }, [questionSync]);
  useEffect(() => {
    let _qaItem = questionnaire_list.find(
      (_item) => _item.id == activeQuestionID
    );
    setAllQuestions(_qaItem?.questions ? _qaItem?.questions : []);
  }, [activeQuestionID, questionSync]);
  useEffect(() => {
    if (mappingsCount !== 0) {
      if (mappingsCount === optionsCount) {
        setTextInputVisible(false);
        setCurrentIndex(0);
        setCurrentQues(null);
        setMappingsCount(0);
      } else {
        return;
      }
    } else {
      setTextInputVisible(false);
    }
  }, [mappingsCount]);
  const getQuestionnaireName = (currentFile) => {
    let fileName = getFileName(currentFile);
    const randomNum = Math.floor(Math.random() * 900) + 100;
    return `${randomNum} - ${fileName}`;
  };
  const createFieldWithQuestion = async (question) => {
    let questionObject = {
      question_code: questionFieldCode,
      label: questionFieldLabel,
      description: question.description,
      text: question.text,
      options: question.options,
      answer_type: question.answer_type,
    };

    // Check if addFieldFromQuestionnaire returns true
    if (await addFieldFromQuestionnaire(questionObject)) {
      let updatedQuestionnaire = {
        title: getQuestionnaireName(currentFile),
        questions: [...allQuestions, question],
      };

      // Edit the questionnaire
      let data = await QuestionnaireAdapter.editQuestionnaire(
        updatedQuestionnaire,
        userInfo,
        activeQuestionID
      );

      if (data) {
        setQuestionnaireSuccessPopup(true);
        setQuestionSyncRequired(true);
        setResetStatus(true);
        setQuestionFieldCode("");
        setQuestionFieldLabel("");
        setSyncRequired(true);
      }
    } else {
      console.log("addFieldFromQuestionnaire returned false");
    }
  };

  const addFieldFromQuestionnaire = async (questionObject) => {

    try {
      if (questionObject) {
        const res = await MappingAdapter.addField(questionObject, userInfo);

        if (res?.id) {
          setCombinationError(false);
          return true;
        } else if (res?.error) {
          setCombinationError(true);
          return false;
        } else {
          console.log("Response at add field error");
        }
      } else {
        console.log("Validating field error");
      }
    } catch (error) {
      console.log("Error in add field");
    }
  };
  const handleFinishFormMapping = async () => {
    // Check if formData.fields is empty or only contains fields with value "initial"
    const isAllInitial = formData[0].fields.every((field) => {
      return field.question_code.toLowerCase() === "initial";
    });
    if (formData[0].fields.length === 0 || isAllInitial) {
      setFieldErrorPopup(true);
      console.log("No valid fields to proceed.");
      return;
    }

    try {
      let data = await MappingAdapter.publishQuestionnaireAndMapField(
        userInfo,
        activeQuestionID,
        currentFile
      );
      if (data) {
        setFinishStatus(true);
        setRefetchQuestions(true);
      } else {
        console.log("Error updating questionnaire");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleMouseDown = (e, id) => {
    e.preventDefault();

    const itemToResize = fieldsOnCurrentPage.find((item) => item.id === id);

    if (!itemToResize) {
      return; // If the item is not found, do nothing
    }

    const originalWidth = itemToResize.position.width;
    const originalHeight = itemToResize.position.height;
    const originalLeft = itemToResize.position.left;
    const originalBottom = itemToResize.position.bottom;

    const originalX = e.clientX;
    const originalY = e.clientY;

    const handleMouseMove = (e) => {
      const newWidth = originalWidth + (e.clientX - originalX);
      const newHeight = originalHeight + (e.clientY - originalY);
      // const newLeft = originalLeft + (e.clientX - originalX);
      const newBottom = originalBottom - (e.clientY - originalY);
      // const newTop = originalTop - (e.clientY - originalY);

      // Update the item's position and size
      const updatedItems = fieldsOnCurrentPage.map((item) =>
        item.id === id
          ? {
              ...item,
              position: {
                ...item.position,
                width: Math.max(newWidth, 1),
                height: Math.max(newHeight, 1),
                bottom: newBottom,
              },
            }
          : item
      );
      let updatedPosition = [
        { X: originalLeft, Y: newBottom },
        { X: originalLeft + newWidth, Y: newBottom + newHeight },
        { X: originalLeft, Y: newBottom },
        { X: originalLeft + newWidth, Y: newBottom },
      ];
      setCurrentUpdatedPosition(updatedPosition);
      setFieldsOnCurrentPage(updatedItems);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleDeleteFormField = async (e, id) => {
    e.stopPropagation();
    const deleteFieldResponse = await MappingAdapter.deleteFormField(
      id,
      userInfo
    );
    if (deleteFieldResponse) {
      setSyncRequired(true);
    } else {
      console.log("Error in delete Field Response");
    }
  };
  const handleBackToTasks = () => {
    router.push(
      `/dashboard/property-details/${propertyID}?tab_index=${4}&autoLaunch=true&launchUnitID=${unitID}&tenant_id=${tenantID}`
    );
  };
  const uploadSignedForm = async (rentalId, tenantId, propertyId, pdf_name) => {
    setProgress(40);
    const binaryString = atob(pdf_name.split(",")[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes]);
    const file = new File([blob], currentFile, {
      type: "application/pdf",
    });
    const formData = new FormData();
    formData.append("myFile", file, file.name);
    const uploadResponse = await TenantAdapter.uploadSignedForm(
      propertyId,
      rentalId,
      tenantId,
      formData
    );
    if (uploadResponse) {
      setProgress(100);
      setShowUploadPopup(true);
    } else {
      console.log("Error uploading form");
    }
  };
  const uploadPropertyManagerSignedForm = async (
    rentalId,
    tenantId,
    propertyId,
    pdf_name,
    property_manager_id
  ) => {
    setProgress(40);
    const binaryString = atob(pdf_name.split(",")[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes]);
    const file = new File([blob], currentFile, {
      type: "application/pdf",
    });
    const formData = new FormData();
    formData.append("myFile", file, file.name);
    const uploadResponse = await TenantAdapter.uploadPropertyManagerSignedForm(
      propertyId,
      rentalId,
      tenantId,
      formData,
      property_manager_id
    );
    if (uploadResponse && flow === "") {
      setShowUploadPopup(true);
      setProgress(100);
    } else if (uploadResponse && flow === "table_flow") {
      setProgress(100);
      // router.push()
      setShowUploadPopup(true);
      //handleBackToTasks();
    } else {
      console.log("error uploading form");
    }
  };
  //this should happen on Review
  const uploadPropertyManagerReviewedForm = async (
    rentalId,
    tenantId,
    propertyId,
    pdf_name,
    property_manager_id
  ) => {
    setIsApproving(true);
    setProgress(40);
    const binaryString = atob(pdf_name.split(",")[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes]);
    const file = new File([blob], currentFile, {
      type: "application/pdf",
    });
    const formData = new FormData();
    formData.append("myFile", file, file.name);
    const uploadResponse =
      await TenantAdapter.uploadPropertyManagerReviewedForm(
        propertyId,
        rentalId,
        tenantId,
        formData,
        property_manager_id
      );
    if (uploadResponse) {
      setProgress(100);
      setReviewStatus(true);
      setIsApproving(false);
    } else {
      console.log("File upload error");
      setIsApproving(false);
      setReviewStatus(true);
      setProgress(100);
    }
  };
  const onSetMappingToForm = async (
    pageDetails,
    documentRef,
    position,
    inputHeight,
    inputWidth,
    addMapping,
    currentFile,
    fieldText,
    pageNum,
    currentQues,
    setPosition,
    setMappingsCount
  ) => {
    const { originalHeight, originalWidth } = pageDetails;
    const scale = originalWidth / documentRef.current.clientWidth;
    const y =
      documentRef.current.clientHeight -
      (position.y +
        inputHeight -
        position.offsetY -
        documentRef.current.offsetTop);
    const x =
      position.x -
      inputWidth -
      position.offsetX -
      documentRef.current.offsetLeft;
    const newY = (y * originalHeight) / documentRef.current.clientHeight;
    const newX = (x * originalWidth) / documentRef.current.clientWidth;
    addMapping(
      inputWidth,
      inputHeight,
      currentFile,
      x - 16,
      newY,
      fieldText,
      pageNum,
      currentQues
    );
    setPosition(null);
    setMappingsCount(mappingsCount + 1);
    // setTextInputVisible(false);
  };
  const generateDraggableText = (mappingType, setFlow) => (
    <DraggableText
      currentQuestion={currentQues}
      inputWidth={inputWidth}
      setInputWidth={setInputWidth}
      inputHeight={inputHeight}
      setInputHeight={setInputHeight}
      initialText={fieldText}
      onCancel={() => {
        setTextInputVisible(false);
        setFlow(false);
      }}
      onEnd={setPosition}
      onSet={() =>
        onSetMappingToForm(
          pageDetails,
          documentRef,
          position,
          inputHeight,
          inputWidth,
          addMapping,
          currentFile,
          fieldText,
          pageNum,
          mappingType,
          setPosition,
          setMappingsCount
        )
      }
    />
  );
  const validateRejectMessage = () => {
    if (rejectMessage === "") {
      setRejectError(true);
      setRejectErrorMessage("Request changes message cannot be empty");
      return false;
    } else {
      setRejectErrorMessage("");
      setRejectError(false);
      return true;
    }
  };
  const handleRejectForm = () => {
    const rejectForm = async (
      tenantID,
      rentalID,
      mappedForm,
      rejectMessage
    ) => {
      if (validateRejectMessage()) {
        const rejectResponse = await MappingAdapter.rejectForm(
          tenantID,
          rentalID,
          mappedForm,
          rejectMessage
        );
        if (rejectResponse) {
          setRejectStatus(true);
        }
      } else {
        console.log("error rejecting form");
      }
    };
    rejectForm(tenantID, rentalID, mappedForm, rejectMessage);
  };
  const addOfficeFieldToForm = async (
    fieldText,
    left,
    right,
    pdf,
    pageNum,
    field
  ) => {
    saveAnswersForOffice(field, fieldText, pageNum, left, right);
  };
  const saveAnswersForOffice = (field, fieldText, pageNumber, left, right) => {
    let _answer = {
      id: field.id,
      text: fieldText,
      pageNumber: pageNumber,
      position: { left: left, right: right },
    };
    let updatedAnsweredFields = [...officeFieldAnswers, _answer];
    setOfficeFieldAnswers(updatedAnsweredFields);
  };
  const handleKeyDown = (event, field) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const fieldIndex = fieldsOnCurrentPage.findIndex(
        (_field) => _field.id === field.id
      );
      //check for fieldIndex with the help of id and then update it 
      if (fieldIndex !== -1) {
        const updatedFields = [...fieldsOnCurrentPage];
        updatedFields[fieldIndex] = {
          ...field,
          showCloseIcon: false,
          isHighLightText: false,
          showResizeIcon: false,
          showInput: false, 
          isResizing: false,
          question_code: event.target.value,
        };
        setFieldsOnCurrentPage(updatedFields);
      }
      addOfficeFieldToForm(
        event.target.value,
        field.position.left,
        field.position.bottom,
        pdf,
        pageNum,
        field
      );
    }
  };
  const handleCloseEditModal = () => {
    setShowPopupModal(false);
  };
  const resetPdfToBeginState = () => {
    setOfficeFieldAnswers([]);
    setPdf(previousPdf);
    setTriggerFieldsOnCurrentPage(true);
  };
  const handleBackAfterSign = () => {
    if (flow === "table_flow") {
      handleBackToTasks();
    } else {
      router.back();
    }
  };
  return (
    <>
      {unitID !== "" ? (
        <div className="form-editor__icon" onClick={() => handleBackToTasks()}>
          <Back />
        </div>
      ) : showBackIcon ? (
        <div
          className="form-editor__icon"
          onClick={() => {
            setCurrentFile("");
            setPdf("");
            setShowEditor(false);
          }}
        >
          <Back />
        </div>
      ) : null}
      {role !== "tenant-page" &&
      role !== "rental-page" &&
      currentFile === "" &&
      !pdf ? (
        <Drop
          onLoaded={async (files) => {
            setProgress(20);
            const URL = await blobToURL(files[0]);
            const formData = new FormData();
            formData.append("myFile", files[0]);
            if (formData) {
              const response = await MappingAdapter.addForm(formData, userInfo);
              if (response) {
                setProgress(50);
                setCurrentFile(response?.id);
              } else {
                console.error("Failed to upload file");
              }
            } else {
              console.log("Form data not available");
            }
            setQuestionSyncRequired(true);
            setPdf(URL);
            setPdfLoaded(true);
            setAnswerSyncRequired(true);
            setProgress(100);
            setFile(removeFileExtension(files[0].name));
            setFileID(uuidv4());
          }}
        />
      ) : null}
      <LoadingBar
        color="#32579e"
        style={{ height: "4px" }}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {pdf ? (
        <div>
          <div style={styles.documentBlock}>
            {customMapFlow &&
              textInputVisible &&
              currentQues !== null &&
              generateDraggableText(currentQues, setCustomMapFlow)}
            {signatureFlow &&
              textInputVisible &&
              generateDraggableText("signature", setSignatureFlow)}
            {officeFieldFlow &&
              textInputVisible &&
              generateDraggableText("office_only_field", setOfficeFieldFlow)}
            {propertyMapFlow &&
              textInputVisible &&
              generateDraggableText("property", setPropertyMapFlow)}
            {tenantMapFlow &&
              textInputVisible &&
              generateDraggableText("tenant", setTenantMapFlow)}
            <div className="form-mapping__pdf-view">
              <div className="form-mapping__pdf-wrapper">
                {pdfLoaded && (
                  <PagingControl
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    totalPages={totalPages}
                    //@ts-ignore
                    prevButtonId="previous"
                    nextButtonId="next"
                  />
                )}
                <div
                  className="document-wrapper"
                  ref={documentRef}
                  style={{ position: "relative" }}
                >
                  <Modal
                    showCloseButton={false}
                    isOpen={showPopupModal}
                    size={ModalTypes.Xmedium}
                  >
                    <div className="office-field-error">
                      <div className="office-field-error-text">
                        <Label
                          type={LabelType.Header}
                          //@ts-ignore
                          text={`Still ${getOfficeFieldsCount(
                            formData,
                            officeFieldAnswers
                          )} office only field  have not been filled`}
                          variant={LabelVariant.L2}
                        />

                        <Label
                          type={LabelType.Header}
                          text={"Are you sure! You want to Continue?"}
                          variant={LabelVariant.L2}
                        />
                      </div>
                      <div className="confirmation-button">
                        <Button
                          buttonClick={() => {
                            setShowPopupModal(false);
                            setShowReviewPopup(true);
                          }}
                          testID="delete"
                          btnText="Yes"
                          btnType="rectangle"
                          btnTheme="primary"
                          additionalStyles={{ padding: 0 }}
                        />
                        <Button
                          buttonClick={handleCloseEditModal}
                          testID="delete"
                          btnText="No"
                          btnType="rectangle"
                          btnTheme="secondary"
                          additionalStyles={{ padding: 0 }}
                        />
                      </div>
                    </div>
                  </Modal>

                  {/* {validationError && <div style={{ color: 'red' }}>{validationError}</div>} */}
                  {(role === "form-mapping" || role === "rental-page") &&
                    fieldsOnCurrentPage &&
                    fieldsOnCurrentPage.map((_items, index) =>
                      role === "rental-page" &&
                      _items.question_value === "office_only" &&
                      _items.showInput ? (
                        <input
                          style={{
                            left: _items.position.left,
                            bottom: _items.position.bottom,
                            width: _items.position.width,
                            height: _items.position.height,
                            zIndex: _items.isHighLightText ? 10 : 5,
                            position: "absolute",
                            // display: getDisplayStatusForField(role, _items),
                          }}
                          defaultValue={_items.question_code}
                          onKeyDown={(event) => handleKeyDown(event, _items)}
                        ></input>
                      ) : (
                        <div
                          onClick={() => {
                            toggleCloseStatus(index);
                            // setIsInputMode(true);
                          }}
                          key={index}
                          className="point"
                          style={{
                            left: _items.position.left,
                            bottom: _items.position.bottom,
                            width: _items.position.width,
                            height: _items.position.height,
                            zIndex: _items.isHighLightText ? 10 : 5,
                            display: getDisplayStatusForField(role, _items),
                            backgroundColor: getBackgroundColorForMapField(
                              _items,
                              officeFieldAnswers
                            ),
                            border: getBorderForMapField(
                              _items,
                              officeFieldAnswers
                            ),
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              top: getTopValueForField(_items.question_value),
                              background: _items.isHighLightText
                                ? getBackgroundColorForField(
                                    _items.question_value
                                  )
                                : "",
                              padding: _items.isHighLightText
                                ? getPaddingForField(_items.question_value)
                                : "",
                              zIndex: 120,
                            }}
                          >
                            {_items.question_code}
                          </div>{" "}
                          {_items.showCloseIcon && (
                            <span
                              className="field-close"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMapping(_items.id);
                              }}
                            >
                              <Close
                                className="form-mapping__field-close-icon"
                                width={10}
                                height={10}
                              />
                            </span>
                          )}
                          {_items.showResizeIcon && (
                            <span
                              className="field-resize"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResize(index);
                              }}
                            >
                              <Resize width={12} height={12} />
                            </span>
                          )}
                          {_items.isResizing && (
                            <div
                              onMouseDown={(e) => handleMouseDown(e, _items.id)}
                              className="form-mapping__field-close"
                              style={{
                                top: _items.position.height - 4,
                                left: _items.position.width - 4,
                              }}
                            ></div>
                          )}
                          {_items.showCheckedIcon && (
                            <span
                              className="field-resize-check"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResize(index);
                              }}
                            >
                              <Check
                                className="form-editor__checked-icon"
                                onClick={(e) =>
                                  updateMapping(
                                    e,
                                    _items.id,
                                    currentFile,
                                    currentUpdatedPosition
                                  )
                                }
                              />
                            </span>
                          )}
                        </div>
                      )
                    )}
                  <Document
                    file={pdf}
                    onLoadSuccess={(data) => {
                      setTotalPages(data.numPages);
                    }}
                  >
                    {pdfLoaded && (
                      <Page
                        pageNumber={pageNum + 1}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onLoadSuccess={(data) => {
                          setPageDetails(data);
                        }}
                      />
                    )}
                  </Document>
                </div>
              </div>
              {role == "form-mapping" && (
                <Button
                  btnText={"Finish"}
                  buttonClick={handleFinishFormMapping}
                  btnTheme="primary"
                  btnType="rounded"
                />
              )}
              {role === "rental-page" && pdfLoaded && (
                <div className="form-fields">
                  <div>
                    <div className="form-fields__actions">
                      <div className="form-fields__actions-header">Actions</div>
                      <div className="form-fields__actions-buttons">
                        <BigButton
                          marginRight={8}
                          // inverted={true}
                          title={"Download"}
                          onClick={() => {
                            downloadURI(pdf, getFileName(currentFile));
                          }}
                          // disabled={pageNum !== totalPages - 1}
                        />

                        <BigButton
                          marginRight={8}
                          // inverted={true}
                          title={"Request Changes"}
                          onClick={() => setShowRejectPopup(true)}
                        />
                        <BigButton
                          id="Approve"
                          marginRight={8}
                          // disabled={pageNum !== totalPages - 1}
                          // inverted={true}
                          title={"Approve"}
                          onClick={() => validateOfficeOnlyField("review")}
                        />
                        <BigButton
                          marginRight={8}
                          // inverted={true}
                          title={"Back To Tasks Section"}
                          onClick={handleBackToTasks}
                        />
                        <BigButton
                          // disabled={pageNum !== totalPages - 1}
                          inverted={true}
                          marginRight={8}
                          title={"Reset"}
                          onClick={() => resetPdfToBeginState()}
                        />
                        
                        <BigButton
                          // disabled={pageNum !== totalPages - 1}
                          inverted={true}
                          marginRight={8}
                          title={"Save"}
                          onClick={() =>
                            generatePdfWithAnswersForOfficeFields(
                              officeFieldAnswers,
                              pdf
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Modal
                isOpen={showReviewPopup}
                size={reviewStatus ? ModalTypes.Xmedium : ModalTypes.XSmall}
              >
                {reviewStatus ? (
                  <div className="review-form">
                    <div>
                      <Label
                        type={LabelType.Header}
                        text={"Form Approved Successfully !!"}
                        variant={LabelVariant.L2}
                      />
                    </div>
                    <AnimatedCheck />
                    <div className="review-form-footer">
                      <Button
                        buttonClick={() => {
                          setShowReviewPopup(false);
                          setReviewStatus(false);
                          handleBackToTasks();
                        }}
                        testID="delete"
                        btnText="Close"
                        btnType="rectangle"
                        btnTheme="secondary"
                        additionalStyles={{ padding: 0 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form-mapping__review-popup">
                    <div className="form-mapping__review-header">
                      <Label
                        type={LabelType.Header}
                        text={"Do you want to approve ?"}
                        variant={LabelVariant.L2}
                      />
                    </div>
                    <div>
                      <Button
                        buttonClick={() => {
                          handleReview(
                            tenantID,
                            rentalID,
                            formID,
                            pdf,
                            propertyID
                          );
                        }}
                        testID="clone"
                        btnText="Yes"
                        btnType="rectangle"
                        btnTheme="primary"
                        buttonStatus={isApproving}
                      />
                      <Button
                        buttonClick={() => setShowReviewPopup(false)}
                        testID="clone"
                        btnText="No"
                        btnType="rectangle"
                        btnTheme="secondary"
                        buttonStatus={isApproving}
                      />
                    </div>
                  </div>
                )}
              </Modal>
              <Modal
                title={rejectStatus ? "Success" : "Request Changes"}
                isOpen={showRejectPopup}
                setOn={() => setShowRejectPopup(false)}
                size={ModalTypes.Xmedium}
                showCloseButton={!rejectStatus}
              >
                {rejectStatus ? (
                  <div className="reject-success-popup">
                    <div>Form changes has been requested successfully</div>
                    <AnimatedCheck />
                    <Button
                      btnText={"Close"}
                      additionalStyles={{ padding: 0 }}
                      buttonClick={() => {
                        window.close();
                        setShowRejectPopup(false);
                      }}
                      btnType="rounded"
                      btnTheme="primary"
                    />
                  </div>
                ) : (
                  <div className="form-mapping__reject-modal">
                    <Input
                      errorText={rejectErrorMessage}
                      errored={rejectError}
                      label="Please provide a reason for rejection"
                      name="reject-input"
                      placeholder="Reason to reject"
                      type="text"
                      value={rejectMessage}
                      onChange={handleRejectMessageChange}
                      wrapperStyle={{ margin: 0 }}
                      inputStyle={{ width: "400px" }}
                    />
                    <Button
                      btnText={"Request Changes"}
                      buttonClick={handleRejectForm}
                      additionalStyles={{ padding: 0 }}
                      btnTheme="questionnaire-card"
                      btnType="rounded"
                    />
                  </div>
                )}
              </Modal>
              {(role === "tenant-page" || role === "property-page") && pdfLoaded && (
                <div className="form-fields">
                  <div>
                    <div className="form-fields__actions">
                      <div className="form-fields__actions-header">Actions</div>
                      <div className="form-fields__actions-buttons">
                        {signatureFields?.length > 0 ? (
                          <BigButton
                            id="add_signature"
                            // disabled={pageNum !== totalPages - 1}
                            inverted={true}
                            marginRight={8}
                            title={"Add signature"}
                            onClick={() => setSignatureDialogVisible(true)}
                          />
                        ) : (
                          <BigButton
                            // disabled={pageNum !== totalPages - 1}
                            inverted={true}
                            marginRight={8}
                            title={"Authorize"}
                            onClick={() => signOnUpload()}
                          />
                        )}
                        {role !== "tenant-page" && (
                          <>
                            <BigButton
                              disabled={
                                pageNum !== totalPages - 1 ||
                                signatureURL === null
                              }
                              inverted={true}
                              marginRight={8}
                              title={
                                role === "property-page"
                                  ? "Upload signed form"
                                  : "Notify"
                              }
                              onClick={() => {
                                setShowUploadPopup(true);
                              }}
                            />
                            <BigButton
                              marginRight={8}
                              // inverted={true}
                              title={"Back To Tasks Section"}
                              onClick={handleBackToTasks}
                            />
                          </>
                        )}
                        {role !== "tenant-page" && (
                          <BigButton
                            marginRight={8}
                            // inverted={true}
                            title={"Request Changes"}
                            onClick={() => setShowRejectPopup(true)}
                          />
                        )}
                        {role !== "tenant-page" && (
                          <BigButton
                            marginRight={8}
                            disabled={pageNum !== totalPages - 1}
                            // inverted={true}
                            title={"Download"}
                            onClick={() => {
                              downloadURI(pdf, "file.pdf");
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {role === "form-mapping" && (
                <Tabs
                  additionalWrapperStyle={{}}
                  additionalStyles={{ margin: "14px 14px 0 14px" }}
                  selectedIndex={fieldTabIndex}
                  handleChange={handleSwitchFieldsTab}
                >
                  <Panel title={"Map Fields"} onClick={() => {}}>
                    {/* <div style={{margin:"12px"}}> */}
                    <Accordion
                      data={[
                        {
                          title: "Custom",
                          content: (
                            <div className="form-fields">
                              {/* <div className="form-fields__header">Form fields</div> */}
                              <div className="form-fields__section">
                                <input
                                  type="text"
                                  name=""
                                  placeholder="Search Fields..."
                                  className="form-fields__input"
                                  onChange={(e) => handleSearch(e.target.value)}
                                />
                              </div>
                              <div className="form-fields__wrapper">
                                {filteredFieldLabels.length !== 0
                                  ? filteredFieldLabels.map((_fields) => (
                                      <div
                                        key={_fields.id}
                                        className="form-fields__card"
                                        onClick={() => {
                                          setSignatureFlow(false);
                                          setTextInputVisible(true);
                                          setPropertyMapFlow(false);
                                          setTenantMapFlow(false);
                                          setCustomMapFlow(true);
                                          setOfficeFieldFlow(false);
                                          setMappingsCount(0);
                                          getFieldToMap(
                                            _fields.question_code,
                                            _fields
                                          );
                                        }}
                                      >
                                        {_fields.questionInfo ? (
                                          <FloatingMenu
                                            floatDirection="right"
                                            menuTriggerComponent={
                                              <div
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                                className="form-editor__info-icon"
                                              >
                                                <FaInfo className="form-editor__info-icon--style" />
                                              </div>
                                            }
                                          >
                                            <div
                                              style={{
                                                width: "200px",
                                                padding: "20px",
                                              }}
                                            >
                                              {removeTagsAndnbsp(
                                                _fields?.questionInfo?.text
                                              )}
                                            </div>
                                          </FloatingMenu>
                                        ) : null}

                                        <div className="form-fields__card-field">
                                          {_fields.label}
                                        </div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            className="form-fields__card-icon"
                                            onClick={(e) => {
                                              handleDeleteFormField(
                                                e,
                                                _fields.id
                                              );
                                            }}
                                          >
                                            <Close
                                              style={{
                                                stroke: "red",
                                                height: "16",
                                                width: "16",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  : customFields &&
                                    customFields.map((_fields) => (
                                      <div
                                        key={_fields.id}
                                        className="form-fields__card"
                                        onClick={() => {
                                          setSignatureFlow(false);
                                          setTextInputVisible(true);
                                          setPropertyMapFlow(false);
                                          setTenantMapFlow(false);
                                          setCustomMapFlow(true);
                                          setMappingsCount(0);
                                          setOfficeFieldFlow(false);
                                          getFieldToMap(
                                            _fields.question_code,
                                            _fields
                                          );
                                        }}
                                      >
                                        {_fields.questionInfo ? (
                                          <FloatingMenu
                                            floatDirection="right"
                                            menuTriggerComponent={
                                              <div
                                                onClick={(e) =>
                                                  e.stopPropagation()
                                                }
                                                className="form-editor__info-icon"
                                              >
                                                <FaInfo className="form-editor__info-icon--style" />
                                              </div>
                                            }
                                          >
                                            <div
                                              style={{
                                                width: "200px",
                                                padding: "20px",
                                              }}
                                            >
                                              {removeTagsAndnbsp(
                                                _fields?.questionInfo?.text
                                              )}
                                            </div>
                                          </FloatingMenu>
                                        ) : null}

                                        <div className="form-fields__card-field">
                                          {_fields.label}
                                        </div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            className="form-fields__card-icon"
                                            onClick={(e) => {
                                              handleDeleteFormField(
                                                e,
                                                _fields.id
                                              );
                                            }}
                                          >
                                            <Close
                                              style={{
                                                stroke: "red",
                                                height: "16",
                                                width: "16",
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                              </div>
                              <div></div>
                            </div>
                          ),
                        },
                        {
                          title: "Property",
                          content: (
                            <div className="form-fields__wrapper">
                              {propertyFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(true);
                                    setSignatureFlow(false);
                                    setCurrentQues(null);
                                    setTenantMapFlow(false);
                                    setCustomMapFlow(false);
                                    setOfficeFieldFlow(false);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Tenant",
                          content: (
                            <div className="form-fields__wrapper">
                              {tenantFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTenantMapFlow(true);
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(false);
                                    setCustomMapFlow(false);
                                    setSignatureFlow(false);
                                    setOfficeFieldFlow(false);
                                    setCurrentQues(null);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Odyssey",
                          content: (
                            <div className="form-fields__wrapper">
                              {odysseyFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(false);
                                    setSignatureFlow(false);
                                    setCurrentQues(null);
                                    setTenantMapFlow(false);
                                    setCustomMapFlow(true);
                                    setOfficeFieldFlow(false);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Student",
                          content: (
                            <div className="form-fields__wrapper">
                              {studentFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(false);
                                    setSignatureFlow(false);
                                    setCurrentQues(null);
                                    setTenantMapFlow(false);
                                    setCustomMapFlow(true);
                                    setOfficeFieldFlow(false);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Income",
                          content: (
                            <div className="form-fields__wrapper">
                              {incomeFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(false);
                                    setSignatureFlow(false);
                                    setCurrentQues(null);
                                    setTenantMapFlow(false);
                                    setCustomMapFlow(true);
                                    setOfficeFieldFlow(false);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Asset",
                          content: (
                            <div className="form-fields__wrapper">
                              {assetFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setTextInputVisible(true);
                                    setPropertyMapFlow(false);
                                    setSignatureFlow(false);
                                    setCurrentQues(null);
                                    setTenantMapFlow(false);
                                    setOfficeFieldFlow(false);
                                    setCustomMapFlow(true);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Signature",
                          content: (
                            <div className="form-fields__wrapper">
                              {defaultFieldNames.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setSignatureFlow(true);
                                    setTextInputVisible(true);
                                    setTenantMapFlow(false);
                                    setPropertyMapFlow(false);
                                    setCustomMapFlow(false);
                                    setCurrentQues(null);
                                    setOfficeFieldFlow(false);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                        {
                          title: "Office Only Field",
                          content: (
                            <div className="form-fields__wrapper">
                              {officeOnlyFields.map((_fields) => (
                                <div
                                  key={_fields.id}
                                  className="form-fields__card"
                                  onClick={() => {
                                    setOfficeFieldFlow(true);
                                    setSignatureFlow(false);
                                    setTextInputVisible(true);
                                    setTenantMapFlow(false);
                                    setPropertyMapFlow(false);
                                    setCustomMapFlow(false);
                                    setCurrentQues(null);
                                    getFieldToMap(
                                      _fields.question_code,
                                      _fields
                                    );
                                    setMappingsCount(0);
                                  }}
                                >
                                  <div className="form-fields__card-field">
                                    {_fields.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ),
                        },
                      ]}
                    />
                  </Panel>
                  <Panel title={"Add new Field"} onClick={() => {}}>
                    <div
                      className="create-fields"
                      style={{ maxWidth: "350px" }}
                    >
                      <CreateQuestion
                        target={null}
                        flow={"form_mapping"}
                        setActiveIndex={() => {}}
                        resetStatus={resetStatus}
                        setResetStatus={setResetStatus}
                        onCreateQuestion={createFieldWithQuestion}
                        sideBarStatus={true}
                        setSideBarStatus={() => {}}
                        //  activeQuestionFlow={0}
                        setActiveQuestionFlow={() => {}}
                        setActiveQuestionID={() => {}}
                        activeQuestionID={activeQuestionID}
                        buttonStatus={false}
                        setButtonStatus={() => {}}
                        activeIndex={1}
                        showCloseIcon={false}
                        showCreateQuestion={false}
                        questionFieldCode={questionFieldCode}
                        questionFieldLabel={questionFieldLabel}
                        setQuestionFieldCode={setQuestionFieldCode}
                        setQuestionFieldLabel={setQuestionFieldLabel}
                      />
                      <div className="add-field__error">
                        <span>
                          {fieldLabelError && "Field label cannot be empty"}
                        </span>
                        <span>
                          {fieldCodeError &&
                            "Field code should contain only uppercase letters and underscores"}
                        </span>
                        <span>
                          {combinationError &&
                            "Code or label already exists, Please use a different code or label"}
                        </span>
                      </div>
                    </div>
                  </Panel>
                </Tabs>
              )}
              {signatureDialogVisible && (
                <AddSignDialog
                  setSignatureDialogVisible={setSignatureDialogVisible}
                  onClose={() => setSignatureDialogVisible(false)}
                  autoDate={autoDate}
                  setAutoDate={setAutoDate}
                  onConfirm={(url) => {
                    setShowPopupModal(false);
                    //setSignatureURL(url);
                    setSignatureDialogVisible(false);
                    generatePdfWithSignature(formData, pdf, url, role);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
      <Modal
        title="Saved!"
        isOpen={questionnaireSuccessPopup}
        setOn={() => setQuestionnaireSuccessPopup(false)}
        showCloseButton={false}
      >
        <div className="form-editor__success-popup">
          <div>The form field has been created successfully.</div>
          <AnimatedCheck />
          <Button
            btnText={"Close"}
            additionalStyles={{ padding: 0 }}
            buttonClick={() => setQuestionnaireSuccessPopup(false)}
            btnType="rounded"
            btnTheme="primary"
          />
        </div>
      </Modal>
      <Modal isOpen={finishStatus}>
        <div className="review-form">
          <div>
            <Label
              type={LabelType.Header}
              text={"Form saved successfully!"}
              variant={LabelVariant.L2}
            />
          </div>
          <AnimatedCheck />
          <div className="review-form-footer">
            <Button
              buttonClick={() => {
                router.push(`/dashboard/questionnaire/${activeQuestionID}`);
                setFinishStatus(false);
              }}
              testID="delete"
              btnText="Close"
              btnType="rectangle"
              btnTheme="secondary"
              additionalStyles={{ padding: 0 }}
            />
          </div>
        </div>
      </Modal>
      <Modal
        title={getModalTitle(role)}
        isOpen={showUploadPopup}
        size={ModalTypes.Xmedium}
      >
        <div className="form-mapping__review-popup">
          <div className="form-mapping__review-header">
            <AnimatedCheck />
            <div className="form-mapping__upload-popup">
              {signatureFields?.length > 0 ? (
                <Label
                  type={LabelType.Header}
                  text={getModalBodyMessage(role)}
                  variant={LabelVariant.L2}
                />
              ) : (
                <Label
                  type={LabelType.Header}
                  text={
                    "Your review has been completed and notified to odyssey."
                  }
                  variant={LabelVariant.L2}
                />
              )}
              {/* <Label
                type={LabelType.Header}
                text={getModalMessage(role)}
                variant={LabelVariant.L2}
              /> */}
            </div>
          </div>
          <div>
            <Button
              buttonClick={handleBackAfterSign}
              testID="clone"
              btnText={role === "property-page" ? "Close" : "Okay"}
              btnType="rounded"
              btnTheme="primary"
            />
          </div>
        </div>
      </Modal>
      <Modal
        title={"Error !!"}
        isOpen={fieldErrorPopup}
        setOn={() => setFieldErrorPopup(false)}
        showCloseButton={false}
      >
        <div className="form-mapping__field-error-popup">
          <div className="form-mapping__field-error-popup-header">
            Please add some fields to continue
          </div>
          <div>
            <Button
              buttonClick={() => setFieldErrorPopup(false)}
              testID="clone"
              btnText={"Close"}
              btnType="rounded"
              btnTheme="primary"
              additionalStyles={{ padding: 0 }}
            />
          </div>
        </div>
      </Modal>

      {displayTutorialScreen && pdfLoaded && role === "tenant-page" && (
        <IntroTenantForms onCallback={updateUserNegotiatedIntro} />
      )}
    </>
  );
};

export default FormEditor;
