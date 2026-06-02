import { clearSession, getSession } from "../utils/storage.js";

const SESSION_DURATION = 5 * 60 * 1000; // 5 minutos en ms

export function isAuthenticated() {
  return !!getSession();
}

/**
 * Revisa si la sesión expiró.
 * Retorna true si expiró (y hace logout), false si sigue vigente.
 */
export function checkSessionExpiry() {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return true;

  const elapsed = Date.now() - parseInt(loginTime);

  if (elapsed >= SESSION_DURATION) {
    clearSession();
    alert("Tu sesión expiró. Por favor ingresá de nuevo.");
    window.location.hash = "#/login";
    return true;
  }

  // Tiempo restante en consola para debug
  const remaining = Math.floor((SESSION_DURATION - elapsed) / 1000);
  console.log(`[Session] Tiempo restante: ${remaining}s`);

  return false;
}

/**
 * Refresca el timestamp al detectar actividad del usuario.
 * Se llama desde app.js para resetear el contador.
 */
export function refreshSession() {
  if (isAuthenticated()) {
    localStorage.setItem("loginTime", Date.now().toString());
  }
}