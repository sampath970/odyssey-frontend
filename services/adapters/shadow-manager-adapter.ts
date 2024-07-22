import axios, { all } from "axios";
import AppConfig from "../../config/application.config";

const fetchAllShadowManagerProperties = async (shadow_manager_id) => {
    debugger;
    try {
      // let {setAllProperties} = useAllTenants();
      const { data } = await axios.get(
        AppConfig.svc + `list_shadow_manager_properties/`,{
            params:{
                shadow_user_id:shadow_manager_id
            }
        }
      );
      if(data){
          let assignedProperties = data?.assign_properties
          console.log(assignedProperties);
          return assignedProperties;
      }else{
        console.log(data)
      }
    } catch (ex) {
        console.log(ex)
      console.log("Error at fetchAllShadowManagerProperties");
    }
    // setAllProperties(data);
  };

const ShadowManagerAdapter = {
    fetchAllShadowManagerProperties
};
export default ShadowManagerAdapter;
