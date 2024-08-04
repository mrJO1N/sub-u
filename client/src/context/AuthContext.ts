import React, { createContext } from "react";

export const AuthContext = createContext<AuthContextI>({});

interface AuthContextI {
  isAuth?: boolean;
  setIsAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  userToken?: string;
  setUserToken?: React.Dispatch<React.SetStateAction<string>>;
}
