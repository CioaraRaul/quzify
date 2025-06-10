import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // You can set this to true if you want native headers
        animation: "fade", // Optional: adds smooth fade transitions
      }}
    />
  );
}
