import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Reg";
import Settings from "../pages/Settings";
import TransferToMe from "../pages/TransferToMe";

import { Navigate } from "react-router-dom";

export const privateRoutes: RouteT[] = [
  { path: "/settings/general", component: <Settings /> },
  { path: "/transfers", component: <TransferToMe /> },
  { path: "/settings", component: <Navigate to="/settings/general" /> },
  { path: "*", component: <Navigate to="/" /> },
];

export const publicRoutes: RouteT[] = [
  { path: "/", component: <Home /> },
  { path: "/login", component: <Login /> },
  { path: "/reg", component: <Register /> },
  { path: "*", component: <Navigate to="/login" /> },
];

type RouteT = { path: string; component: React.ReactNode };
