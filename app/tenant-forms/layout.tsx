"use client";
import { UserContextProvider } from "../../services/providers/user-provider";
const FormLayout = (props) => {
  return <UserContextProvider>{props.children}</UserContextProvider>;
};

export default FormLayout;
