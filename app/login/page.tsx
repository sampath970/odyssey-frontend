'use client'

import { useState, useEffect } from "react";
import AppConfig from "../../config/application.config";
import { getQueryParam, makeHttpRequestJson } from "../_utils/page_utils";
import Cookies from 'js-cookie';
import App from "next/app";
const jose = require( "jose" );
import UserAdapter from "../../services/adapters/user-adapter";
import { useUserInfo } from "../../services/hooks/useUserInfo";
import { getNextPath } from "../login/login_utils";

// `app/login/page.tsx` is the code for the `/login` URL

export default function Page() {
    const { userInfo, setUserInfo } = useUserInfo();
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                // http://localhost:3000/login#
                // id_token=eyJraWQiOiJoK2GA...
                // &access_token=eyJraWQiOiJWaW...
                // &expires_in=3600&token_type=Bearer
                if (!window.location.hash) {
                    // Not logged in.

                    // Redirect to the AWS Cognito login page.
                    // console.log(AppConfig.cognito.cognito_host + AppConfig.cognito.urls.cognito_login_path + encodeURIComponent(AppConfig.cognito.urls.cognito_app_redirect_path));
                    window.location.href = AppConfig.cognito.cognito_host + AppConfig.cognito.urls.cognito_login_path + encodeURIComponent(AppConfig.cognito.urls.cognito_app_redirect_path);
                    // window.location.href = '/dashboard';
                } else {
                    // We received id and access tokens from AWS Cognito in the URL fragment.

                    // Parse the URL fragment
                    var urlString = window.location.hash;

                    // Get id, access, refresh tokens
                    // Remove the leading "#" character if it's present
                    const cleanFragment = urlString.includes('#') ? urlString.split('#')[1] : '';

                    // Split the fragment into variable-value pairs based on "&"
                    const fragmentVariables = cleanFragment.split('&');

                    // Create an object to store the variables
                    const fragmentData: { [key: string]: string } = {};

                    // Loop through the fragment variables and split them into key-value pairs
                    fragmentVariables.forEach((pair) => {
                        const [key, value] = pair.split('=');
                        if (key && value) {
                            fragmentData[key] = decodeURIComponent(value); // Decode the URI component if needed
                        }
                    });

                    // Access the individual variables as needed
                    const idToken = fragmentData.id_token;
                    const accessToken = fragmentData.access_token;

                    // Store the tokens in cookies
                    // TODO: add secure: true to all env'ts except localhost.
                    //   Currently, adding secure:true in localhost breaks authentication in Safari but not Chrome.
                    Cookies.set('id_token', idToken, {  sameSite: 'strict' });
                    Cookies.set('access_token', accessToken, { sameSite: 'strict' });
                    

                    // If successful, go to Dashboard.
                    let id_info = jose.decodeJwt(idToken);

                    let emailID = id_info.email;
                    const data = await UserAdapter.onLogin(emailID);
                    
                    if (data && data.permissions) {
                        
                        // Save the user permissions in the UserContext.
                        const public_key_config = data.permissions_public_key;
                        // const public_key = await jose.importSPKI(public_key_config.pem, public_key_config.alg)
                        // let permissions_info = await jose.jwtVerify(data[0].permissions, public_key);

                        // Set a cookie with the permissions returned in data.permissions.
                        Cookies.set('permissions', data.permissions, { sameSite: 'strict' });

                        // userInfo.permissions = permissions_info.payload.permissions;
                        // setUserInfo(userInfo);
                        
                    }

                    var nextPath = getNextPath(data);
                    
                    window.location.href = nextPath;
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchMyAPI()
    }, []);

    return (
        <div>
            <h1>Hello, Login Page!</h1>
        </div>
    );
}


