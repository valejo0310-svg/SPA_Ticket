import { login } from "../services/authService.js";
import { validateLoginForm } from "../utils/validators.js";
import { loadHTML } from "../utils/helpers.js";
import { renderNavbar } from "../components/navbar.js";

// page login with form validation and error handling
export async function loginPage() {
  const app = document.getElementById("app");

  app.innerHTML = await loadHTML('./assets/js/views/login.html');
  renderNavbar()


  // Event listener for login button
  document.getElementById("loginBtn") 

    .addEventListener("click", async () => {
      // Get form values
      const email    = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const errorDiv = document.getElementById("loginError");
      // Validate form inputs
      const errors = validateLoginForm({ email, password });
      if (errors.length) {
        errorDiv.textContent = errors.join(" ");
        errorDiv.classList.remove("hidden");
        return;
      }
// Clear previous errors
      errorDiv.classList.add("hidden");
// Attempt login and handle response
      const user = await login(email, password);
      if (user) {
        window.location.hash = "#/dashboard"; // Redirect to dashboard on successful login
      } else {
        errorDiv.textContent = "Credenciales incorrectas."; 
        errorDiv.classList.remove("hidden"); // Show error message on failed login
      }
    });
}