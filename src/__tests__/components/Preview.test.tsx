import { render, screen, fireEvent } from '@testing-library/react';
import Preview from '../../components/preview/Preview';
import { Question } from '../../types/type';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Question 1',
    options: ['Option A', 'Option B', 'Option C'],
    correctAnswer: 0,
  },
  {
    id: '2',
    title: 'Question 2',
    options: ['Option X', 'Option Y'],
    correctAnswer: 1,
  },
];

const mockProps = {
  questions: mockQuestions,
  currentQuestionIndex: 0,
  userAnswers: {},
  isLastQuestion: false,
  onAnswerSelect: jest.fn(),
  onNextQuestion: jest.fn(),
  onPrevQuestion: jest.fn(),
};

describe('Preview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders current question', () => {
    render(<Preview {...mockProps} />);
    
    expect(screen.getByText('Quiz Preview')).toBeInTheDocument();
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument();
  });

  it('displays question options', () => {
    render(<Preview {...mockProps} />);
    
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
    expect(screen.getByText('Option C')).toBeInTheDocument();
  });

  it('handles answer selection', () => {
    render(<Preview {...mockProps} />);
    
    const optionButton = screen.getByText('Option A');
    fireEvent.click(optionButton);
    
    expect(mockProps.onAnswerSelect).toHaveBeenCalledWith(0, 0);
  });

  it('highlights selected answer', () => {
    const propsWithAnswer = {
      ...mockProps,
      userAnswers: { 0: 1 },
    };
    
    render(<Preview {...propsWithAnswer} />);
    
    const selectedOption = screen.getByText('Option B').closest('button');
    expect(selectedOption).toHaveClass('border-sky-600');
  });

  it('shows progress bar', () => {
    render(<Preview {...mockProps} />);
    
    const progressBar = document.querySelector('.bg-sky-600');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('navigates to next question', () => {
    render(<Preview {...mockProps} />);
    
    fireEvent.click(screen.getByText('Next'));
    
    expect(mockProps.onNextQuestion).toHaveBeenCalled();
  });

  it('navigates to previous question', () => {
    const propsOnSecondQuestion = {
      ...mockProps,
      currentQuestionIndex: 1,
    };
    
    render(<Preview {...propsOnSecondQuestion} />);
    
    fireEvent.click(screen.getByText('Previous'));
    
    expect(mockProps.onPrevQuestion).toHaveBeenCalled();
  });

  it('disables previous button on first question', () => {
    render(<Preview {...mockProps} />);
    
    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last question', () => {
    const propsOnLastQuestion = {
      ...mockProps,
      currentQuestionIndex: 1,
      isLastQuestion: true,
    };
    
    render(<Preview {...propsOnLastQuestion} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('handles single question quiz', () => {
    const singleQuestionProps = {
      ...mockProps,
      questions: [mockQuestions[0]],
      isLastQuestion: true,
    };
    
    render(<Preview {...singleQuestionProps} />);
    
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('shows fallback text for empty question title', () => {
    const questionsWithEmptyTitle = [{
      ...mockQuestions[0],
      title: '',
    }];
    
    const propsWithEmptyTitle = {
      ...mockProps,
      questions: questionsWithEmptyTitle,
    };
    
    render(<Preview {...propsWithEmptyTitle} />);
    
    expect(screen.getByText('Untitled Question')).toBeInTheDocument();
  });
});