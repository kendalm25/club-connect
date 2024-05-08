import React from "react";
import { Stack } from "expo-router";

const StacksLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Main page or index */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Set to true if you want a header for the main page
          title: "Proposals Home",
          headerBackTitle: "Back",
        }}
      />

      {/* Dynamic screen for individual proposal details */}
      <Stack.Screen
        name="[proposalId]"
        options={{
          headerShown: true,
          title: "Proposal Details", // Customize the title dynamically if needed
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default StacksLayout;
