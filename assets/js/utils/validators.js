// Utility functions for validating form inputs such as email format, ticket form fields, and login form fields
export const validateEmail = email =>
  email.includes("@") && email.includes(".");

// Validate the ticket form by checking if the title and description meet minimum length requirements, 
// and return an array of error messages if any validations fail

export function validateTicketForm({ title, description }) {
  const errors = [];
  if (!title || title.trim().length < 3) 
    errors.push("El título debe tener al menos 3 caracteres.");
  if (!description || description.trim().length < 5)
    errors.push("La descripción es muy corta.");
  return errors;
}

// Validate the login form by checking if the email and password meet the required criteria,
//  and return an array of error messages if any validations fail
export function validateLoginForm({ email, password }) {
  const errors = []
  if (!validateEmail(email))   errors.push("Email inválido.");
  if (!password || password.length < 4) errors.push("Contraseña muy corta.");
  return errors;
}