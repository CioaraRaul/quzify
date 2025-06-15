import { User } from "@/interfaces/interface";
import { fetchUsers, getUserPassword } from "@/services/data_supabase";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPassword() {
  const router = useRouter();
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const [inputUser, setInputUser] = React.useState<string>("");

  useEffect(() => {
    async function GetUsers() {
      const users = await fetchUsers();
      if (users) {
        setAllUsers(users);
      }
    }
    GetUsers();
  }, []);

  const usersExists = (username: string): boolean => {
    const userExists = allUsers.find((user) => user.username === username);
    return !userExists;
  };

  const handleSubmit = async () => {
    const userNotFound = usersExists(inputUser);
    if (userNotFound) {
      Alert.alert("Error", "User does NOT exist");
    } else {
      const userPass = await getUserPassword(inputUser);
      Alert.alert("Password", `The password is: ${userPass}`);
      router.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.description}>
        Enter your username to receive the password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={inputUser}
        onChangeText={setInputUser}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Retrieve Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
