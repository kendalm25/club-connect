// import { AppState } from "react-native";
// import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Alert, StyleSheet, View, AppState } from "react-native";

const supabaseUrl = "https://bchanmvutrhgcpzweeeo.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjaGFubXZ1dHJoZ2NwendlZWVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3NDQ2MTUsImV4cCI6MjAzMzMyMDYxNX0.01sY3GQjtV4VZWd9WC9AMoeC4aDRWUcIc3xk-kV-J-s";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anonymous Key");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
