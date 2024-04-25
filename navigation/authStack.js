import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../pages/loginScreen";
import HomeScreen from "../pages/homeScreen";
import ScanScreen from "../pages/scanScreen";
import GenerateScreen from "../pages/generateScreen";
import AboutScreen from "../pages/aboutScreen";
import HelpScreen from "../pages/helpScreen";
import HistoryScreen from "../pages/historyScreen";
import HistoryDetailScreen from "../pages/historyDetailScreen";
import HelpDetailScreen from "../pages/helpDetailScreen";
import CameraScreen from "../pages/cameraScreen";
import GenerateResultScreen from "../pages/generateResultScreen";
import HistoryDetailScan from "../pages/historyDetailScan";
import Notification from "../components/notification";
import ProfileScreen from "../pages/profileScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanScreen} />
      <Stack.Screen name="GenerateQR" component={GenerateScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
      <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="GenerateResult" component={GenerateResultScreen} />
      <Stack.Screen name="HistoryDetailScan" component={HistoryDetailScan} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
