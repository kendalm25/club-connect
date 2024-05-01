import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";

import proposals from "../../data/proposals.json";
import Proposal from "../../components/proposalPreview";

const HomePage = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ClubConnect</Text>
      </View>

      <View>
        <Text> filter section </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {proposals.map((proposal) => (
          <TouchableOpacity>
            <Proposal
              key={proposal.id}
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
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },

  header: {
    marginTop: 5,
    // backgroundColor: "green",
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
});

export default HomePage;
