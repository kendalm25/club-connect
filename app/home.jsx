import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the About Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default HomePage;
