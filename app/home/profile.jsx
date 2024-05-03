import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import clubImage from "../../assets/club-image.png";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={clubImage} style={styles.profilePic} />
        <Text style={styles.profileName}>
          Stanford Students in Entertainment
        </Text>
        {/* <Text style={styles.profilePID}>Club Id: 123</Text> */}
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
      <View style={styles.content}>
        {selectedTab === "ClubInfo" && (
          <Text>Club Info (email, website, instagram)</Text>
        )}
        {selectedTab === "Proposals" && (
          <Text>List if all proposals (number of total proposals)</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Soft gray background to match the main feed
  },

  profileHeader: {
    // width: "90%",
    // alignItems: "center",
    // paddingVertical: 20,
    // paddingHorizontal: 5,
    // borderRadius: 10,
    // marginBottom: 5,
    // backgroundColor: "#ffffff",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 4,
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
    borderRadius: 60, // Full circle
    marginBottom: 10,
  },

  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Darker font color
  },

  tabBar: {
    flexDirection: "row",
    marginTop: 0,
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 6,
    // elevation: 4,
  },

  tab: {
    padding: 10,
    flexGrow: 1, // Equal width for all tabs
    alignItems: "center",
    justifyContent: "center",
  },

  selectedTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#4a4e69", // Primary color for emphasis
  },

  tabText: {
    fontSize: 16,
    color: "#666", // Consistent text color
  },

  selectedTabText: {
    color: "#4a4e69", // Highlight color
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    width: "90%",
    padding: 20,
    marginTop: 5,
    // backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 5,
  },
});

export default HomePage;
