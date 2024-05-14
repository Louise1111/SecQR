import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GenerateResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { generatedData } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    // Download the QR code image
    Linking.openURL(imageUri);
  };

  useEffect(() => {
    if (generatedData.qr_code) {
      let qrCodeUrl = generatedData.qr_code;
      if (qrCodeUrl.includes("http://")) {
        qrCodeUrl = qrCodeUrl.replace("http://", "https://");
      }
      setImageUri(qrCodeUrl);
    }
  }, [generatedData.qr_code]);
  return (
    <View style={styles.container}>
      <View style={styles.SideHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.HeaderText}>Generate QR</Text>
      </View>
      <View style={styles.generationStatus}>
        <Image
          source={
            generatedData.generation_status === "SUCCESS"
              ? require("../assets/logo/success.png")
              : require("../assets/logo/failed.png")
          }
          style={styles.generationLogo}
        />
        <Text
          style={{
            color:
              generatedData.generation_status === "SUCCESS"
                ? "#009F2C"
                : "#FF0000",
            fontSize: 35,
            fontWeight: "bold",
            marginTop: -50,
          }}
        >
          {generatedData.generation_status}!
        </Text>
      </View>

      {generatedData.generation_status === "SUCCESS" ? (
        <View style={styles.imageResult}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0B8F87" />

              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          )}
          <Image
            style={{ width: 400, height: 400 }}
            source={{ uri: imageUri }}
          />
        </View>
      ) : (
        <View style={styles.failedContainer}>
          <Text style={styles.failedText}>
            Cannot generate QR Code due to "
            <Text style={{ color: "red" }}>{generatedData.url_status}</Text>"
            URL
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Button} onPress={handleBack}>
          <Text style={styles.closeButtonText}>CLOSE</Text>
        </TouchableOpacity>
        {generatedData.generation_status === "SUCCESS" && (
          <TouchableOpacity style={[styles.Button]} onPress={handleDownload}>
            <Text style={styles.closeButtonText}>DOWNLOAD</Text>
          </TouchableOpacity>
        )}
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
  logoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
  },
  logo2: {
    width: 40,
    height: 40,
  },
  HeaderText: {
    color: "white",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 60,
  },
  Button: {
    backgroundColor: "#0C7D76",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "50%",
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    bottom: -15,
    left: 0,
    right: 0,
    margin: 0,
    width: "90%",
  },

  failedContainer: {
    width: 350,
    height: 276,
    justifyContent: "center",
    alignItems: "center",
  },
  failedText: {
    fontSize: 27,

    textAlign: "center",
  },
  closeButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ffffff",
  },
  generationStatus: {
    position: "relative",
    alignItems: "center",
    fontSize: 35,
    fontWeight: "bold",
    alignContent: "center",
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
});
