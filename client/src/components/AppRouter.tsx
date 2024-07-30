import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/main";
// import { AuthContext } from "../context/main";
import { UI } from "./UI/main";

function AppRouter() {
  // const { isAuth, isLoading } = useContext(AuthContext);

  // if (isLoading) return <UI.Loader />;

  let isAuth = true;
  return (
    <Routes>
      {isAuth &&
        privateRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          );
        })}
      {publicRoutes.map((route) => {
        return (
          <Route key={route.path} path={route.path} element={route.component} />
        );
      })}
    </Routes>
  );
}

export default AppRouter;
