import React, { useEffect, useState } from "react";

interface QuizProps {
  quizId: number;
  quizQustions: string[];
  quizOptions: string[];
  quizAnswer: string[];
  quizCatergory: string;
}

//posbile updates if quizData id is === quiz.id

function InsertQuiz({ quiz }: { quiz: any }) {
  const [quizData, setQuizData] = useState<any[]>([]);

  useEffect(() => {
    if (quiz) {
      //TODO: Validate quiz data structure
      setQuizData(...quizData, quiz);
    }
  }, [quiz]);

  return <div>InsertQuiz</div>;
}

export default InsertQuiz;
