import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/loginScreen";
import SignupScreen from "../pages/signupScreen";
import { NavigationContainer } from "@react-navigation/native";
import IndexScreen from "../pages/indexScreen";
import { StatusBar } from "expo-status-bar";
import ForgotPasswordScreen from "../pages/forgotPasswordScreen";
import OtpVerifyScreen from "../pages/otpVerifyScreen";
import NewPasswordScreen from "../pages/newPasswordScreen";
const Stack = createStackNavigator();
<StatusBar barStyle="dark-content" backgroundColor="white" />;
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" component={IndexScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
