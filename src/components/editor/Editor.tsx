export default function Editor() {
  return (
    <div className="flex flex-col gap-6 bg-white shadow-md border border-slate-100 rounded-md p-4">
      <h2 className="text-xl font-bold text-center">Edit Quiz</h2>
      <div className="flex flex-col gap-3 bg-amber-100 rounded-md p-4 border border-amber-200">
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
    </div>
  );
}
