import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { Camera } from "expo-camera";

import { TouchableOpacity } from "react-native-gesture-handler";

import { API_BASE_URL } from "../assets/api";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [link, setLink] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    setScannedData(data);
    const link = extractURL(data);
    if (link) {
      try {
        const formData = new FormData();
        formData.append("link", link);

        const response = await fetch(`${API_BASE_URL}/api/scan/`, {
          method: "POST",
          headers: {
            // Do not set Content-Type header for FormData
          },
          body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);

        // Navigate to the Scan screen and pass the scanned result data as a parameter
        navigation.navigate("Scan", { scannedResult: responseData });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("No URL detected");
    }
  };
  const goToScanScreen = () => {
    navigation.navigate("Scan");
  };

  const extractURL = (data) => {
    const regex =
      /(\b(?:https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    const matches = data.match(regex);
    if (matches && matches.length > 0) {
      return matches[0];
    } else {
      return null;
    }
  };

  const handlePermissionRequest = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
        <Button title="Cancel" onPress={handlePermissionRequest} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Go back" onPress={handlePermissionRequest} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goToScanScreen} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      ></Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    marginTop: 180,
    marginBottom: 180,
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
    top: -29,
  },
  headerText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 60,
  },
  sideHeader: {
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
});
