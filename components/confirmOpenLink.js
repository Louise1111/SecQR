import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../assets/api";
import { AuthContext } from "./authentication/AuthContext";
const ConfirmOpenLinkModal = ({ visible, onCancel, onConfirm, link }) => {
  const [confirmCaptcha, setConfirmCaptcha] = useState("");
  const [randomCaptcha, setRandomCaptcha] = useState("");

  const { userToken } = useContext(AuthContext);

  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      generateRandomCaptcha();
    }
  }, [visible]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      resetStates();
    });

    return unsubscribe;
  }, [navigation]);

  const generateRandomCaptcha = () => {
    const captcha = Math.floor(1000 + Math.random() * 9000).toString();
    setRandomCaptcha(captcha);
  };

  const handleCancel = () => {
    onCancel();

    resetStates();
  };

  const resetStates = () => {
    setConfirmCaptcha("");
    setRandomCaptcha("");
  };

  const handleConfirm = () => {
    if (confirmCaptcha === randomCaptcha) {
      Linking.openURL(link).catch((error) => {
        console.error("Error opening URL:", error);
      });
      handleCancel();
    } else {
      alert("Code does not match. Please try again.");
    }
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
              <Text style={{ color: "red", fontWeight: "bold" }}>Warning:</Text>{" "}
              The link you are attempting to visit has been flagged as
              potentially malicious. Input the code if you still wish to
              proceed.
            </Text>
            <View style={styles.captchaView}>
              <Text>{randomCaptcha}</Text>
            </View>
            <View style={styles.captchaInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter Code"
                value={confirmCaptcha}
                onChangeText={setConfirmCaptcha}
                keyboardType="numeric"
              />
            </View>
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
    height: 195,
    borderColor: "#FF0000",
    borderWidth: 1,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
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
  },
  confirmButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    width: "50%",
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
  captchaView: {
    borderWidth: 1,
    height: 31,
    borderColor: "gray",
    padding: 2,
    width: 98,
    top: -15,
    alignItems: "center",
  },
  captchaInput: {
    padding: 6,
    width: 151,
    top: -4,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    height: 34,
  },
  input: { fontSize: 16 },
  alignItems: "center",
});

export default ConfirmOpenLinkModal;
