import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { CatergortiesBySubject } from "@/services/api";
import { SubjectCategory } from "@/interfaces/interface";
import SubjectCategoryId from "@/components/categorySelected";

const CategoryQuiz = () => {
  const [selectedQuiz, setSelectedQuiz] = React.useState<boolean>(false);
  const [categoriesSubject, setCategoriesSubject] = React.useState<
    SubjectCategory[]
  >([]);
  const [quizId, setQuizId] = React.useState<SubjectCategory>();

  const { id } = useLocalSearchParams();

  const clickebleCategory = (category: SubjectCategory) => {
    console.log("Category clicked:", category.categoryID);
    console.log(id);
    setQuizId(category);
    setSelectedQuiz(true);
  };

  //TODO: Fetch quiz data based on the category ID

  useEffect(() => {
    async function SubjectCategoryFromApi() {
      const category = id
        ? id.toString().charAt(0).toUpperCase() + id.slice(1)
        : "";

      const response = await CatergortiesBySubject(category as string);

      if (response) {
        setCategoriesSubject(response.data?.list || []);
      }
    }
    SubjectCategoryFromApi();
  }, [id]);

  return (
    <View>
      <Text>
        Selected category is: <span>{id}</span>
      </Text>
      {!selectedQuiz ? (
        <FlatList
          data={categoriesSubject}
          keyExtractor={(item) =>
            item.categoryID?.toString() ?? Math.random().toString()
          }
          renderItem={({ item }) => (
            <View>
              <button onClick={() => clickebleCategory(item)}>
                {item.name}
              </button>
            </View>
          )}
        />
      ) : (
        quizId && <SubjectCategoryId quiz={quizId} />
      )}
    </View>
  );
};

export default CategoryQuiz;
