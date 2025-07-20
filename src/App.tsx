
import React, { useState, FC } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import useLocalStorage from "./hooks/useLocalStorage";
import "./index.css";

// Define a type for a single task
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const App: FC = () => {
  // Filter state: 'all', 'completed', or 'incomplete'
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  // LocalStorage state for task list, using custom hook
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  /**
   * Adds a new task to the task list.
   * Prevents empty titles and duplicates (case-sensitive).
   */
  const addTask = (title: string): boolean => {
    const trimmed = title.trim();
    if (!trimmed) {
      alert("Task title cannot be empty.");
      return false;
    }

    // TODO: Move this duplicate check to a common utility
    if (tasks.some((task) => task.title === trimmed)) {
      alert("Duplicate task title.");
      return false;
    }

    const newTask: Task = {
      id: Date.now(), // Use timestamp as unique ID
      title: trimmed,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    return true;
  };

  /**
   * Toggles the completed status of a task.
   */
  const toggleTask = (id: number): void => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  /**
   * Deletes a task by ID.
   */
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Updates the title of a task.
   * Prevents empty titles and duplicates (excluding self).
   */
  const updateTask = (id: number, newTitle: string): void => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      alert("Task title cannot be empty.");
      return;
    }

    // TODO: Move this duplicate check to a common utility
    if (tasks.some((task) => task.title === trimmed && task.id !== id)) {
      alert("Duplicate task title.");
      return;
    }

    const updated = tasks.map((task) =>
      task.id === id ? { ...task, title: trimmed } : task
    );
    setTasks(updated);
  };

  /**
   * Applies the current filter to the task list.
   */
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // "all"
  });

  return (
    <div className="app-container">
      <ThemeToggle />
      {/* TODO: Theme toggle has delay between html and body — investigate */}
      <h1 className="title">To-Do Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="filters">
        {/* TODO: Move filter values to a constant enum or array */}
        {["all", "completed", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "all" | "completed" | "incomplete")}
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
