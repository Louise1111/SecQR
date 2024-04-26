import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import Header from "../components/header";
import { AuthContext } from "../components/authentication/AuthContext";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
export default function NewPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(AuthContext);
  const navigation = useNavigation();

  resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (newPassword.length < 1) {
      Alert.alert("Error", "Password cannot be empty!");
      return;
    }
    if (confirmPassword.length < 1) {
      Alert.alert("Error", "Confirm password cannot be empty!");
      return;
    }

    resetPasswordButton();
  };
  const resetPasswordButton = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/reset-password/`, {
        new_password: newPassword,
      });
      console.log(response.data.message);
      Alert.alert("Success", "Password has been successfully changed!");
      if (userToken && userToken.length > 1) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }

      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.log(error);
        Alert.alert("Error", "Cannot change password. Please try again later!");
        setLoading(false);
      } else if (error.request) {
        Alert.alert(
          "Error",
          "No response from server. Please try again later!"
        );
        setLoading(false);
      } else {
        console.error("Error:", error.message);
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>NEW PASSWORD</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: "rgba(12, 125, 118, 0.3)",
                fontSize: 15,
                alignItems: "center",
              },
            ]}
            placeholder="Please input credentials here
             for new
              password."
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0B8F87" />
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
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

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: 302,
    zIndex: 1,
    justifyContent: "center",
  },

  input: {
    flex: 1,
    fontSize: 17,
    height: 58,
    borderWidth: 1,
    borderColor: "#DFE4E3",
    borderRadius: 10,
    paddingLeft: 20,
    backgroundColor: "#EDEDED",
  },

  inputImage: {
    width: 35,
    height: 35,
    position: "absolute",
    left: 10,
    zIndex: 1,
  },

  button: {
    width: 299,
    height: 58,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C7D76",
  },

  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  containerBody: {
    width: 327,
    height: 388,
    borderWidth: 2,
    borderColor: "#8F8D8D",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 20,
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
