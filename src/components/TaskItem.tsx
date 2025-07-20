

import React, { useState, ChangeEvent, KeyboardEvent, FC } from "react";

// Define the Task interface
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Define props for the TaskItem component
interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newTitle: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ task, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(task.title);

  // TODO: should also have validation while edit
  const handleEdit = () => {
    const trimmed = editText.trim();
    if (editing && trimmed) {
      onUpdate(task.id, trimmed);
    }
    setEditing(!editing);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditText(task.title);
      setEditing(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label="Mark task complete"
      />
      {editing ? (
        <input
          type="text"
          value={editText}
          onChange={handleInputChange} // Removed inline function
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{task.title}</span>
      )}
      <div className="actions">
        {/* TODO: save button not working on edit */}
        <button onClick={handleEdit} title={editing ? "Save" : "Edit"}>
          {editing ? "💾" : "✏️"}
        </button>
        <button onClick={() => onDelete(task.id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
