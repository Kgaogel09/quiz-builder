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

  return (
    <div className="flex flex-col gap-6 bg-white shadow-md border border-slate-100 rounded-md p-4">
      <h2 className="text-xl font-bold text-center">Edit Quiz</h2>
      <div className="flex flex-col gap-3 bg-gray-100 rounded-md p-4 border border-gray-200">
        <h3 className="text-lg font-medium">How to use:</h3>
        <ul>
          <li>Add questions and options using the buttons below</li>
          <li>
            Click the <span>✓</span> button to mark the correct answer for each
            question
          </li>
          <li>
            Questions with correct answers marked will show a green checkmark
          </li>
        </ul>
      </div>
      {!allQuestionsHaveAnswers && hasQuestions && (
        <div className="flex gap-2 items-center">
          <TriangleAlert className="text-amber-200" />
          <span className="text-amber-200">
            Some questions missing correct answers
          </span>
        </div>
      )}
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
                    onChange={() => {}}
                    className="text-sm shadow-sm border-gray-100 bg-gray-100 block w-full rounded-md p-2"
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
                        value={""}
                        onChange={() => {}}
                        className="text-sm shadow-sm border-gray-100 bg-gray-100 block w-full rounded-md p-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition">
                        <Check size={16} />
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 transition">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    className="text-cyan-500 flex items-center gap-1  text-sm font-medium  border border-cyan-500 px-3 py-1 rounded-md shadow-sm"
                  >
                    Add Option
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1 text-red-500 text-sm font-medium border border-red-500 px-3 py-1 rounded-md shadow-sm"
                  >
                    Remove Question
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-1 text-white text-base font-medium bg-blue-600 border border-blue-600 px-3 py-1 rounded-md shadow-sm"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 text-white text-base font-medium bg-green-600 border border-green-600 px-3 py-1 rounded-md shadow-sm"
            >
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
