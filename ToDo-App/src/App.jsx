import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import useLocalStorage from './hooks/useLocalStorage';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  // Add a new task
  const addTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) {
      alert('Task title cannot be empty.');
      return false;
    }
    if (tasks.some((task) => task.title === trimmed)) {
      alert('Duplicate task title.');
      return false;
    }

    const newTask = {
      id: Date.now(),
      title: trimmed,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    return true;
  };

  // Toggle completion status
  const toggleTask = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Update task title
  const updateTask = (id, newTitle) => {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      alert('Task title cannot be empty.');
      return;
    }
    if (tasks.some((task) => task.title === trimmed && task.id !== id)) {
      alert('Duplicate task title.');
      return;
    }

    const updated = tasks.map((task) =>
      task.id === id ? { ...task, title: trimmed } : task
    );
    setTasks(updated);
  };

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <ThemeToggle />
      <h1 className="title">To-Do Task Manager</h1>

      <TaskInput onAdd={addTask} />

      <div className="filters">
        {['all', 'completed', 'incomplete'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={filter === type ? 'active' : ''}
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
