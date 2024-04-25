import React from "react";
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

  const handleBack = () => {
    navigation.goBack();
  };

  const handleDownload = () => {
    // Download the QR code image
    Linking.openURL(generatedData.qr_code);
  };

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
      <View>
        <Text style={{ fontSize: 25 }}>
          GENERATION
          <Text
            style={{
              color:
                generatedData.generation_status === "SUCCESS" ? "green" : "red",
            }}
          >
            {generatedData.generation_status}
          </Text>
        </Text>
      </View>

      {generatedData.generation_status === "SUCCESS" ? (
        <View style={styles.imageResult}>
          <Image
            style={{ width: 400, height: 400 }}
            source={{ uri: generatedData.qr_code }}
          />
        </View>
      ) : (
        <View style={styles.failedContainer}>
          <Text style={styles.failedText}>
            Cannot generate QR Code due to "{generatedData.url_status}" Content
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.Button} onPress={handleBack}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {generatedData.generation_status === "SUCCESS" && (
          <TouchableOpacity
            style={[styles.Button, { backgroundColor: "#0C7D76" }]}
            onPress={handleDownload}
          >
            <Text style={styles.closeButtonText}>Download</Text>
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
    backgroundColor: "#E4A937",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "50%",
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
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  failedText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
});
