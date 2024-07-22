import React, { useContext } from "react";
import {NotificationContext} from "../contexts/notification-context";
export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }