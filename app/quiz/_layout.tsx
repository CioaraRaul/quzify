import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 14,
          paddingBottom: 4, // space for underline
        },
        tabBarActiveTintColor: "#000", // active tab text color
        tabBarInactiveTintColor: "#888", // inactive tab text color
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0, // no shadow on Android
        },
      }}
    >
      <Tabs.Screen
        name="[id]"
        options={{
          title: "Quiz Categories",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace("/")}>
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
                style={{ marginLeft: 15, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
