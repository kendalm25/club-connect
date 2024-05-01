import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "expo-router";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ClubConnect</Text>
      </View>

      <View>
        <Text> Club Profile Page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },

  header: {
    marginTop: 5,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },

  headerText: {
    fontSize: 40,
    color: "#4a4e69",
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default HomePage;
