import React from "react";
import { Text, View } from "react-native";

const Quiz = () => {
  const [quizExists, setQuizExists] = React.useState<boolean>(false);

  return (
    <View>
      {quizExists ? (
        <Text>Render quizes</Text>
      ) : (
        <Text>Go start to make a quiz</Text>
      )}
    </View>
  );
};

export default Quiz;
