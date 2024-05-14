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

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const signup = () => {
    if (first_name.length < 1) {
      Alert.alert("Error", "First Name cannot be empty");
      return;
    }
    if (last_name.length < 1) {
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
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };
  const signupButton = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, {
        username,
        first_name,
        last_name,
        email,
        password,
      });

      const { id, ...responseData } = response.data;

      if (response.status === 201) {
        setLoading(false);
        Alert.alert("Success", "Account created successfully");
        navigation.navigate("Login");
      } else {
        Alert.alert(
          "Error",
          "Unexpected response from server. Please try again later."
        );
        setLoading(false);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.detail || "Failed to create account.";
        Alert.alert(
          "Error",
          errorMessage + "\n\n" + JSON.stringify(error.response.data)
        );
      } else if (error.request) {
        Alert.alert(
          "Error",
          "Network error. Please check your internet connection and try again."
        );
        console.error("Network error:", error.request);
      } else {
        Alert.alert(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setFirstname("");
      setLastname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    });

    return unsubscribe;
  }, [navigation]);
  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
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
          value={first_name}
          onChangeText={setFirstname}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={last_name}
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
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B8F87" />

          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
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
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={toggleShowPassword}
          style={styles.passwordToggle}
        >
          <Image
            source={
              showPassword
                ? require("../assets/logo/eyesOpen.png")
                : require("../assets/logo/eyesClose.png")
            }
            style={styles.passwordToggleIcon}
          />
        </TouchableOpacity>
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
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          onPress={toggleShowConfirmPassword}
          style={styles.passwordToggle}
        >
          <Image
            source={
              showConfirmPassword
                ? require("../assets/logo/eyesOpen.png")
                : require("../assets/logo/eyesClose.png")
            }
            style={styles.passwordToggleIcon}
          />
        </TouchableOpacity>
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
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },

  passwordToggle: {
    position: "absolute",
    right: 5,
    zIndex: 1,
  },

  passwordToggleIcon: {
    width: 40,
    height: 40,
  },
});
