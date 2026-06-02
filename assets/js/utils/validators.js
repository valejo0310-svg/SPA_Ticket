export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateTicketForm({ title, description }) {
  const errors = [];
  if (!title || title.trim().length < 3)
    errors.push("El título debe tener al menos 3 caracteres.");
  if (!description || description.trim().length < 5)
    errors.push("La descripción es muy corta.");
  return errors;
}

export function validateLoginForm({ email, password }) {
  const errors = [];
  if (!validateEmail(email))   errors.push("Email inválido.");
  if (!password || password.length < 4) errors.push("Contraseña muy corta.");
  return errors;
}