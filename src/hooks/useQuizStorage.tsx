import { useState, useEffect, useCallback } from "react";
import { Question } from "../types/type";

const STORAGE_KEY = "quizQuestions";

export const useQuizStorage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  // Load questions from localStorage on mount
  useEffect(() => {
    try {
      const savedQuestions = localStorage.getItem(STORAGE_KEY);
      if (savedQuestions) {
        const parsedQuestions = JSON.parse(savedQuestions);
        setQuestions(parsedQuestions);
      }
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }, []);

  // Save questions to localStorage
  const saveQuestions = useCallback((newQuestions: Question[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuestions));
      setQuestions(newQuestions);
    } catch (error) {
      console.error("Error saving questions:", error);
    }
  }, []);

  return { questions, saveQuestions };
};
