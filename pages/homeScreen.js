import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "../components/header";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [translateX] = useState(new Animated.Value(-300)); // Start position off-screen

  const toggleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const openDrawer = () => {
    Animated.timing(translateX, {
      toValue: 0, // Move into view
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

  const navigation = useNavigation();
  const goToLoginScreen = () => {
    navigation.navigate("Login");
  };
  const goToScanScreen = () => {
    navigation.navigate("Scan");
  };

  const goToGenerateQRScreen = () => {
    navigation.navigate("GenerateQR");
  };

  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };

  const goToHelpScreen = () => {
    navigation.navigate("Help");
  };

  const goToAboutScreen = () => {
    navigation.navigate("About");
  };

  const goToIndexScreen = () => {
    navigation.navigate("Index");
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
        pointerEvents={isOpen ? "auto" : "none"} // Adjust pointer events based on drawer state
      >
        <TouchableOpacity onPress={goToLoginScreen} style={styles.drawerItem}>
          <Image
            source={require("../assets/logo/user.png")}
            style={styles.logoDrawer}
          />
          <Text style={styles.drawerItemText}>PROFILE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem2} onPress={goToIndexScreen}>
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
    zIndex: 2, // Increase the zIndex of the drawer
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
    zIndex: 1, // Ensure buttons are clickable over the drawer
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
});
