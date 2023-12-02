import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ Comp }) {
  const user = localStorage.getItem("ccript_user");

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <Comp />;
}

export default PrivateRoute;
