// import React, { useState, useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const PrivateRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null); // Set to null initially to indicate loading
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = () => {
//       // Here you can check the token from localStorage or validate it against the backend if necessary.
//       const token = localStorage.getItem("token");

//       if (token) {
//         setIsAuthenticated(true); // User is authenticated
//       } else {
//         setIsAuthenticated(false); // User is not authenticated
//       }

//       setLoading(false); // Stop loading after auth check
//     };

//     checkAuth();
//   }, []); // Only run once on component mount

//   if (loading) {
//     return <div>Loading...</div>; // Display loading state while checking authentication
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

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
