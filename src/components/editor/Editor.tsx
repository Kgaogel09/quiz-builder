import { Check, Plus, Save, TriangleAlert, X } from "lucide-react";
import { Question } from "../../types/type";

interface QuizEditorProps {
  questions: Question[];
  onQuestionsUpdate: (questions: Question[]) => void;
  onSaveQuiz: () => void;
}

export default function Editor({
  questions,
  onQuestionsUpdate,
  onSaveQuiz,
}: QuizEditorProps) {
  const allQuestionsHaveAnswers = questions.every(
    (q) => q.correctAnswer !== -1
  );
  const hasQuestions = questions.length > 0;

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      title: "",
      options: ["", ""],
      correctAnswer: -1,
    };
    onQuestionsUpdate([...questions, newQuestion]);
  };

  const updateQuestion = (
    index: number,
    field: keyof Question,
    value: string | number
  ) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    onQuestionsUpdate(newQuestions);
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    const options = [...newQuestions[questionIndex].options];
    options[optionIndex] = value;
    newQuestions[questionIndex] = { ...newQuestions[questionIndex], options };
    onQuestionsUpdate(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      options: [...newQuestions[questionIndex].options, ""],
    };
    onQuestionsUpdate(newQuestions);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    onQuestionsUpdate(newQuestions);
  };

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    updateQuestion(questionIndex, "correctAnswer", optionIndex);
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    const options = [...newQuestions[questionIndex].options];
    options.splice(optionIndex, 1);

    let correctAnswer = newQuestions[questionIndex].correctAnswer;
    if (correctAnswer === optionIndex) {
      correctAnswer = -1;
    } else if (correctAnswer > optionIndex) {
      correctAnswer--;
    }

    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      options,
      correctAnswer,
    };
    onQuestionsUpdate(newQuestions);
  };

  return (
    <div className="flex flex-col gap-6 bg-white shadow-md border border-slate-100 rounded-md p-4">
      <h2 className="text-xl font-bold">Edit Quiz</h2>
      <div className="flex flex-col gap-3 bg-[#f6f5f4] rounded-md p-4 border border-[#f6f5f4] shadow-sm">
        <h3 className="text-lg font-medium">How to use:</h3>
        <ul>
          <li>Add questions and options using the buttons below</li>
          <li>
            Click the <Check size={16} /> button to mark the correct answer for
            each question
          </li>
          <li>
            Questions with correct answers marked will show a green checkmark
          </li>
        </ul>
      </div>
      <div
        className={`flex gap-2 items-center justify-center ${
          !allQuestionsHaveAnswers && hasQuestions ? "" : "hidden"
        }`}
      >
        <TriangleAlert className="text-amber-400" />
        <span className="text-amber-400">
          Some questions missing correct answers
        </span>
      </div>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSaveQuiz();
          }}
        >
          {questions.map((question, index) => (
            <div className="flex mb-3">
              <div className="grow">
                <div className="mb-4">
                  <h5 className="font-medium mb-1">Question {index + 1}</h5>
                  <input
                    type="text"
                    name="questionTitle"
                    id="questionTitle"
                    placeholder="Enter question title"
                    value={question.title}
                    onChange={(e) =>
                      updateQuestion(index, "title", e.target.value)
                    }
                    className="text-sm shadow-sm border-[#f6f5f4] bg-[#f6f5f4] block w-full rounded-md p-2"
                  />
                </div>
                <div className="px-3">
                  <h5 className="font-medium">Options:</h5>
                  {question.options.map((option, optionIndex) => (
                    <div className="flex items-center mb-2 gap-2">
                      <span className="mr-2">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      <input
                        type="text"
                        name="questionOption"
                        id="questionOption"
                        value={option}
                        onChange={(e) =>
                          updateOption(index, optionIndex, e.target.value)
                        }
                        className="text-sm shadow-sm border-[#f6f5f4] bg-[#f6f5f4] block w-full rounded-md p-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => setCorrectAnswer(index, optionIndex)}
                        className={`border border-emerald-600 inline-flex items-center justify-center rounded-md p-2 transition ${
                          question.correctAnswer === optionIndex
                            ? "bg-emerald-600"
                            : "bg-white"
                        }`}
                      >
                        <Check
                          size={14}
                          className={`${
                            question.correctAnswer !== optionIndex
                              ? "text-emerald-600"
                              : "text-white"
                          }`}
                        />
                      </button>
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index, optionIndex)}
                          className="border border-red-500 inline-flex items-center justify-center rounded-md p-2 transition"
                        >
                          <X size={14} className="text-red-500" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    className="text-sky-600 flex items-center gap-1 text-sm border border-sky-600 px-3 py-1 rounded-md shadow-sm transition"
                    onClick={() => addOption(index)}
                  >
                    Add Option
                  </button>
                  <button
                    type="button"
                    className="flex text-white items-center gap-1 bg-red-500 text-sm border border-red-500 px-3 py-1 rounded-md shadow-sm transition"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="text-white bg-emerald-500 border border-emerald-500 rounded-md shadow-sm  px-3 py-1 transition"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button
              type="submit"
              className="text-white bg-sky-600 border border-sky-600 px-3 py-1 rounded-md shadow-sm transition"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
