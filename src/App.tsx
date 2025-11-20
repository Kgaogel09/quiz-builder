import React, { useState } from "react";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/Preview";
import Results from "./components/results/Results";

export default function App() {
  const [mode, setMode] = useState<"edit" | "preview" | "results">("edit");

  const toggleMode = () => {
    setMode(
      mode === "edit" ? "preview" : mode === "preview" ? "results" : "edit"
    );
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accessible Quiz Builder (React)</h1>
        <div className="space-x-2">
          <button
            aria-pressed={mode === "edit" || mode === "preview"}
            className="px-3 py-1 border rounded"
            onClick={toggleMode}
          >
            {mode === "edit" ? "Preview" : "Back to Edit"}
          </button>
          <button
            aria-pressed={mode === "results"}
            className="px-3 py-1 border rounded"
            onClick={() => setMode("results")}
            hidden={mode === "edit"}
          >
            Submit Quiz
          </button>
        </div>
      </header>
      <section aria-live="polite">
        {mode === "edit" && <Editor />}
        {mode === "preview" && <Preview />}
        {mode === "results" && <Results />}
      </section>
    </main>
  );
}
