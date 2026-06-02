import { authApi }               from "./httpClient.js";
import { saveSession, clearSession } from "../utils/storage.js";

export async function login(email, password) {
  try {
    const { data } = await authApi.get(
      `/users?email=${email}&password=${password}`
    );
    const user = data[0];
    if (user) saveSession(user);
    return user || null;
  } catch (err) {
    console.error("[AuthService] login:", err);
    return null;
  }
}

export async function register(userData) {
  try {
    const check = await authApi.get(`/users?email=${userData.email}`);
    if (check.data.length > 0) throw new Error("Email ya registrado");

    const { data } = await authApi.post("/users", {
      ...userData,
      role: "cliente"  // nuevos usuarios siempre son clientes
    });
    return data;
  } catch (err) {
    console.error("[AuthService] register:", err);
    throw err;
  }
}

export function logout() {
  clearSession();
  window.location.hash = "#/login";
}