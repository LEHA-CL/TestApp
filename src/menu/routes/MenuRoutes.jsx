import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MenuPage } from "../pages/MenuPage";
import { ProfilePage } from "../pages/ProfilePage";

export const MenuRoutes = () => {
  return (
    <>
    
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="user/edit-profile" element={<ProfilePage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
