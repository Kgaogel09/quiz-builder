import { renderHook, act } from '@testing-library/react';
import { useQuizStorage } from '../../hooks/useQuizStorage';
import { Question } from '../../types/type';

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Test Question',
    options: ['A', 'B', 'C'],
    correctAnswer: 0,
  },
];

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

describe('useQuizStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty questions when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useQuizStorage());
    
    expect(result.current.questions).toEqual([]);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('quizQuestions');
  });

  it('loads questions from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQuestions));
    
    const { result } = renderHook(() => useQuizStorage());
    
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it('saves questions to localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useQuizStorage());
    
    act(() => {
      result.current.saveQuestions(mockQuestions);
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'quizQuestions',
      JSON.stringify(mockQuestions)
    );
    expect(result.current.questions).toEqual(mockQuestions);
  });

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    const { result } = renderHook(() => useQuizStorage());
    
    expect(result.current.questions).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('Error loading questions:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('handles save errors gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    const { result } = renderHook(() => useQuizStorage());
    
    act(() => {
      result.current.saveQuestions(mockQuestions);
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Error saving questions:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });
});