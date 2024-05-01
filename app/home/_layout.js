import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="mainFeed"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="newspaper-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Club Profile",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
