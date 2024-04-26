import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../../assets/api";
import { Alert } from "react-native";
// Create the authentication context
export const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/`, {
        username,
        password,
      });

      // Destructure the response data
      const { data } = response;

      console.log("Response data:", data);

      // Extract user information and token
      const { token } = data;
      const userData = { ...data, token };

      // Set user info and token in state and AsyncStorage
      setUserInfo(userData);
      setUserToken(token);

      AsyncStorage.setItem("userInfo", JSON.stringify(userData));
      AsyncStorage.setItem("userToken", token);
      Alert.alert("Success", "Successfully Logged In");
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert(
        "Error",
        "Failed to login. Please check your credentials and try again."
      );
    }

    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      // Clear user info and token from state and AsyncStorage
      setUserInfo(null);
      setUserToken(null);

      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log("Logout error:", error);
    }

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      // Retrieve user info and token from AsyncStorage
      const userInfoJson = await AsyncStorage.getItem("userInfo");
      const userToken = await AsyncStorage.getItem("userToken");

      if (userInfoJson && userToken) {
        const userData = JSON.parse(userInfoJson);

        // Set user info and token in state
        setUserInfo(userData);
        setUserToken(userToken);
      }
    } catch (error) {
      console.log("isLoggedIn error:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
