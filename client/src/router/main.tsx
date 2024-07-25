import React from "react";
import Home from "../pages/Home";

import { Navigate } from "react-router-dom";

export const privateRoutes: RouteT[] = [
  { path: "/", component: <Home /> },
  // { path: "/posts", component: <Posts /> },
  // { path: "/posts/:id", component: <PostId /> },
  // { path: "*", component: <Navigate to="/posts" /> },
];

export const publicRoutes: RouteT[] = [
  // { path: "/login", component: <Login /> },
  // { path: "*", component: <Navigate to="/login" /> },
];

type RouteT = { path: string; component: React.ReactNode };
