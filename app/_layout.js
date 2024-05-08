import React from "react";
import { Stack, Screen } from "expo-router";
import WelcomePage from "./index.jsx";
import HomePage from "./(tabs)/mainFeed/index.jsx";

export default function StackLayout() {
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
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
