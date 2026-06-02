import { login }            from "../services/authService.js";
import { validateLoginForm } from "../utils/validators.js";

export function loginPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h1>TicketSPA</h1>
        <h2>Iniciar Sesión</h2>

        <div id="loginError" class="alert alert-error hidden"></div>

        <div class="form-group">
          <label>Email</label>
          <input id="loginEmail" type="email" placeholder="admin@test.com" class="input">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input id="loginPassword" type="password" placeholder="••••••" class="input">
        </div>
        <button id="loginBtn" class="btn btn-primary btn-full">Ingresar</button>

        <p class="auth-footer">
          ¿No tenés cuenta? <a href="#/register">Registrate</a>
        </p>

        <div class="demo-credentials">
          <p><strong>Demo:</strong></p>
          <p>Admin: admin@test.com / 123456</p>
          <p>Técnico: juan@test.com / 123456</p>
          <p>Cliente: maria@test.com / 123456</p>
        </div>
      </div>
    </div>
  `;

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