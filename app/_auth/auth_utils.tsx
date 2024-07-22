// 
// Functions relating to authentication or authorization
//

import { decodeJwt } from "jose"; // Need to use jose because middleware Edge runtime does not support jsonwebtoken.
import Cookies from 'js-cookie';

// NOTE: this only checks expiry, without any signature validation.
// TODO: add signature validation.
export function isAccessCookieValid(access_cookie: string): boolean {
  let expiration = 0; // Initialize expiration time to 0

  try {
    const decodedAccess = decodeJwt(access_cookie);
    expiration = decodedAccess.exp * 1000; // convert expiration time to milliseconds
    const currentTime = Date.now();

    // Check if the access token has expired
    if (expiration > currentTime) {
      // Access token has not expired
      // console.log( new Date(expiration));
      return true;
    } else {
      console.log("Access token has expired");
      console.log( new Date(expiration));
      console.log(decodedAccess);
    }
  } catch (err) {
    // Access token is invalid
    console.error("Error at isAccessCookieValid", err);
    return false;
  }

  return false;
}

export function localLogout(): void {
  // Remove access_token and id_token cookies.
  Cookies.remove('access_token');
  Cookies.remove('id_token');
  Cookies.remove('permissions');

}