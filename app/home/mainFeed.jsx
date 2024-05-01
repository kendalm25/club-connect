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
import { useNavigation } from "expo-router";

import proposals from "../../data/proposals.json";
import Proposal from "../../components/proposalPreview";

const windowHeight = Dimensions.get("window").height;

const HomePage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const handlePress = (proposal) => {
    setSelectedProposal(proposal);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ClubConnect</Text>
      </View>

      <SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            {selectedProposal && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Proposed By:</Text>{" "}
                  {selectedProposal.club}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Title:</Text>{" "}
                  {selectedProposal.title}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Event Type(s):</Text>{" "}
                  {selectedProposal.type}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Overview:</Text>{" "}
                  {selectedProposal.overview}
                </Text>

                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Objectives:</Text>{" "}
                  {selectedProposal.objectives}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Audience:</Text>{" "}
                  {selectedProposal.audience}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Planned Date(s):</Text>{" "}
                  {selectedProposal.date}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Venue:</Text>{" "}
                  {selectedProposal.venue}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>
                    Aprrox. Number of Attendees:
                  </Text>{" "}
                  {selectedProposal.attendance}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Remaining Tasks:</Text>{" "}
                  {selectedProposal.tasks_remaining}
                </Text>

                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Benefits of Collaborating</Text>{" "}
                  {selectedProposal.collab_benefits}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Aprrox. Budget:</Text>{" "}
                  {selectedProposal.budget}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.boldText}>Similar Past Events:</Text>{" "}
                  {selectedProposal.similar_events}
                </Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.btnText}>Interested?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.btnText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </Modal>
      </SafeAreaView>

      <ScrollView style={styles.scrollView}>
        {proposals.map((proposal) => (
          <TouchableOpacity
            key={proposal.id}
            onPress={() => handlePress(proposal)}
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

  modalView: {
    marginTop: windowHeight * 0.1,
    // backgroundColor: "rgb(255, 242, 232)",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 5,
    borderColor: "#e63946",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: windowHeight * 0.85,
  },

  modalText: {
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "left",
  },

  boldText: {
    fontWeight: "bold",
  },

  btnContainer: {
    display: "flex",
    flexDirection: "column",
    // gap: 10,
    justifyContent: "center",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#4a4e69",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomePage;
