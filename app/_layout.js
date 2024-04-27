import React from "react";
import { Stack, Screen } from "expo-router";
import WelcomePage from "./index.jsx";
import HomePage from "./home.jsx";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false,
      }}
    >
      <Screen name="Welcome" component={WelcomePage} />
      <Screen name="Home" component={HomePage} />
    </Stack>
  );
}
