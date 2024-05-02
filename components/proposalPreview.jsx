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
    backgroundColor: "#ffffff", // Bright background to enhance the floating effect
    borderRadius: 16, // More pronounced rounded corners
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
    elevation: 10, // Increased elevation for a more pronounced shadow on Android
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5, // Adds spacing between title and club name
  },
  club: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666666", // Soften the color for a more subtle look
    marginBottom: 5, // Adds spacing between club name and overview
  },
  overview: {
    fontSize: 15,
    marginBottom: 10, // Adds spacing before the type tags
  },
  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows types to wrap to the next line if space is insufficient
    gap: 6,
  },
  type: {
    borderRadius: 15, // More rounded edges for type tags
    borderWidth: 0, // No border for a cleaner look
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6, // Space between type tags
    marginBottom: 6, // Space between rows of tags if wrapped
  },
  typeText: {
    color: "#ffffff", // White text for better readability on colored backgrounds
    fontSize: 12,
  },
});
