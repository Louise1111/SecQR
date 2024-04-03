import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/logo/logo.png")}
        style={[styles.SecQR_logo, isDrawerOpen && styles.logoBehind]}
      />
      <View style={styles.logoTextContainer}>
        <Text style={styles.logoText}>
          <Text>Sec</Text>
          <Text style={{ color: "#0B8F87" }}>QR</Text>
        </Text>
        <Text style={styles.tagline}>Scan Safe, Stay Secure</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row", // Aligns logo and text horizontally
    alignItems: "center",
    maxWidth: "100%",
    marginBottom: -70,
    marginTop: -70,
  },
  SecQR_logo: {
    width: 320,
    height: 322,
    marginTop: 100,
    marginLeft: -80,
  },
  logoBehind: {
    zIndex: -1,
  },
  logoTextContainer: {
    flexDirection: "column", // Arrange text vertically
    maxWidth: "60%",
  },
  logoText: {
    fontSize: 51,
    fontWeight: "bold",
    marginLeft: -130,
    marginTop: 100,
    zIndex: 1,
  },
  tagline: {
    fontSize: 15,
    marginLeft: -130,
    color: "#000000",
  },
});
