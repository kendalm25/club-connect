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
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText} onPress={showLogIn}>
              Log In
            </Text>
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
        <Text> Log In Page </Text>
        <Link href={"/home/mainFeed"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.button} onPress={showWelcome}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  } else if (signUp) {
    return (
      <SafeAreaView style={styles.container}>
        <Text> Sign Up Page </Text>

        <Link href={"/home/mainFeed"} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button} onPress={showWelcome}>
          <Text style={styles.btnText}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
    padding: 20,
  },

  header: {
    fontSize: 40,
    color: "#4a4e69",
    fontWeight: "800",
    marginBottom: 20,
  },

  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 10,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#e63946",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
    width: windowWidth * 0.6,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});
