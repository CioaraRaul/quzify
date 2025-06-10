import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <>
        <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 20 }}>
          Forgot Password Screen
        </Text>
        <View style={{ display: "flex", gap: 12 }}>
          <input type="password" />
          <button onClick={() => router.push("/")}>New password</button>
        </View>
      </>
    </View>
  );
}
