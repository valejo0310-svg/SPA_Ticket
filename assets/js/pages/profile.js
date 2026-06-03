import { renderNavbar }  from "../components/navbar.js";
import { getSession }    from "../utils/storage.js";
import { updateUser }    from "../services/userService.js";
import { saveSession }   from "../utils/storage.js";
import { loadHTML } from "../utils/helpers.js";

// page profile showing user info and allowing name update with validation and feedback
export async function profilePage(app) {
  const user = getSession();

  app.innerHTML = await loadHTML ('./assets/js/views/profile.html');
  renderNavbar();
  // Pre-fill form with current user info
  document.getElementById("profName").value = user.name;
  document.getElementById("input1").value = user.email;
  document.getElementById("input2").value = user.role;


  document.getElementById("saveProfile")
// Event listener for save profile button
    .addEventListener("click", async () => {
      // Get form values
      const name   = document.getElementById("profName").value.trim();
      const msgDiv = document.getElementById("profMsg");
// Validate name input
      if (!name) {
        msgDiv.textContent = "El nombre no puede estar vacío.";
        msgDiv.className = "alert alert-error";
        return;
      }
// Update user profile and handle response
const updated = await updateUser(user.id, { name });
// If update is successful, update session and show success message
if (updated) saveSession({ ...user, name: updated.name }); // Update session with new name
      msgDiv.textContent = "¡Perfil actualizado!"; // Show success message
      msgDiv.className = "alert alert-success"; // Set success message class
    });
}