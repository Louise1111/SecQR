import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../components/authentication/AuthContext";
import { Camera } from "expo-camera";

import { TouchableOpacity } from "react-native-gesture-handler";

import { API_BASE_URL } from "../assets/api";
import { useRoute } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNoUrlMessage, setShowNoUrlMessage] = useState(false);
  const route = useRoute();
  const { userToken } = useContext(AuthContext);
  const { token } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const link = extractURL(data);
    if (link) {
      try {
        const formData = new FormData();
        formData.append("link", link);
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/scan/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const responseData = await response.json();
        console.log(responseData);

        navigation.navigate("Scan", {
          scannedResult: responseData,
          token: token,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setShowNoUrlMessage(true);

      setTimeout(() => {
        setShowNoUrlMessage(false);

        navigation.goBack();
      }, 3000);
    }
  };

  const goToScanScreen = () => {
    navigation.goBack();
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
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        {showNoUrlMessage && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>No URL Detected</Text>
          </View>
        )}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0B8F87" />
            <Text style={styles.loadingText}>Scanning...</Text>
          </View>
        )}
      </Camera>
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
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  messageContainer: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
});
