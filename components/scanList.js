import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }) => {
    const {
      id,
      link,
      link_status,
      malware_detected,
      malware_detected_tool,
      verify_qr_legitimacy,
      scanned_at,
      report,
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
        report={report}
        scanned_at={scanned_at}
      />
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const sortedData = data.sort(
    (a, b) => new Date(b.scanned_at) - new Date(a.scanned_at)
  );

  if (loading) {
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0B8F87" />

            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    );
  }

  if (!sortedData || sortedData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No items found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sortedData}
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
  loadingContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ScanList;
