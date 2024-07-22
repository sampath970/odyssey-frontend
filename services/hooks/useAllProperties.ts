import React, { useContext } from "react";
import {AllPropertiesContext} from "../contexts/properties-context";
export function useAllProperties() {
    const context = useContext(AllPropertiesContext);
    if (context === undefined) {
      throw new Error("Context must be used within a Provider");
    }
    return context;
  }