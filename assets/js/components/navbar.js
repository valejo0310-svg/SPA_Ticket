import { logout }      from "../services/authService.js";
import { getSession }  from "../utils/storage.js";
import { isAdmin }     from "../middleware/roleMiddleware.js";

export function renderNavbar() {
  const user = getSession();
  if (!user) return;

  const adminLinks = isAdmin(user)
    ? `<a href="#/users" class="nav-link">Usuarios</a>`
    : "";

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `
    <div class="nav-brand">TicketSPA</div>
    <div class="nav-links">
      <a href="#/dashboard" class="nav-link">Dashboard</a>
      <a href="#/tickets"   class="nav-link">Tickets</a>
      ${adminLinks}
      <a href="#/profile"   class="nav-link">Perfil</a>
    </div>
    <div class="nav-user">
      
      <span>${user.name}</span>
      <button id="logoutBtn" class="btn btn-danger btn-sm">Salir</button>
    </div>
  `;

  document.getElementById("app").prepend(nav);

  document.getElementById("logoutBtn")
    .addEventListener("click", logout);
}