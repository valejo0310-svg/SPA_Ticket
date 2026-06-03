import { loginPage } from "./pages/login.js";
import { registerPage } from "./pages/register.js";
import { dashboardPage } from "./pages/dashboard.js";
import { ticketsPage } from "./pages/tickets.js";
import { usersPage } from "./pages/users.js";
import { profilePage } from "./pages/profile.js";
import { isAuthenticated } from "./middleware/authMiddleware.js";
import { checkSessionExpiry } from "./middleware/authMiddleware.js";
import { canAccessRoute } from "./middleware/roleMiddleware.js";

// Main router function that handles client-side routing based on the URL hash. It checks for authentication, 
// session expiry, and role-based access control before rendering the appropriate page content.
export async function router() {
  const app   = document.getElementById("app");
  const hash  = window.location.hash || "#/login";

// Route guard para login y register: si el usuario ya tiene sesión activa, redirige al dashboard
  if (hash === "#/login" || hash === "#/register") {
    // if user is authenticated and session is not expired, redirect to dashboard
    if (isAuthenticated() && !checkSessionExpiry()) {
      window.location.hash = "#/dashboard";
      return;
    }
    // if user is not authenticated, show login or register page based on the hash
    if(hash === "#/login"){
      loginPage()
    //else if(hash === "#/register"){
    }else {
      registerPage()
    }
    return; // No need to check permissions or session expiry for login/register pages
  }

  // protected routes: if user is not authenticated, redirect to login
  if (!isAuthenticated()) {
    window.location.hash = "#/login";
    return;
  }

  // Check if session has expired before rendering protected routes.
  //  If expired, the function will handle logout and redirection to login page.
  if (checkSessionExpiry()) {
    // checkSessionExpiry ya hace el logout y redirige
    return;
  }

// Role-based access control: check if the user has permission to access the requested route. If not, show an error message.
  if (!canAccessRoute(hash)) {
    app.innerHTML = `
      <div class="error-page">
        <h1>403 - Acceso denegado</h1>
        <p>No tienes permisos para ver esta página.</p>
        <a href="#/dashboard">Volver al Dashboard</a>
      </div>`;
    return;
  }

// Render the appropriate page content based on the URL hash. If the hash does not match any defined routes, show a 404 error message.
  switch (hash) {
    case "#/dashboard": 
    await dashboardPage(app); 
      break;
    case "#/tickets":   
    await ticketsPage(app);   
      break;
    case "#/users":     
    await usersPage(app);     
      break;
    case "#/profile":   
    await profilePage(app);   
      break;
    default:
      app.innerHTML = `<div class="error-page"><h1>404 - Página no encontrada</h1></div>`;
  }
}