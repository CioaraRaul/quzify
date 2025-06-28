import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  username: string | null;
  setUsername: (username: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  username: null,
  setUsername: () => {},
  logout: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsernameState] = useState<string | null>(null);

  useEffect(() => {
    // Load from AsyncStorage on mount
    AsyncStorage.getItem("username").then((storedUsername) => {
      if (storedUsername) setUsernameState(storedUsername);
    });
  }, []);

  const setUsername = async (name: string | null) => {
    setUsernameState(name);
    if (name) {
      await AsyncStorage.setItem("username", name);
    } else {
      await AsyncStorage.removeItem("username");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("username");
    setUsernameState(null);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, logout }}>
      {children}
    </UserContext.Provider>
  );
};
