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

const windowHeight = Dimensions.get("window").height;

const ProposalDetailsPage = () => {
  const { proposalId } = useLocalSearchParams();
  const numericProposalId = parseInt(proposalId, 10);
  console.log("proposal id is: ", proposalId);
  const proposal = proposals.find((p) => p.id === numericProposalId);
  console.log("proposal: ", proposal);

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
        style={styles.detailsScrollView}
      >
        <Text style={styles.infoText}>
          <Text style={styles.label}>Proposed By:</Text> {proposal.club}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Title:</Text> {proposal.title}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Event Type(s):</Text> {proposal.type}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Overview:</Text> {proposal.overview}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Objectives:</Text> {proposal.objectives}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Audience:</Text> {proposal.audience}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Planned Date(s):</Text> {proposal.date}
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
    backgroundColor: "white",
  },

  // centeredContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "white",
  // },

  detailsScrollView: {
    padding: 20,
    // flex: 1,
    borderWidth: 2,
  },

  infoText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    lineHeight: 24,
  },
  label: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    gap: 10,
  },
  actionButton: {
    backgroundColor: "#4a4e69",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
