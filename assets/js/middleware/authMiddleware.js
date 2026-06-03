import { clearSession, getSession } from "../utils/storage.js";

const SESSION_DURATION = 5 * 60 * 1000; // 5 minuts in milliseconds

// Middleware for authentication and session management
export function isAuthenticated() {
  return !!getSession(); // Check if user session exists
}

/*
 * Checks if the session has expired based on the login timestamp.
 * If expired, it clears the session, alerts the user, and redirects to login.
 * Returns true if the session is expired, false otherwise.
 */

export function checkSessionExpiry() {
  const loginTime = localStorage.getItem("loginTime");
  if (!loginTime) return true; // No login time means no session, treat as expired
  const elapsed = Date.now() - parseInt(loginTime); // Time elapsed since login in milliseconds

  if (elapsed >= SESSION_DURATION) { 
    clearSession(); 
    alert("Tu sesión expiró. Por favor ingresá de nuevo.");
    window.location.hash = "#/login"; // Redirect to login page
    return true; // Session is expired
  }

// For debugging: log remaining time in seconds
  const remaining = Math.floor((SESSION_DURATION - elapsed) / 1000); // Remaining time in seconds
  console.log(`[Session] Tiempo restante: ${remaining}s`); // Session is still valid

  return false; // Session is still valid
}

/**
 * Refreshes the session by updating the login timestamp in localStorage.
 * This should be called on user activity to prevent session expiration while the user is active.
 * Only refreshes if the user is currently authenticated to avoid creating a session for unauthenticated users.
 */
export function refreshSession() { 
  if (isAuthenticated()) { // Only refresh if the user is authenticated
    localStorage.setItem("loginTime", Date.now().toString()); // Update the login timestamp to the current time

  }
}