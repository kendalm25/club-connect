import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

import proposals from "../../../data/proposals.json";
import Proposal from "../../../components/proposalPreview";

const windowHeight = Dimensions.get("window").height;

const HomePage = () => {
  const router = useRouter();

  const handlePressProposal = (proposalId) => {
    console.log("Navigating to proposal ID:", proposalId);
    router.push(`/mainFeed/${proposalId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ClubConnect</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {proposals.map((proposal) => (
          <TouchableOpacity
            key={proposal.id}
            onPress={() => handlePressProposal(proposal.id)}
          >
            <Proposal
              title={proposal.title}
              overview={proposal.overview}
              type={proposal.type}
              club={proposal.club}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },

  header: {
    padding: 20,
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },

  scrollView: {
    marginVertical: 10,
  },
});

export default HomePage;
