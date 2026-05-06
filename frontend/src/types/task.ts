export type TaskStatus =
  | "EN_ATTENTE"
  | "PRISE_EN_CHARGE"
  | "EN_COURS"
  | "TERMINEE"
  | "ANNULEE";

export type TaskPriority = "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";

export interface TaskRequest {
  title: string;
  description?: string | null;
  priority?: TaskPriority | null;
  deadline?: string | null;
}

export interface TaskResponse {
  id: number;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdByName: string;
  assignedToId?: number | null;
  assignedToName?: string | null;
}

