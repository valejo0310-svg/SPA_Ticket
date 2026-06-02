import { login }            from "../services/authService.js";
import { validateLoginForm } from "../utils/validators.js";
import { loadHTML } from "../utils/helpers.js";
import { renderNavbar } from "../components/navbar.js";

export async function loginPage() {
  const app = document.getElementById("app");

  app.innerHTML = await loadHTML('./assets/js/views/login.html');
  renderNavbar()


  document.getElementById("loginBtn")
    .addEventListener("click", async () => {
      const email    = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const errorDiv = document.getElementById("loginError");

      const errors = validateLoginForm({ email, password });
      if (errors.length) {
        errorDiv.textContent = errors.join(" ");
        errorDiv.classList.remove("hidden");
        return;
      }

      errorDiv.classList.add("hidden");

      const user = await login(email, password);
      if (user) {
        window.location.hash = "#/dashboard";
      } else {
        errorDiv.textContent = "Credenciales incorrectas.";
        errorDiv.classList.remove("hidden");
      }
    });
}