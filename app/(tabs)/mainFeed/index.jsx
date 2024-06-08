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
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../../lib/supabase";
import Proposal from "../../../components/proposalPreview";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [proposals, setProposals] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [clubName, setClubName] = useState("");

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
        <Text style={styles.headerText}>ClubConnect</Text>
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
});
