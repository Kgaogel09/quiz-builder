import { renderHook, act } from '@testing-library/react';
import { useQuizLogic } from '../../hooks/useQuizLogic';
import { Question } from '../../types/type';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'What is React?',
    options: ['Library', 'Framework', 'Language'],
    correctAnswer: 0,
  },
  {
    id: '2',
    title: 'What is JSX?',
    options: ['JavaScript XML', 'Java Syntax', 'JSON Extension'],
    correctAnswer: 0,
  },
];

describe('useQuizLogic', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.userAnswers).toEqual({});
    expect(result.current.isLastQuestion).toBe(false);
  });

  it('handles answer selection correctly', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.handleAnswerSelect(0, 1);
    });

    expect(result.current.userAnswers).toEqual({ 0: 1 });
  });

  it('navigates to next question', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.nextQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.isLastQuestion).toBe(true);
  });

  it('navigates to previous question', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.nextQuestion();
      result.current.prevQuestion();
    });

    expect(result.current.currentQuestionIndex).toBe(0);
  });

  it('does not go beyond question bounds', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.prevQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(0);

    act(() => {
      result.current.nextQuestion();
      result.current.nextQuestion();
    });
    expect(result.current.currentQuestionIndex).toBe(1);
  });

  it('calculates score correctly', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.handleAnswerSelect(0, 0); // correct
      result.current.handleAnswerSelect(1, 1); // incorrect
    });

    const score = result.current.calculateScore();
    expect(score.score).toBe(1);
    expect(score.total).toBe(2);
    expect(score.percentage).toBe(50);
    expect(score.details).toHaveLength(2);
    expect(score.details[0].isCorrect).toBe(true);
    expect(score.details[1].isCorrect).toBe(false);
  });

  it('resets quiz state', () => {
    const { result } = renderHook(() => useQuizLogic(mockQuestions));

    act(() => {
      result.current.handleAnswerSelect(0, 1);
      result.current.nextQuestion();
      result.current.resetQuiz();
    });

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.userAnswers).toEqual({});
  });

  it('handles empty questions array', () => {
    const { result } = renderHook(() => useQuizLogic([]));

    expect(result.current.currentQuestionIndex).toBe(0);
    
    const score = result.current.calculateScore();
    expect(score.percentage).toBe(0);
    expect(score.total).toBe(0);
  });
});