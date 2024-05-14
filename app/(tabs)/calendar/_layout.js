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
        }}
      />
    </Stack>
  );
};

export default StacksLayout;
