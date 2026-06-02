import { renderNavbar }  from "../components/navbar.js";
import { getSession }    from "../utils/storage.js";
import { updateUser }    from "../services/userService.js";
import { saveSession }   from "../utils/storage.js";

export async function profilePage(app) {
  const user = getSession();

  app.innerHTML = `
    <main class="main-content">
      <h1>Mi Perfil</h1>
      <div class="auth-card profile-card">
        <div class="form-group">
          <label>Nombre</label>
          <input id="profName" class="input" value="${user.name}">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="input" value="${user.email}" disabled>
        </div>
        <div class="form-group">
          <label>Rol</label>
          <input class="input" value="${user.role}" disabled>
        </div>
        <div id="profMsg" class="alert hidden"></div>
        <button id="saveProfile" class="btn btn-primary">Guardar cambios</button>
      </div>
    </main>
  `;
  renderNavbar();

  document.getElementById("saveProfile")
    .addEventListener("click", async () => {
      const name   = document.getElementById("profName").value.trim();
      const msgDiv = document.getElementById("profMsg");

      if (!name) {
        msgDiv.textContent = "El nombre no puede estar vacío.";
        msgDiv.className = "alert alert-error";
        return;
      }

const updated = await updateUser(user.id, { name });
if (updated) saveSession({ ...user, name: updated.name });

      msgDiv.textContent = "¡Perfil actualizado!";
      msgDiv.className = "alert alert-success";
    });
}