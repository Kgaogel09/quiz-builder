import React, { useState } from "react";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/Preview";
import Results from "./components/results/Results";
import { useQuizStorage } from "./hooks/useQuizStorage";

export default function App() {
  const [mode, setMode] = useState<"edit" | "preview" | "results">("edit");
  const { questions, saveQuestions } = useQuizStorage();

  const toggleMode = () => {
    const isPreviewState = mode === "preview" || mode === "results";
    setMode(isPreviewState ? "edit" : "preview");
  };

  const handleSaveQuiz = () => {
    saveQuestions(questions);
    alert("Quiz saved to local storage!");
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accessible Quiz Builder (React)</h1>
        <div className="space-x-2">
          <button
            type="button"
            aria-pressed={mode === "edit" || mode === "preview"}
            className="text-white bg-sky-600 border border-sky-600 px-3 py-1 rounded-md shadow-sm transition"
            onClick={toggleMode}
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
          <button
            type="button"
            aria-pressed={mode === "results"}
            className="text-white bg-emerald-500 border border-emerald-500 rounded-md shadow-sm  px-3 py-1 transition"
            onClick={() => setMode("results")}
            hidden={mode === "edit"}
          >
            Submit
          </button>
        </div>
      </header>
      <section aria-live="polite">
        {mode === "edit" && (
          <Editor
            questions={questions}
            onQuestionsUpdate={saveQuestions}
            onSaveQuiz={handleSaveQuiz}
          />
        )}
        {mode === "preview" && <Preview />}
        {mode === "results" && <Results />}
      </section>
    </main>
  );
}
