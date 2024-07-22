"use client";
import React, { useEffect, useState } from "react";
import "./questionnaire.scss";
import Button from "../../../../components/button/button";
import QuestionnaireCard from "../../../../components/questionnaire-card/questionnaire-card";
import { useRouter } from "next/navigation";
import { useQuestionnaires } from "../../../../services/hooks/useQuestionnaires";
import Modal, { ModalTypes } from "../../../../components/modal/modal";
import TableView from "../../../../components/table/table";
import QuestionnaireAdapter from "../../../../services/adapters/questionnaire-adapter";
import { useUserInfo } from "../../../../services/hooks/useUserInfo";
import ClientForm from "../../../client-form/[form_id]/page";
import QuestionnaireAssign from "../../../../components/questionnaire-assign/questionnaire-assign";
import AnimatedCheck from "../../../../components/animated-check/animated-check";
import Label, {
  LabelType,
  LabelVariant,
} from "../../../../components/label/label";
import { assignRootSourceAndTargetToQuestions, evaluateQuestions } from "../../../../utils/question-utils";

interface QuestionnaireProps {
  params?:any;
}

const Questionnaire: React.FC<QuestionnaireProps> = (props) => {
  console.log(props)
  const { push } = useRouter();
  const { userInfo } = useUserInfo();
  const {params} = props;
  console.log(params)
  if (!userInfo) return null;
  const [deleteQuestionnaireID, setDeleteQuestionnaireID] = useState<string>();
  const [showCloneModal, setCloneStatus] = useState(false);
  const [showClonedModal, setShowCloneModal] = useState(false);
  const [showDeleteModal, setShowDeletemodal] = useState(false);
  const [showDeletedModal, setDeleteStatus] = useState(false);
  const [showEditModel, setShowEditModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const [assignModalMessage, setAssignModalMessage] = useState("");
  const [questionnaireTitle, setQuestionnaireTitle] = useState("");
  const [activeQuestionnaireID, setActiveQuestionnaireID] = useState<
    string | null
  >(null);
  const [currentForm, setCurrentForm] = useState<string>("");
  const { questionnaire_list, setActive_QA_ID, setQuestionniareList } =
    useQuestionnaires();
  let table_data = questionnaire_list?.map(({ title }) => ({ title }));
  const [showClientFormModal, setShowClientFormModal] = useState(false);
  console.log(currentForm);
  const handleCloseClientFormModal = () => {
    try {
      setShowClientFormModal(false);
    } catch (ex) {
      console.error("Error at handleCloseClientFormModal");
    }
  };
  useEffect(()=>{
    if(params.questionnaire_id === "any"){
      console.log("do none")
    }else{
      setActiveQuestionnaireID(params.questionnaire_id);
      editQuestionnaire(params.questionnaire_id);
    }
  },[params])
  const openClientFormConfirmation = (
    event: any,
    id: string
  ) => {
    try {
      setShowClientFormModal(true);
      event.stopPropagation();
      setActiveQuestionnaireID(id);
    } catch (ex) {
      console.error("Error at openClientFormConfirmation");
    }
  };
  const onConfirmCloneModal = async () => {
    try {
      let clone_result = await QuestionnaireAdapter.getQuestionnaireByID(
        activeQuestionnaireID,
        userInfo
      );
      if (clone_result) {
        setShowCloneModal(true);
        console.log(clone_result);
        const extractedQuestion = clone_result.map(({ title, questions }) => ({
          title,
          questions,
        }));
        console.log(extractedQuestion);
        const data = await QuestionnaireAdapter.addQuestionnaire(
          extractedQuestion[0],
          userInfo
        );
        console.log(data);
        if (data) {
          const list = await QuestionnaireAdapter.fetchAllQuestionnaires(
            userInfo
          );
          setQuestionniareList(list);
        } else {
          console.log("Check confirm clone modal");
        }
      } else {
        console.log("Check data to clone modal");
      }
    } catch (ex) {
      console.error("Error at onConfirmDeleteModal");
    }
  };

  const handleCloseCloneModal = () => {
    try {
      setShowCloneModal(false);
      setCloneStatus(false);
    } catch (ex) {
      console.error("Error at handleCloseCloneModal");
    }
  };

  const openCloneConfirmation = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    title: string
  ) => {
    console.log(id);
    try {
      setCloneStatus(true);
      setActiveQuestionnaireID(id);
      setQuestionnaireTitle(title);
      event.stopPropagation();
    } catch (ex) {
      console.log("Error at openCloneConfirmation");
    }
  };

  const onConfirmDeleteModal = async () => {
    try {
      let delete_result = await QuestionnaireAdapter.deleteQuestionnaire(
        deleteQuestionnaireID!,
        userInfo
      );
      if (delete_result) {
        setDeleteStatus(true);
        const data = await QuestionnaireAdapter.fetchAllQuestionnaires(
          userInfo
        );
        setQuestionniareList(data);
      }
    } catch (ex) {
      console.error("Error at onConfirmDeleteModal");
    }
  };

  const handleCloseDeleteModal = () => {
    try {
      setShowDeletemodal(false);
      setDeleteStatus(false);
    } catch (ex) {
      console.error("Error at handleCloseDeleteModal");
    }
  };

  const handleCloseMapModal = () => {
    try {
      setShowMapModal(false);
    } catch (ex) {
      console.error("Error at handleCloseMapModal");
    }
  };

  const handleCloseAssignModal = () => {
    try {
      setAssignModal(false);
    } catch (ex) {
      console.error("Error at handleCloseAssignModal");
    }
  };

  const openDeleteConfirmation = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    title: string
  ) => {
    try {
      setShowDeletemodal(true);
      setDeleteQuestionnaireID(id);
      setQuestionnaireTitle(title);
      event.stopPropagation();
    } catch (ex) {
      console.error("Error at openDeleteConfirmation");
    }
  };

  const handleCloseEditModal = () => {
    try {
      setShowEditModal(false);
    } catch (ex) {
      console.error("Error at handleCloseEditModal");
    }
  };

  const openEditConfirmation = (
    event: any,
    id: string,
    title: string
  ) => {
    try {
      setShowEditModal(true);
      setActiveQuestionnaireID(id);
      setQuestionnaireTitle(title);
      event.stopPropagation();
    } catch (ex) {
      console.error("Error at openEditConfirmation");
    }
  };

  const openMapForm = (
    event: React.MouseEvent<HTMLDivElement>,
    id: string,
    title: string
  ) => {
    try {
      setShowMapModal(true);
      setActiveQuestionnaireID(id);
      setQuestionnaireTitle(title);
      event.stopPropagation();
    } catch (ex) {
      console.error("Error at openMapForm");
    }
  };

  const editQuestionnaire = (id) => {
    try {
      if(id === ""){
        setActive_QA_ID(activeQuestionnaireID!);
        push("/dashboard/questions-flow/");
      }else{
        setActive_QA_ID(id);
        push("/dashboard/questions-flow/");
      }
    } catch (ex) {
      console.error("Error at editQuestionnaire");
    }
  };

  const navigateToQuestionsFlow = () => {
    try {
      setActive_QA_ID("");
      push("/dashboard/questions-flow/");
    } catch (ex) {
      console.error("Error at navigateToQuestionsFlow");
    }
  };

  const navigateToClientForm = () => {
    try {
      push("/client-form/" + activeQuestionnaireID!);
    } catch (ex) {
      console.error("Error at navigateToClientForm");
    }
  };

  const renderFloatingMenu = (index: number) => {
    const questionnaire = questionnaire_list[index];
    if (!questionnaire) {
      return null;
    }

    const { id, title } = questionnaire;

    const onDeleteTableData = (id: string, title: string) => {
      openDeleteConfirmation(null, id, title);
    };

    const onEditTableData = (id: string, title: string) => {
      openEditConfirmation(null, id, title);
    };

    const onCloneTableData = (id: string, title: string) => {
      openCloneConfirmation(null, id, title);
    };

    return (
      <div className="floating">
        <ul className="floating-menu">
          <li
            className="floating-menu__item"
            onClick={() => onEditTableData(id, title)}
          >
            Edit
          </li>
          <li
            className="floating-menu__item"
            onClick={() => onDeleteTableData(id, title)}
          >
            Delete
          </li>
          <li
            className="floating-menu__item"
            onClick={() => onCloneTableData(id, title)}
          >
            Clone
          </li>
        </ul>
      </div>
    );
  };

  const handleAssignQuestion = async (
    userInfo: any,
    formID: string,
    questionnaireID: string
  ) => {
    debugger;
    let data = await QuestionnaireAdapter.assignQuestionnaireToForm(
      userInfo,
      formID,
      questionnaireID
    );
    if (data) {
      const qaList = await QuestionnaireAdapter.fetchAllQuestionnaires(
        userInfo
      );
      setQuestionniareList(qaList);
      setAssignModal(true);
      setAssignModalMessage(data.message);
      setShowMapModal(false);
    }
  };
  const evaluateQuestionsForSourceTargetAndRoot = (_questions) =>{
    let _updatedQuestions = assignRootSourceAndTargetToQuestions(_questions);
    let evaluatedResult = evaluateQuestions(_updatedQuestions);
    return evaluatedResult;
  }
  return (
    <div className="questionnaire">
      <div className="questionnaire__add_top">
        <Button
          btnText="+ Create Questionnaire"
          btnTheme="secondary"
          btnType="outline"
          testID="properties-button"
          buttonClick={navigateToQuestionsFlow}
        />
      </div>

      <div className="questionnaire__favourites">
        <Label
          type={LabelType.Body}
          text={"Favorites"}
          variant={LabelVariant.L4}
        />
      </div>
      <div className="questionnaire-card__wrapper">
        {questionnaire_list.length == 0 ? (
          <div className="questionnaire-card__label">
            <Label
              type={LabelType.Header}
              text={"No questionnaires created yet"}
              variant={LabelVariant.L2}
            />
          </div>
        ) : (
          questionnaire_list.map((_questionnaire) => [
            <QuestionnaireCard
              id={_questionnaire.id}
              title={_questionnaire?.form_name}
              name={_questionnaire?.questions?.length + " questions"}
              formName={_questionnaire?.title}
              validationForSourceRootAndTarget = {evaluateQuestionsForSourceTargetAndRoot(_questionnaire?.questions)}
              onClone={(e) =>
                openCloneConfirmation(
                  e,
                  _questionnaire.id,
                  _questionnaire.title
                )
              }
              onDelete={(e) =>
                openDeleteConfirmation(
                  e,
                  _questionnaire.id,
                  _questionnaire.title
                )
              }
              onEdit={(e) =>
                openEditConfirmation(e, _questionnaire.id, _questionnaire.title)
              }
              onMapForm={(e) =>
                openMapForm(e, _questionnaire.id, _questionnaire.title)
              }
              onCardClick={(e) =>
                openClientFormConfirmation(e, _questionnaire.id)
              }
            />,
          ])
        )}
      </div>
      {showClonedModal == false && (
        <Modal
          showCloseButton={false}
          isOpen={showCloneModal}
          size={ModalTypes.Small}
        >
          <div className="questionnaire__popup-wrapper">
            <div>
              <Label
                type={LabelType.Header}
                text={"Are you sure! You want to clone?"}
                variant={LabelVariant.L2}
              />
            </div>
            <div className="popup-title">
              <Label
                type={LabelType.Header}
                text={questionnaireTitle}
                variant={LabelVariant.L3}
              />
            </div>
            <div className="popup_footer">
              <Button
                buttonClick={onConfirmCloneModal}
                testID="clone"
                btnText="Yes"
                btnType="rectangle"
                btnTheme="primary"
              />
              <Button
                buttonClick={handleCloseCloneModal}
                testID="clone"
                btnText="No"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>
      )}
      {showClonedModal == true && (
        <Modal
          showCloseButton={false}
          isOpen={showCloneModal}
          size={ModalTypes.Xmedium}
        >
          <div className="popup-questionnaire">
            <div>
              <Label
                type={LabelType.Header}
                text={"Questionnaire Cloned Successfully !!"}
                variant={LabelVariant.L2}
              />
            </div>
            <AnimatedCheck />
            <div className="popup_footer">
              <Button
                buttonClick={handleCloseCloneModal}
                testID="delete"
                btnText="Close"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>
      )}

      {showDeletedModal == false && (
        <Modal
          showCloseButton={false}
          isOpen={showDeleteModal}
          size={ModalTypes.Small}
        >
          <div className="questionnaire__popup-wrapper">
            <div>
              <Label
                type={LabelType.Header}
                text={"Are you sure that you want to delete?"}
                variant={LabelVariant.L2}
              />
            </div>
            <div className="popup-title">
              <Label
                type={LabelType.Header}
                text={questionnaireTitle}
                variant={LabelVariant.L3}
              />
            </div>
            <div className="popup_footer">
              <Button
                buttonClick={onConfirmDeleteModal}
                testID="delete"
                btnText="Yes"
                btnType="rectangle"
                btnTheme="primary"
              />
              <Button
                buttonClick={handleCloseDeleteModal}
                testID="delete"
                btnText="No"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>
      )}
      {showDeletedModal == true && (
        <Modal
          showCloseButton={false}
          isOpen={showDeleteModal}
          size={ModalTypes.Xmedium}
        >
          <div className="popup-questionnaire">
            <Label
              type={LabelType.Header}
              text={"Questionnaire Deleted Successfully !!"}
              variant={LabelVariant.L2}
            />

            <AnimatedCheck />
            <div className="popup_footer">
              <Button
                buttonClick={handleCloseDeleteModal}
                testID="delete"
                btnText="Close"
                btnType="rectangle"
                btnTheme="secondary"
              />
            </div>
          </div>
        </Modal>
      )}

      <Modal
        showCloseButton={false}
        isOpen={showEditModel}
        size={ModalTypes.Small}
      >
        <div className="questionnaire__popup-wrapper">
          <Label
            type={LabelType.Header}
            text={"Are you sure! You want to Edit?"}
            variant={LabelVariant.L2}
          />

          <div className="popup-title">
            <Label
              type={LabelType.Header}
              text={questionnaireTitle}
              variant={LabelVariant.L3}
            />
          </div>
          <div className="popup_footer">
            <Button
              buttonClick={()=>editQuestionnaire("")}
              testID="delete"
              btnText="Yes"
              btnType="rectangle"
              btnTheme="primary"
            />
            <Button
              buttonClick={handleCloseEditModal}
              testID="delete"
              btnText="No"
              btnType="rectangle"
              btnTheme="secondary"
            />
          </div>
        </div>
      </Modal>
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
              handleAssignQuestion(userInfo, currentForm, activeQuestionnaireID)
            }
            currentForm={currentForm}
            setCurrentForm={setCurrentForm}
          />
        )}
      </Modal>
      <Modal
        showCloseButton={false}
        isOpen={assignModal}
        setOn={handleCloseAssignModal}
        title={"Success !!"}
        size={ModalTypes.Medium}
      >
        <div className="questionnaire__popup-assign-success">
          {assignModalMessage}
        </div>
        <AnimatedCheck />
        <div className="questionnaire__popup-assign-close">
          <Button
            btnText="Close"
            btnTheme="primary"
            btnType="rounded"
            testID="properties-button"
            additionalStyles={{ paddingTop: 0 }}
            buttonClick={handleCloseAssignModal}
          />
        </div>
      </Modal>
      <Modal
        title="Preview"
        setOn={handleCloseClientFormModal}
        showCloseButton={true}
        isOpen={showClientFormModal}
        size={ModalTypes.Xmedium}
      >
        <ClientForm
          submitButtonStatus={false}
          questionnaireId={activeQuestionnaireID}
        />
      </Modal>
    </div>
  );
};

export default Questionnaire;

