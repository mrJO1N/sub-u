import React, { useEffect, useState } from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import userService from "./API/user.service";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { UserI } from "./types";

function App() {
  const [userToken, setUserToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<UserI>({ balance: 0 });

  useEffect(() => {
    if (setIsAuth) setIsAuth(false);
    const token = localStorage.getItem("token");

    if (token) {
      userService.checkToken(token).then((data) => {
        if (data.message) return console.error(data.message);
        setUserToken(token);
        if (setIsAuth) setIsAuth(true);
      });
      userService.getBalance(token).then((balance) => {
        setUserData({ ...userData, balance: balance ?? 0 });
      });
      // setUserData({ ...userData, balance: 100 });
    }
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          userToken,
          setUserToken,
          isAuth,
          setIsAuth,
          userData,
          setUserData,
        }}
      >
        <BrowserRouter>
          {isAuth ? (
            <Header menuList={[{ url: "/i", label: "transfer" }]} />
          ) : (
            <Header
              menuList={[
                { url: "/login", label: "sigh in" },
                { url: "/i", label: "transfer" },
              ]}
            />
          )}
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
