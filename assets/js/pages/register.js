import { register }         from "../services/authService.js";
import { validateEmail }    from "../utils/validators.js";

export function registerPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h1>TicketSPA</h1>
        <h2>Crear Cuenta</h2>

        <div id="regError"   class="alert alert-error   hidden"></div>
        <div id="regSuccess" class="alert alert-success hidden"></div>

        <div class="form-group">
          <label>Nombre</label>
          <input id="regName" type="text" placeholder="Tu nombre" class="input">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input id="regEmail" type="email" placeholder="tu@email.com" class="input">
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input id="regPassword" type="password" placeholder="••••••" class="input">
        </div>
        <button id="regBtn" class="btn btn-primary btn-full">Registrarse</button>
        <p class="auth-footer">
          ¿Ya tenés cuenta? <a href="#/login">Ingresá</a>
        </p>
      </div>
    </div>
  `;

  document.getElementById("regBtn")
    .addEventListener("click", async () => {
      const name     = document.getElementById("regName").value.trim();
      const email    = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const errDiv   = document.getElementById("regError");
      const sucDiv   = document.getElementById("regSuccess");

      errDiv.classList.add("hidden");

      if (!name)                 { errDiv.textContent = "Nombre requerido.";       errDiv.classList.remove("hidden"); return; }
      if (!validateEmail(email)) { errDiv.textContent = "Email inválido.";         errDiv.classList.remove("hidden"); return; }
      if (password.length < 4)   { errDiv.textContent = "Contraseña muy corta.";   errDiv.classList.remove("hidden"); return; }

      try {
        await register({ name, email, password });
        sucDiv.textContent = "¡Cuenta creada! Redirigiendo...";
        sucDiv.classList.remove("hidden");
        setTimeout(() => { window.location.hash = "#/login"; }, 1500);
      } catch (err) {
        errDiv.textContent = err.message;
        errDiv.classList.remove("hidden");
      }
    });
}