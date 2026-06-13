import { z } from "zod";
import type { WorkItem } from "../../types/task";
import type { WorkItemStorage } from "./workItem-storage.interface";

const TASKS_STORAGE_KEY = "tasks.v1";

const baseFields = {
  id: z.string(),
  title: z.string(),
  createdAt: z.string(),
};

const WorkItemsSchema = z.array(
  z.discriminatedUnion("type", [
    z.looseObject({ ...baseFields, type: z.literal("task") }),
    z.looseObject({ ...baseFields, type: z.literal("bug") }),
    z.looseObject({ ...baseFields, type: z.literal("epic") }),
  ]),
) satisfies z.ZodType<WorkItem[]>;

export const createLocalStorageWorkItemStorage = (): WorkItemStorage => {
  const readWorkItems = (): WorkItem[] => {
    try {
      const raw = localStorage.getItem(TASKS_STORAGE_KEY);
      if (!raw) return [];
      const result = WorkItemsSchema.safeParse(JSON.parse(raw));
      return result.success ? result.data : [];
    } catch {
      return [];
    }
  };

  const writeWorkItems = (tasks: WorkItem[]): void => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  };

  return {
    getWorkItems(): WorkItem[] {
      return readWorkItems();
    },

    createWorkItem(task: WorkItem): void {
      writeWorkItems([...readWorkItems(), task]);
    },

    updateWorkItem(task: WorkItem): void {
      writeWorkItems(readWorkItems().map((t) => (t.id === task.id ? task : t)));
    },

    deleteWorkItem(id: string): void {
      writeWorkItems(readWorkItems().filter((task) => task.id !== id));
    },
  };
};
