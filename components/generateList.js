import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import GenerateItem from "./generateItem";

const GenerateList = ({ data, loading }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderItem = ({ item }) => {
    return (
      <GenerateItem
        id={item.id}
        description={item.description}
        url={item.link}
        status={item.url_status}
        generationStatus={item.generation_status}
        qr_code={item.qr_code}
        created_at={item.created_at}
      />
    );
  };

  const sortedData = data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B8F87" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!loading && (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#0B8F87"]}
              tintColor={"#0B8F87"}
            />
          }
        />
      )}
      {!data ||
        (data.length === 0 && !loading && (
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>No items found</Text>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    marginTop: "50%",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noItemsText: {
    fontSize: 16,
  },
});

export default GenerateList;
