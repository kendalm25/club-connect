import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import { useRouter } from "expo-router";
import clubImage from "../../../assets/club-image.png";
import proposals from "../../../data/ssieProposals.json";
import Proposal from "../../../components/proposalPreview";
import clubData from "../../../data/clubData.json";
import defaultProfilePic from "../../../assets/defaultProfilePic.webp";
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

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("ClubInfo");
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={clubImage} style={styles.profilePic} />
        <Text style={styles.profileName}>{clubData[0].club_name}</Text>
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
            <Text style={styles.contentText}>
              {clubData[0].mission_statement}
            </Text>

            <Text style={styles.contentHeader}>Leadership:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.leadershipContainer}
            >
              {clubData[0].leaders.map((leader, index) => (
                <View key={index} style={styles.leaderCard}>
                  <Image
                    source={
                      leader.image ? { uri: leader.image } : defaultProfilePic
                    }
                    style={styles.leaderImage}
                  />
                  <Text style={styles.leaderName}>{leader.name}</Text>
                  <Text style={styles.leaderRole}>{leader.role}</Text>
                </View>
              ))}
            </ScrollView>

            <Text style={styles.contentHeader}>Contact Information:</Text>
            <Text style={styles.contentText}>Email: {clubData[0].email}</Text>
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL(clubData[0].website)}
            >
              Website: {clubData[0].website}
            </Text>
            <Text
              style={styles.linkText}
              onPress={() =>
                Linking.openURL(
                  `https://instagram.com/${clubData[0].instagram}`
                )
              }
            >
              Instagram: {clubData[0].instagram}
            </Text>

            <Text style={styles.contentHeader}>Join Us:</Text>
            <Text style={styles.contentText}>{clubData[0].join_info}</Text>
          </ScrollView>
        )}
        {selectedTab === "Proposals" && (
          <View style={{ flex: 1 }}>
            <View style={styles.createBtnContainer}>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/profile/createProposal",
                  })
                }
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
                    type={proposal.type}
                    club={proposal.club}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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

export default HomePage;
