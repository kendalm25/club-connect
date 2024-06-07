import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  Alert,
  TextInput,
  AppState,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import clubFair from "../assets/club_fair.webp";
import { Session } from "@supabase/supabase-js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginPage = () => {
  const router = useRouter();
  const [welcome, setWelcome] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [clubName, setClubName] = useState("");
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("signIn data: ", data);
      console.log("signIn error: ", error);

      if (error) {
        Alert.alert(error.message);
      } else if (data.session) {
        Alert.alert("Login successful");
        router.push(`/(tabs)/mainFeed`);
      } else {
        Alert.alert("Login failed");
      }
    } catch (error) {
      Alert.alert("An unexpected error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithClubDetails() {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("signUp data: ", data);
      console.log("signUp error: ", error);

      if (error) {
        Alert.alert(error.message);
      } else if (data.user) {
        const userId = data.user.id;
        const { error: insertError } = await supabase.from("clubs").insert([
          {
            id: userId,
            name: clubName,
            email: email,
          },
        ]);

        console.log("club insert error: ", insertError);

        if (insertError) {
          Alert.alert(insertError.message);
        } else {
          Alert.alert("Account created successfully!");
          router.push(`/(tabs)/mainFeed`);
        }
      } else {
        Alert.alert("Sign up failed");
      }
    } catch (error) {
      Alert.alert("An unexpected error occurred.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    } else {
      Alert.alert("Login successful");
      router.push(`/(tabs)/mainFeed`);
    }
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    } else {
      router.push(`/(tabs)/mainFeed`);
    }
    setLoading(false);
  }

  const showLogIn = () => {
    setLogIn(true);
    setSignUp(false);
    setWelcome(false);
    setPassword("");
  };

  const showSignUp = () => {
    setLogIn(false);
    setWelcome(false);
    setSignUp(true);
    setEmail("");
    setPassword("");
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={signInWithEmail}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
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
          {/* <TextInput
            style={styles.input}
            placeholder="Club Name"
            value={clubName}
            onChangeText={setClubName}
          /> */}
          <TextInput
            style={styles.input}
            placeholder="Club Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={signUpWithEmail}>
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
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
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 32,
    color: "#333",
    fontWeight: "700",
    marginBottom: 20,
  },
  image: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4a4e69",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 10,
    width: windowWidth * 0.6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: windowWidth * 0.8,
  },
});
