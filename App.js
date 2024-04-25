import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./components/authentication/AuthContext";
import AppNav from "./navigation/appnav";
import AppStack from "./navigation/appStack";
import AuthStack from "./navigation/authStack";
import { StatusBar } from "react-native";
const App = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppNav />
    </AuthProvider>
  );
};

export default App;
