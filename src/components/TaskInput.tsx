
import React, { useState, FormEvent, ChangeEvent } from "react";

// Define the props type
interface TaskInputProps {
  onAdd: (title: string) => void;
}
// TaskInput component allows users to input new tasks
// It takes an onAdd function prop to handle adding tasks

const TaskInput: React.FC<TaskInputProps> = ({ onAdd }) => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Task title cannot be empty.");
      return;
    }
    onAdd(trimmed);
    setText("");
    setError("");
  };
  // handleChange updates the text state when the input changes
  // It also clears any previous error message
  // handleSubmit is called when the form is submitted
  // It checks if the input is empty and calls onAdd with the trimmed title
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mb-4"
    >
      <input
        type="text"
        value={text}
        placeholder="Enter a task"
        onChange={handleChange}
        className="flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Add
      </button>

      {error && (
        <div className="text-red-600 text-sm ml-2 animate-pulse">{error}</div>
      )}
    </form>
  );
};

export default TaskInput;
