import { useState } from "react";
import type { TaskStorage } from "../services/storage/task-storage.interface";
import type { Task } from "../types/task";

export type CreateTaskInput = Omit<Task, "id" | "status" | "createdAt">;

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
      status: input.priority === "high" ? "in-progress" : "todo",
      createdAt: now,
      dueDate: input.dueDate,
      priority: input.priority,
      type: input.type,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    taskStorage.createTask(newTask);
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    taskStorage.deleteTask(id);
  };

  return { createTask, deleteTask, tasks };
};

export default useTaskManager;
