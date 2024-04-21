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
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const login = () => {
    if (username.length < 1) {
      Alert.alert("Error", "username cannot be empty");
      return;
    }
    if (password.length < 1) {
      Alert.alert("Error", "password cannot be empty");
      return;
    }
    loginAccount();
  };
  const loginAccount = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login/`, {
        username,
        password,
      });
      Alert.alert("Success", "Successfully Logged In");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to login. Please check your credentials and try again."
      );
      console.error("Login error:", error);
    }
  };
  const goToSignupScreen = () => {
    navigation.navigate("Signup");
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
          multiline={true}
        />
      </View>
      <Text style={styles.forgetButton}> Forget Password? </Text>

      <TouchableOpacity style={styles.button} onPress={login}>
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
    paddingLeft: 40, // Adjusted paddingLeft to accommodate the image width
    backgroundColor: "#EDEDED",
  },

  inputImage: {
    width: 35,
    height: 35,
    position: "absolute",
    left: 10, // Adjusted left position to align with the TextInput
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
});
