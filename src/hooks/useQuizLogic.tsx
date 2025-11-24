import { useState, useCallback } from "react";
import { Question, QuizResults, UserAnswers } from "../types/type";

export const useQuizLogic = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});


  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const calculateScore = useCallback((): QuizResults => {
    let score = 0;
    const details = questions.map((question, index) => {
      const userAnswer = userAnswers[index] ?? -1;
      const isCorrect =
        userAnswer !== -1 && userAnswer === question.correctAnswer;

      if (isCorrect) score++;

      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      };
    });

    return {
      score,
      total: questions.length,
      percentage:
        questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
      details,
    };
  }, [questions, userAnswers]);

  const handleAnswerSelect = useCallback(
    (questionIndex: number, optionIndex: number) => {
      setUserAnswers((prev) => ({
        ...prev,
        [questionIndex]: optionIndex,
      }));
    },
    []
  );

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1));
  }, [questions.length]);

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  }, []);

  return {
    currentQuestionIndex,
    userAnswers,
    isLastQuestion,
    calculateScore,
    handleAnswerSelect,
    nextQuestion,
    prevQuestion,
    resetQuiz,
  };
};
