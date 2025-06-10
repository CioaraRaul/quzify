import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const CategoryQuiz = () => {
  const { id } = useLocalSearchParams();
  console.log("CategoryQuiz params:", id);

  //TODO: Fetch quiz data based on the category ID

  return (
    <View>
      <Text>CategoryQuiz</Text>
    </View>
  );
};

export default CategoryQuiz;
