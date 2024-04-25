import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import GenerateList from "../components/generateList";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { API_BASE_URL } from "../assets/api";
import ScanList from "../components/scanList";
export default function HistoryScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [scanData, setScanData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGenerateList, setShowGenerateList] = useState(false);
  const [showScanList, setShowScanList] = useState(true);
  const route = useRoute();
  const { token } = route.params;
  const toggleGenerateList = () => {
    setShowGenerateList(!showGenerateList);
    setShowScanList(false);
  };

  const toggleScanList = () => {
    setShowScanList(!showScanList);
    setShowGenerateList(false);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/generate/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchScanData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/scan/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setScanData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScanData();
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goBack} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>History</Text>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, showScanList && styles.activeButton]}
          onPress={toggleScanList}
          disabled={showScanList} // Disable button if showScanList is true
        >
          <Text style={styles.buttonText}>SCANNED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, showGenerateList && styles.activeButton]}
          onPress={toggleGenerateList}
          disabled={showGenerateList} // Disable button if showGenerateList is true
        >
          <Text style={styles.buttonText}>GENERATED</Text>
        </TouchableOpacity>
      </View>
      {showGenerateList && (
        <View style={styles.historyStyle}>
          <GenerateList data={data} />
        </View>
      )}

      {showScanList && (
        <View style={styles.historyStyle}>
          <ScanList data={scanData} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  sideHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B8F87",
    padding: 10,
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
  historyStyle: {
    flex: 1,
    paddingTop: 0,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#0C7D76",
    width: 153,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "gray",
    borderColor: "#0C7D76",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});
