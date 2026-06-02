export function saveSession(user) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("loginTime", Date.now().toString());
}

export function getSession() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem("user");
  localStorage.removeItem("loginTime");
}