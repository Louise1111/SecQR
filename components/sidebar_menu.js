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

export default function SideBar_Menu() {
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

  return (
    <View>
      <View style={styles.SideHeader}></View>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={toggleDrawer} style={styles.logoContainer}>
        <Image
          source={require("../assets/logo/drawer_menu.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] },
          !isOpen && { zIndex: -1 }, // Adjust zIndex when drawer is closed
        ]}
        pointerEvents={isOpen ? "auto" : "none"}
      >
        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require("../assets/logo/user.png")}
            style={styles.logoDrawer}
          />
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem}>
          <Image
            source={require("../assets/logo/signout.png")}
            style={styles.logoDrawer}
          />
          <Text style={styles.drawerItemText}>SIGN OUT</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    position: "absolute",
    top: 42,
    left: 0,
    zIndex: 2,
  },
  logo: {
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
    padding: 10,
    zIndex: 2, // Increase the zIndex of the drawer
    borderTopEndRadius: 5,
    borderBottomEndRadius: 5,
  },
  drawerItem: {
    paddingVertical: 0,
    zIndex: 2,
    flexDirection: "row",
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
  },
  SideHeader: {
    flexDirection: "row",
    width: "100%",
    height: 58,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#0B8F87",
    zIndex: 1,
  },
  logoDrawer: {
    width: 32,
    height: 32,
    marginRight: 5,
    marginLeft: 5,
  },
});
