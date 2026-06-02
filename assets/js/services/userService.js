import { authApi } from "./httpClient.js";

export async function getUsers() {
  const { data } = await authApi.get("/users");
  return data;
}

export async function getUserById(id) {
  const { data } = await authApi.get(`/users/${id}`);
  return data;
}

export async function updateUser(id, changes) {
  const { data } = await authApi.patch(`/users/${id}`, changes);
  return data;
}

export async function deleteUser(id) {
  await authApi.delete(`/users/${id}`);
}