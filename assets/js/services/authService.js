import { authApi }  from "./httpClient.js";
import { saveSession, clearSession } from "../utils/storage.js";

// authentication service for handling login, registration, and logout
export async function login(email, password) { // login with email and password
  try {
    const { data } = await authApi.get( // fetch user with matching email and password
      `/users?email=${email}&password=${password}` // query parameters for filtering users by email and password
    );
    const user = data[0]; // if a user is found, save the session and return the user data; otherwise, return null
    if (user) saveSession(user); // save user session to local storage
    return user || null; // return user data if found, otherwise return null
  } catch (err) {
    console.error("[AuthService] login:", err);
    return null;
  }
}

// registration function to create a new user account
export async function register(userData) {
  try {
    const check = await authApi.get(`/users?email=${userData.email}`); // check if the email is already registered by querying users with the same email
    if (check.data.length > 0) throw new Error("Email ya registrado"); // if a user with the same email exists, throw an error

    const { data } = await authApi.post("/users", {
      ...userData, // spread the userData object to include all provided fields
      role: "cliente"  // set the default role to "cliente" for new users
    });
    return data; // return the newly created user data
  } catch (err) {
    console.error("[AuthService] register:", err); 
    throw err;
  }
}

// logout function to clear the user session and redirect to the login page
export function logout() {
  clearSession(); // clear user session from local storage
  window.location.hash = "#/login"; 
}