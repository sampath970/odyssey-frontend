import axios from "axios";
import AppConfig from "../../config/application.config";

const deleteQuestionnaire = async (id, userInfo) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete_questionnaire/`,
      {
        params: {
          property_manager_id: userInfo.sub,
          questionnaire_id: id,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  deleteQuestionnaire");
  }
};

const addQuestionnaire = async (questionnaire, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `create_questionnaire/`,
      questionnaire,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  addQuestionnaire");
  }
};
const addAnswers = async (answer, tenant_id, rental_id, question_id,questionnaire_id) => {
  try {
    const { data } = await axios.post(AppConfig.svc + `add_answer/`, answer, {
      params: {
        tenant_id: tenant_id,
        rental_id: rental_id,
        question_id,
        questionnaire_id
      },
    });
    return data;
  } catch (ex) {
    console.error("Error at  addAnswers");
  }
};
const fetchAllQuestionnaires = async (userInfo) => {
  try {
    if (userInfo) {
      const { data } = await axios.get(AppConfig.svc + `all_questionnaire`, {
        params: {
          property_manager_id: userInfo?.sub,
        },
      });
      return data;
    }
  } catch (ex) {
    console.error("Error at  fetchAllQuestionnaires");
  }
};

const getQuestionnaireByID = async (id, tenant_id) => {
  try {
    const { data } = await axios.get(AppConfig.svc + `questionnaire/` + id, {
      params: {
        tenant_id: tenant_id,
      },
    });
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at  getQuestionnaireByID");
  }
};

const getQuestionnaireByRentalID = async (id, tenant_id,questionnaire_id) => {
  const { data } = await axios.get(
    AppConfig.svc + `rental_questionnaires/` + id,
    {
      params: {
        tenant_id: tenant_id,
        questionnaire_id:questionnaire_id,
      },
    }
  );
  // console.log(data);
  return data;
};

const editQuestionnaire = async (
  updatedQuestionnaire,
  userInfo,
  questionnaire_id
) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `update_questionnaire/`,
      updatedQuestionnaire,
      {
        params: {
          property_manager_id: userInfo.sub,
          question_id: questionnaire_id,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  editQuestionnaire");
  }
};

const sendClientForm = async (rentalId, clientFormInfo,unitID) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `send_client_form/`,
      clientFormInfo,
      {
        params: {
          rental_id: rentalId,
          unit_id: unitID,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  sendClientForm");
  }
};

const getAnswersByTenantID = async (tenantID,rentalID) => {
  try {
    const { data } = await axios.get(AppConfig.svc + `get_answers/`, {
      params: {
        tenant_id: tenantID,
        rental_id:rentalID
      },
    });
    // console.log("getAnswerData",data)
    return data;
  } catch (ex) {
    console.error("Error at  getAnswersByTenantID");
  }
};

const getListingsByPropertyManagerID = async (userInfo) => {
  // console.log(userInfo);
  try {
    const { data } = await axios.get(AppConfig.svc + `all_mapped_form/`, {
      params: {
        property_manager_id: userInfo.sub,
      },
    });
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at  getListingsByPropertyManagerID");
  }
};
const getFormDataByQaId = async (qaID,userInfo) => {
  // console.log(qaID);
  // console.log(userInfo)
  try {
    const { data } = await axios.get(AppConfig.svc + `get_form_data_by_qa_id/`, {
      params: {
        qaId: qaID,
        property_manager_id:userInfo.sub,
      },
    });
    // console.log("qaIddata",data);
    return data;
  } catch (ex) {
    console.error("Error at getFormDataByQaId");
  }
};
const getFormDataByQaIdAndPropertyId = async (qaID,propertyID) => {
  // console.log(qaID);
  // console.log(propertyID)
  try {
    const { data } = await axios.get(AppConfig.svc + `get_form_data_by_qa_id/`, {
      params: {
        qaId: qaID,
        property_id:propertyID,
      },
    });
    // console.log("qaIddata",data);
    return data;
  } catch (ex) {
    console.error("Error at getFormDataByQaIdAndPropertyId",ex);
  }
};
const assignQuestionnaireToForm = async (userInfo, formID, questionnaireID) => {
  debugger;
    // console.log(userInfo)
    // console.log(formID)
    // console.log(questionnaireID)
  try {
    const { data } = await axios.post(
      AppConfig.svc + `link_form_with_questionnaire/`,
      {
          id:formID,
          questionnaire_id:questionnaireID,
      },
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at assignQuestionnaireToForm");
  }
};
const reviewQuestionnaireForm = async (tenantID,rentalID,formID) =>{
  // console.log(rentalID)
  // console.log(tenantID)
  // console.log(formID)
  try {
    const data = await axios.post(
      AppConfig.svc + `change_status`,{},{
        params:{
          tenant_id : tenantID,
          rental_id : rentalID,
          formID : formID
        }
      }
    )
    return data;
  } catch (error) {
    console.error("Error at review questionnaire")
  }
}
const QuestionnaireAdapter = {
  addQuestionnaire,
  getQuestionnaireByID,
  editQuestionnaire,
  deleteQuestionnaire,
  fetchAllQuestionnaires,
  addAnswers,
  getQuestionnaireByRentalID,
  getAnswersByTenantID,
  sendClientForm,
  getListingsByPropertyManagerID,
  assignQuestionnaireToForm,
  getFormDataByQaId,
  getFormDataByQaIdAndPropertyId,
  reviewQuestionnaireForm
};
export default QuestionnaireAdapter;
