import { renderNavbar }  from "../components/navbar.js";
import { getSession }    from "../utils/storage.js";
import { updateUser }    from "../services/userService.js";
import { saveSession }   from "../utils/storage.js";
import { loadHTML } from "../utils/helpers.js";

export async function profilePage(app) {
  const user = getSession();

  app.innerHTML = await loadHTML ('./assets/js/views/profile.html');
  renderNavbar();
  document.getElementById("profName").value = user.name;
  document.getElementById("input1").value = user.email;
  document.getElementById("input2").value = user.role;


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