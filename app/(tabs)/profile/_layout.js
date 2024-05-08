import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const stacksLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="createProposal"
        options={{
          headerShown: true,
          title: "Create Proposal",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default stacksLayout;
