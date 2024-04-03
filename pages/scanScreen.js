import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";

export default function ScanScreen() {
  const navigation = useNavigation();

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };
  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };
  return (
    <View style={styles.container}>
      <View style={styles.SideHeader}>
        <TouchableOpacity onPress={goToHomeScreen} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Scan QR Code</Text>
      </View>
      <View style={styles.spaceHeader}>
        <Header />
      </View>

      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/camera.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Capture QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/galleryIcon.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Import QR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToHistoryScreen} style={styles.button}>
        <Image
          source={require("../assets/logo/history.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  SideHeader: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    width: "100%",
    height: 58,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#0B8F87",
    zIndex: 1,
  },
  button: {
    flexDirection: "row",
    width: 299,
    height: 58,
    borderRadius: 10,
    marginBottom: 13,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "#0B8F87",
  },
  logo: {
    width: 37,
    height: 37,
    marginRight: 15,
    marginLeft: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  spaceHeader: {
    marginTop: -150,
    marginBottom: 60,
  },
  logoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
  },
  logo2: {
    width: 40,
    height: 40,
  },
  HeaderText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 60,
  },
});
