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
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Quiz Preview</h2>
      <p className="text-slate-500 font-medium">
        Take your quiz for a little test drive!
      </p>
      <div className="flex flex-col gap-3">
        <p className="text-sm">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <div
          key={currentQuestionIndex}
          className="w-full bg-[#f6f5f4] rounded-full h-3"
        >
          <div
            className="bg-sky-600 h-3 rounded-full"
            style={{
              width: `${progressPercentage}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col mb-10">
        <h5 className="mb-3 font-medium text-lg">
          {currentQuestion.title || "Untitled Question"}
        </h5>
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="">
              <button
                type="button"
                className={`w-full text-left text-sm shadow-md  bg-[#f6f5f4] block rounded-md p-2 ${
                  userAnswer !== index
                    ? "border border-[#f6f5f4]"
                    : "border-2 border-sky-600 bg-sky-100"
                }`}
                onClick={() => onAnswerSelect(currentQuestionIndex, index)}
              >
                <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                {option || `Untitled option ${index + 1}`}
              </button>
            </div>
          ))}
        </div>
      </div>
      {questions.length > 1 && (
        <div className="flex justify-between">
          <button
            type="button"
            className="text-white bg-[#191918] font-medium text-sm border border-[#191918] px-3 py-1 rounded-md shadow-md transition-all duration-300 ease-in disabled:bg-gray-300 disabled:border-gray-300"
            onClick={onPrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          <button
            type="button"
            className="text-white bg-[#191918] font-medium text-sm border border-[#191918] px-3 py-1 rounded-md shadow-md transition-all duration-300 ease-in disabled:bg-gray-300 disabled:border-gray-300"
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
