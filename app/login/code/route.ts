// This page provides a callback for the Cognito Authorization Code flow.
//     
// This page runs server side, and passes the Cognito auth_code to the Cognito /token endpoint to get access tokens

import AppConfig from "../../../config/application.config";
import { makeHttpRequestJson } from "../../_utils/page_utils";
import { getNextPath } from "../login_utils";
import { redirect } from 'next/navigation';
import UserAdapter from "../../../services/adapters/user-adapter";

import { NextResponse } from 'next/server';

const jose = require( "jose" );

// This code runs server side. 
export async function GET(req: any, response: any) {
    'use server'
    
    const url = req.nextUrl;
    const urlSearchParams = new URLSearchParams( url.search );
    const auth_code = urlSearchParams.get( 'code' );

    if (!auth_code)
    {
        // Not logged in.
        // Redirect to login page for OAuth2 code flow.
        const login_url = AppConfig.cognito.urls.cognito_login_code_url;
        
        redirect(login_url);

    } else {
        
        // Get tokens from OAuth2 code flow.
        // Get id, access, refresh tokens
        const my_headers = new Headers()

        // TODO: add Basic Authorization with client_secret.
        // my_headers.append("Authorization", "Basic " + btoa(AppConfig.cognito.cognito_app_client_id:client_secret));
        my_headers.append("Content-Type", "application/x-www-form-urlencoded");
        var auth_tokens : any = await makeHttpRequestJson( 
            AppConfig.cognito.urls.cognito_token_url +  auth_code, "POST", my_headers);
        

        const idToken = auth_tokens.id_token;
        const accessToken = auth_tokens.access_token;
        // NOTE: there is also a refresh token returned but we discard it because we don't know how to securely store it.

        // Store the tokens in cookies in the response.
        // Note: I read that next.js only allows this in middleware because App Router uses React 
        // streaming and the headers may already have been sent when Server Actions are executing.
        //  https://github.com/vercel/next.js/issues/50914
        // HOWEVER, this was not true. But it may be true when we move to Next.js 14.x.


        // If successful, go to Dashboard.
        let id_info = jose.decodeJwt(idToken);

        let emailID = id_info.email;
        const data: any = await UserAdapter.onLoginServerSide(emailID, idToken, accessToken);

        var nextPath = getNextPath(data);
        // If successful, go to Dashboard.
        const r = NextResponse.redirect(new URL(AppConfig.frontend + nextPath));
        r.cookies.set( 'id_token', idToken);
        r.cookies.set( 'access_token', accessToken);
        
        if (data && data.permissions) {

            // Set a cookie with the permissions returned in data.permissions.
            r.cookies.set( 'permissions', data.permissions);

            // TODO: add secure: true to all env'ts except localhost.
            //   Currently, adding secure:true in localhost breaks authentication in Safari but not Chrome.
            // TODO: add sameSite: 'strict' to all env'ts except localhost.

        }
        return r;

    }
    
  }


