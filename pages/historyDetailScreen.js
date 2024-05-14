import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryDetailScreen() {
  const navigation = useNavigation();
  const [ImageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageData = async () => {
      if (qr_code) {
        let qrCodeUrl = qr_code;
        if (qrCodeUrl.includes("http://")) {
          qrCodeUrl = qrCodeUrl.replace("http://", "https://");
        }
        setImageUrl(qrCodeUrl);
        console.log("Image URL:", qrCodeUrl);
      }
    };

    fetchImageData();
  }, [qr_code]);

  const getStatusColor = (status) => {
    switch (status) {
      case "MALICIOUS":
      case "FAILED":
        return "#FF0000";
      case "SAFE":
      case "SUCCESS":
        return "#009F2C";
      case "NOT THAT SAFE":
        return "#FF0000";
      default:
        return "black";
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    // Download the QR code image
    Linking.openURL(ImageUrl);
  };

  const route = useRoute();
  const { description, url, status, qr_code, generationStatus, created_at } =
    route.params;

  const formattedDate = new Date(created_at);
  const formattedDateString = formattedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = formattedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const formattedDay = formattedDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Details</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.textStyle}>Description:</Text>
        <View style={styles.resultBody}>
          <Text style={styles.textResult}>{description}</Text>
        </View>

        <Text style={styles.textStyle}>URL:</Text>
        <View style={styles.resultBody}>
          <Text
            style={[styles.textResult, { textDecorationLine: "underline" }]}
          >
            {url}
          </Text>
        </View>
        <Text style={styles.textStyle}>Date Generate:</Text>
        <View style={styles.resultBody}>
          <Text style={styles.textResult}>
            {formattedDay}, {formattedDateString}, {formattedTime}
          </Text>
        </View>
        <Text style={styles.textStyle}>Status:</Text>
        <View style={styles.resultBody}>
          <Text
            style={[
              styles.textResult,
              {
                color: getStatusColor(status),
                fontSize: 24,
                fontWeight: "bold",
              },
            ]}
          >
            {status}
          </Text>
        </View>

        <Text style={styles.textStyle}>Status Generation:</Text>
        <View style={styles.resultBody}>
          <Text
            style={[
              styles.textResult,
              {
                color: getStatusColor(status),
                fontSize: 23,
                fontWeight: "bold",
              },
            ]}
          >
            {generationStatus}
          </Text>
        </View>
        <View style={styles.imageResult}>
          <Image
            style={{ width: 250, height: 250, resizeMode: "contain" }}
            source={{ uri: ImageUrl }}
          />
        </View>
        {ImageUrl !== null && (
          <TouchableOpacity
            style={[styles.Button, { backgroundColor: "#0C7D76" }]}
            onPress={handleDownload}
          >
            <Text style={styles.buttonText}>Download QR</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  sideHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 10,
    width: "100%",
    zIndex: 1,
  },
  logoContainer: {
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
    justifyContent: "top",
    alignItems: "left",
    borderColor: "#0B8F87",
    borderWidth: 2,
    width: "80%",
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  resultBody: {
    marginLeft: 40,
    width: 230,
  },
  Button: {
    flexDirection: "row",
    width: 130,
    height: 30,
    borderRadius: 10,
    marginBottom: 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 5,
    marginLeft: "22%",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  textResult: {
    fontSize: 18,
  },
});
