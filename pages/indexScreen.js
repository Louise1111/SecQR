import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function IndexScreen() {
  const navigation = useNavigation();

  const goToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo/logo.png")}
        style={styles.SecQR_logo}
      />
      <Text style={styles.textHeader}>
        <Text style={styles.logoText}>
          <Text>Sec</Text>
          <Text style={{ color: "#0B8F87" }}>QR</Text>
        </Text>
      </Text>
      <Text style={styles.textHeader2}> Scan Safe, Stay Secure</Text>

      <TouchableOpacity style={styles.button} onPress={goToLoginScreen}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={goToSignupScreen}>
        <Text style={styles.buttonText2}>SIGN UP</Text>
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

  button: {
    width: 299,
    height: 58,
    borderRadius: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C7D76",
    borderWidth: 1,
    borderColor: "#0C7D76",
  },
  button2: {
    width: 299,
    height: 58,
    borderRadius: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#0C7D76",
  },

  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },

  buttonText2: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
  },

  SecQR_logo: {
    width: 320,
    height: 322,
    marginLeft: "15%",
    alignItems: "center",
    marginTop: "center",
  },
  textHeader: {
    color: "black",
    fontSize: 42,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: -110,
  },
  textHeader2: {
    fontSize: 15,
    marginRight: -15,
    marginTop: -10,
  },
});
