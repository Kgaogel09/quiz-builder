import { render, screen, fireEvent } from '@testing-library/react';
import Editor from '../../components/editor/Editor';
import { Question } from '../../types/type';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Test Question',
    options: ['Option A', 'Option B'],
    correctAnswer: 0,
  },
];

const mockProps = {
  questions: mockQuestions,
  onQuestionsUpdate: jest.fn(),
  onSaveQuiz: jest.fn(),
};

describe('Editor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders editor with questions', () => {
    render(<Editor {...mockProps} />);
    
    expect(screen.getByText('Quiz Editor')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Question')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Option A')).toBeInTheDocument();
  });

  it('adds new question', () => {
    render(<Editor {...mockProps} />);
    
    fireEvent.click(screen.getByText('Add Question'));
    
    expect(mockProps.onQuestionsUpdate).toHaveBeenCalledWith([
      ...mockQuestions,
      expect.objectContaining({
        title: '',
        options: ['', ''],
        correctAnswer: -1,
      }),
    ]);
  });

  it('updates question title', () => {
    render(<Editor {...mockProps} />);
    
    const titleInput = screen.getByDisplayValue('Test Question');
    fireEvent.change(titleInput, { target: { value: 'Updated Question' } });
    
    expect(mockProps.onQuestionsUpdate).toHaveBeenCalledWith([
      { ...mockQuestions[0], title: 'Updated Question' },
    ]);
  });

  it('adds option to question', () => {
    render(<Editor {...mockProps} />);
    
    fireEvent.click(screen.getByText('Add Option'));
    
    expect(mockProps.onQuestionsUpdate).toHaveBeenCalledWith([
      { ...mockQuestions[0], options: ['Option A', 'Option B', ''] },
    ]);
  });

  it('removes question', () => {
    render(<Editor {...mockProps} />);
    
    fireEvent.click(screen.getByText('Remove Question'));
    
    expect(mockProps.onQuestionsUpdate).toHaveBeenCalledWith([]);
  });

  it('sets correct answer', () => {
    render(<Editor {...mockProps} />);
    
    const checkButtons = screen.getAllByRole('button');
    const correctAnswerButton = checkButtons.find(btn => 
      btn.querySelector('svg') && btn.className.includes('border-emerald-600')
    );
    
    if (correctAnswerButton) {
      fireEvent.click(correctAnswerButton);
    }
    
    expect(mockProps.onQuestionsUpdate).toHaveBeenCalled();
  });

  it('disables save when questions missing correct answers', () => {
    const questionsWithoutAnswers = [{
      ...mockQuestions[0],
      correctAnswer: -1,
    }];
    
    render(<Editor {...mockProps} questions={questionsWithoutAnswers} />);
    
    const saveButton = screen.getByText('Save Quiz');
    expect(saveButton).toBeDisabled();
  });

  it('enables save when all questions have correct answers', () => {
    render(<Editor {...mockProps} />);
    
    const saveButton = screen.getByText('Save Quiz');
    expect(saveButton).not.toBeDisabled();
  });

  it('calls onSaveQuiz when form is submitted', () => {
    render(<Editor {...mockProps} />);
    
    const form = screen.getByRole('button', { name: 'Save Quiz' }).closest('form');
    if (form) {
      fireEvent.submit(form);
    }
    
    expect(mockProps.onSaveQuiz).toHaveBeenCalled();
  });

  it('shows warning when questions missing correct answers', () => {
    const questionsWithoutAnswers = [{
      ...mockQuestions[0],
      correctAnswer: -1,
    }];
    
    render(<Editor {...mockProps} questions={questionsWithoutAnswers} />);
    
    expect(screen.getByText('Some questions missing correct answers')).toBeInTheDocument();
  });
});