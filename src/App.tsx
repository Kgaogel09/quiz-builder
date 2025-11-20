import React, { useState } from "react";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/Preview";
import Results from "./components/results/Results";

export default function App() {
  const [mode, setMode] = useState<"edit" | "preview" | "results">("edit");

  const toggleMode = () => {
    const isPreviewState = mode === "preview" || mode === "results";
    setMode(isPreviewState ? "edit" : "preview");
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accessible Quiz Builder (React)</h1>
        <div className="space-x-2">
          <button
            type="button"
            aria-pressed={mode === "edit" || mode === "preview"}
            className="font-medium  bg-slate-200 border border-slate-200 px-3 py-1 rounded-md shadow-sm"
            onClick={toggleMode}
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
          <button
            type="button"
            aria-pressed={mode === "results"}
            className="text-white font-medium  bg-blue-600 border border-blue-600 px-3 py-1 rounded-md shadow-sm"
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
            questions={[]}
            onQuestionsUpdate={() => {}}
            onSaveQuiz={() => {}}
          />
        )}
        {mode === "preview" && <Preview />}
        {mode === "results" && <Results />}
      </section>
    </main>
  );
}
