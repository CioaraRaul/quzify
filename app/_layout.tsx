import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { ColorModeProvider } from "./context/ColorModeContext";
import { UserProvider } from "./context/UserContext";

export default function RootLayout() {
  return (
    <ColorModeProvider>
      <UserProvider>
        <StatusBar hidden={false} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="quizify" />
        </Stack>
      </UserProvider>
    </ColorModeProvider>
  );
}
