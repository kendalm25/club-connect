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
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerBackTitle: "Back",
        }}
      />

      <Stack.Screen
        name="[proposalId]"
        options={{
          headerShown: true,
          title: "",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default StacksLayout;
