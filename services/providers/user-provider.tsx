import React, { useState, useEffect } from "react";
import { UserContext } from "../contexts/user-context";
import UserAdapter from "../adapters/user-adapter";
import { withErrorBoundary } from "react-error-boundary";

function UserContextProviderBase({ children }) {
  const [userInfo, setUserInfo] = useState();
  const [userAccess, setAccessLevel] = useState([]);
  useEffect(() => {
    async function fetchUserInfoForContext() {
      let user_info = await UserAdapter.fetchUserInfoFromCookies();
      if (user_info) {
        let emailID = user_info.email;
        if (user_info.id && user_info.role){
          // We have already populated the user context.
          return;
        }
        const data = await UserAdapter.onLogin(emailID);
        // console.log("data:" + JSON.stringify(data))
        if (data && data.user) {
          user_info.id = data.user?.id;
          user_info.sub = data.user?.id; // TODO : Replace all sub references of user with id.
          user_info.role = data.user?.role;
        }
        else {
          user_info.sub = null;
        }
        setUserInfo(user_info);
      }
    }

    fetchUserInfoForContext();

  }, []);

  return (
    //@ts-ignore
    <UserContext.Provider value={{ userInfo, setUserInfo, userAccess, setAccessLevel }}>
      {children}
    </UserContext.Provider>
  );
}

function logToLoggingService(error) {
  console.log("Error boundary triggered");
  console.error(error);
}

export const UserContextProvider = withErrorBoundary(UserContextProviderBase, {
  FallbackComponent: ({ error }) => {
    return (
      <div>
        <h1>Application Error</h1>
        <p>We apologize for this issue and are working to fix it.</p>
        <p><a href="/users-dashboard/user-dashboard">Click here</a> to continue.</p>
      </div>
  )},
  onError: logToLoggingService,
  onReset: () => {
    // Reset the state of your app so the error doesn't happen again
    console.log("Error boundary reset");
  },

});
