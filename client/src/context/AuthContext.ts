import React, { createContext } from "react";
import { UserI } from "../types";

export const AuthContext = createContext<AuthContextI>({});

interface AuthContextI {
  isAuth?: boolean;
  setIsAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  userToken?: string;
  setUserToken?: React.Dispatch<React.SetStateAction<string>>;
  userData?: UserI;
  setUserData?: React.Dispatch<React.SetStateAction<UserI>>;
}
