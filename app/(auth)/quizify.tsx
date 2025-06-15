import { fetchUsers } from "@/services/data_supabase";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("register")}
      >
        <Text style={styles.buttonText}>Go to Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("forgotPassword")}
      >
        <Text style={styles.buttonText}>Go to Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => router.push("login")}
      >
        <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    color: "#222",
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "#007bff",
  },
  loginButtonText: {
    fontWeight: "700",
  },
});
