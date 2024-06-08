import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Button,
  Switch,
} from "react-native";
import Modal from "react-native-modal";
import { useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import Proposal from "../../../components/proposalPreview";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, []);

  async function fetchProposals() {
    try {
      setLoading(true);
      console.log("Fetching proposals...");
      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching proposals:", error);
        throw error;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, username");

      if (profilesError) {
        throw profilesError;
      }
      setProfiles(profiles);

      console.log("Fetched Proposals:", data);
      setProposals(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handlePressProposal = (proposalId) => {
    console.log("Navigating to proposal ID:", proposalId);
    router.push(`/mainFeed/${proposalId}`);
  };

  const getClubName = (clubId) => {
    const profile = profiles.find((profile) => profile.id === clubId);
    return profile ? profile.username : "Unknown Club";
  };

  const handleToggleSwitch = () => {
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a4e69" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="information-circle-outline"
            size={27}
            color="#4a4e69"
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>ClubConnect</Text>

        <TouchableOpacity onPress={() => fetchProposals()}>
          <Ionicons name="refresh" size={24} color="#4a4e69" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {proposals.length === 0 ? (
          <Text style={styles.noProposalsText}>No proposals found.</Text>
        ) : (
          proposals.map((proposal) => (
            <TouchableOpacity
              key={proposal.id}
              onPress={() => handlePressProposal(proposal.id)}
            >
              <Proposal
                title={proposal.title}
                overview={proposal.overview}
                type={proposal.types || []} // Ensure types is always an array
                club={getClubName(proposal.club_id)}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Community Norms</Text>
            <Text style={styles.normsText}>
              Thank you for using ClubConnect!
            </Text>
            <Text style={styles.normsText}>
              Please adhere to the following community norms to ensure a
              collaborative and productive environment: {"\n"}
            </Text>

            <Text style={styles.normsText}>
              1. Clubs should propose no more than three proposals per week.
            </Text>
            <Text style={styles.normsText}>
              2. Proposals should be genuine and aimed at fostering
              collaboration with other organizations.
            </Text>
            <Text style={styles.normsText}>
              3. Proposals should not be used merely to advertise upcoming
              events.
            </Text>
            <Text style={styles.normsText}>
              4. Ensure that your proposals have clear objectives and benefits
              for potential collaborators.
            </Text>
            <Text style={styles.normsText}>
              5. Be respectful and considerate in all your interactions with
              other clubs and organizations.
            </Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    justifyContent: "space-between",
    flexDirection: "row",
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
  infoButton: {
    fontSize: 24,
    color: "#4a4e69",
    fontWeight: "bold",
  },
  scrollView: {
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  noProposalsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalView: {
    width: "95%",
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  normsText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});
