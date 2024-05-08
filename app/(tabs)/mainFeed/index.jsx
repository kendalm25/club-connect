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
    backgroundColor: "#f0f0f0", // Soft gray background for a light theme
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
  modalView: {
    marginTop: windowHeight * 0.05,
    // marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 20,
    height: windowHeight * 0.95,
  },

  // modalContent: {
  //   maxHeight: windowHeight * 0.8,
  // },

  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    lineHeight: 24,
  },

  boldText: {
    fontWeight: "bold",
  },

  btnContainer: {
    marginTop: 20,
    width: "100%",
    gap: 7,
  },

  closeButton: {
    backgroundColor: "#4a4e69",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    marginVertical: 10,
  },
});

export default HomePage;
