import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContext } from "../components/authentication/AuthContext";
import { API_BASE_URL } from "../assets/api";
import axios from "axios";

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [translateX] = useState(new Animated.Value(-300)); // Start position off-screen
  const { logout, userToken } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      if (isOpen) {
        closeDrawer();
      }
    });
    return unsubscribe;
  }, [navigation, isOpen]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/user/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert("Error", "Failed to fetch user data. Please try again.");
    }
  };

  const toggleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    fetchData();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(true);
  };

  const closeDrawer = () => {
    Animated.timing(translateX, {
      toValue: -300, // Move off-screen
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
  };

  const handleBackdropPress = () => {
    if (isOpen) {
      closeDrawer();
    }
  };

  const goToScanScreen = () => {
    navigation.navigate("Scan", { token: userToken });
  };

  const goToGenerateQRScreen = () => {
    navigation.navigate("GenerateQR", { token: userToken });
  };

  const goToHistoryScreen = () => {
    navigation.navigate("History", { token: userToken });
  };

  const goToHelpScreen = () => {
    navigation.navigate("Help", { token: userToken });
  };

  const goToAboutScreen = () => {
    navigation.navigate("About", { token: userToken });
  };

  const goToProfile = () => {
    navigation.navigate("Profile", { token: userToken });
  };

  return (
    <View style={styles.container}>
      <View style={styles.SideHeader}></View>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={toggleDrawer} style={styles.logoContainer}>
        <Image
          source={require("../assets/logo/drawer_menu.png")}
          style={styles.logo2}
        />
      </TouchableOpacity>
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }] }]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <TouchableOpacity style={styles.drawerItem} onPress={goToProfile}>
          {userData?.user.image ? (
            <View style={styles.circleProfile}>
              <Image
                source={{ uri: `${API_BASE_URL}${userData.user.image}` }}
                style={styles.logoDrawer}
              />
            </View>
          ) : (
            <View style={styles.circleProfile}>
              <Image
                source={require("../assets/logo/user.png")}
                style={styles.logoDrawer}
              />
            </View>
          )}
          <Text
            style={[
              styles.drawerItemText,
              { textTransform: "uppercase", textDecorationLine: "underline" },
            ]}
          >
            {userData?.user.username || "PROFILE"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem2}
          onPress={() => {
            logout();
          }}
        >
          <Image
            source={require("../assets/logo/signout.png")}
            style={styles.logoDrawer2}
          />
          <Text
            style={[
              styles.drawerItemText,
              { fontWeight: "bold", color: "black" },
            ]}
          >
            SIGN OUT
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Header />
      <TouchableOpacity style={styles.button} onPress={goToScanScreen}>
        <Image
          source={require("../assets/logo/camera.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Scan QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToGenerateQRScreen}>
        <Image
          source={require("../assets/logo/qr-code.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Generate QR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToHistoryScreen}>
        <Image
          source={require("../assets/logo/history.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToHelpScreen}>
        <Image
          source={require("../assets/logo/help.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToAboutScreen}>
        <Image
          source={require("../assets/logo/about.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>About</Text>
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
  logoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  logo2: {
    width: 60,
    height: 60,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 1,
  },
  drawer: {
    position: "absolute",
    top: 110,
    left: 0,
    width: 210,
    backgroundColor: "#0B8F87",
    padding: 0,
    zIndex: 2,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
  drawerItem: {
    paddingVertical: 0,
    flexDirection: "row",
    paddingTop: 5,
  },
  drawerItem2: {
    paddingVertical: 0,
    flexDirection: "row",
    paddingTop: 5,
    borderBottomWidth: 2,

    backgroundColor: "#ffff",
  },

  drawerItemText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
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
  logoDrawer: {
    width: 42,
    height: 42,
    marginRight: -3,
    marginTop: -4,
    marginLeft: 5,
    padding: 0,
  },
  logoDrawer2: {
    width: 27,
    height: 27,
    marginRight: 2,
    marginTop: 2,
    marginLeft: 12,
  },
  button: {
    flexDirection: "row",
    width: 299,
    height: 58,
    borderRadius: 10,
    marginBottom: 13,
    justifyContent: "left",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    zIndex: 1,
  },
  logo: {
    width: 37,
    height: 37,
    marginRight: 15,
    marginLeft: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
  circleProfile: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    overflow: "hidden",
    marginRight: 3,
    marginLeft: 5,
    marginBottom: 3,
  },
});
