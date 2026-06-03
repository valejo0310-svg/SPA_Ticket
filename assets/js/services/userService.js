import { authApi } from "./httpClient.js";

// user service for handling CRUD operations on users
export async function getUsers() {
  const { data } = await authApi.get("/users"); // fetch all users from the authentication API and return the data
  return data;
}

// fetch a specific user by ID from the authentication API and return the data
export async function getUserById(id) {
  const { data } = await authApi.get(`/users/${id}`); //  fetch a user by ID from the authentication API and return the data
  return data;
}

// update an existing user by sending a PATCH request to the authentication API with the
//  user ID and the changes to be applied, and return the updated user data
export async function updateUser(id, changes) {
  const { data } = await authApi.patch(`/users/${id}`, changes); // send a PATCH request to update the user with the specified ID using the provided changes, and return the updated user data
  return data;
}

// delete a user by sending a DELETE request to the authentication API with the user ID
export async function deleteUser(id) {
  await authApi.delete(`/users/${id}`); // send a DELETE request to delete the user with the specified ID from the authentication API
}