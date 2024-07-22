import React, { useState } from "react";
import "./slider-component.scss";
import Folder from "../../public/assets/icons/pdf.svg";
import Delete from "../../public/assets/icons/garbage.svg";
import MappingAdapter from "../../services/adapters/mapping-adapter";
import Button from "../button/button";
import Modal, { ModalTypes } from "../modal/modal";
import AnimatedCheck from "../animated-check/animated-check";
import Label, {
  LabelType,
  LabelVariant,
} from "../../components/label/label";


interface SliderComponentProps {
  forms: any[];
  currentFile: string;
  setCurrentFile: (file: string) => void;
  setShowEditor: (show: boolean) => void;
  userInfo: any;
  setSyncRequired: (syncRequired: boolean) => void;
  setQuestionSyncRequired: (syncRequired: boolean) => void;
}

const SliderComponent: React.FC<SliderComponentProps> = (props) => {
  const { forms, currentFile, setCurrentFile, setShowEditor, userInfo, setSyncRequired, setQuestionSyncRequired } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [formID, setFormId] = useState(false);
  const [modelTitle, setModelTitle] = useState("Delete!");
  const [modelDescription, setModelDescription] = useState("Are you sure that you want to delete this form ?");

  function handleFileClick(formID) {
    setCurrentFile(formID);
    setQuestionSyncRequired(true)
    setShowEditor(true);
  }

  async function handleDelete(formID) {
    setFormId(formID);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    console.log(formID);
    console.log(userInfo);
    let result = await MappingAdapter.deleteForm(userInfo, formID);
    console.log(result);
    if (result.success === true) {
      setDeleteStatus(true);
      setShowDeleteModal(true);
      setModelTitle("Deleted Successful!");
      setModelDescription("Form deleted successfully !!");
      setSyncRequired(true);
    } else if (result.success === false) {
      // Handle failure case if needed
    } else {
      console.log("error while deleting form");
    }
  }

  const onClosePopup = () => {
    setShowDeleteModal(false);
    setDeleteStatus(false);
    setSyncRequired(true)
  };

  console.log(forms);

  const getFileName = (name: string | undefined) => {
    if (name) {
      let formattedName = name.split("/")[1];
      return formattedName;
    } else {
      return null;
    }
  };
  const determineModalSize = () => {
    if (deleteStatus) {
      return ModalTypes.Medium;
    } else {
      return ModalTypes.Small;
    }
  }
    const formStyle = {

    }
  

    return (
      <>
        <div className="slider-component">
          {forms &&
            forms.map((_forms, index) => (
              <div key={index} className="form-card__wrapper">
                <div className="slider-component__delete">
                  <Delete onClick={() => handleDelete(_forms?.name)} />
                </div>
                <div className="form-mapping__folders-wrapper" onClick={() => handleFileClick(_forms?.name)}>
                  <Folder />
                  <div className="form-mapping__folders-label">
                    <Label
                      type={LabelType.SubHeader}
                      text={getFileName(_forms?.name)}
                      variant={LabelVariant.L2}
                      overrideTextStyles={formStyle}
                    /></div>
                </div>
              </div>
            ))}
          <Modal isOpen={showDeleteModal} title={modelTitle} size={determineModalSize()}>
            <div className="slider-component__successfully-deleted-popup">
            <Label
                type={LabelType.Header}
                text={modelDescription}
                variant={LabelVariant.L2}
              />
              
              <div className="popup_footer">
                {deleteStatus === true && (
                  <>
                    <AnimatedCheck />
                    <Button
                      additionalStyles={{ padding: 0 }}
                      buttonClick={onClosePopup}
                      btnText="Close"
                      btnType="rectangle"
                      btnTheme="primary"
                    />
                  </>
                )}
                {!deleteStatus && (
                  <div style={{ width: "100%", display: "flex", gap: "80px" }}>
                    <Button
                      additionalStyles={{ padding: 0 }}
                      buttonClick={confirmDelete}
                      btnText="yes"
                      btnType="rectangle"
                      btnTheme="primary"
                    />
                    <Button
                      additionalStyles={{ padding: 0 }}
                      buttonClick={onClosePopup}
                      btnText="no"
                      btnType="rectangle"
                      btnTheme="primary"
                    />
                  </div>
                )}
              </div>
            </div>
          </Modal>
        </div>
      </>
    );
  }

  export default SliderComponent;
