import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Menus() {
  const navigation = useNavigation();

  const goToScanScreen = () => {
    navigation.navigate("Scan"); // Navigate to the screen with the name "OtherScreen"
  };
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={goToScanScreen}>
        <Image
          source={require("../assets/logo/camera.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/qr-code.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Generate QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/history.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/help.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require("../assets/logo/about.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
