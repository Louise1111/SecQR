import React, { useState, useEffect } from "react";
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
export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setEmail("");
    });

    return unsubscribe;
  }, [navigation]);
  const resetPassword = () => {
    if (email.length < 1) {
      Alert.alert("Error", "Email cannot be empty");
      return;
    }
    resetPasswordButton();
  };

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
      Alert.alert("Error", "Email do not exist!");
      setLoading(false);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          FORGOT PASSWORD
        </Text>
        <Text style={{ fontSize: 17 }}>Enter your email Address</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0B8F87" />
            </View>
          )}
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
    height: 254,
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
