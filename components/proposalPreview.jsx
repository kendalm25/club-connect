import React from "react";
import { View, Text, StyleSheet } from "react-native";
import eventColors from "../assets/eventColors";
import eventTypes from "../assets/eventColors";

const Proposal = ({ title, overview, type, club }) => {
  const backgroundColors = type.map((t) => eventTypes[t] || "#fff").join(", "); // Simple example of combining colors
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.club}>{club}</Text>
      <Text style={styles.overview}>{overview}</Text>
      <View style={styles.typeContainer}>
        {type.map((t, index) => (
          <Text
            key={index}
            style={[styles.type, { backgroundColor: eventTypes[t] || "#fff" }]}
          >
            {t}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default Proposal;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#4a4e69",
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

  typeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
  },
  type: {
    fontSize: 12,
    fontStyle: "italic",
    padding: 5,
    alignSelf: "flex-start",
    borderRadius: 5,
    borderWidth: 2,
  },
});
