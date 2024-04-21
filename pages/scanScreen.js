import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Notification from "../components/notification";
import * as FileSystem from "expo-file-system";
import { API_BASE_URL } from "../assets/api";
import Header from "../components/header";
export default function ScanScreen({ route }) {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // Assuming modalVisible is part of your component's state
  const [scannedResult, setScannedResult] = useState(null); // Assuming scannedResult is part of your component's state
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImage(files.map((f) => imgDir + f));
    }
  };

  useEffect(() => {
    if (route.params?.scannedResult) {
      setScannedResult(route.params.scannedResult);
      toggleModal();
    }
  }, [route.params]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const goToCameraScreen = () => {
    navigation.navigate("CameraScreen");
  };

  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };

  const imgDir = FileSystem.documentDirectory + "scan_images/";

  const ensureDirExists = async () => {
    try {
      const dirInfo = await FileSystem.getInfoAsync(imgDir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
      }
    } catch (error) {
      console.error("Error ensuring directory exists:", error);
      // Handle the error gracefully, such as showing a message to the user
    }
  };
  const openImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 4],
        quality: 0.8,
      });

      if (result && !result.cancelled) {
        const uri = result.assets[0].uri; // Access URI based on option
        console.log(uri);
        saveImage(uri);
      } else if (result && result.cancelled) {
        // Handle the case where image selection is cancelled
        return;
      } else {
        // Handle the case where the result is null (e.g., user backs out)
        return;
      }
    } catch (error) {
      // Handle any other errors that may occur during image selection
      return;
    }
  };
  const saveImage = async (uri) => {
    try {
      await ensureDirExists(); // Ensure the directory exists

      const filename = new Date().getTime() + ".jpg";
      const destPath = imgDir + filename;

      // Copy the image asynchronously
      await FileSystem.copyAsync({ from: uri, to: destPath });

      // Update the state with the new image path
      setImage([...image, destPath]);

      // Upload the image
      scanImage(destPath);
    } catch (error) {
      console.error("Error saving image:", error);
      // Handle the error gracefully, such as showing a message to the user
    }
  };

  const scanImage = async (uri) => {
    setLoading(true);
    try {
      const response = await FileSystem.uploadAsync(
        `${API_BASE_URL}/api/scan/`,
        uri,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "image",
        }
      );

      setLoading(false);

      console.log("Response:", response);

      if (response.status === 201) {
        // Extracting the response data from the response body
        const responseData = JSON.parse(response.body);
        console.log("Response data:", responseData);

        // Navigate to the Scan screen and pass the scanned result data as a parameter
        navigation.navigate("Scan", { scannedResult: responseData });

        console.log("Image scanned successfully!"); // Log success message
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false); // Ensure loading state is reset even if an error occurs
    }
  };

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

      <Header />
      <TouchableOpacity style={styles.button} onPress={goToCameraScreen}>
        <Image
          source={require("../assets/logo/camera.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Capture QR</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B8F87" />
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={openImagePicker}>
        <Image
          source={require("../assets/logo/galleryIcon.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToHistoryScreen}>
        <Image
          source={require("../assets/logo/history.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>

      <Notification
        visible={modalVisible}
        onClose={toggleModal}
        scannedResult={scannedResult}
      />
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
  image1: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    marginBottom: 20, // Add any additional styling you want
  },
  headerText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 60,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -30, // Half of the ActivityIndicator size
    marginLeft: -30, // Half of the ActivityIndicator size
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
});
