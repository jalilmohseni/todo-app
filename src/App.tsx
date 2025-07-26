import React, { useEffect, useReducer, useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import { taskReducer, Task } from "./reducers/taskReducer";

const App: React.FC = () => {
  const [filter, setFilter] = useState("all");

  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Sync to localStorage on any change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return false;
    if (tasks.some((task) => task.title === trimmed)) return false;

    const newTask: Task = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };
    dispatch({ type: "ADD", payload: newTask });
    return true;
  };

  const toggleTask = (id: number) => dispatch({ type: "TOGGLE", payload: id });

  const deleteTask = (id: number) => dispatch({ type: "DELETE", payload: id });

  const updateTask = (id: number, newTitle: string) => {
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    if (tasks.some((t) => t.title === trimmed && t.id !== id)) return;

    dispatch({ type: "UPDATE", payload: { id, title: trimmed } });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <ThemeToggle />
      <h1 className="title">To-Do Task Manager</h1>

      <TaskInput onAdd={addTask} />
      <div className="filters">
        {["all", "completed", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={filter === type ? "active" : ""}
            aria-pressed={filter === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default App;
