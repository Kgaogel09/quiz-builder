import { Plus, Save, TriangleAlert } from "lucide-react";
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
        <h5 className="text-lg font-medium">How to use:</h5>
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
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              className="flex items-center gap-1 text-white text-base font-medium bg-blue-600 border border-blue-600 px-3 py-1 rounded-md shadow-sm"
              onClick={addQuestion}
            >
              <Plus size={20} />
              Add Question
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 text-white text-base font-medium bg-green-600 border border-green-600 px-3 py-1 rounded-md shadow-sm"
            >
              <Save size={20} />
              Save Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
