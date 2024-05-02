import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, Link } from "expo-router";

import clubFair from "../assets/club_fair.webp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginPage = () => {
  const navigation = useNavigation();

  const [welcome, setWelcome] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const showLogIn = () => {
    setLogIn(true);
    setSignUp(false);
    setWelcome(false);
  };

  const showSignUp = () => {
    setLogIn(false);
    setWelcome(false);
    setSignUp(true);
  };

  const showWelcome = () => {
    setWelcome(true);
    setLogIn(false);
    setSignUp(false);
  };

  if (welcome) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>ClubConnect</Text>
          <Image style={styles.image} source={clubFair} />
          <TouchableOpacity style={styles.button} onPress={showLogIn}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={showSignUp}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  } else if (logIn) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Log In</Text>
          <Link href={"/home/mainFeed"} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Log In</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.button} onPress={showWelcome}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else if (signUp) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Sign Up</Text>
          <Link href={"/home/mainFeed"} asChild>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.button} onPress={showWelcome}>
            <Text style={styles.btnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Clean white background
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 32, // Reduced size for more modern appearance
    color: "#333",
    fontWeight: "700", // Slightly lighter weight
    marginBottom: 20,
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 20, // Increased border radius for a more modern look
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4a4e69", // Consistent theme color
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25, // More pronounced rounded corners
    marginBottom: 10,
    width: windowWidth * 0.6,
    elevation: 3, // Subtle shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6, // Smoother shadow
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
