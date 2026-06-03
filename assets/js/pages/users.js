import { renderNavbar } from "../components/navbar.js";
import { getUsers, deleteUser, updateUser } from "../services/userService.js";
import { openModal } from "../components/modal.js";

//  managment for users
export async function usersPage(app) {
  app.innerHTML = `
    <main class="main-content">
      <div class="page-header">
        <h1> Usuarios</h1>
      </div>
      <div id="userList" class="user-grid">Cargando...</div>
    </main>
  `;
  renderNavbar(); 
  await renderUsers(); //load users on page load
}

// reder users list with edit and delete options
async function renderUsers() {
  const users = await getUsers();
  const container = document.getElementById("userList");
  container.innerHTML = "";

  // Create user cards
  users.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <div class="user-info">
        <strong>${user.name}</strong>
        <span>${user.email}</span>
        <span class="badge badge-role-${user.role}">${user.role}</span>
      </div>
      <div class="user-actions">
        <button class="btn btn-sm btn-secondary btn-edit-role" data-id="${user.id}" data-role="${user.role}">
          Cambiar Rol
        </button>
        <button class="btn btn-sm btn-danger btn-del" data-id="${user.id}">
          Eliminar
        </button>
      </div>
    `;
    container.appendChild(card); // Add card to container
  });

  // Edit role
  container.querySelectorAll(".btn-edit-role").forEach(btn => { // Add click event to each edit button
    btn.addEventListener("click", () => 
      openRoleModal(btn.dataset.id, btn.dataset.role)); // Open modal to change role
  });

  // Delete user
  container.querySelectorAll(".btn-del").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (confirm("¿Eliminar este usuario?")) { 
        await deleteUser(btn.dataset.id); // Call delete API
        await renderUsers(); // Refresh user list after deletion
      }
    });
  });
}

// Modal to change user role
function openRoleModal(userId, currentRole) {
  openModal({
    title: "Cambiar Rol",
    content: `
      <div class="form-group">
        <label>Rol</label>
        <select id="mRole" class="input">
          <option value="admin" ${currentRole === "admin" ? "selected" : ""}>Admin</option>
          <option value="tecnico" ${currentRole === "tecnico" ? "selected" : ""}>Técnico</option>
          <option value="cliente" ${currentRole === "cliente" ? "selected" : ""}>Cliente</option>
        </select>
      </div>
    `,
    onConfirm: async () => { // When confirm button is clicked
      const role = document.getElementById("mRole").value; // Get selected role
      await updateUser(userId, { role }); // Call update API to change role
      await renderUsers(); // Refresh user list after role change
    }
  });
}