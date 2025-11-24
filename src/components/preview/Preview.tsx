import { Question } from "../../types/type";
interface QuizPreviewProps {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: { [key: number]: number };
  isLastQuestion: boolean;
  onAnswerSelect: (questionIndex: number, optionIndex: number) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
}

export default function Preview({
  questions,
  currentQuestionIndex,
  userAnswers,
  isLastQuestion,
  onAnswerSelect,
  onNextQuestion,
  onPrevQuestion,
}: QuizPreviewProps) {
  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

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

      <div className="flex flex-col gap-4">
        <h5 className="mb-3 font-medium text-lg">
          {currentQuestion.title || "Untitled Question"}
        </h5>
        <div className="flex flex-col gap-2">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="">
              <button
                type="button"
                className={`w-full text-left text-sm shadow-sm  bg-[#f6f5f4] block rounded-md p-2 ${
                  userAnswer !== index
                    ? "border border-[#f6f5f4]"
                    : "border-2 border-sky-600 bg-sky-100"
                }`}
                onClick={() => onAnswerSelect(currentQuestionIndex, index)}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                {option || `Option ${index + 1}`}
              </button>
            </div>
          ))}
        </div>
      </div>
      {questions.length > 1 && (
        <div className="flex justify-between gap-4">
          <button
            type="button"
            className="text-white bg-[#191918] border border-[#191918] rounded-md shadow-sm  px-3 py-1 transition disabled:bg-gray-300 disabled:border-gray-300"
            onClick={onPrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <button
            type="button"
            className="text-white bg-[#191918] border border-[#191918] rounded-md shadow-sm  px-3 py-1 transition disabled:bg-gray-300 disabled:border-gray-300"
            onClick={onNextQuestion}
            disabled={isLastQuestion}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
