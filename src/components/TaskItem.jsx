import React, { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  //TODO should also have validation while edit

  const handleEdit = () => {
    if (editing && editText.trim()) {
      onUpdate(task.id, editText.trim());
    }
    setEditing(!editing);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditText(task.title);
      setEditing(false);
    }
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
          // TODO try to avoid inline function declaration
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span onDoubleClick={() => setEditing(true)}>{task.title}</span>
      )}
      <div className="actions">
        {/* TODO save button not working on edit */}
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
