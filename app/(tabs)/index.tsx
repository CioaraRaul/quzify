import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/services/api";
import { SubjectItem } from "@/interfaces/interface";

export default function Index() {
  const [data, setData] = useState<SubjectItem[]>([]); // initialize as empty array

  const handleSubjectItem = (subject: string) => {
    console.log(`You clicked: ${subject}`);
    // You can add your navigation logic here, e.g.,
    // navigation.navigate('QuizScreen', { selectedSubject: subject });
    alert(`Starting quiz for: ${subject}`); // For demonstration
  };

  const renderSubjectItem = ({ item }: { item: SubjectItem }) => (
    // Wrap the item's content with Pressable to make it clickable
    <Pressable
      style={({ pressed }) => [
        styles.subjectItem,
        pressed && styles.subjectItemPressed, // Apply a subtle visual feedback when pressed
      ]}
      onPress={() => handleSubjectItem(item.subject)} // Pass the specific subject name
      android_ripple={{ color: "#ccc" }} // Android specific ripple effect
    >
      <Text style={styles.subjectName}>{item.subject}</Text>
      <Text style={styles.subjectCount}>({item.count})</Text>
    </Pressable>
  );

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await fetchData("subjects-list");
        console.log("Data fetched:", fetchedData);
        setData(fetchedData.data?.list || []); // ensure data is set correctly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <View>
      {data.length > 0 ? (
        <button onClick={(e) => console.log(e.currentTarget.innerText)}>
          <FlatList
            data={data}
            renderItem={renderSubjectItem} // assuming your data has 'name' property
            keyExtractor={(item, index) => item.subject + index.toString()}
          />
        </button>
      ) : (
        <Text>Loading...</Text>
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
    // Style for when an item is pressed
    backgroundColor: "#e0e0e0", // A lighter shade to indicate press
    opacity: 0.8,
  },
  subjectName: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
  },
  subjectCount: {
    fontSize: 16,
    color: "#888",
    fontWeight: "normal",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
