import { renderNavbar } from "../components/navbar.js";
import { getSession } from "../utils/storage.js";
import { getTickets, getTicketsByCliente, getTicketsByTecnico } from "../services/ticketService.js";
import { isAdmin, isTecnico, isCliente } from "../middleware/roleMiddleware.js";
import { loadHTML } from "../utils/helpers.js";

export async function dashboardPage(app) {
  const user = getSession();

  app.innerHTML = await loadHTML('./assets/js/views/dashboard.html');
  renderNavbar();
  document.getElementById("userName").textContent = user.name;
  document.getElementById("userRole").textContent = user.role;

  // Obtener tickets según el rol
  let tickets = [];
  if      (isAdmin(user))   tickets = await getTickets();
  else if (isTecnico(user)) tickets = await getTicketsByTecnico(user.id);
  else if (isCliente(user)) tickets = await getTicketsByCliente(user.id);

  const abiertos    = tickets.filter(t => t.status === "abierto").length;
  const enProgreso  = tickets.filter(t => t.status === "en progreso").length;
  const cerrados    = tickets.filter(t => t.status === "cerrado").length;

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