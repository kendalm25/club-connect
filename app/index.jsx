import React, { useState, useEffect } from "react";
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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";
import clubFair from "../assets/club_fair.webp";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LoginPage = () => {
  const router = useRouter();
  const [welcome, setWelcome] = useState(true);
  const [logIn, setLogIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [clubName, setClubName] = useState("");
  const [password, setPassword] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderTitle, setLeaderTitle] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [clubMission, setClubMission] = useState("");
  const [clubProfilePic, setClubProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  async function fetchClubs() {
    const { data, error } = await supabase.from("clubs").select("name");
    if (error) {
      Alert.alert(error.message);
    } else {
      const clubItems = data.map((club) => ({
        label: club.name,
        value: club.name,
      }));
      setItems(clubItems);
    }
  }

  async function signInWithClubName() {
    setLoading(true);
    const { data, error } = await supabase
      .from("clubs")
      .select("email")
      .eq("name", selectedClub)
      .single();

    if (error) {
      Alert.alert(error.message);
    } else {
      const email = data.contact_email;
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        Alert.alert(signInError.message);
      } else {
        Alert.alert("Login successful");
        router.push(`/(tabs)/mainFeed`);
      }
    }
    setLoading(false);
  }

  async function signUpWithClubDetails() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    } else {
      const userId = data.user.id;
      const newLeaders = [...leaders, { name: leaderName, title: leaderTitle }];
      const { error: insertError } = await supabase.from("clubs").insert([
        {
          id: userId,
          name: clubName,
          contact_email: email,
          mission: clubMission,
          profile_picture_url: clubProfilePic,
          leaders: newLeaders,
        },
      ]);

      if (insertError) {
        Alert.alert(insertError.message);
      } else {
        Alert.alert("Account created successfully!");
        router.push(`/(tabs)/mainFeed`);
      }
    }

    setLoading(false);
  }

  const addLeader = () => {
    setLeaders([...leaders, { name: leaderName, title: leaderTitle }]);
    setLeaderName("");
    setLeaderTitle("");
  };

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
    setClubName("");
    setPassword("");
    setLeaderName("");
    setLeaderTitle("");
    setClubMission("");
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
          <DropDownPicker
            open={open}
            value={selectedClub}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedClub}
            setItems={setItems}
            placeholder="Select your club"
            containerStyle={{ width: windowWidth * 0.8, marginBottom: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={signInWithClubName}>
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
          <TextInput
            style={styles.input}
            placeholder="Club Name"
            value={clubName}
            onChangeText={setClubName}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Mission Statement"
            value={clubMission}
            onChangeText={setClubMission}
          />
          <TextInput
            style={styles.input}
            placeholder="Profile Picture URL"
            value={clubProfilePic}
            onChangeText={setClubProfilePic}
          />
          <TextInput
            style={styles.input}
            placeholder="Leader Name"
            value={leaderName}
            onChangeText={setLeaderName}
          />
          <TextInput
            style={styles.input}
            placeholder="Leader Title"
            value={leaderTitle}
            onChangeText={setLeaderTitle}
          />
          <TouchableOpacity style={styles.button} onPress={addLeader}>
            <Text style={styles.btnText}>Add Leader</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={signUpWithClubDetails}
          >
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
