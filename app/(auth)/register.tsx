import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Register() {
  const router = useRouter();
  return (
    <View>
      <View>
        <Text>User</Text>
        <input type="text" />
      </View>
      <View>
        <Text>Password</Text>
        <input type="password" />
      </View>
      <button onClick={() => router.push("/")}>Register</button>
    </View>
  );
}
