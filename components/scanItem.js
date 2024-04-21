import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ScanItem = ({
  id,
  url,
  status,
  malware_detected,
  malware_detected_tool,
  verify_qr_legitimacy,
}) => {
  const navigation = useNavigation();

  // Define the image source based on the status
  let imageSource;
  if (status === "SAFE") {
    imageSource = require("../assets/logo/safe.png");
  } else if (status === "NOT THAT SAFE") {
    imageSource = require("../assets/logo/NtSafe.png");
  } else if (status === "MALICIOUS") {
    imageSource = require("../assets/logo/malicious.png");
  } else {
    // Default image if status does not match any of the conditions
    imageSource = require("../assets/logo/none.png");
  }

  return (
    <TouchableOpacity
      style={styles.container1}
      onPress={() =>
        navigation.navigate("HistoryDetailScan", {
          historyId: id,
          url,
          status,
          malware_detected,
          malware_detected_tool,
          verify_qr_legitimacy,
        })
      }
    >
      {/* Display the image based on imageSource */}
      <Image source={imageSource} style={styles.logo} />
      <View style={styles.urlContent}>
        <Text style={styles.textContainer1}> {url}</Text>
      </View>
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
  urlContent: {
    marginRight: 20,
  },
});

export default ScanItem;
