import { FlatList, RefreshControl } from "react-native-gesture-handler";
import GenerateItem from "./generateItem";
import { DUMMY_DATA_HELP } from "../data/helpList";
import { DUMMY_DATA_HISTORY } from "../data/dummyData";
import { View, StyleSheet } from "react-native";
import HelpItem from "./helpItem";

const HelpList = () => {
  const renderItem = ({ item }) => {
    return (
      <HelpItem
        id={item.id}
        title={item.title}
        description={item.description}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={DUMMY_DATA_HELP}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("Refreshing...")}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer1: {
    fontSize: 16,
    marginLeft: 25,
  },
});
export default HelpList;
