

import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user details
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || ""); 

  // Decode token and extract user details
  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode JWT token
        setUser(decodedUser); // Set user details from decoded token
      } catch (error) {
        console.error("Error decoding token or invalid token:", error);
        logout(); // Logout if token is invalid or cannot be decoded
      }
    }
  }, [token]);

  const login = (jwtToken) => {
    setToken(jwtToken); // Store the token
    localStorage.setItem("jwtToken", jwtToken); // Save the token to localStorage

    try {
      const decodedUser = jwtDecode(jwtToken); // Decode the token to get user details
      setUser(decodedUser); // Store decoded user details
    } catch (error) {
      console.error("Error decoding token during login:", error);
      logout(); 
    }
  };

  const logout = () => {
    setUser(null); 
    setToken(null); 
    localStorage.removeItem("jwtToken"); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};