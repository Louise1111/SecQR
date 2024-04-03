import { TouchableOpacity } from "react-native-gesture-handler";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const HelpItem = ({ id, title, description }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container1}
      onPress={() =>
        navigation.navigate("HelpDetail", {
          id,
          title,
          description,
        })
      }
    >
      <Text style={styles.textContainer1}> {title}</Text>
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
    alignContent: "center",
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
    marginLeft: 25,
  },
});
export default HelpItem;
