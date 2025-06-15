import { SubjectItem } from "@/interfaces/interface";
import { fetchData } from "@/services/api";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [data, setData] = useState<SubjectItem[]>([]);
  const router = useRouter();

  const handleSubjectItem = (subject: string) => {
    const subjectNew = subject.toLowerCase();
    router.push({
      pathname: "/quiz/[id]",
      params: { id: subjectNew },
    });
  };

  const renderSubjectItem = ({ item }: { item: SubjectItem }) => (
    <Pressable
      style={({ pressed }) => [
        styles.subjectItem,
        pressed && styles.subjectItemPressed,
      ]}
      onPress={() => handleSubjectItem(item.subject)}
      android_ripple={{ color: "#ccc" }}
    >
      <Text style={styles.subjectName}>{item.subject}</Text>
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
    <View style={styles.container}>
      <Text style={styles.header}>Topics Available for Quiz</Text>

      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderSubjectItem}
          keyExtractor={(item, index) => item.subject + index.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.centered}>
          <Text style={styles.subjectName}>Loading...</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  listContent: {
    paddingBottom: 20,
  },
  subjectItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
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
  subjectItemPressed: {
    backgroundColor: "#e0e0e0",
    opacity: 0.8,
  },
  subjectName: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
});
