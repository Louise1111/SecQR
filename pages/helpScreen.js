import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HelpList from "../components/helpList";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function HelpScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://be9a-143-44-184-178.ngrok-free.app/api/help"
      );
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

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goToHomeScreen} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0B8F87" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <View style={styles.helpStyle}>
          <HelpList data={data} />
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
  helpStyle: {
    flex: 1,
    paddingTop: 0,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
