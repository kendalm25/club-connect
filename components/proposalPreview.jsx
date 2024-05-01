import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Proposal = ({ title, overview, type, club }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.club}>{club}</Text>
      <Text style={styles.overview}>{overview}</Text>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
};

export default Proposal;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  club: {
    fontSize: 12,
    fontStyle: "italic",
  },
  overview: {
    fontSize: 14,
  },
  type: {
    fontSize: 12,
    fontStyle: "italic",
  },
});
