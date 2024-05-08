import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigate } from "react-router-dom";
import { useRouter } from "react-router";
import { useLocalSearchParams } from "expo-router";
import proposals from "../../../data/proposals.json"; // Adjust to the correct relative path
import eventTypes from "../../../assets/eventColors";
const windowHeight = Dimensions.get("window").height;

const ProposalDetailsPage = () => {
  const { proposalId } = useLocalSearchParams();
  const numericProposalId = parseInt(proposalId, 10);
  console.log("proposal id is: ", proposalId);
  const proposal = proposals.find((p) => p.id === numericProposalId);
  console.log("proposal: ", proposal);
  const backgroundColors = proposal.type
    .map((t) => eventTypes[t] || "#fff")
    .join(", "); // Simple example of combining colors

  if (!proposal) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Proposal not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsScrollView}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{proposal.title}</Text>

          <Text style={styles.club}>
            <Text style={styles.label}>Proposed By:</Text> {proposal.club}
          </Text>
          <View style={styles.typeContainer}>
            {proposal.type.map((t, index) => (
              <Text
                key={index}
                style={[
                  styles.type,
                  { backgroundColor: eventTypes[t] || "#fff" },
                ]}
              >
                {t}
              </Text>
            ))}
          </View>
        </View>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Overview:</Text> {proposal.overview}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Planned Date(s):</Text> {proposal.date}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Objectives:</Text> {proposal.objectives}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Audience:</Text> {proposal.audience}
        </Text>

        <Text style={styles.infoText}>
          <Text style={styles.label}>Venue:</Text> {proposal.venue}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Approx. Number of Attendees:</Text>{" "}
          {proposal.attendance}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Remaining Tasks:</Text>{" "}
          {proposal.tasks_remaining}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Benefits of Collaborating:</Text>{" "}
          {proposal.collab_benefits}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Approx. Budget:</Text> {proposal.budget}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Similar Past Events:</Text>{" "}
          {proposal.similar_events}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Interested?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProposalDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray for a neutral background
    // paddingHorizontal: 15,
    // paddingVertical: 10,
  },

  header: {
    alignItems: "center",
    marginBottom: 0,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343a40", // Dark gray for titles
    marginBottom: 10,
    textAlign: "center",
  },

  club: {
    fontSize: 16,
    color: "#6c757d", // Secondary color for text
    marginBottom: 15,
    fontStyle: "italic",
  },

  typeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // Center types horizontally
    gap: 8,
    marginBottom: 20,
  },

  type: {
    backgroundColor: "#495057", // Darker background for tags
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  typeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600", // Semi-bold for text contrast
  },

  detailsScrollView: {
    backgroundColor: "#ffffff", // White card-like background
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 15,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Shadow for depth
  },

  infoText: {
    fontSize: 16,
    color: "#495057", // Darker gray for text
    marginBottom: 16,
    lineHeight: 24,
  },

  label: {
    fontWeight: "bold",
    color: "#212529", // Black color for emphasis
  },

  buttonContainer: {
    marginTop: 25,
    width: "100%",
    alignItems: "center",
  },

  actionButton: {
    backgroundColor: "#4a4e69", // Purple for contrast
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    // alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
