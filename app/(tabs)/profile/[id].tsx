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
  const [userSupa, setUserSupa] = useState<User>();
  const { username, setUsername } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  useEffect(() => {
    async function GetUser() {
      if (username) {
        const user = await getDataByUsername(username);
        setUserSupa(user);
        setusernameProfile(user?.username || "");
      }
    }
    GetUser();
  }, [username]);

  // Change password only when Save is pressed!
  const handleSave = async () => {
    if (userSupa?.username && password) {
      await changePassword(userSupa.username, password);
    }
    setButtonEdit(false);
    setPassword(""); // Clear the password after save
  };

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    setUsername("");
    router.replace("/quizify");
  };

  // --- COLORS BASED ON MODE ---
  const isDark = colorMode === "dark";
  const colors = {
    background: isDark ? "#181a20" : "#F8F8F8",
    text: isDark ? "#fff" : "#333",
    card: isDark ? "#24262d" : "#fff",
    border: isDark ? "#444" : "#ccc",
    button: "#007bff",
    buttonText: "#fff",
    logout: "#f44336",
    inputBg: isDark ? "#24262d" : "#fff",
    inputText: isDark ? "#fff" : "#333",
    inputBorder: isDark ? "#444" : "#ccc",
    shadow: isDark ? "#000" : "#aaa",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={{ uri: user.profileImage }} style={styles.avatar} />

      <Text style={[styles.name, { color: colors.text }]}>
        {userSupa?.username || ""}
      </Text>

      {/* DARK MODE SWITCH */}
      <View style={styles.switchRow}>
        <Text style={{ color: colors.text, marginRight: 8 }}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleColorMode}
          trackColor={{ false: "#ccc", true: "#222" }}
          thumbColor={isDark ? "#007bff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
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
                {
                  borderColor: colors.inputBorder,
                  color: colors.inputText,
                  backgroundColor: colors.inputBg,
                },
              ]}
              value={usernameProfile}
              onChangeText={setusernameProfile}
              placeholder="New username"
              placeholderTextColor={isDark ? "#888" : "#999"}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              Change Password
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.inputBorder,
                  color: colors.inputText,
                  backgroundColor: colors.inputBg,
                },
              ]}
              value={password}
              onChangeText={setPassword}
              placeholder="New password"
              placeholderTextColor={isDark ? "#888" : "#999"}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: colors.button }]}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => setButtonEdit(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      )}

      {/* LOGOUT */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: colors.logout, marginTop: 24 },
        ]}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

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
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
    width: 180,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 16,
    marginBottom: 5,
  },
  saveButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
});
