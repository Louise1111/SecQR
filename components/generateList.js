import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { DUMMY_DATA_HISTORY } from "../data/dummyData";
import GenerateItem from "./generateItem";

const GenerateList = () => {
  const renderItem = ({ item }) => {
    return (
      <GenerateItem
        id={item.id}
        description={item.description}
        url={item.url}
        status={item.status}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={DUMMY_DATA_HISTORY}
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
  container1: {
    padding: 20,
    borderTopWidth: 3,
    borderTopColor: "#CCCCCC",
    borderBottomWidth: 1,
    borderBottomColor: "#0B8F87",
  },
  textContainer1: {
    fontSize: 16,
    marginLeft: 25,
  },
});
export default GenerateList;
