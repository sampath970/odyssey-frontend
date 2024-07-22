import axios, { all } from "axios";
import AppConfig from "../../config/application.config";

const addTenant = async (tenant, userInfo) => {
  // let {setAllProperties} = useAllTenants();
  try {
    const { data } = await axios.post(
      AppConfig.svc + `create_tenant/`,
      tenant,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at add Property Manager");
  }
};

const addPropertyManager = async (propertyManager, userInfo) => {
  // let {setAllProperties} = useAllTenants();
  try {
    const { data } = await axios.post(
      AppConfig.svc + `create_property_manager/`,
      propertyManager,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at addPropertyManager");
  }
};

const editTenant = async (tenant, userInfo, tenant_id) => {
  debugger;
  try {
    const { data } = await axios.post(
      AppConfig.svc + `update_tenant/`,
      tenant,
      {
        params: {
          property_manager_id: userInfo.sub,
          tenant_id: tenant_id,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at addTenant");
  }
};

const assignTenant = async (rental_info) => { 
  try {
    const { data } = await axios.post(
      AppConfig.svc + `assign_tenant/`,
      rental_info,
    );
    return data;
  } catch (ex) {
    console.error("Error at addTenant");
  }
};
// delete tenant
const deleteTenant = async (userInfo, tenantId) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete_tenant/`,
      {
        params: {
          property_manager_id: userInfo.sub,
          tenant_id: tenantId,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at deleteTenant");
  }
}
const fetchAllTenants = async (userInfo) => {
  try {
    if (userInfo?.sub) {
      // let {setAllProperties} = useAllTenants();
      const { data } = await axios.get(
        AppConfig.svc + `all_tenants/` + userInfo?.sub
      );
      // console.log(data);
      return data;
    }
  } catch (ex) {
    console.error("Error at fetchAllTenants");
  }
  // setAllProperties(data);
};
const getRentalByTenantId = async (tenantID) => {
  try {
    // let {setAllProperties} = useAllTenants();
    const { data } = await axios.get(
      AppConfig.svc + `get_rentals_by_tenant_id/`,
      {
        params: {
          tenant_id: tenantID,
        },
      }
    );
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at getRentalByTenantId");
  }
  // setAllProperties(data);
};

const uploadSignedForm = async (property_id, rental_id, tenant_id, formData) => {
  try {
    // let {setAllProperties} = useAllTenants();
    const { data } = await axios.post(
      AppConfig.svc + `upload/signed/document/`,
      formData,
      {
        params: {
          property_id,
          rental_id,
          tenant_id
        },
      }
    );
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at getRentalByTenantId");
  }
  // setAllProperties(data);
};
const uploadPropertyManagerSignedForm = async (property_id, rental_id, tenant_id, formData, property_manager_id) => {
  try {
    // let {setAllProperties} = useAllTenants();
    const { data } = await axios.post(
      AppConfig.svc + `upload/propertymanager/signed/document/`,
      formData,
      {
        params: {
          property_manager_id,
          property_id,
          rental_id,
          tenant_id
        },
      }
    );
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at getRentalByTenantId");
  }
  // setAllProperties(data);
};
const uploadPropertyManagerReviewedForm = async (property_id, rental_id, tenant_id, formData, property_manager_id) => {
  try {
    // let {setAllProperties} = useAllTenants();
    const { data } = await axios.post(
      AppConfig.svc + `upload/review/document/`,
      formData,
      {
        params: {
          property_manager_id,
          property_id,
          rental_id,
          tenant_id
        },
      }
    );
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at getRentalByTenantId");
  }
  // setAllProperties(data);
};
const getMultipleTenantInfoById = async (tenant_ids, userInfo) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `get_multiple_tenant_info_by_id/`, {

      params: {
        tenant_ids,
        property_manager_id: userInfo?.id
      },
    }
    );
    // console.log(data);
    return data;
  } catch (error) {

  }
}
// const editProperty = async (existingProperty, userInfo, propertyInfo) => {
//     const { data } = await axios.post(
//         AppConfig.svc + `property/`,
//         existingProperty, {
//         params: {
//             property_manager_id: userInfo.sub,
//             property_id: propertyInfo.id
//         }
//     }
//     );
//     return data;
// }
const sendMessage = async (userInfo, tenant_id, role, message) => {
  try {
    if (role === "tenant") {
      const { data } = await axios.post(AppConfig.svc + `create_message/`, {
        message: message,
        role: role
      }, {
        params: {
          tenant_id: userInfo?.id,
          property_manager_id: tenant_id
        }
      })
      // console.log(data)
      return data
    } else {
      const { data } = await axios.post(AppConfig.svc + `create_message/`, {
        message: message,
        role: role
      }, {
        params: {
          property_manager_id: userInfo?.id,
          tenant_id
        }
      })
      // console.log(data)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
const getAllMessages = async (userInfo, tenant_id, role) => {
  // console.log(tenant_id)
  try {
    if (role === "tenant") {

      const { data } = await axios.get(AppConfig.svc + `get_all_message/`, {
        params: {
          tenant_id: userInfo?.id
        }
      })
      // console.log(data)
      return data
    } else {
      const { data } = await axios.get(AppConfig.svc + `get_all_message/`, {
        params: {
          property_manager_id: userInfo?.id
        }
      })
      // console.log("data",data)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}
const getTenantById = async (tenantID) => {
  try {
    const { data } = await axios.get(AppConfig.svc + `tenant/${tenantID}`, {});
    // console.log(data)
    return data

  } catch (error) {
    console.log(error)
  }
}
const createShadowUser = async (shadowUserInfo, shadowUserOptions) => {
  try {
    const { data } = await axios.post(AppConfig.svc + `create_shadow_manager/`,
      { user: shadowUserInfo, options: shadowUserOptions })
    return data;
  } catch (error) {
    console.log(error)
  }
}
const getAllShadowUsers = async (userInfo) => {
  try {
    const { data } = await axios.get(AppConfig.svc + "list_all_shadow_user/", {
      params: {
        property_manager_id: userInfo?.id
      }
    },
    );
    return { data }
  } catch (error) {
    console.log(error)
  }
}
const getAllPropertyManagers = async (userInfo) => {
  try {
    const { data } = await axios.get(AppConfig.svc + "list_all_property_manager/", {
      params: {
        property_manager_id: userInfo?.id
      }
    },
    );
    return { data }
  } catch (error) {
    console.log(error)
  }
}
const getHouseHoldMembersUsingHeadOfHouseholdID = async (unit_id, rental_id, head_of_household_id) => {
  try {
    const { data } = await axios.get(AppConfig.svc + "some_end_point", { //endpoint should be changed
      params: {
        unit_id, rental_id, head_of_household_id
      }
    },
    );
    return { data }
  } catch (error) {
    console.log(error)
  }
}
const deleteFormByFormId = async (tenantID, rentalID, formID) => {
  // console.log(rentalID)
  // console.log(tenantID)
  // console.log(formID)
  try {
    const { data } = await axios.post(
      AppConfig.svc + `remove_questionnaire_for_tenant/`, {}, {
      params: {
        tenant_id: tenantID,
        rental_id: rentalID,
        formID: formID
      }
    }
    )
    return { data };
  } catch (error) {
    console.error("Error at deleteFormByFormId")
  }
}
const TenantAdapter = {
  addTenant,
  fetchAllTenants,
  assignTenant,
  editTenant,
  getRentalByTenantId,
  addPropertyManager,
  deleteTenant,
  uploadSignedForm,
  uploadPropertyManagerSignedForm,
  getMultipleTenantInfoById,
  sendMessage,
  getAllMessages,
  getTenantById,
  createShadowUser,
  getAllShadowUsers,
  getAllPropertyManagers,
  deleteFormByFormId,
  getHouseHoldMembersUsingHeadOfHouseholdID,
  uploadPropertyManagerReviewedForm
  // editProperty
};
export default TenantAdapter;
