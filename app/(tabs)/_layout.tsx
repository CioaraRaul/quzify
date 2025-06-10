import { Tabs } from "expo-router";

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
      <Tabs.Screen name="index" options={{ title: "General Quiz App" }} />
      <Tabs.Screen name="quiz" options={{ title: "Quiz history" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile settings" }} />
    </Tabs>
  );
}
