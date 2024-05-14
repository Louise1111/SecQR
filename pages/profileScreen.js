import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios"; // Import Axios
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../assets/api";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);

  const goBack = () => {
    navigation.navigate("Home", { userInfo: userData });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);

      setEmail(response.data.user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    }
  };
  console.log("user data:", userData);
  resetPasswordButton = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/forgot-password/`,
        {
          email: email,
        }
      );

      console.log(response.data.message);
      navigation.navigate("OtpVerify");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
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
    }
  };
  const openImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.8,
      });

      if (result && !result.cancelled) {
        const uri = result.assets[0].uri; // Access URI based on option
        console.log(uri);
        saveImage(uri);
      } else if (result && result.cancelled) {
        return;
      } else {
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

      await FileSystem.copyAsync({ from: uri, to: destPath });

      setImage([...image, destPath]);

      uploadImage(destPath);
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };
  const uploadImage = async (uri) => {
    setLoading(true);
    try {
      const response = await FileSystem.uploadAsync(
        `${API_BASE_URL}/api/upload-picture/`,
        uri,
        {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "image",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      Alert.alert("Success", "Profile uploaded successfully.");

      // Refresh the page by fetching updated user data
      fetchData();
    } catch (error) {
      Alert.alert("Error", "Error uploading image, please try again later.");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goBack} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
      </View>

      <View style={styles.headerContainer}>
        {userData && userData.user && userData.user.image ? (
          <View style={styles.circleProfile}>
            <Image
              style={styles.profileImage}
              source={{ uri: `${API_BASE_URL}${userData.user.image}` }}
            />
          </View>
        ) : (
          <View style={styles.circleProfile}>
            <Image
              style={styles.profileImage}
              source={require("../assets/default.png")}
            />
          </View>
        )}
        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={openImagePicker}
        >
          <Image
            style={styles.uploadLogo}
            source={require("../assets/logo/camera1.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.informationContent}>
        <Text style={styles.textField}> First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={
              userData
                ? userData.user.first_name.charAt(0).toUpperCase() +
                  userData.user.first_name.slice(1)
                : "Loading..."
            }
            editable={false}
          />
        </View>
        <Text style={styles.textField}> Last Name</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={
              userData
                ? userData.user.last_name.charAt(0).toUpperCase() +
                  userData.user.last_name.slice(1)
                : "Loading..."
            }
            editable={false}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0B8F87" />
            </View>
          )}
        </View>
        <Text style={styles.textField}> Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={
              userData
                ? userData.user.email.charAt(0).toUpperCase() +
                  userData.user.email.slice(1)
                : "Loading..."
            }
            editable={false}
          />
        </View>
        <Text style={styles.textField}> User Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.user.username : "Loading..."}
            editable={false}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.Button, { backgroundColor: "#0C7D76" }]}
        onPress={resetPasswordButton}
      >
        <Text style={styles.buttonText}>FORGOT PASSWORD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sideHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  logoContainer: {
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
  },
  headerContainer: {
    height: 170,
    backgroundColor: "#D9D9D9",
    marginBottom: 40,
    alignContent: "center",
    alignItems: "center",
  },
  informationContent: {
    width: "80%",
    margin: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
    height: 47,

    borderRadius: 5,
    paddingLeft: 20,
    backgroundColor: "#EDEDED",
  },
  textField: {
    fontSize: 18,
  },
  Button: {
    flexDirection: "row",
    width: 220,
    height: 48,
    borderRadius: 50,
    marginTop: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 5,
    marginLeft: "20%",
    marginRight: "20%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  circleProfile: {
    height: 121,
    width: 121,
    borderRadius: 121 / 2,
    overflow: "hidden",
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    bottom: "-60%",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  uploadLogo: {
    width: 31,
    height: 29,
  },
  uploadContainer: {
    bottom: "-45%",
    right: "-10%",
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -30,
    marginLeft: -30,
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
});
