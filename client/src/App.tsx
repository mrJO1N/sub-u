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
      userService.checkToken(token).then(({ err, data }) => {
        if (err) return console.error(err);
        if (data.message) return console.error(data.message);

        setIsAuth(true);
        userService.getBalance(token).then(({ balance, err }) => {
          if (err) return console.error(err);
          setUserData({ ...userData, balance: balance ?? 0 });
        });
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
            <Header
              menuList={[
                {
                  label: "transfer",
                  options: [{ url: "/transfers", label: "make to" }],
                },
              ]}
            />
          ) : (
            <Header menuList={[{ url: "/login", label: "sigh in" }]} />
          )}
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
