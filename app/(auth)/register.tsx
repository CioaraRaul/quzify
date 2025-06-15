import { User } from "@/interfaces/interface";
import { createUserProfile, fetchUsers } from "@/services/data_supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For showing validation error
  const [allUsers, setAllUsers] = React.useState<User[]>([]);

  useEffect(() => {
    async function GetUsers() {
      const users = await fetchUsers();
      console.log(users);
      if (users) {
        setAllUsers(users);
      } else {
        setAllUsers([]);
      }
    }
    GetUsers();
  }, []);

  const registerAccountToSupabase = () => {
    // Check for empty username or password first
    if (username.length === 0 || password.length === 0) {
      setError("Please enter both username and password.");
      return;
    }

    // Check if username already exists in allUsers
    const alreadyUser = allUsers.find((user) => user.username === username);

    if (alreadyUser) {
      setError("Username already exists. Please choose another one.");
      return;
    }

    // If all checks pass, clear error and create user
    setError("");

    createUserProfile({ user: username, password: password });
    console.log("Registered:", username, password);

    router.push("/"); // navigate after successful registration
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>User</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={registerAccountToSupabase}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 40,
    color: "#222",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
