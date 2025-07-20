
import React from "react";
import TaskItem from "./TaskItem";

// Define the task type
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// Define props interface
interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onUpdate }) => {
  if (!tasks.length) {
    return <p className="text-gray-500 text-center mt-6">No tasks to show.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
