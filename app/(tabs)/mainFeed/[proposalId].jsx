import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../lib/supabase";
import eventTypes from "../../../assets/eventColors";

const windowHeight = Dimensions.get("window").height;

const ProposalDetailsPage = () => {
  const { proposalId } = useLocalSearchParams();
  const [proposal, setProposal] = useState(null);
  const [clubName, setClubName] = useState("");
  const [checkedItems, setCheckedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    console.log("Fetching proposal with ID:", proposalId);
    fetchProposal(proposalId);
  }, [proposalId]);

  const fetchProposal = async (id) => {
    try {
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching proposal:", error);
        throw error;
      }

      setProposal(data);
      setCheckedItems((data.tasks_remaining || []).map(() => false));
      fetchClubName(data.club_id);
    } catch (error) {
      Alert.alert("Error fetching proposal", error.message);
    }
  };

  const fetchClubName = async (clubId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", clubId)
        .single();

      if (error) {
        console.error("Error fetching club name:", error);
        throw error;
      }

      setClubName(data.username);
    } catch (error) {
      Alert.alert("Error fetching club name", error.message);
    }
  };

  const handleCheck = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const handleSubmit = () => {
    // Implement the logic to send the interest details to the proposal club
    console.log("Club Name:", clubName);
    console.log("Checked Tasks:", checkedItems);
    console.log("Additional Info:", additionalInfo);
    setModalVisible(false);
  };

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

          {clubName && (
            <Text style={styles.club}>
              <Text style={styles.label}>Proposed By:</Text> {clubName}
            </Text>
          )}
          {proposal.types && (
            <View style={styles.typeContainer}>
              {proposal.types.map((t, index) => (
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
          )}
        </View>
        {proposal.overview && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Overview:</Text> {proposal.overview}
          </Text>
        )}
        {proposal.start_date && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Event Start Date:</Text>{" "}
            {proposal.start_date}
          </Text>
        )}
        {proposal.end_date && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Event End Date:</Text>{" "}
            {proposal.end_date}
          </Text>
        )}
        {proposal.objectives && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Objectives:</Text> {proposal.objectives}
          </Text>
        )}
        {proposal.audience && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Audience:</Text> {proposal.audience}
          </Text>
        )}
        {proposal.venue && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Venue:</Text> {proposal.venue}
          </Text>
        )}
        {proposal.attendance && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Approx. Number of Attendees:</Text>{" "}
            {proposal.attendance}
          </Text>
        )}
        {proposal.tasks_remaining && (
          <>
            <Text style={styles.tasksLabel}>Remaining Tasks:</Text>
            <View style={styles.tasksContainer}>
              {proposal.tasks_remaining.map((task, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  {"\u2022"} {task}
                </Text>
              ))}
            </View>
          </>
        )}
        {proposal.collab_benefits && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Benefits of Collaborating:</Text>{" "}
            {proposal.collab_benefits}
          </Text>
        )}
        {proposal.budget && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Approx. Budget:</Text> ${proposal.budget}
          </Text>
        )}
        {proposal.similar_events && (
          <Text style={styles.infoText}>
            <Text style={styles.label}>Similar Past Events:</Text>{" "}
            {proposal.similar_events}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Interested?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.label}>Event Proposed By:</Text>
            <Text style={styles.club}>{clubName} </Text>

            <Text style={styles.modalText}>Express Your Interest</Text>

            {proposal.tasks_remaining && (
              <>
                <Text style={styles.modalLabel}>
                  Which tasks is your club able to help out with?
                </Text>
                <View style={styles.tasksContainer}>
                  {proposal.tasks_remaining.map((task, index) => (
                    <CheckBox
                      key={index}
                      title={task}
                      checked={checkedItems[index]}
                      onPress={() => handleCheck(index)}
                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                    />
                  ))}
                </View>
              </>
            )}
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Additional Information"
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
              multiline
            />
            <View style={styles.modalButtonContainer}>
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#FF6347"
              />
              <Button title="Send" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProposalDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // Light gray for a neutral background
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

  tasksContainer: {
    alignItems: "left",
  },

  tasksLabel: {
    fontWeight: "bold",
    color: "#212529", // Black color for emphasis
    fontSize: 16,
    lineHeight: 24,
  },

  tasksContainer: {
    marginBottom: 10,
  },

  bulletPoint: {
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 24,
  },

  checkboxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    margin: 0,
    padding: 5,
    alignItems: "left",
  },

  checkboxText: {
    fontSize: 16,
    fontWeight: "400",
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: "flex",
    gap: 10,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },

  textArea: {
    height: 80,
  },

  modalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
