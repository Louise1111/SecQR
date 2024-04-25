import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import ScanItem from "./scanItem";

const ScanList = ({ data, onRefresh }) => {
  const renderItem = ({ item }) => {
    const {
      id,
      link,
      link_status,
      malware_detected,
      malware_detected_tool,
      verify_qr_legitimacy,
    } = item;
    const cleanedLink = link.includes("###") ? link.split("###")[0] : link;
    return (
      <ScanItem
        id={id}
        url={cleanedLink}
        status={link_status}
        malware_detected={malware_detected}
        malware_detected_tool={malware_detected_tool}
        verify_qr_legitimacy={verify_qr_legitimacy}
      />
    );
  };

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No items found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default ScanList;
