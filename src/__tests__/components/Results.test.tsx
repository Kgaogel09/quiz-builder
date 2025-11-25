import { render, screen, fireEvent } from '@testing-library/react';
import Results from '../../components/results/Results';
import { Question, QuizResults } from '../../types/type';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Question 1',
    options: ['Option A', 'Option B'],
    correctAnswer: 0,
  },
  {
    id: '2',
    title: 'Question 2',
    options: ['Option X', 'Option Y'],
    correctAnswer: 1,
  },
];

const mockResults: QuizResults = {
  score: 1,
  total: 2,
  percentage: 50,
  details: [
    {
      questionId: '1',
      userAnswer: 0,
      correctAnswer: 0,
      isCorrect: true,
    },
    {
      questionId: '2',
      userAnswer: 0,
      correctAnswer: 1,
      isCorrect: false,
    },
  ],
};

const mockProps = {
  results: mockResults,
  questions: mockQuestions,
  onRetryQuiz: jest.fn(),
};

describe('Results', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders quiz results', () => {
    render(<Results {...mockProps} />);
    
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('shows performance message for different score ranges', () => {
    // Test excellent performance (90%+)
    const excellentResults = { ...mockResults, score: 2, percentage: 100 };
    render(<Results {...mockProps} results={excellentResults} />);
    expect(screen.getByText('Excellent!')).toBeInTheDocument();
  });

  it('shows good performance message (70-89%)', () => {
    const goodResults = { ...mockResults, score: 2, total: 3, percentage: 75 };
    render(<Results {...mockProps} results={goodResults} />);
    expect(screen.getByText('Good job!')).toBeInTheDocument();
  });

  it('shows not bad performance message (50-69%)', () => {
    render(<Results {...mockProps} />);
    expect(screen.getByText('Not bad!')).toBeInTheDocument();
  });

  it('shows keep practicing message (<50%)', () => {
    const poorResults = { ...mockResults, score: 0, percentage: 25 };
    render(<Results {...mockProps} results={poorResults} />);
    expect(screen.getByText('Keep practicing!')).toBeInTheDocument();
  });

  it('displays detailed results for each question', () => {
    render(<Results {...mockProps} />);
    
    expect(screen.getByText('Question 1: Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 2: Question 2')).toBeInTheDocument();
  });

  it('shows correct and incorrect answers', () => {
    render(<Results {...mockProps} />);
    
    // Check for correct answer indicator
    expect(screen.getByText('✓')).toBeInTheDocument();
    // Check for incorrect answer indicator
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('displays user answers with letter labels', () => {
    render(<Results {...mockProps} />);
    
    const userAnswers = screen.getAllByText('A');
    expect(userAnswers.length).toBeGreaterThan(0);
  });

  it('shows correct answer when user was wrong', () => {
    render(<Results {...mockProps} />);
    
    expect(screen.getByText('Correct answer:')).toBeInTheDocument();
  });

  it('handles unanswered questions', () => {
    const resultsWithUnanswered = {
      ...mockResults,
      details: [
        ...mockResults.details,
        {
          questionId: '3',
          userAnswer: -1,
          correctAnswer: 0,
          isCorrect: false,
        },
      ],
    };
    
    const questionsWithExtra = [
      ...mockQuestions,
      {
        id: '3',
        title: 'Question 3',
        options: ['Option 1', 'Option 2'],
        correctAnswer: 0,
      },
    ];
    
    render(<Results {...mockProps} results={resultsWithUnanswered} questions={questionsWithExtra} />);
    
    expect(screen.getByText('Not answered')).toBeInTheDocument();
  });

  it('calls onRetryQuiz when retry button is clicked', () => {
    render(<Results {...mockProps} />);
    
    fireEvent.click(screen.getByText('Retry Quiz'));
    
    expect(mockProps.onRetryQuiz).toHaveBeenCalled();
  });

  it('applies correct color classes based on score', () => {
    // Test different score ranges
    const highScoreResults = { ...mockResults, percentage: 95 };
    const { rerender } = render(<Results {...mockProps} results={highScoreResults} />);
    
    let scoreElements = screen.getAllByText('95%');
    expect(scoreElements[0]).toHaveClass('text-green-500');
    
    const lowScoreResults = { ...mockResults, percentage: 30 };
    rerender(<Results {...mockProps} results={lowScoreResults} />);
    
    scoreElements = screen.getAllByText('30%');
    expect(scoreElements[0]).toHaveClass('text-red-500');
  });
});