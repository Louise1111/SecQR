import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import GenerateItem from "./generateItem";

const GenerateList = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <GenerateItem
        id={item.id}
        description={item.description}
        url={item.link}
        status={item.url_status}
        generationStatus={item.generation_status}
        qr_code={item.qr_code}
      />
    );
  };

  if (!data || data.length === 0) {
    // If data is empty, display a message
    return (
      <View style={styles.container1}>
        <Text style={styles.textContainer1}>No items found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false} // You can set this to true to show a loading indicator when refreshing
            onRefresh={() => console.log("Refreshing...")}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingRight: 20,
  },
  textContainer1: {
    fontSize: 16,
  },
});

export default GenerateList;
