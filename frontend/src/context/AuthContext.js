import React, { createContext, useState } from "react";
import {
  logout as authServiceLogout,
  signin as authServiceSignin,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleLogout = async () => {
    try {
      const result = await authServiceLogout();
      console.log(result);
      if (result.success) {
        setIsAuthenticated(false);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSignin = async (email, password) => {
    try {
      const result = await authServiceSignin(email, password);

      if (result.success) {
        localStorage.setItem("token", result.token);

        setIsAuthenticated(true);
        return { success: true, token: result.token, user: result.user };
      }
    } catch (error) {
      console.error("Signin error:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogout, handleSignin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
