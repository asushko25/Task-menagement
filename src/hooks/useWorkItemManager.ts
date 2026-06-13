import { useState } from "react";
import type { WorkItemStorage } from "../services/storage/workItem-storage.interface";
import type { WorkItem } from "../types/task";
import { createTaskId } from "../utils/createTaskId";

export type CreateWorkItemInput = Omit<WorkItem, "id" | "createdAt">;

export const useWorkItemManager = (taskStorage: WorkItemStorage) => {
  const [tasks, setTasks] = useState<WorkItem[]>(() =>
    taskStorage.getWorkItems(),
  );

  const createWorkItem = (input: CreateWorkItemInput) => {
    const newTitle = input.title.trim();
    const newDescription = input.description?.trim() || "";

    if (!newTitle) {
      return;
    }

    const now = new Date().toISOString();

    const newWorkItem: WorkItem = {
      id: createTaskId(),
      title: newTitle,
      description: newDescription,
      createdAt: now,
      dueDate: input.dueDate,
      priority: input.priority,
      type: input.type,
      status: input.status,
      severity: input.type === "bug" ? input.severity : undefined,
      subtaskIds: input.type === "epic" ? input.subtaskIds : [],
    };

    taskStorage.createWorkItem(newWorkItem);
    setTasks((prevTasks) => [...prevTasks, newWorkItem]);
  };

  const deleteWorkItem = (id: string) => {
    taskStorage.deleteWorkItem(id);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateWorkItem = (updatedWorkItem: WorkItem) => {
    taskStorage.updateWorkItem(updatedWorkItem);

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedWorkItem.id ? updatedWorkItem : task,
      ),
    );
  };

  return { createWorkItem, deleteWorkItem, tasks, updateWorkItem };
};

export default useWorkItemManager;
