import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

export default function ScanScreen() {
  const navigation = useNavigation();

  // Function to navigate to the Home screen
  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  // Function to navigate to the CameraScreen
  const goToCameraScreen = () => {
    navigation.navigate("CameraScreen");
  };

  // Function to navigate to the History screen
  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };

  // Function to open the device's image picker to select an image
  const openImagePicker = async () => {
    // Request permission to access the device's camera roll
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      // Alert if permission is denied
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // If image selection is not cancelled
    if (!result.cancelled) {
      console.log("Selected image:", result.uri);
      // You can perform any further operations with the selected image here
    }
  };

  // Render UI
  return (
    <View style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goToHomeScreen} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>
      {/* Button to navigate to CameraScreen */}
      <TouchableOpacity style={styles.button} onPress={goToCameraScreen}>
        <Image
          source={require("../assets/logo/camera.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Capture QR</Text>
      </TouchableOpacity>
      {/* Button to open image picker */}
      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Image
          source={require("../assets/logo/galleryIcon.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Import QR</Text>
      </TouchableOpacity>
      {/* Button to navigate to History screen */}
      <TouchableOpacity style={styles.button} onPress={goToHistoryScreen}>
        <Image
          source={require("../assets/logo/history.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
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
  headerText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 60,
  },
});
