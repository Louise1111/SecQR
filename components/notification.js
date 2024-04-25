import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";

const Notification = ({ visible, onClose, scannedResult }) => {
  const [expanded, setExpanded] = useState(false);
  const [seeLessVisible, setSeeLessVisible] = useState(false);
  useEffect(() => {
    if (!visible) {
      setExpanded(false);
    }
  }, [visible]);
  const handleSeeMore = () => {
    setExpanded(true);
    setSeeLessVisible(true);
  };

  const handleSeeLess = () => {
    setExpanded(false);
    setSeeLessVisible(false);
  };

  const handleClose = () => {
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "MALICIOUS":
        return "#FF0000";
      case "SAFE":
        return "#009F2C";
      case "NOT THAT SAFE":
        return "#EB07FF";
      default:
        return "black";
    }
  };
  // Check if scannedResult is null or undefined
  if (!scannedResult) {
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View
            style={[styles.modalContent, { height: expanded ? "auto" : 200 }]}
          >
            <Text>No data available</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View
          style={[styles.modalContent, { height: expanded ? "auto" : 200 }]}
        >
          <View style={styles.header}>
            <Image
              source={require("../assets/logo/logo.png")}
              style={styles.SecQR_logo}
            />
            <View style={styles.logoTextContainer}>
              <Text style={styles.ratingText}>
                <Text>Sec</Text>
                <Text style={{ color: "#0B8F87" }}>QR</Text>
                <Text> Rating: </Text>
              </Text>
              <Text style={styles.ResultText}>
                <Text
                  style={{ color: getStatusColor(scannedResult.link_status) }}
                >
                  {scannedResult.link_status}
                </Text>
              </Text>
              <Text style={styles.Link}>
                {scannedResult.link.includes("###")
                  ? scannedResult.link.split("###")[0]
                  : scannedResult.link}
              </Text>
              <Text style={styles.verify_qr_legitimacy}>
                {scannedResult.verify_qr_legitimacy}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.moreButton}
            onPress={expanded ? handleSeeLess : handleSeeMore}
          >
            <Text
              style={{
                fontSize: 15,
                textDecorationLine: "underline",
              }}
            >
              {expanded ? "See less" : "See more"}
            </Text>
            <Image
              source={require("../assets/logo/more.png")}
              style={styles.imageMore}
            />
          </TouchableOpacity>

          {expanded && (
            <View style={styles.additionalContent}>
              <View style={styles.addContentRow}>
                <Text
                  style={{ color: "#FF0000", fontSize: 16, fontWeight: "bold" }}
                >
                  Threat Detected:
                </Text>
                <View style={styles.addContentRow2}>
                  <Text
                    style={{ textTransform: "capitalize", color: "#FF0000" }}
                  >
                    {scannedResult.malware_detected.length > 3
                      ? scannedResult.malware_detected.replace(/[\[\]']+/g, "")
                      : "0 Malicious Found"}
                  </Text>
                </View>
              </View>
              <View style={styles.addContentRow}>
                <Text
                  style={{ color: "#009F2C", fontSize: 16, fontWeight: "bold" }}
                >
                  Detected By:
                </Text>
                <View style={styles.addContentRow2}>
                  <Text style={{ color: "#009F2C" }}>
                    {scannedResult &&
                    scannedResult.malware_detected_tool.length > 3
                      ? scannedResult.malware_detected_tool.replace(
                          /[\[\]']+/g,
                          ""
                        )
                      : "0 Malicious Found"}
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleClose} style={styles.Button}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(scannedResult.link);
              }}
              style={[styles.Button, { backgroundColor: "#0C7D76" }]}
            >
              <Text style={styles.closeButtonText}>
                {scannedResult.link_status === "SAFE" ? "Open" : "Open Anyway"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0B8F87",
    position: "relative",
    paddingBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "80%",
    marginBottom: -60,
    marginTop: -70,
  },
  logoTextContainer: {
    flexDirection: "column",
    maxWidth: "60%",
    marginTop: -70,
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: -130,
    marginTop: 150,
    width: 186,
    marginBottom: 3,
  },
  ResultText: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: -130,
    marginTop: -5,
    marginBottom: 3,
    width: 186,
  },
  Link: {
    fontSize: 15,
    marginLeft: -130,
    color: "#000000",
    marginTop: -5,
    marginBottom: 7,
    width: 170,
    textDecorationLine: "underline",
  },
  verify_qr_legitimacy: {
    fontSize: 15,
    marginLeft: -130,
    color: "#000000",
    marginTop: -5,
    marginBottom: 30,
    width: 186,
  },
  SecQR_logo: {
    width: 296,
    height: 236,
    marginTop: 50,
    marginLeft: -80,
  },
  moreButton: {
    flexDirection: "row",
    marginBottom: -17.5,
    marginTop: 25,
  },
  imageMore: {
    marginTop: 4,
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
  closeButtonText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  additionalContent: {
    marginTop: 22,
    alignItems: "stretch",
    paddingBottom: 10,
    flexDirection: "row",
  },
  addContentRow: {
    margin: 10,
    width: 125,
    marginTop: 5,
  },
  addContentRow2: {
    margin: 0,
    paddingLeft: 1,

    width: 125,
    marginTop: 5,
  },
});
export default Notification;
