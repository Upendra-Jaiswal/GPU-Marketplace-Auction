import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust path if necessary

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext); // Get authentication status from context

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Waiting for the auth status to be loaded
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
