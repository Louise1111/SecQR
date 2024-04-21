import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/homeScreen";
import ScanScreen from "./pages/scanScreen";
import GenerateScreen from "./pages/generateScreen";
import AboutScreen from "./pages/aboutScreen";
import HelpScreen from "./pages/helpScreen";
import HistoryScreen from "./pages/historyScreen";
import LoginScreen from "./pages/loginScreen";
import SignupScreen from "./pages/signupScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IndexScreen from "./pages/indexScreen";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryDetailScreen from "./pages/historyDetailScreen";
import HelpDetailScreen from "./pages/helpDetailScreen";
import CameraScreen from "./pages/cameraScreen";
import GenerateResultScreen from "./pages/generateResultScreen";
import { Platform } from "react-native";
import HistoryDetailScan from "./pages/historyDetailScan";
import Notification from "./components/notification";
const LOCALHOST =
  Platform.OS === "ios" ? "http://127.0.0.1:8000" : "http://10.0.2.2:8000";
export const API_BASE_URL = LOCALHOST + "/api/v1/";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="white" translucent />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
          <Stack.Screen name="GenerateQR" component={GenerateScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Help" component={HelpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Index" component={IndexScreen} />
          <Stack.Screen name="HistoryDetail" component={HistoryDetailScreen} />
          <Stack.Screen name="HelpDetail" component={HelpDetailScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen
            name="GenerateResult"
            component={GenerateResultScreen}
          />
          <Stack.Screen
            name="HistoryDetailScan"
            component={HistoryDetailScan}
          />

          <Stack.Screen name="Notification" component={Notification} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
