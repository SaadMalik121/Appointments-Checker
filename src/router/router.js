import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<PrivateRoute Comp={HomePage} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
