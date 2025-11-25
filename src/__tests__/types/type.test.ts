import { Question, Quiz, UserAnswers, QuizResults } from '../../types/type';

describe('Type Definitions', () => {
  it('should define Question interface correctly', () => {
    const question: Question = {
      id: '1',
      title: 'Test Question',
      options: ['A', 'B', 'C'],
      correctAnswer: 0,
    };

    expect(question.id).toBe('1');
    expect(question.title).toBe('Test Question');
    expect(question.options).toHaveLength(3);
    expect(question.correctAnswer).toBe(0);
  });

  it('should define Quiz interface correctly', () => {
    const quiz: Quiz = {
      questions: [
        {
          id: '1',
          title: 'Question 1',
          options: ['A', 'B'],
          correctAnswer: 0,
        },
      ],
      title: 'Test Quiz',
    };

    expect(quiz.questions).toHaveLength(1);
    expect(quiz.title).toBe('Test Quiz');
  });

  it('should define UserAnswers interface correctly', () => {
    const userAnswers: UserAnswers = {
      '1': 0,
      '2': 1,
    };

    expect(userAnswers['1']).toBe(0);
    expect(userAnswers['2']).toBe(1);
  });

  it('should define QuizResults interface correctly', () => {
    const results: QuizResults = {
      score: 2,
      total: 3,
      percentage: 67,
      details: [
        {
          questionId: '1',
          userAnswer: 0,
          correctAnswer: 0,
          isCorrect: true,
        },
        {
          questionId: '2',
          userAnswer: 1,
          correctAnswer: 0,
          isCorrect: false,
        },
      ],
    };

    expect(results.score).toBe(2);
    expect(results.total).toBe(3);
    expect(results.percentage).toBe(67);
    expect(results.details).toHaveLength(2);
    expect(results.details[0].isCorrect).toBe(true);
    expect(results.details[1].isCorrect).toBe(false);
  });
});