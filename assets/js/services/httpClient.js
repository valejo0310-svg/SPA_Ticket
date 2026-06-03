import axios from "axios";

// create two axios instances for authentication and data APIs with base URLs and JSON content type headers
export const authApi = axios.create({
  baseURL: "http://localhost:3001", // base URL for authentication API
  headers: { "Content-Type": "application/json" } // set default content type to JSON for all requests made with this instance
});

// data API instance for handling CRUD operations on users, tickets, and other resources
export const dataApi = axios.create({ 
  baseURL: "http://localhost:3002",
  headers: { "Content-Type": "application/json" }
});