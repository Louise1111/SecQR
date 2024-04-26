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
export default function OtpVerifyScreen() {
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setOtp("");
    });

    return unsubscribe;
  }, [navigation]);

  const verifyOtp = () => {
    if (otp.length < 1) {
      Alert.alert("Error", "OTP cannot be empty!");
      return;
    }
    enteredOtp();
  };
  enteredOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/verify-otp/`, {
        otp: otp,
      });
      console.log(response.data.message);
      navigation.navigate("NewPassword");
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", "Incorrect OTP please, Try again");
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={{ fontSize: 28, fontWeight: "bold" }}>
          FORGOT PASSWORD
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { backgroundColor: "rgba(12, 125, 118, 0.3)", fontSize: 16 },
            ]}
            placeholder="An OTP was sent to your email!"
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0B8F87" />
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={verifyOtp}>
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
    height: 360,
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
