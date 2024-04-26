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

import { AuthContext } from "../components/authentication/AuthContext";

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const loginVerify = async () => {
    if (username.length < 1) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    if (password.length < 1) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await login(username, password);

      setLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setUsername("");
      setPassword("");
    });

    return unsubscribe;
  }, [navigation]);
  const goToSignupScreen = () => {
    navigation.navigate("Signup");
  };

  goToForgot = () => {
    navigation.navigate("Forgot");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo/logo.png")}
        style={styles.SecQR_logo}
      />
      <Text style={styles.textHeader}> WELCOME</Text>
      <Text style={styles.textHeader2}> Log In to your create account.</Text>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/logo/user.png")}
          style={styles.inputImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          multiline={true}
        />
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B8F87" />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/logo/password.png")}
          style={styles.inputImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity onPress={goToForgot}>
        <Text style={styles.forgetButton}> Forget Password? </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={loginVerify}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <View style={styles.noAccountContainer}>
        <Text style={styles.text}> No account yet?</Text>
        <TouchableOpacity style={styles.txt} onPress={goToSignupScreen}>
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", textDecorationLine: "underline" },
            ]}
          >
            SIGNUP
          </Text>
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
    width: 299,
    zIndex: 1,
    justifyContent: "center",
  },

  input: {
    flex: 1,
    fontSize: 20,
    height: 58,
    borderWidth: 1,
    borderColor: "#0B8F87",
    borderRadius: 10,
    paddingLeft: 40,
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
    borderRadius: 50,
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

  SecQR_logo: {
    width: 320,
    height: 322,
    marginLeft: "15%",
    alignItems: "center",
    marginTop: "center",
  },
  textHeader: {
    color: "#0C7D76",
    fontSize: 42,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: -110,
  },
  textHeader2: {
    fontSize: 15,
    marginRight: -15,
    marginTop: -10,
  },
  forgetButton: {
    fontSize: 17,
    marginLeft: 170,
    marginTop: 10,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 17,
  },
  noAccountContainer: {
    flexDirection: "row",
    marginTop: 15,
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
