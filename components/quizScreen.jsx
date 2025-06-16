import { addQuizHistory } from "@/services/data_supabase";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QuizScreen = ({ quizFiveQuestion, username }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionInterface, setQuestionInterface] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctOption, setCorrectOption] = useState("");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  console.log(`Username check ${username}`);

  useEffect(() => {
    if (Array.isArray(quizFiveQuestion)) {
      setQuestionInterface(quizFiveQuestion);
    }
  }, [quizFiveQuestion]);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (
      questionInterface.length > 0 &&
      questionNumber < questionInterface.length
    ) {
      setCorrectOption(questionInterface[questionNumber].correctOption);
    }
  }, [questionNumber, questionInterface]);

  const handleOptionPress = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    if (option === correctOption) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (questionNumber < questionInterface.length - 1) {
        setQuestionNumber((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 3000);
  };

  const getOptionStyle = (option) => {
    if (!isAnswered) {
      return option === selectedOption ? styles.optionSelected : styles.option;
    }

    if (option === correctOption) return styles.optionCorrect;
    if (option === selectedOption && option !== correctOption)
      return styles.optionWrong;

    return styles.optionDisabled;
  };

  const handleRestart = async () => {
    let created_at = new Date().toISOString();

    await addQuizHistory(
      username,
      quizFiveQuestion[0].category,
      score,
      created_at
    );
    setQuestionNumber(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (isFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.question}>Quiz Completed!</Text>
        <Text style={styles.score}>Your Score: {score} / 5</Text>
        <TouchableOpacity onPress={handleRestart} style={styles.option}>
          <Text style={styles.optionText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questionInterface[questionNumber];

  return (
    <View style={styles.container}>
      {currentQuestion && (
        <>
          <Text style={styles.question}>
            {questionNumber + 1}. {currentQuestion.question}
          </Text>

          {currentQuestion.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionPress(option)}
              style={getOptionStyle(option)}
              disabled={isAnswered}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  option: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionSelected: {
    backgroundColor: "#87CEFA", // light blue
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionCorrect: {
    backgroundColor: "#4CAF50", // green
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionWrong: {
    backgroundColor: "#F44336", // red
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionDisabled: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: "white",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
});
