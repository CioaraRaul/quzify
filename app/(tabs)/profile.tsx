import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const user = {
  name: "John Doe",
  profileImage: "https://randomuser.me/api/portraits/lego/1.jpg", // neutral avatar
};

const Profile = () => {
  const [buttonEdit, setButtonEdit] = useState(false);
  const [username, setUsername] = useState(user.name);
  const [password, setPassword] = useState("");

  const handleSave = () => {
    setButtonEdit(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.avatar} />

      <Text style={styles.name}>{username}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      {buttonEdit ? (
        <View style={styles.editContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Change Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="New username"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Change Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="New password"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setButtonEdit(true)}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
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
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
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
    borderColor: "#ccc",
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
