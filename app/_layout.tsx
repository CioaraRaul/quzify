import { StatusBar } from "react-native";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={false}></StatusBar>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="quiz" />
      </Stack>
    </>
  );
}
