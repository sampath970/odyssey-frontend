import { createContext } from "react";

interface UserInfo {
    email: string;
    sub: string;
    id: string;
    role: string;
    permissions: { permissions: number };
}

const defaultProps = {
    userInfo: {} as UserInfo,
    setUserInfo:(user: UserInfo)=>{}
}
export const UserContext = createContext(defaultProps);