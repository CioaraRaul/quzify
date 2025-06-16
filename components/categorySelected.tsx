import { QuizQuestion, SubjectCategory } from "@/interfaces/interface";
import { quizByCategoryID } from "@/services/api";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import QuizScreen from "./quizScreen";
import GetRandomFiveQuestion from "./RandomValues";

function SubjectCategoryId({
  quiz,
  username,
}: {
  quiz: SubjectCategory;
  username: string;
}) {
  const [specificQuiz, setSpecificQuiz] = React.useState<QuizQuestion>();
  const [quizFiveQuestionsRandom, setQuizFIveQuestionsRandom] = useState<
    QuizQuestion[]
  >([]);

  const currentQuiz = quiz?.categoryID.toString();

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const res = await quizByCategoryID(currentQuiz);
        if (res) {
          const data = res?.data?.list;
          console.log("Fetched quiz data:", data);

          // If data is an array, pick the first one for now
          if (Array.isArray(data) && data.length > 0) {
            setSpecificQuiz(data[0]);
            const randomFiveQuestios: any[] = GetRandomFiveQuestion(data);
            setQuizFIveQuestionsRandom(randomFiveQuestios);
          } else {
            setSpecificQuiz(undefined);
          }
        }
      } catch (error) {
        console.error("Error fetching quiz:", error);
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
          <QuizScreen
            quizFiveQuestion={quizFiveQuestionsRandom}
            username={username}
          />
        </View>
      ) : (
        <Text>No data found...</Text>
      )}
    </View>
  );
}

export default SubjectCategoryId;
