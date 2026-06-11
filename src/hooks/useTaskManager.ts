import { useState } from "react";
import type { TaskStorage } from "../services/storage/task-storage.interface";
import type { Task } from "../types/task";

export type CreateTaskInput = Omit<Task, "id" | "createdAt">;

// Simple unique ID generator using crypto API or fallback
const createTaskId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

export const useTaskManager = (taskStorage: TaskStorage) => {
  const [tasks, setTasks] = useState<Task[]>(() => taskStorage.getTasks());

  const createTask = (input: CreateTaskInput) => {
    const newTitle = input.title.trim();
    const newDescription = input.description?.trim() || "";

    if (!newTitle) {
      return;
    }

    const now = new Date().toISOString();

    const newTask: Task = {
      id: createTaskId(),
      title: newTitle,
      description: newDescription,
      createdAt: now,
      dueDate: input.dueDate,
      priority: input.priority,
      type: input.type,
      status: input.status,
    };

    taskStorage.createTask(newTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: string) => {
    taskStorage.deleteTask(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    taskStorage.updateTask(updatedTask);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  return { createTask, deleteTask, tasks, updateTask };
};

export default useTaskManager;
