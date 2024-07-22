"use client";

import React, { useState, useEffect, useRef } from "react";
import "./client-form.scss";
import Button from "../../../components/button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import QuestionnaireAdapter from "../../../services/adapters/questionnaire-adapter";
import { useUserInfo } from "../../../services/hooks/useUserInfo";
import Info from "../../../public/assets/icons/info.svg";
import FloatingMenu from "../../../components/floating-menu/floating-menu";
import Modal, { ModalTypes } from "../../../components/modal/modal";
import SignatureInput from "../../../components/signature-input/signature-input";
import Checkbox from "../../../components/checkbox/checkbox";
import Radio from "../../../components/radio/radio";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../components/label/label";

interface ClientFormProps {
  params?: any;
  onClose?: any;
  questionnaireId?: any;
  submitButtonStatus?: boolean;
  title?: string;
}

const ClientForm = (props: ClientFormProps) => {
  const [text, setText] = useState("");
  const [isSuccessfulSubmit, setSubmitStatus] = useState(false);
  const [answer, setAnswer] = useState({});
  const [questionnaire, setQuestionniare] = useState(null);
  const [selectedRadioOption, setSelectedRadioOption] = useState(null);
  const [accessStatus, setAccessStatus] = useState(false);
  let { params, title, questionnaireId, submitButtonStatus = true } = props;
  const { userInfo } = useUserInfo();
  const fileUploadRefs = useRef<Record<string, HTMLInputElement | null>>({});
  let questionnaireID = params?.["form_id"] || questionnaireId;

  const handleMultiSelect = (option, id, type) => {
    console.log(answer[id]);
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
      },
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      let result = await QuestionnaireAdapter.getQuestionnaireByID(
        questionnaireID,
        userInfo
      );
      if (result && result[0]) {
        setQuestionniare(result[0]);
      }
    };

    fetchData();
  }, []);
  console.log(questionnaire);
  const { onClose } = props;
  const [dateOfBirth, setDateOfBirth] = useState(null);

  const handleDateOfBirthChange = (date: any, id, target) => {
    var d = new Date(date);
    let formattedDate = [
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
      d.getFullYear(),
    ].join("/");
    try {
      setDateOfBirth(date);
      setAnswer((prev) => {
        return {
          ...prev,
          [id]: { value: formattedDate, data_type: "date", target },
        };
      });
    } catch (ex) {
      console.error("Error at handleDateOfBirthChange");
    }
  };

  const isYearInAllowedRange = (year: number) => {
    return year <= 2007;
  };

  const handleChange = (e, target): void => {
    try {
      console.log(e.target);
      const { name, value, type } = e?.target;
      setAnswer((prev) => {
        return {
          ...prev,
          [name]: { value: value, data_type: type, target: target },
        };
      });
    } catch (ex) {
      console.error("Error at handleChange");
    }
  };
  const handleRadioChange = (name: string, value: string, type, target) => {
    setAnswer((prev) => ({
      ...prev,
      [name]: { value, data_type: type, target: target },
    }));
  };
  const handleFileChange = (name: string, value: string, type, target) => {};
  console.log(answer);
  const renderInput = (type, id, options) => {
    console.log(type);
    try {
      switch (type) {
        case "text_short":
          return (
            <input
              type="text"
              name={id}
              className="form__input"
              onChange={(e) => handleChange(e, options[0].target)}
            />
          );
        case "text_long":
          return (
            <textarea
              name={id}
              className="form__text-area"
              onChange={(e) => handleChange(e, options[0].target)}
            />
          );
        case "radio":
          console.log(options);
          return (
            <div className="form__radio-wrapper">
              {options?.map((_options) => (
                <Radio
                  name={id}
                  label={_options.value}
                  onChange={() =>
                    handleRadioChange(
                      id,
                      _options.value,
                      _options.answerType,
                      _options.target
                    )
                  }
                />
              ))}
            </div>
          );
        case "multi-select":
          return (
            <div className="form__check-box-wrapper">
              {options?.map((_options) => (
                <Checkbox
                  name={id}
                  label={_options.value}
                  checked={(answer[id]?.value || []).includes(_options)}
                  onChange={() =>
                    handleMultiSelect(_options, id, _options.answerType)
                  }
                />
              ))}
            </div>
            //will generate checkbox with the help of options
          );
        case "number":
          return (
            <input
              type="number"
              name={id}
              className="form__input"
              onChange={(e) => handleChange(e, options[0].target)}
            />
          );
        case "date":
          return (
            <DatePicker
              className="date-picker"
              selected={dateOfBirth}
              onChange={(date) =>
                handleDateOfBirthChange(date, id, options[0].target)
              }
              pickNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="MM/dd/yyyy"
              isClearable
              scrollableYearDropdown
              yearDropdownItem={isYearInAllowedRange}
              yearDropdownItemNumber={2}
            />
          );
        case "sign":
          return <SignatureInput />;
        default:
          return (
            <input
              type="text"
              className="form__input"
              onChange={(e) => handleChange(e, options[0].target)}
            />
          );
      }
    } catch (ex) {
      console.error("Error at renderInput");
    }
  };
  const handleSubmit = () => {
    console.log(answer);
  };

  console.log(questionnaire);
  return (
    <>
      <div className="form">
        <div className="form__wrapper">
          <div className="form__title">
            <div className="form__title-text">
              <Label
                type={LabelType.Body}
                text={title ? title : "Odyssey Remote Certification Solution"}
                variant={LabelVariant.L4}
              />
            </div>
          </div>
          <div className="form__header">
            <div className="form__header-text">
            <Label
                type={LabelType.Header}
                text= {questionnaire?.title}
                variant={LabelVariant.L4}
              />
             
              </div>
          </div>
          <div className="form__title-info">
          <Label
                type={LabelType.Header}
                text={"Please complete the following:"}
                variant={LabelVariant.L4}
              />
        </div>

          {questionnaire &&
            questionnaire?.questions.map((_question, index) => (
              <div className="form__input-wrapper" key={_question.id}>
                <div className="form__input-header">
                  <div>{index + 1}. </div>
                  <div
                    className="form__input-label"
                    dangerouslySetInnerHTML={{
                      __html: _question.text,
                    }}
                  ></div>
                  <FloatingMenu
                    floatDirection="right"
                    menuTriggerComponent={<Info className="form__input-info" />}
                  >
                    <div className="form__input-float-text-wrapper">
                      <div
                        className="form__input-float-text"
                        dangerouslySetInnerHTML={{
                          __html: _question.description,
                        }}
                      ></div>
                    </div>
                  </FloatingMenu>
                </div>
                {/* <label> */}
                {renderInput(
                  _question.answer_type,
                  _question.code,
                  _question.options
                )}
                {/* </label> */}
              </div>
            ))}
          {submitButtonStatus && (
            <div className="form__submit-button">
              <Button
                btnType="rectangle"
                btnText="submit"
                btnTheme="primary"
                buttonClick={handleSubmit}
                testID={""}
              />
            </div>
          )}
        </div>
        <Modal
          isOpen={isSuccessfulSubmit}
          title={"Success"}
          setOn={() => setSubmitStatus(false)}
        >
          <div>
            <div className="client-form__content">
              <div>Your details has been submitted successfully</div>
            </div>
            <div className="client-form__modal-footer">
              <Button
                btnText="Close"
                btnTheme="primary"
                btnType="rounded"
                testID="properties-button"
                buttonClick={() => setSubmitStatus(false)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ClientForm;
