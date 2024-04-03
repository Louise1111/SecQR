import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HistoryDetailScreen() {
  const navigation = useNavigation();

  const goToHistoryScreen = () => {
    navigation.navigate("History");
  };

  const route = useRoute();
  const { historyId, description, url, status } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity
          onPress={goToHistoryScreen}
          style={styles.logoContainer}
        >
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Details</Text>
        </View>
      </View>

      <View style={styles.details}>
        <Text> id : {historyId}</Text>
        <Text> description : {description}</Text>
        <Text> url : {url}</Text>
        <Text> status : {status}</Text>
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
    alignItems: "center",
    borderColor: "#0B8F87",
    borderWidth: 2,
    width: "80%",
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
  },
});
