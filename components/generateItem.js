import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GenerateItem = ({
  id,
  description,
  url,
  status,
  generationStatus,
  qr_code,
  created_at,
}) => {
  const navigation = useNavigation();

  let imageSource;
  if (status === "SAFE") {
    imageSource = require("../assets/logo/safe.png");
  } else if (status === "NOT THAT SAFE") {
    imageSource = require("../assets/logo/NtSafe.png");
  } else if (status === "MALICIOUS") {
    imageSource = require("../assets/logo/malicious.png");
  } else {
    imageSource = require("../assets/logo/none.png");
  }

  const generateDate = new Date(created_at);
  const formattedDate = generateDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  const formattedTime = generateDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <TouchableOpacity
      style={styles.container1}
      onPress={() =>
        navigation.navigate("HistoryDetail", {
          historyId: id,
          description,
          url,
          status,
          generationStatus,
          qr_code,
          created_at,
        })
      }
    >
      {/* Display the image based on imageSource */}
      <Image source={imageSource} style={styles.logo} />

      <View style={styles.urlContent}>
        <Text style={styles.textContainer1}> {url}</Text>
        <Text style={styles.textContainer2}>
          {formattedDate}, {formattedTime}
        </Text>
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
  textContainer2: {
    fontSize: 12,
    position: "absolute",
    right: 0,
    top: 20,
    color: "#777777",
  },
  logo: {
    width: 28,
    height: 25,
    marginLeft: 0,
  },
  urlContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default GenerateItem;
