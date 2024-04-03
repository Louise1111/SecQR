import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GenerateItem = ({ id, description, url, status }) => {
  const navigation = useNavigation();

  // Define the image source based on the status
  let imageSource;
  if (status === "Safe") {
    imageSource = require("../assets/logo/safe.png");
  } else if (status === "Not That Safe") {
    imageSource = require("../assets/logo/NtSafe.png");
  } else if (status === "Malicious") {
    imageSource = require("../assets/logo/malicious.png");
  } else {
    // Default image if status does not match any of the conditions
    imageSource = require("../assets/logo/none.png");
  }

  return (
    <TouchableOpacity
      style={styles.container1}
      onPress={() =>
        navigation.navigate("HistoryDetail", {
          historyId: id,
          description,
          url,
          status,
        })
      }
    >
      <Image source={imageSource} style={styles.logo} />
      <Text style={styles.textContainer1}> {url}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    padding: 20,
    borderTopWidth: 3,
    borderTopColor: "#CCCCCC",
    borderBottomWidth: 1,
    borderBottomColor: "#0B8F87",
    flexDirection: "row",
  },
  textContainer1: {
    fontSize: 16,
    marginLeft: 25,
  },
  logo: {
    width: 28,
    height: 25,
    marginLeft: 0,
  },
});

export default GenerateItem;
