import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
// import { REACT_APP_SUPABASE_URL, REACT_APP_ANON_KEY } from "@env";

const supabaseUrl = "https://mcijiememqpbkcjxsjsi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaWppZW1lbXFwYmtjanhzanNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTc1MjYsImV4cCI6MjAzMzIzMzUyNn0.3FncZ-lzR3nTZecPjqnTJK89VWse6z2iQM1TA3efMnc";

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
