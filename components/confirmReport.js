import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
import { AuthContext } from "./authentication/AuthContext";
const ConfirmReportModal = ({
  visible,
  onCancel,
  onConfirm,
  scannedId,
  reportStatus,
}) => {
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {});

    return unsubscribe;
  }, [navigation]);

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/api/report/${scannedId}/`, null, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })

      .then((response) => {
        Alert.alert("Success", "A report has been submitted!");

        onConfirm("Yes");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error posting data:", error);
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onCancel();
        resetStates();
      }}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.textView}>
            <Text style={styles.modalText}>
              Are your sure you want to report the link?
            </Text>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0B8F87" />

                <Text style={styles.loadingText}>Reporting...</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    elevation: 5,
    width: 335,
    height: 140,
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  modalText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 19,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  cancelButton: {
    backgroundColor: "#0C7D76",
    padding: 10,
    width: "50%",
    borderWidth: 1,
  },
  confirmButton: {
    backgroundColor: "#0C7D76",
    padding: 10,
    width: "50%",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textView: {
    paddingLeft: 20,
    paddingRight: 20,
    alignContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 3,
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

export default ConfirmReportModal;
