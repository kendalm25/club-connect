import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "../../../lib/supabase";

import proposals from "../../../data/proposals.json";
import Proposal from "../../../components/proposalPreview";

const windowHeight = Dimensions.get("window").height;

export default function HomePage() {
  const router = useRouter();
  const { session: sessionStr } = useLocalSearchParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePressProposal = (proposalId) => {
    console.log("Navigating to proposal ID:", proposalId);
    router.push(`/mainFeed/${proposalId}`);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select("username, website, avatar_url, mission, contact_email")
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setClubName(data.username);
        setMission(data.mission);
        setEmail(data.contact_email);
        setWebsite(data.website);
        setClubProfilePic(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
    setLoading(false);
  }

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
});
