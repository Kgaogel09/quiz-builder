export interface Question {
  id: string;
  title: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  questions: Question[];
  title: string;
}

export interface UserAnswers {
  [questionId: string]: number;
}

export interface QuizResults {
  score: number;
  total: number;
  percentage: number;
  details: {
    questionId: string;
    userAnswer: number;
    correctAnswer: number;
    isCorrect: boolean;
  }[];
}
