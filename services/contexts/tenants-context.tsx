import { createContext } from "react";

let defaultProps = {
    allTenants: [],
    setAllTenants: (properties: any) => { },
    setSyncRequired:(needSync:boolean)=>{},
}
export const AllTenantsContext = createContext(defaultProps);