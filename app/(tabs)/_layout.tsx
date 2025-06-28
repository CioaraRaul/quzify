import { useColorMode } from "@/app/context/ColorModeContext";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const { colorMode } = useColorMode();
  const tabBarBg = colorMode === "dark" ? "#18181b" : "#fff";
  const activeColor = colorMode === "dark" ? "#fff" : "#000";
  const inactiveColor = colorMode === "dark" ? "#aaa" : "#888";

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 14,
          paddingBottom: 4,
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home/[index]"
        options={{ title: "General Quiz App" }}
      />
      <Tabs.Screen name="quiz/[quiz]" options={{ title: "Quiz history" }} />
      <Tabs.Screen
        name="profile/[id]"
        options={{ title: "Profile settings" }}
      />
      <Tabs.Screen
        name="quizCategory/[id]"
        options={{ title: "Quiz Category" }}
      />
      <Tabs.Screen name="index" options={{ title: "index" }} />
    </Tabs>
  );
}
