import { register } from "../services/authService.js";
import { validateEmail } from "../utils/validators.js";
import { loadHTML } from "../utils/helpers.js";

export async function registerPage() {
  const app = document.getElementById("app");

  app.innerHTML = await loadHTML ('./assets/js/views/registrer.html');

  document.getElementById("regBtn")
    .addEventListener("click", async () => {
      const name = document.getElementById("regName").value.trim();
      const email  = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const errDiv  = document.getElementById("regError");
      const sucDiv = document.getElementById("regSuccess");

      errDiv.classList.add("hidden");

      if (!name) { 
        errDiv.textContent = "Nombre requerido."; 
        errDiv.classList.remove("hidden"); 
        return
      }
      if (!validateEmail(email)) { 
        errDiv.textContent = "Email inválido."; 
        errDiv.classList.remove("hidden"); 
        return
      }
      if (password.length < 4) { 
        errDiv.textContent = "Contraseña muy corta."; 
        errDiv.classList.remove("hidden"); 
        return
      }

      try {
        await register({ name, email, password });

          sucDiv.textContent = "¡Cuenta creada! Redirigiendo...";
          sucDiv.classList.remove("hidden");
        setTimeout(() => { 
          window.location.hash = "#/login"; 
        }, 1500);

      } catch (err) {
        errDiv.textContent = err.message;
        errDiv.classList.remove("hidden");
      }
    });
}