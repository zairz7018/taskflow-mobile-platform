import apiClient from "./apiClient";
import type { TaskRequest, TaskResponse } from "../types/task";

export const taskApi = {
  async createTask(request: TaskRequest): Promise<TaskResponse> {
    console.log("[api] POST /tasks", request);
    const response = await apiClient.post<TaskResponse>("/tasks", request);
    return response.data;
  },

  async getMyTasks(): Promise<TaskResponse[]> {
    console.log("[api] GET /tasks/my-tasks");
    const response = await apiClient.get<TaskResponse[]>("/tasks/my-tasks");
    return response.data;
  },

  async updateTask(id: number, request: TaskRequest): Promise<TaskResponse> {
    console.log("[api] PUT /tasks/{id}", { id, ...request });
    const response = await apiClient.put<TaskResponse>(`/tasks/${id}`, request);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    console.log("[api] DELETE /tasks/{id}", { id });
    await apiClient.delete(`/tasks/${id}`);
  },

  async getAvailableTasks(): Promise<TaskResponse[]> {
    console.log("[api] GET /tasks/available");
    const response = await apiClient.get<TaskResponse[]>("/tasks/available");
    return response.data;
  },

  async takeTask(id: number): Promise<TaskResponse> {
    console.log("[api] PUT /tasks/{id}/take", { id });
    const response = await apiClient.put<TaskResponse>(`/tasks/${id}/take`);
    return response.data;
  },

  async getMyAssignedTasks(): Promise<TaskResponse[]> {
    console.log("[api] GET /tasks/my-assigned-tasks");
    const response = await apiClient.get<TaskResponse[]>(
      "/tasks/my-assigned-tasks"
    );
    return response.data;
  },

  async updateTaskStatus(id: number, status: "EN_COURS" | "TERMINEE") {
    console.log("[api] PUT /tasks/{id}/status", { id, status });
    const response = await apiClient.put<TaskResponse>(`/tasks/${id}/status`, {
      status,
    });
    return response.data;
  },

  async closeTask(id: number): Promise<TaskResponse> {
    console.log("[api] PUT /tasks/{id}/close", { id });
    const response = await apiClient.put<TaskResponse>(`/tasks/${id}/close`);
    return response.data;
  },
};
