import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
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

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        value={text}
        placeholder="Enter a task"
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
      />
      <button type="submit">Add</button>
      {/* //TODO UX is not correct when have error */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskInput;
