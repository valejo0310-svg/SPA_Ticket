import { renderNavbar } from "../components/navbar.js";
import { getSession } from "../utils/storage.js";
import { getTickets, getTicketsByCliente, getTicketsByTecnico } from "../services/ticketService.js";
import { isAdmin, isTecnico, isCliente } from "../middleware/roleMiddleware.js";
import { loadHTML } from "../utils/helpers.js";

// page dashboard showing user info and ticket stats based on role
export async function dashboardPage(app) {
  const user = getSession();

  app.innerHTML = await loadHTML('./assets/js/views/dashboard.html');
  renderNavbar(); //renderization of the navbar in the dashboard page
  document.getElementById("userName").textContent = user.name; // Display user name
  document.getElementById("userRole").textContent = user.role; // Display user role

// get tickets based on user role and calculate stats
  let tickets = [];
  if (isAdmin(user)) tickets = await getTickets();// Admin sees all tickets
  else if (isTecnico(user)) tickets = await getTicketsByTecnico(user.id); // Technicians see only their assigned tickets
  else if (isCliente(user)) tickets = await getTicketsByCliente(user.id); // Clients see only their created tickets

// Calculate ticket stats
  const abiertos = tickets.filter(t => t.status === "abierto").length;  
  const enProgreso = tickets.filter(t => t.status === "en progreso").length;
  const cerrados = tickets.filter(t => t.status === "cerrado").length;

// Render stats cards
  document.getElementById("stats").innerHTML = `
    <div class="stat-card">
      <span class="stat-number">${tickets.length}</span>
      <span class="stat-label">Total tickets</span>
    </div>
    <div class="stat-card open">
      <span class="stat-number">${abiertos}</span>
      <span class="stat-label">Abiertos</span>
    </div>
    <div class="stat-card progress">
      <span class="stat-number">${enProgreso}</span>
      <span class="stat-label">En progreso</span>
    </div>
    <div class="stat-card closed">
      <span class="stat-number">${cerrados}</span>
      <span class="stat-label">Cerrados</span>
    </div>
  `;
}