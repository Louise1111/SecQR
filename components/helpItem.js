import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const HelpItem = ({ id, title, description }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("HelpDetail", {
      id,
      title,
      description,
    });
  };

  return (
    <TouchableOpacity style={styles.container1} onPress={handlePress}>
      <Text style={styles.textContainer1}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container1: {
    padding: 20,
    borderWidth: 2,
    width: "90%",
    marginLeft: "5%",
    borderColor: "#0B8F87",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  textContainer1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default HelpItem;
