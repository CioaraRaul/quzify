import SubjectCategoryId from "@/components/categorySelected";
import { SubjectCategory } from "@/interfaces/interface";
import { CatergortiesBySubject } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CategoryQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(false);
  const [categoriesSubject, setCategoriesSubject] = useState<SubjectCategory[]>(
    []
  );
  const [quizId, setQuizId] = useState<SubjectCategory>();
  const { id } = useLocalSearchParams();

  const clickebleCategory = (category: SubjectCategory) => {
    console.log("Category clicked:", category.categoryID);
    console.log(id);
    setQuizId(category);
    setSelectedQuiz(true);
  };

  useEffect(() => {
    async function SubjectCategoryFromApi() {
      const category = id
        ? id.toString().charAt(0).toUpperCase() + id.toString().slice(1)
        : "";

      const response = await CatergortiesBySubject(category);

      if (response) {
        setCategoriesSubject(response.data?.list || []);
      }
    }
    SubjectCategoryFromApi();
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Selected category is: <Text style={styles.highlight}>{id}</Text>
      </Text>

      {!selectedQuiz ? (
        <FlatList
          data={categoriesSubject}
          keyExtractor={(item) =>
            item.categoryID?.toString() ?? Math.random().toString()
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => clickebleCategory(item)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        quizId && <SubjectCategoryId quiz={quizId} />
      )}
    </View>
  );
};

export default CategoryQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  highlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
