import axios, { all } from "axios";
import AppConfig from "../../config/application.config";
import { useAllProperties } from "../hooks/useAllProperties";
const addProperty = async (property, userInfo) => {
  try {
    // let {setAllProperties} = useAllProperties();
    const { data } = await axios.post(
      AppConfig.svc + `add_property/`,
      property,
      {
        params: {
          property_manager_id: userInfo.sub,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at addProperty");
  }
};

const fetchAllProperties = async (userInfo) => {
  try {
    // let {setAllProperties} = useAllProperties();
    const { data } = await axios.get(
      AppConfig.svc + `all_properties/` + userInfo?.sub
    );
    // console.log(data);
    return data;
    // setAllProperties(data);
  } catch (ex) {
    console.log(ex)
    console.error("Error at  fetchAllProperties");
  }
};
const fetchPropertiesOfPropertyManager = async (userInfo) => {
  try {
    // let {setAllProperties} = useAllProperties();
    const { data } = await axios.get(
      AppConfig.svc + `all_properties/` + userInfo?.id
    );
    // console.log(data);
    return data;
    // setAllProperties(data);
  } catch (ex) {
    console.log(ex)
    console.error("Error at  fetchAllProperties");
  }
};
// fetch all deleted properties
const fetchAllDeletedProperties = async (userInfo) => {
  try {
    // let {setAllProperties} = useAllProperties();
    const { data } = await axios.get(
      AppConfig.svc + `all_deleted_properties/` + userInfo?.sub
    );
    // console.log(data);
    return data;
    // setAllProperties(data);
  } catch (ex) {
    console.error("Error at  fetchAllProperties");
  }
};

const editProperty = async (existingProperty, userInfo, propertyInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `property/`,
      existingProperty,
      {
        params: {
          property_manager_id: userInfo.sub,
          property_id: propertyInfo.id,
        },
      }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at  editProperty");
  }
};

const addUnits = async (propertyID, unit) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `create_unit/`,
      unit,
      {
        params: {
          property_id: propertyID,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  addUnits");
  }
};
// edit unit
const editUnit = async (propertyID, unitId, unit, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `update_unit/`,
      unit,
      {
        params: {
          property_id: propertyID,
          unit_id: unitId,
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (e) {

  }
}
// delete unit
const deleteUnit = async (propertyID, unitId, userInfo) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete_unit/`,
      {
        params: {
          property_id: propertyID.id,
          unit_id: unitId.id,
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (e) {

  }
}
// delete property (delete from db)
const deleteProperty = async (propertyID, userInfo) => {
  try {
    const { data } = await axios.delete(
      AppConfig.svc + `delete_property/`,
      {
        params: {
          id: propertyID,
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (e) {

  }
}
// soft delete by changing its status
const softDeleteProperty = async (propertyID, userInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `soft_delete_property/`,
      {},
      {
        params: {
          id: propertyID,
          property_manager_id: userInfo.sub,
        },
      }
    );
    return data;
  } catch (e) {

  }
}

const addFiles = async (file, propertyID, rentalID, tenantID) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `upload/document/`,
      file,
      {
        params: {
          property_id: propertyID,
          rental_id: rentalID,
          tenant_id: tenantID,
        },
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at addProperty");
  }
};

const getPropertyByID = async (property_id) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `property/` + property_id
    );
    return data;
  } catch (ex) {
    console.error("Error at  getPropertyByID");
  }
};

const getRentalsByPropertyID = async (property_id) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `all_rentals/` + property_id
    );
    return data;
  } catch (ex) {
    console.error("Error at  getRentalsByPropertyID");
  }
};
const getPropertyByRentalID = async (rental_id) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `get_rental_details/`, {
      params: {
        rental_id: rental_id
      }
    }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at  getPropertyByRentalID");
  }
};
const getProofsListing = async (property_manager_id, property_id, rentalID, tenantID) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `view/document/`, {
      params: {
        property_manager_id: property_manager_id,
        property_id: property_id,
        rental_id: rentalID,
        tenant_id: tenantID
      }
    }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at  getProofsListing");
  }
};
const getSignedForms = async (property_manager_id, property_id, rentalID, tenantID) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `view/signed/document/`, {
      params: {
        property_manager_id: property_manager_id,
        property_id: property_id,
        rental_id: rentalID,
        tenant_id: tenantID
      }
    }
    );
    // console.log(data)
    return data;
  } catch (ex) {
    console.error("Error at  getSignedForms");
  }
};
const downloadDocuments = async (documentName) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `download/document/`,
      {
        responseType: 'blob',
        params: {
          file_name: documentName,
        }
      }
    );
    return data;
  } catch (ex) {
    console.error("Error at  downloadDocuments");
  }
};

const addSpecialIOnstructions = async (propertyID, propertyManagerID, specialInfo) => {
  try {
    const { data } = await axios.post(
      AppConfig.svc + `add_special_instructions`, specialInfo, {
      params: {
        property_id: propertyID,
        property_manager_id: propertyManagerID.sub,
      },
    }
    )
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getCompletelySignedForms = async (property_manager_id, property_id, rentalID, tenantID) => {
  // console.log(property_manager_id)
  // console.log(property_id)
  // console.log(rentalID)
  // console.log(tenantID)
  try {
    const { data } = await axios.post(
      AppConfig.svc + `view/propertymanager/signed/document/`, {}, {
      params: {
        property_manager_id: property_manager_id,
        property_id: property_id,
        rental_id: rentalID,
        tenant_id: tenantID
      }
    }
    )
    return data;
  } catch (error) {
    console.log(error)
  }
}
const generateCustomFields = async (userInfo) => {
  try {
    const { data } = await axios.get(
      AppConfig.svc + `update_old_custom_field/`, {
        params: {
          property_manager_id: userInfo.sub,
        },
    })
    return data;
  } catch (error) {
    console.log(error)
  }
}
const assignShadowUserToProperty = async (shadowUserID, propertyIDs, propertyManagerID, removedProperties) => {
  // console.log(shadowUserID,propertyIDs,propertyManagerID,removedProperties);
  try {
    const { data } = await axios.post(
      AppConfig.svc + `assign_properties_shadow_user/`, {
      shadow_user_id: shadowUserID,
      properties: propertyIDs,
      property_manager_id: [propertyManagerID],
      removed_properties: removedProperties
    }, {}
    )
    // console.log(data)
    return data;
  } catch (error) {
    console.log(error)
  }
}
const PropertyAdapter = {
  addProperty,
  fetchAllProperties,
  editProperty,
  addUnits,
  addFiles,
  getPropertyByID,
  getRentalsByPropertyID,
  getPropertyByRentalID,
  getProofsListing,
  downloadDocuments,
  editUnit,
  addSpecialIOnstructions,
  deleteUnit,
  deleteProperty,
  softDeleteProperty,
  fetchAllDeletedProperties,
  getSignedForms,
  getCompletelySignedForms,
  fetchPropertiesOfPropertyManager,
  generateCustomFields,
  assignShadowUserToProperty
};
export default PropertyAdapter;
