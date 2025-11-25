import { Question, QuizResults as QuizResultsType } from "../../types/type";
import { BicepsFlexed, PartyPopper, Smile, ThumbsUp } from "lucide-react";

interface QuizResultsProps {
  results: QuizResultsType;
  questions: Question[];
  onRetryQuiz: () => void;
}

export default function Results({
  results,
  questions,
  onRetryQuiz,
}: QuizResultsProps) {
  const { score, total, percentage, details } = results;

  const getPerformanceData = (percentage: number) => {
    if (percentage >= 90) {
      return { message: "Excellent!", icon: <PartyPopper size={40} /> };
    } else if (percentage >= 70) {
      return { message: "Good job!", icon: <ThumbsUp size={40} /> };
    } else if (percentage >= 50) {
      return { message: "Not bad!", icon: <Smile size={40} /> };
    } else {
      return { message: "Keep practicing!", icon: <BicepsFlexed size={40} /> };
    }
  };

  const performance = getPerformanceData(percentage);

  const getScoreColor = (percent: number) => {
    if (percent >= 70) return "text-green-500";
    if (percent >= 50) return "text-amber-400";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">Quiz Results</h2>
      <p className="text-slate-500 font-medium">
        Drumroll… here’s how you did!
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col flex-1 gap-3 bg-[#f6f5f4] rounded-md p-4 border border-[#f6f5f4] shadow-sm text-center">
          <h4 className="text-xl font-medium">Final Score</h4>
          <h2
            className={`text-4xl font-medium ${getScoreColor(percentage)}
            `}
          >
            {percentage}%
          </h2>
        </div>
        <div className="flex flex-col flex-1 gap-3 bg-[#f6f5f4] rounded-md p-4 border border-[#f6f5f4] shadow-sm text-center">
          <h4 className="text-xl font-medium">Correct Answers</h4>
          <h2
            className={`text-4xl font-medium ${getScoreColor(percentage)}
            `}
          >
            {score}/{total}
          </h2>
        </div>
        <div className="flex flex-col flex-1 gap-3 bg-[#f6f5f4] rounded-md p-4 border border-[#f6f5f4] shadow-sm text-center">
          <h4 className="text-xl font-medium">{performance.message}</h4>
          <h2
            className={`text-4xl font-medium ${getScoreColor(percentage)}
            `}
          >
            {performance.icon}
          </h2>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-xl font-medium mb-2">Detailed Results:</h4>
        {details.map((detail, index) => {
          const question = questions[index];
          if (!question) return null;

          const isAnswered = detail.userAnswer !== -1;

          return (
            <div
              key={index}
              className={`result-item border border-[#f6f5f4] bg-[#f6f5f4] p-3 mb-6 rounded-md`}
            >
              <div className="flex justify-between items-start">
                <div className="grow">
                  <h6>
                    Question {index + 1}: {question.title}
                  </h6>
                  <div className="mt-2">
                    <p>
                      <strong>Your answer: </strong>
                      {isAnswered ? (
                        <span
                          className={
                            detail.isCorrect ? "text-green-500" : "text-red-500"
                          }
                        >
                          {String.fromCharCode(65 + detail.userAnswer)}
                        </span>
                      ) : (
                        <span className="text-amber-400">Not answered</span>
                      )}
                    </p>
                    {!detail.isCorrect && question.correctAnswer !== -1 && (
                      <p>
                        <strong>Correct answer: </strong>
                        <span className="text-green-500">
                          {String.fromCharCode(65 + question.correctAnswer)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`text-white px-2 py-1 text-xs rounded-xl shadow-sm ${
                    detail.isCorrect ? "bg-emerald-500" : "bg-red-500"
                  } ml-3`}
                >
                  {detail.isCorrect ? "✓" : "✗"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          className="text-white bg-[#191918] border border-[#191918] rounded-md shadow-sm  px-3 py-1 transition"
          onClick={onRetryQuiz}
        >
          Retry Quiz
        </button>
      </div>
    </div>
  );
}
