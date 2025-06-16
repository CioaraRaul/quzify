import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { UserProvider } from "./context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar hidden={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="quizify" />
        {/* Add more screens here if needed */}
      </Stack>
    </UserProvider>
  );
}
