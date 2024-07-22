import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios, { all } from "axios";
import AppConfig from "../../config/application.config";
import { makeHttpRequestJson } from "../../app/_utils/page_utils";

async function fetchUserInfoFromCookies() {
   let user_info_token = Cookies.get("id_token");
    let access_info_token = Cookies.get("access_token");
    let permissions_token = Cookies.get("permissions");
//    let user_info_token = localStorage.getItem("id_token");
//     let access_info_token = localStorage.getItem("access_token");
    let decoded = jwt.decode(access_info_token);
    let user_info = jwt.decode(user_info_token);
    let permissions_info = jwt.decode(permissions_token);
    user_info.permissions = permissions_info;
    return user_info;
}

const onLogin = async (emailID) => {
    try {
      // We need to ensure axios sends the tokens.
      // This is the first call to the backend - TODO: find a more robust place to set
      // the default with credentials.
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        AppConfig.svc + `on_login/`,
        {
          params: {
            email: emailID,
          },
        },
      );
    
      return data;
    } catch (ex) {
      console.error("Error at onLogin");
    }
  };

const onLoginServerSide = async (emailID, id_token, access_token) => {
  try {
    const my_headers = new Headers();
    my_headers.append('Cookie', `id_token=${id_token}; access_token=${access_token};`);

    var data = await makeHttpRequestJson(
      AppConfig.svc + `on_login/?` + new URLSearchParams({ email: emailID }),
      "GET", my_headers);
    
    return data;
  } catch (ex) {
    console.error("Error at onLogin");
  }
}
const deletePropertyManager = async(property_manager_id,delete_property_manager_id) =>{
  try {
    const { data } = await axios.delete(AppConfig.svc + `remove_property_manager/`, {
      params: {
        property_manager_id,
        delete_property_manager_id
      },
    });
    // console.log(data);
    return data;
  } catch (ex) {
    console.error("Error at  deletePropertyManager");
  }
  
}

const UserAdapter = {
    fetchUserInfoFromCookies,
    onLogin,
    onLoginServerSide,
    deletePropertyManager
}

export default UserAdapter;