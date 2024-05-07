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
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  club: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666666",
    marginBottom: 5,
  },

  overview: {
    fontSize: 15,
    marginBottom: 10,
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  type: {
    borderRadius: 15,
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },

  typeText: {
    color: "#ffffff",
    fontSize: 12,
  },
});
