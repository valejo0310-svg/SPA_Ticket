import { renderNavbar }            from "../components/navbar.js";
import { getUsers, deleteUser, updateUser } from "../services/userService.js";
import { openModal }               from "../components/modal.js";

export async function usersPage(app) {
  app.innerHTML = `
    <main class="main-content">
      <div class="page-header">
        <h1>👥 Usuarios</h1>
      </div>
      <div id="userList" class="user-grid">Cargando...</div>
    </main>
  `;
  renderNavbar();
  await renderUsers();
}

async function renderUsers() {
  const users     = await getUsers();
  const container = document.getElementById("userList");
  container.innerHTML = "";

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
    container.appendChild(card);
  });

  // Cambiar rol
  container.querySelectorAll(".btn-edit-role").forEach(btn => {
    btn.addEventListener("click", () => openRoleModal(btn.dataset.id, btn.dataset.role));
  });

  // Eliminar usuario
  container.querySelectorAll(".btn-del").forEach(btn => {
    btn.addEventListener("click", async () => {
      if (confirm("¿Eliminar este usuario?")) {
        await deleteUser(btn.dataset.id);
        await renderUsers();
      }
    });
  });
}

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
    onConfirm: async () => {
      const role = document.getElementById("mRole").value;
      await updateUser(userId, { role });
      await renderUsers();
    }
  });
}