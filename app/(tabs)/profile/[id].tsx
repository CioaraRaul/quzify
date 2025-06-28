import { useColorMode } from "@/app/context/ColorModeContext";
import { useUser } from "@/app/context/UserContext";

import { User } from "@/interfaces/interface";
import { changePassword, getDataByUsername } from "@/services/data_supabase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const user = {
  name: "John Doe",
  profileImage: "https://randomuser.me/api/portraits/lego/1.jpg",
};

const Profile = () => {
  const [buttonEdit, setButtonEdit] = useState(false);
  const [usernameProfile, setusernameProfile] = useState(user.name);
  const [password, setPassword] = useState("");
  const [userSupa, setUserSupa] = React.useState<User>();
  const { username, setUsername } = useUser();
  const { darkMode, toggleDarkMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    async function GetUser() {
      const user = await getDataByUsername(username);
      setUserSupa(user);
    }
    GetUser();
  }, []);

  useEffect(() => {
    async function NewPassword() {
      if (userSupa?.username && password) {
        await changePassword(userSupa.username, password);
      }
    }
    NewPassword();
  }, [password]);

  const handleSave = () => {
    setButtonEdit(false);
  };

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    setUsername(""); // or set user to null depending on context logic
    router.replace("/quizify");
  };

  // --- COLORS BASED ON MODE ---
  const colors = {
    background: darkMode ? "#1a1a1a" : "#F8F8F8",
    text: darkMode ? "#fff" : "#333",
    card: darkMode ? "#222" : "#fff",
    border: darkMode ? "#444" : "#ccc",
    button: "#007bff",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: user.profileImage }} style={styles.avatar} />

      <Text style={[styles.name, { color: colors.text }]}>
        {userSupa?.username}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 16,
        }}
      >
        <Text style={{ color: colors.text, marginRight: 8 }}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      {buttonEdit ? (
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Change username
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.text },
              ]}
              value={userSupa?.username}
              onChangeText={setusernameProfile}
              placeholder="New username"
              placeholderTextColor={darkMode ? "#888" : "#999"}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Change Password
            </Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.border, color: colors.text },
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="New password"
              placeholderTextColor={darkMode ? "#888" : "#999"}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.button }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => setButtonEdit(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#f44336", marginTop: 24 }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

// ...styles are unchanged from yours!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  editContainer: {
    width: "100%",
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
});
