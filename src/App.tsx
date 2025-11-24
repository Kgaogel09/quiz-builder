import React, { useState } from "react";

import Preview from "./components/preview/Preview";
import Results from "./components/results/Results";
import { useQuizStorage } from "./hooks/useQuizStorage";
import Editor from "./components/editor/Editor";
import { useQuizLogic } from "./hooks/useQuizLogic";

export default function App() {
  const [mode, setMode] = useState<"edit" | "preview" | "results">("edit");
  const { questions, saveQuestions } = useQuizStorage();
  const {
    currentQuestionIndex,
    userAnswers,
    isLastQuestion,
    calculateScore,
    handleAnswerSelect,
    nextQuestion,
    prevQuestion,
    resetQuiz,
  } = useQuizLogic(questions);

  const toggleMode = () => {
    const isPreviewState = mode === "preview" || mode === "results";
    setMode(isPreviewState ? "edit" : "preview");
  };

  const handleSaveQuiz = () => {
    saveQuestions(questions);
    alert("Quiz saved to local storage!");
  };

  const results = calculateScore();

  const handleRetryQuiz = () => {
    resetQuiz();
    setMode("preview");
  };

  // console.log(results);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accessible Quiz Builder (React)</h1>
        <div className="space-x-2">
          <button
            type="button"
            aria-pressed={mode === "edit" || mode === "preview"}
            className="text-white bg-sky-600 disabled:bg-gray-300 disabled:border-gray-300 border border-sky-600 px-3 py-1 rounded-md shadow-sm transition"
            onClick={toggleMode}
            disabled={questions.length === 0 && mode === "edit"}
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
          <button
            type="button"
            aria-pressed={mode === "results"}
            className="text-white bg-emerald-500 border border-emerald-500 rounded-md shadow-sm  px-3 py-1 transition disabled:bg-gray-300 disabled:border-gray-300"
            onClick={() => setMode("results")}
            hidden={mode === "edit"}
            disabled={!isLastQuestion}
          >
            Submit
          </button>
        </div>
      </header>
      <section
        aria-live="polite"
        className="bg-white shadow-md border border-slate-100 rounded-md p-4"
      >
        {mode === "edit" && (
          <Editor
            questions={questions}
            onQuestionsUpdate={saveQuestions}
            onSaveQuiz={handleSaveQuiz}
          />
        )}

        {mode === "preview" && (
          <Preview
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            userAnswers={userAnswers}
            isLastQuestion={isLastQuestion}
            onAnswerSelect={handleAnswerSelect}
            onNextQuestion={nextQuestion}
            onPrevQuestion={prevQuestion}
          />
        )}

        {mode === "results" && (
          <Results
            results={results}
            questions={questions}
            onRetryQuiz={handleRetryQuiz}
            onBackToEditor={() => setMode("edit")}
          />
        )}
      </section>
    </main>
  );
}
