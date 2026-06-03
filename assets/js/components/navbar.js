import { logout } from "../services/authService.js";
import { getSession } from "../utils/storage.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

export function renderNavbar() {
  const user = getSession();
  if (!user) return;

  const adminLinks = isAdmin(user)
    ? `<a href="#/users" class="nav-link">Usuarios</a>`
    : "";

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML = `<nav class="navbar">
  <div class="navbar-container">
    <div class="nav-brand">TicketSPA</div>
    
    <div class="nav-links">
      <a href="#/dashboard" class="nav-link">Dashboard</a>
      <a href="#/tickets"   class="nav-link">Tickets</a>
      ${adminLinks}
      <a href="#/profile"   class="nav-link">Perfil</a>
    </div>
    
    <div class="nav-user">
      <span class="user-name">${user.name}</span>
      <button id="logoutBtn" class="btn-logout">Salir</button>
    </div>
  </div>
</nav>

  `;

  document.getElementById("app").prepend(nav);

document.getElementById("logoutBtn")
    .addEventListener("click", () => {
       let logoutS = confirm("are you sure you want to logout?");
       if (logoutS) {
           logout(); 
       }
    });

}