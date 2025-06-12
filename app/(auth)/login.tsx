import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { fetchUsers } from "@/services/data_supabase";

export default function LoginScreen() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const user = await fetchUsers();
      console.log(user);
    }
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Login Screen</Text>
      <Button
        title="Go to Create Account"
        onPress={() => router.push("register" as const)}
      />
      <Button
        title="Go to Forgot Password"
        onPress={() => router.push("forgotPassword" as const)}
      />
      <Button
        title="Login (Go to App)"
        onPress={() => router.replace("home" as const)}
      />
    </View>
  );
}
