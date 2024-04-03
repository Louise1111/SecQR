import React from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/header";
export default function AboutScreen() {
  const navigation = useNavigation();

  const goToHomeScreen = () => {
    navigation.navigate("Home");
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
        <Text style={styles.HeaderText}>About</Text>
      </View>
      <View style={styles.about}>
        <Header />
        <Text style={styles.aboutText}>
          SecQR is your ultimate safeguard for secure QR code browsing. Our app
          conducts thorough safety checks on scanned QR code links,
          cross-referencing them with internal and external databases to detect
          potential online threats. We alert users to possible risks, ensuring
          informed decisions before accessing websites. With SecQR, your online
          safety is our top priority.
        </Text>
      </View>
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
  aboutText: {
    fontSize: 20,
    textAlign: "justify",
  },
  about: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    borderColor: "#0B8F87",
    borderWidth: 2,
    width: "80%",
    marginBottom: 20,
    marginTop: 100,
    padding: 20,
  },
});
