import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { MenuRoutes } from "../menu/routes/MenuRoutes";
import { LoginPage } from "../auth/pages";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/" element={<Navigate to="/login" />} /> 

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MenuRoutes />
          </PrivateRoute>
        }
      />
      {/* <Route path="/*" element={<MenuRoutes />} /> */}
    </Routes>
  );
};
