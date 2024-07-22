import React, { useContext } from "react";
import { AllTenantsContext } from "../contexts/tenants-context";
export function useAllTenants() {
    const context = useContext(AllTenantsContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}