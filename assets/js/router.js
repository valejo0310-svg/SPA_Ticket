import { loginPage }     from "./pages/login.js";
import { registerPage }  from "./pages/register.js";
import { dashboardPage } from "./pages/dashboard.js";
import { ticketsPage }   from "./pages/tickets.js";
import { usersPage }     from "./pages/users.js";
import { profilePage }   from "./pages/profile.js";

import { isAuthenticated }        from "./middleware/authMiddleware.js";
import { checkSessionExpiry }     from "./middleware/authMiddleware.js";
import { canAccessRoute }         from "./middleware/roleMiddleware.js";

export async function router() {
  const app   = document.getElementById("app");
  const hash  = window.location.hash || "#/login";

  // ── Rutas públicas ──────────────────────────────────────────
  if (hash === "#/login" || hash === "#/register") {
    // Si ya tiene sesión activa, redirige al dashboard
    if (isAuthenticated() && !checkSessionExpiry()) {
      window.location.hash = "#/dashboard";
      return;
    }
    if(hash === "#/login"){
      loginPage()
    }else{
      registerPage()
    }
    return;
  }

  // ── Verificación de sesión ──────────────────────────────────
  if (!isAuthenticated()) {
    window.location.hash = "#/login";
    return;
  }

  // ── Verificación de expiración (5 minutos) ──────────────────
  if (checkSessionExpiry()) {
    // checkSessionExpiry ya hace el logout y redirige
    return;
  }

  // ── Verificación de permisos por rol ────────────────────────
  if (!canAccessRoute(hash)) {
    app.innerHTML = `
      <div class="error-page">
        <h1>403 - Acceso denegado</h1>
        <p>No tienes permisos para ver esta página.</p>
        <a href="#/dashboard">Volver al Dashboard</a>
      </div>`;
    return;
  }

  // ── Renderizado de página ────────────────────────────────────
  switch (hash) {
    case "#/dashboard": await dashboardPage(app); break;
    case "#/tickets":   await ticketsPage(app);   break;
    case "#/users":     await usersPage(app);     break;
    case "#/profile":   await profilePage(app);   break;
    default:
      app.innerHTML = `<div class="error-page"><h1>404 - Página no encontrada</h1></div>`;
  }
}