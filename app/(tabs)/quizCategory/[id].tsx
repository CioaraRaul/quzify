import { useColorMode } from "@/app/context/ColorModeContext";
import { useUser } from "@/app/context/UserContext";
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
  const userContext = useUser();
  const { colorMode } = useColorMode();

  const colors = {
    background: colorMode === "dark" ? "#18181b" : "#f4f6f8",
    card: colorMode === "dark" ? "#23232b" : "#fff",
    text: colorMode === "dark" ? "#fff" : "#333",
    button: "#007bff",
    buttonText: "#fff",
  };

  const clickebleCategory = (category: SubjectCategory) => {
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
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
              style={[styles.button, { backgroundColor: colors.button }]}
              onPress={() => clickebleCategory(item)}
            >
              <Text style={[styles.buttonText, { color: colors.buttonText }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        quizId && (
          <SubjectCategoryId
            quiz={quizId}
            username={userContext.username ?? ""}
          />
        )
      )}
    </View>
  );
};

export default CategoryQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  highlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
  list: {
    paddingVertical: 10,
  },
  button: {
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
    fontSize: 16,
    fontWeight: "500",
  },
});
