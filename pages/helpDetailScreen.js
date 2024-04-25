import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HelpDetailScreen() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const route = useRoute();
  const { id, title, description } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sideHeader}>
        <TouchableOpacity onPress={goBack} style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/backIcon.png")}
            style={styles.logo2}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Help</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}> {title}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textDescription}> {description}</Text>
        </View>
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

    borderColor: "#0B8F87",
    borderWidth: 2,
    width: "80%",
    marginBottom: 20,
    marginTop: 20,
    padding: 20,
  },
  titleContainer: {
    marginBottom: 30,
    marginRight: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginLeft: 20,
    alignContent: "center",
  },
  textDescription: {
    fontSize: 20,
    textAlign: "justify",
  },
});
