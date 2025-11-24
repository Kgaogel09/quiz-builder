import { Question } from "../../types/type";
interface QuizPreviewProps {
  questions: Question[];
  currentQuestionIndex: number;
}

export default function Preview({
  questions,
  currentQuestionIndex,
}: QuizPreviewProps) {
  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">Preview Quiz</h2>
      <div className="flex flex-col gap-3">
        <p className="text-sm">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div className="w-full bg-[#f6f5f4] rounded-full h-3">
          <div
            className="bg-sky-600 h-3 rounded-full"
            style={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Preview mode placeholder — render your quiz here.
      </p>
    </div>
  );
}
