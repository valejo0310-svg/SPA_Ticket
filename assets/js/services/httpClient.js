import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" }
});

export const dataApi = axios.create({
  baseURL: "http://localhost:3002",
  headers: { "Content-Type": "application/json" }
});