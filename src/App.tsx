import React, { useState } from "react";
import Editor from "./components/editor/editor";
import Preview from "./components/preview/Preview";

export default function App() {
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Accessible Quiz Builder (React)</h1>
        <div className="space-x-2">
          <button
            aria-pressed={mode === "edit"}
            className="px-3 py-1 border rounded"
            onClick={() => setMode("edit")}
          >
            Edit
          </button>
          <button
            aria-pressed={mode === "preview"}
            className="px-3 py-1 border rounded"
            onClick={() => setMode("preview")}
          >
            Preview
          </button>
        </div>
      </header>
      <section aria-live="polite">
        {mode === "edit" && <Editor />}
        {mode === "preview" && <Preview />}
      </section>
    </main>
  );
}
