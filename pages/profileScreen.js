import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import axios from "axios"; // Import Axios
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_BASE_URL } from "../assets/api";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = route.params;
  const [userData, setUserData] = useState(null);

  const goBack = () => {
    navigation.pop();
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
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
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

      <View style={styles.headerContainer}></View>
      <View style={styles.informationContent}>
        <Text style={styles.textField}> First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.user.first_name : "Loading..."}
            editable={false}
          />
        </View>
        <Text style={styles.textField}> Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.user.last_name : "Loading..."}
            editable={false}
          />
        </View>
        <Text style={styles.textField}> Email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={userData ? userData.user.email : "Loading..."}
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
      <TouchableOpacity style={[styles.Button, { backgroundColor: "#0C7D76" }]}>
        <Text style={styles.buttonText}>EDIT PROFILE</Text>
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
    width: 158,
    height: 48,
    borderRadius: 50,
    marginTop: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 5,
    marginLeft: "25%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
