import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as authApi from "../service/auth.api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  const loadUserProfileData = async () => {
    try {
      const { data } = await authApi.getUserProfile(token);
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load user profile");
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  const value = { token, setToken, userData, setUserData, loadUserProfileData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
