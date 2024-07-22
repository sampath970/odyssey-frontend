import { createContext } from "react";

let defaultProps = {
    allProperties: [],
    setAllProperties: (properties:any) => { },
    activeProperty:null,
    setActiveProperty:(property:any) =>{},
    activeRental:null,
    setActiveRental:(rental:any)=>{},
    activeTenant:null,
    setActiveTenant:(rental:any)=>{},
    setRefreshProperties:(refreshStatus : boolean)=>{},
    
}
export const AllPropertiesContext = createContext(defaultProps);

