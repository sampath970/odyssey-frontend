import axios from "axios";
import AppConfig from "../../config/application.config";

const fetchQuestionCodes = async (userInfo, questionnaire_id) => {
  // TODO: refactor the adapter functions to handle a 401 error, check the auth tokens, and redirect to login.
  // console.log(userInfo?.sub)
  try {
    const { data } = await axios.get(
      AppConfig.svc + `all_question_code/`,
      {
        params: {
          property_manager_id: userInfo.sub,
          questionnaire_id: questionnaire_id
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at fetchQuestionCodes");
  }
};
const fetchForms = async (userInfo) => {
  // console.log(userInfo?.sub)
  try {
    const { data } = await axios.get(
      AppConfig.svc + `view_form/`,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at fetchQuestionCodes");
  }
};

const addForm = async (file, userInfo) => {
  // console.log(file)
  // console.log(userInfo)
  try {
    const { data } = await axios.post(
      AppConfig.svc + `add_form/`,
      file,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log("data", data)
    return data;
  } catch (ex) {
    console.error("Error at addForm", ex);
  }
};
const addField = async (field, userInfo) => {
  // console.log(field)
  // console.log(userInfo)
  try {
    const { data } = await axios.post(
      AppConfig.svc + `create_field/`,
      field,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at addField");
  }
};
const addMapping = async (mappings, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `add_mapping/`,
      mappings,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at addField");
  }
};
const removeMapping = async (formID, fieldID, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `remove_mappings/`, {},
      {
        params: {
          form_id: formID,
          field_id: fieldID,
          property_manager_id: userInfo.sub
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at addField");
  }
};
const updateMapping = async (fieldID, formID, position, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `update_mapping_position/`, {
      position
    },
      {
        params: {
          form_id: formID,
          field_id: fieldID,
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at addField");
  }
};
const getMappingByFormId = async (formId) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `mapping_by_form_id/`,
      {
        params: {
          form_id: formId,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at fetchQuestionCodes");
  }
};
const deleteForm = async (userInfo, formId) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete/file/`,
      {
        params: {
          property_manager_id: userInfo.sub,
          form_name: formId
        },
      }
    );
    return data;
  } catch (error) {

  }
}
const deleteFormField = async (field_id, userInfo) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete_field/`,
      {
        params: {
          property_manager_id: userInfo.sub,
          field_id
        },
      }
    );
    return { data };
  } catch (error) {
    console.log(error)
  }
}
const initializeQuestionnaireForFormMapping = async (form_name, userInfo) => {
  // console.log(form_name, userInfo)
  try {
    const { data } = await axios.post(
      AppConfig.svc + "initialize_questionnaire_for_form_mapping/", {
      form_name: form_name
    },
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    )
    // console.log(data)
    return data;
  } catch (error) {
    console.log("Error on initializeQuestionnaireForFormMapping", error)
  }
}
const publishQuestionnaireAndMapField = async (userInfo, questionnaire_id, form_id) => {
  // console.log(userInfo)
  // console.log(questionnaire_id)
  // console.log(form_id)
  try {
    const { data } = await axios.post(
      AppConfig.svc + "update_questionnaire_by_form_fields/", {},
      {
        params: {
          property_manager_id: userInfo.sub,
          questionnaire_id,
          form_id
        },
      }
    )
    // console.log(data)
    return { data }
  } catch (error) {
    console.log(error)
  }
}
const rejectForm = async (tenant_id, rental_id, formID, message) => {
  // console.log(tenant_id)
  // console.log(rental_id)
  // console.log(formID)
  try {
    const { data } = await axios.post(
      AppConfig.svc + "change_status_reject/", { message: message }, {
      params: {
        tenant_id,
        rental_id,
        formID
      }
    }
    )
    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
const MappingAdapter = {
  fetchQuestionCodes,
  fetchForms,
  addField,
  addMapping,
  getMappingByFormId,
  addForm,
  removeMapping,
  deleteForm,
  initializeQuestionnaireForFormMapping,
  publishQuestionnaireAndMapField,
  updateMapping,
  deleteFormField,
  rejectForm
};
export default MappingAdapter;