import React from "react";
import { FlatList, RefreshControl, View, StyleSheet } from "react-native";
import HelpItem from "./helpItem";

const HelpList = ({ data, onRefresh }) => {
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
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Convert id to string for key extraction
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={false} // Set refreshing to true when refreshing
            onRefresh={onRefresh} // Pass the onRefresh function received as a prop
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HelpList;
