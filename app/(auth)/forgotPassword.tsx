import { User } from "@/interfaces/interface";
import { fetchUsers, getUserPassword } from "@/services/data_supabase";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
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
  const [password, setPassword] = React.useState<string | null>(null);

  useEffect(() => {
    async function GetUsers() {
      const users = await fetchUsers();
      if (users) {
        setAllUsers(users);
      }
    }
    GetUsers();
  }, []);

  const userExists = (username: string): boolean => {
    return !!allUsers.find((user) => user.username === username.trim());
  };

  const handleSubmit = async () => {
    setPassword(null); // Clear previous result
    const found = userExists(inputUser);
    if (!found) {
      setPassword("User does NOT exist!");
    } else {
      const userPass = await getUserPassword(inputUser.trim());
      setPassword(`The password is: ${userPass}`);
      setTimeout(() => {
        router.push("/login");
      }, 4000); // 4 seconds
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

      {password && <Text style={styles.passwordText}>{password}</Text>}
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
  passwordText: {
    marginTop: 24,
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d6a4f",
    textAlign: "center",
  },
});
