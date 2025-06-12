import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { CatergortiesBySubject } from "@/services/api";
import { SubjectCategory } from "@/interfaces/interface";
import { useRoute } from "@react-navigation/native";

const CategoryQuiz = () => {
  const [categoriesSubject, setCategoriesSubject] = React.useState<
    SubjectCategory[]
  >([]);

  const router = useRoute();

  const { id } = useLocalSearchParams();
  console.log("CategoryQuiz params:", id);

  const clickebleCategory = (category: SubjectCategory) => {
    console.log(category.name);
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

      <FlatList
        data={categoriesSubject}
        keyExtractor={(item) =>
          item.categoryId?.toString() ?? Math.random().toString()
        }
        renderItem={({ item }) => (
          <View>
            <button onClick={() => clickebleCategory(item)}>{item.name}</button>
          </View>
        )}
      />
    </View>
  );
};

export default CategoryQuiz;
