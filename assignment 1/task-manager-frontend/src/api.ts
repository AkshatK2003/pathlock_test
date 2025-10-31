import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5260/api/tasks",
});

export const getTasks = () => API.get("/");
export const addTask = (description: string) => API.post("/", { description });
export const toggleTask = (id: number) => API.put(`/${id}/toggle`);
export const deleteTask = (id: number) => API.delete(`/${id}`);
