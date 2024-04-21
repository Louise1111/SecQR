import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../assets/api";
export default function GenerateScreen() {
  const navigation = useNavigation();
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const generateQR = async () => {
    try {
      if (description.length < 1) {
        Alert.alert("Error", "Description cannot be empty");
        return;
      }

      if (!isValidURL(link)) {
        Alert.alert("Error", "Please enter a valid URL.");
        return;
      }

      const data = { description, link };
      const response = await fetch(`${API_BASE_URL}/api/generate/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log(res);
      generatedData = res;
      navigation.navigate("GenerateResult", { generatedData });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to generate QR code. Please try again.");
    }
  };

  const isValidURL = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
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
        <Text style={styles.HeaderText}>Generate QR</Text>
      </View>
      <View style={styles.inputContainerDescription}>
        <TextInput
          style={styles.input}
          placeholder="Add Description..."
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
      </View>
      <View style={styles.inputContainerLink}>
        <TextInput
          style={styles.input2}
          placeholder="https://example.com"
          value={link}
          onChangeText={setLink}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={generateQR}
        title="generate"
      >
        <Text style={styles.buttonText}>Generate QR</Text>
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
  inputContainerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  inputContainerDescription: {
    marginTop: 40, // Increased marginTop to make it bigger
    alignItems: "center",
  },
  input: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: "#0B8F87",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#EDEDED",
  },
  input2: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#0B8F87",
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "#EDEDED",
  },
  button: {
    flexDirection: "row",
    width: 299,
    height: 58,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B8F87",
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
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
});
