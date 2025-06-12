import { QuizQuestion, SubjectCategory } from "@/interfaces/interface";
import { quizByCategoryID } from "@/services/api";
import React, { useEffect } from "react";
import { View, Text } from "react-native";

function SubjectCategoryId({ quiz }: { quiz: SubjectCategory }) {
  const [specificQuiz, setSpecificQuiz] = React.useState<QuizQuestion>();

  const currentQuiz = quiz?.categoryID.toString();
  console.log(currentQuiz);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const res = await quizByCategoryID(currentQuiz);

        if (res) {
          const data = res?.data?.list;
          console.log(data);
          setSpecificQuiz(data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchQuizData();
  }, [currentQuiz]);

  console.log("specificQuiz", specificQuiz);

  return (
    <View>
      <Text>You choose to do the {quiz.name} quiz</Text>
      {specificQuiz ? (
        <View>
          <Text>Quiz ID: {specificQuiz._id}</Text>
          <Text>Question: {specificQuiz.question}</Text>
          <Text>Options: {specificQuiz.options.join(", ")}</Text>
          <Text>Correct Option: {specificQuiz.correctOption}</Text>
          <Text>Explanation: {specificQuiz.explanation}</Text>
        </View>
      ) : (
        <Text>No data found...</Text>
      )}
    </View>
  );
}

export default SubjectCategoryId;
