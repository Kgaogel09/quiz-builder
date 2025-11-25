import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock alert
Object.defineProperty(window, 'alert', {
  value: jest.fn(),
});

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders main app components', () => {
    render(<App />);
    
    expect(screen.getByText('Accessible Quiz Builder (React)')).toBeInTheDocument();
    expect(screen.getByText('Quiz Editor')).toBeInTheDocument();
  });

  it('starts in edit mode', () => {
    render(<App />);
    
    expect(screen.getByText('Quiz Editor')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('disables preview button when no questions', () => {
    render(<App />);
    
    const previewButton = screen.getByText('Preview');
    expect(previewButton).toBeDisabled();
  });

  it('toggles between edit and preview modes', async () => {
    // Mock questions in localStorage
    const mockQuestions = [{
      id: '1',
      title: 'Test Question',
      options: ['A', 'B'],
      correctAnswer: 0,
    }];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Preview')).not.toBeDisabled();
    });
    
    fireEvent.click(screen.getByText('Preview'));
    
    expect(screen.getByText('Quiz Preview')).toBeInTheDocument();
    expect(screen.getByText('Back to Editor')).toBeInTheDocument();
  });

  it('shows submit button in preview mode on last question', async () => {
    const mockQuestions = [{
      id: '1',
      title: 'Test Question',
      options: ['A', 'B'],
      correctAnswer: 0,
    }];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    render(<App />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Preview'));
    });
    
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('switches to results mode when submit is clicked', async () => {
    const mockQuestions = [{
      id: '1',
      title: 'Test Question',
      options: ['A', 'B'],
      correctAnswer: 0,
    }];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    render(<App />);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Preview'));
    });
    
    fireEvent.click(screen.getByText('Submit'));
    
    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
  });

  it('handles quiz retry', async () => {
    const mockQuestions = [{
      id: '1',
      title: 'Test Question',
      options: ['A', 'B'],
      correctAnswer: 0,
    }];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    render(<App />);

    // Go to preview
    await waitFor(() => {
      fireEvent.click(screen.getByText('Preview'));
    });

    // Submit to get results
    fireEvent.click(screen.getByText('Submit'));

    // Retry quiz
    fireEvent.click(screen.getByText('Retry Quiz'));

    expect(screen.getByText('Quiz Preview')).toBeInTheDocument();
  });

  it('shows save quiz alert', async () => {
    const mockQuestions = [{
      id: '1',
      title: 'Test Question',
      options: ['A', 'B'],
      correctAnswer: 0,
    }];
    
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    render(<App />);

    await waitFor(() => {
      const saveButton = screen.getByText('Save Quiz');
      fireEvent.click(saveButton);
    });

    expect(window.alert).toHaveBeenCalledWith('Quiz saved to local storage!');
  });
});
