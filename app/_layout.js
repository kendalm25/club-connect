import React from "react";
import { Stack, Screen } from "expo-router";
import WelcomePage from "./index.jsx";
import HomePage from "./home/mainFeed.jsx";

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
      <Screen name="index" component={WelcomePage} />
      <Screen name="Home" component={HomePage} />
    </Stack>
  );
}
