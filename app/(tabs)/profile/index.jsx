import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Linking,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import clubImage from "../../../assets/club-image.png";
import Proposal from "../../../components/proposalPreview";
import defaultProfilePic from "../../../assets/defaultProfilePic.webp";
import { supabase } from "../../../lib/supabase";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const Tab = ({ title, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tab, isSelected && styles.selectedTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, isSelected && styles.selectedTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function ProfilePage() {
  const router = useRouter();
  const { session: sessionStr } = useLocalSearchParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubName, setClubName] = useState("");
  const [email, setEmail] = useState("");
  const [mission, setMission] = useState("");
  const [website, setWebsite] = useState("");
  const [clubProfilePic, setClubProfilePic] = useState("");
  const [selectedTab, setSelectedTab] = useState("ClubInfo");
  const [editMode, setEditMode] = useState(false);
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    if (sessionStr) {
      const sessionData = JSON.parse(decodeURIComponent(sessionStr));
      setSession(sessionData);
      setLoading(false);
    }
  }, [sessionStr]);

  useEffect(() => {
    if (session) {
      getProfile();
      fetchProposals();
      setLoading(false);
      setEmail(session?.user?.email);
    }
  }, [session]);

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
        setEmail(session?.user?.email);
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
  async function fetchProposals() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("club_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setProposals(data);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    mission,
    contact_email,
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        mission,
        contact_email,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setEditMode(false);
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Clear session and navigate to login or home page
      setSession(null);
      router.replace("/"); // Adjust the route to your login or home page
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Sign Out Error", error.message);
      }
    }
  }

  const handleGoToCreatePage = () => {
    const sessionData = encodeURIComponent(JSON.stringify(session));
    router.push(`/(tabs)/profile/createProposal?session=${sessionData}`);
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
      <View style={styles.profileHeader}>
        <View style={styles.picAndClubContainer}>
          <Image
            source={
              clubProfilePic ? { uri: clubProfilePic } : defaultProfilePic
            }
            style={styles.profilePic}
          />
          <Text style={styles.profileName}>{clubName}</Text>
        </View>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              value={clubName}
              onChangeText={setClubName}
              placeholder="Club Name"
            />
            <TextInput
              style={styles.input}
              value={clubProfilePic}
              onChangeText={setClubProfilePic}
              placeholder="Image URL"
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Club Email"
            />
            <TextInput
              style={styles.input}
              value={mission}
              onChangeText={setMission}
              placeholder="Mission Statement"
            />
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              placeholder="Website"
            />
            <TouchableOpacity
              onPress={() =>
                updateProfile({
                  username: clubName,
                  website,
                  avatar_url: clubProfilePic,
                  mission,
                  contact_email: email,
                })
              }
              disabled={loading}
              style={styles.updateBtn}
            >
              <Text>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setEditMode(!editMode)}
              style={styles.updateBtn}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setEditMode(!editMode)}
              style={styles.updateBtn}
            >
              <Text>Update Profile</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.tabBar}>
        <Tab
          title="Club Info"
          isSelected={selectedTab === "ClubInfo"}
          onPress={() => setSelectedTab("ClubInfo")}
        />
        <Tab
          title="Proposals"
          isSelected={selectedTab === "Proposals"}
          onPress={() => setSelectedTab("Proposals")}
        />
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        {selectedTab === "ClubInfo" && (
          <ScrollView
            style={styles.infoContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.contentHeader}>Mission Statement:</Text>
            <Text style={styles.contentText}>{mission}</Text>
            <Text style={styles.contentHeader}>Contact Information:</Text>
            <Text style={styles.contentText}>
              Email: {session?.user?.email}
            </Text>
            <Text style={styles.contentText}>
              Website:{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => Linking.openURL(website)}
              >
                {website}
              </Text>
            </Text>
          </ScrollView>
        )}
        {selectedTab === "Proposals" && (
          <View style={{ flex: 1 }}>
            <View style={styles.createBtnContainer}>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={handleGoToCreatePage}
              >
                <Text style={styles.btnText}>+ Create New Proposal</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {proposals.map((proposal) => (
                <TouchableOpacity key={proposal.id}>
                  <Proposal
                    title={proposal.title}
                    overview={proposal.overview}
                    type={proposal.types}
                    club={clubName}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View style={{ alignItems: "center", margin: 10 }}>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },

  profileHeader: {
    padding: 20,
    backgroundColor: "#ffffff",
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 10,
  },

  picAndClubContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },

  tabBar: {
    flexDirection: "row",
    marginTop: 0,
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
  },

  tab: {
    padding: 10,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#4a4e69",
  },

  tabText: {
    fontSize: 16,
    color: "#666",
  },

  selectedTabText: {
    color: "#4a4e69",
    fontWeight: "bold",
  },

  infoContent: {
    flex: 1,
    width: "100%",
    padding: 20,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 5,
    backgroundColor: "white",
  },

  contentContainer: {
    alignItems: "flex-start",
  },

  contentHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },

  contentText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#555",
  },

  linkText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#1e90ff",
    textDecorationLine: "underline",
  },

  createBtnContainer: {
    marginVertical: 15,
    alignItems: "center",
  },

  createBtn: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  updateBtn: {
    borderColor: "#4a4e69",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: "80%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  signOutBtn: {
    borderColor: "#4a4e69",
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  scrollView: {
    width: "100%",
  },

  btnText: {
    color: "#4a4e69",
    fontSize: 16,
    fontWeight: "bold",
  },

  leadershipContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  leaderCard: {
    alignItems: "center",
    marginRight: 20,
  },

  leaderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  leaderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  leaderRole: {
    fontSize: 14,
    color: "#666",
  },
});
