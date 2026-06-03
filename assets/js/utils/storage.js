// Utility functions for managing user session data in localStorage
export function saveSession(user) {
  localStorage.setItem("user", JSON.stringify(user)); // save the user object as a JSON string in localStorage under the key "user"
  localStorage.setItem("loginTime", Date.now().toString()); // save the current timestamp as a string in localStorage under the key "loginTime" to track when the user logged in
}

// Retrieve the user session data from localStorage, 
// parsing the JSON string back into an object, and return it. If no session data is found, return null.
export function getSession() {
  const raw = localStorage.getItem("user"); // get the raw JSON string of the user data from localStorage
  return raw ? JSON.parse(raw) : null; // if the raw data exists, parse it as JSON and return the user object; otherwise, return null to indicate no session is active
}

// Clear the user session data from localStorage by removing the "user" and "loginTime" keys, effectively logging the user out
export function clearSession() {
  localStorage.removeItem("user"); // remove the "user" key from localStorage
  localStorage.removeItem("loginTime");
}