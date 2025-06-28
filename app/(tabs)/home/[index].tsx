import { useColorMode } from "@/app/context/ColorModeContext";
import { SubjectItem } from "@/interfaces/interface";
import { fetchData } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<SubjectItem[]>([]);
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const darkMode = colorMode === "dark";

  const colors = {
    background: darkMode ? "#18181b" : "#f0f0f0",
    card: darkMode ? "#23232b" : "#fff",
    text: darkMode ? "#fff" : "#333",
    pressed: darkMode ? "#33334d" : "#e0e0e0",
  };

  const handleSubjectItem = (subject: string) => {
    const subjectNew = subject.toLowerCase();
    router.push({
      pathname: "/quizCategory/[id]",
      params: { id: subjectNew },
    });
  };

  const renderSubjectItem = ({ item }: { item: SubjectItem }) => (
    <Pressable
      style={({ pressed }) => [
        styles.subjectItem,
        { backgroundColor: colors.card },
        pressed && { backgroundColor: colors.pressed, opacity: 0.8 },
      ]}
      onPress={() => handleSubjectItem(item.subject)}
      android_ripple={{ color: colors.pressed }}
    >
      <Text style={[styles.subjectName, { color: colors.text }]}>
        {item.subject}
      </Text>
    </Pressable>
  );

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await fetchData("subjects-list");
        setData(fetchedData.data?.list || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        Topics Available for Quiz
      </Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderSubjectItem}
          keyExtractor={(item, index) => item.subject + index.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={[styles.subjectName, { color: colors.text }]}>
            Loading...
          </Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  subjectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "600",
  },
});
