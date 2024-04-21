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
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const signup = () => {
    if (firstname.length < 1) {
      Alert.alert("Error", "First Name cannot be empty");
      return;
    }
    if (lastname.length < 1) {
      Alert.alert("Error", "Last name cannot be empty");
      return;
    }
    if (email.length < 1) {
      Alert.alert("Error", "Email cannot be empty");
      return;
    }
    if (username.length < 1) {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }
    if (password.length < 1) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    signupButton();
  };

  const signupButton = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", "Failed to create account. Please try again later.");
      console.error("Signup error:", error);
    }
  };

  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        source={require("../assets/logo/logo.png")}
        style={styles.SecQR_logo}
      />
      <Text style={styles.textHeader}> WELCOME</Text>
      <Text style={styles.textHeader2}> Create your account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstname}
          onChangeText={setFirstname}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/logo/email.png")}
          style={styles.inputImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
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
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/logo/password.png")}
          style={styles.inputImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={signup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={styles.haveAccountContainer}>
        <Text style={styles.text}> Already have an account?</Text>
        <TouchableOpacity style={styles.txt} onPress={goToLoginScreen}>
          <Text
            style={[
              styles.text,
              { fontWeight: "bold", textDecorationLine: "underline" },
            ]}
          >
            LOG IN
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
    marginTop: 10,
    width: 299,
    zIndex: 1,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 20,
    height: 50,
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
    marginTop: 10,
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
    top: 0,
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
  text: {
    fontSize: 17,
  },
  haveAccountContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
});
