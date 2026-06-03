import { register } from "../services/authService.js";
import { validateEmail } from "../utils/validators.js";
import { loadHTML } from "../utils/helpers.js";

// page register with form validation and error handling
export async function registerPage() {
  const app = document.getElementById("app");

  app.innerHTML = await loadHTML ('./assets/js/views/registrer.html');

  document.getElementById("regBtn")
  // Event listener for register button
    .addEventListener("click", async () => {
      const name = document.getElementById("regName").value.trim();
      const email  = document.getElementById("regEmail").value.trim();
      const password = document.getElementById("regPassword").value;
      const errDiv  = document.getElementById("regError");
      const sucDiv = document.getElementById("regSuccess");

      errDiv.classList.add("hidden"); 
// Validate form inputs
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
        }, 1500); // Redirect to login after successful registration

      } catch (err) {
        errDiv.textContent = err.message; // Show error message from server
        errDiv.classList.remove("hidden");
      }
    });
}