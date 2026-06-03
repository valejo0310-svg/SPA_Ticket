import { renderNavbar } from "../components/navbar.js";
import { ticketCard } from "../components/ticketCard.js";
import { openModal } from "../components/modal.js";
import { getSession } from "../utils/storage.js";
import { isAdmin, isTecnico, isCliente } from "../middleware/roleMiddleware.js";
import { validateTicketForm } from "../utils/validators.js";
import { getTickets, getTicketsByCliente, getTicketsByTecnico, createTicket, updateTicket, deleteTicket, getTecnicos } from "../services/ticketService.js";

// page tickets showing list of tickets with role-based access and actions
export async function ticketsPage(app) {
  const user = getSession();

  // Basic page structure with conditional new ticket button
  app.innerHTML = `
    <main class="main-content">
      <div class="page-header">
        <h1>Tickets</h1>
        ${isAdmin(user) || isCliente(user) || isTecnico(user)
      ? `<button id="btnNuevoTicket" class="btn btn-primary">+ Nuevo Ticket</button>`
      : ""
    }
      </div>
      <div id="ticketContainer" class="ticket-grid">Cargando...</div>
    </main>
  `;
  renderNavbar(); // Render navbar after setting up page structure

  await renderTickets(user); // Load and render tickets based on user role
  document .getElementById("btnNuevoTicket") ?.addEventListener("click", () => 
    openCreateModal(user)); // Open modal to create new ticket
}

// Function to fetch and render tickets based on user role
async function renderTickets(user) {
  let tickets = [];
  if (isAdmin(user)) tickets = await getTickets(); // Admin sees all tickets
  else if (isTecnico(user)) tickets = await getTicketsByTecnico(user.id);
  else if (isCliente(user)) tickets = await getTicketsByCliente(user.id);
  // Fetch tecnicos to display their names in the ticket cards
  const tecnicos = await getTecnicos();
  const container = document.getElementById("ticketContainer");
  container.innerHTML = "";
// Show empty state if no tickets are available
  if (!tickets.length) {
    container.innerHTML = `<p class="empty-state">No hay tickets para mostrar.</p>`;
    return;
  }

  // Render each ticket using the ticketCard component, passing tecnico name and action handlers
  tickets.forEach((ticket) => {
    const tecnico = Object.values(tecnicos).find( // Find the tecnico assigned to the ticket
      (u) => String(u.id) === String(ticket.tecnicoId) // Convert to string for comparison, as IDs might be numbers or strings
    );
    const tecnicoNombre = tecnico ? tecnico.name : "Sin asignar"; // Show "Sin asignar" if no tecnico is assigned
    const card = ticketCard(ticket,tecnicoNombre, {  // Pass tecnico name to the card for display
      onEdit: (t) => openEditModal(t), // Open edit modal on edit action
      onDelete: (id) => confirmDelete(id, user), // Confirm and delete ticket on delete action
    });
    container.appendChild(card); // Append the ticket card to the container
  });
}

// Modal for creating a new ticket with form validation and submission

function openCreateModal(user) {
  openModal({
    title: "Nuevo Ticket",
    content: `
      <div class="form-group">
        <label>Título</label>
        <input id="mTitle" class="input" placeholder="Título del ticket">
      </div>
      <div class="form-group">
        <label>Descripción</label>
        <textarea id="mDesc" class="input" rows="3" placeholder="Descripción..."></textarea>
      </div>
      <div class="form-group">
        <label>Prioridad</label>
        <select id="mPriority" class="input">
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>
      <div id="modalError" class="alert alert-error hidden"></div>
    `,

// Validate form and create ticket on confirm
    onConfirm: async () => {
      const title = document.getElementById("mTitle").value.trim();
      const description = document.getElementById("mDesc").value.trim();
      const priority = document.getElementById("mPriority").value;
      const errDiv = document.getElementById("modalError");

      const errors = validateTicketForm({ title, description });
      if (errors.length) {
        errDiv.textContent = errors.join(" ");
        errDiv.classList.remove("hidden");
        return;
      }
// Create the ticket with the form data and user info, then re-render tickets
      await createTicket({ title, description, priority, tecnicoId: (user.role === "tecnico" ? user.id : ""), clienteId: user.id }); // If the user is a tecnico, assign the ticket to themselves; otherwise, leave it unassigned
      await renderTickets(user);
    },
  });
}

// Modal for editing ticket status and assigned tecnico, with dynamic tecnico list and update logic
async function openEditModal(ticket) {
  const tecnicos = await getTecnicos(); // Fetch tecnicos to populate the dropdown in the edit modal
  openModal({
    title: "Editar Estado",
    content: `
      <p><strong>${ticket.title}</strong></p>
      <div class="form-group">
        <label>Tecnico</label>
        <select id="mTecnico" class="input">
        ${listaTecnicos(ticket,tecnicos)}
        </select>
        
        <label>Estado</label>
        <select id="mStatus" class="input">
          <option value="abierto"     ${ticket.status === "abierto" ? "selected" : ""}>Abierto</option>
          <option value="en progreso" ${ticket.status === "en progreso" ? "selected" : ""}>En Progreso</option>
          <option value="cerrado"     ${ticket.status === "cerrado" ? "selected" : ""}>Cerrado</option>
        </select>
      </div>
    `,
    // Update the ticket with the new status and assigned tecnico, then re-render tickets
    onConfirm: async () => {
      const status    = document.getElementById("mStatus").value;
      const tecnicoId = document.getElementById("mTecnico").value;
      await updateTicket(ticket.id, { status, tecnicoId });  // Update the ticket with the new status and assigned tecnico, then re-render tickets. 
      await renderTickets(getSession()); // Re-render tickets after update to reflect changes, using getSession() to ensure we have the latest user info in case of role changes or session updates
      const user = getSession(); // Get the current user session to ensure we have the latest user info for rendering tickets after the update
      await renderTickets(user); // Re-render tickets after update to reflect changes, passing the current user to ensure role-based rendering is accurate
    },
  });
}

// Function to generate options for the tecnico dropdown in the edit modal, marking the currently assigned tecnico as selected
function listaTecnicos(ticket, users) {
  let opcionesTecnicos = "";
  for (const clave in users) { // Iterate over the users to find tecnicos and generate options for the dropdown
    const user = users[clave]; // Get the user object from the users collection
    if (user.role === "tecnico") { // Check if the user is a tecnico to include them in the dropdown options
      const selected = String(ticket.tecnicoId) === String(user.id) ? "selected" : ""; // Mark the option as selected if this tecnico is currently assigned to the ticket, using String() to ensure type consistency in comparison
      opcionesTecnicos += `<option value="${user.id}" ${selected}>${user.name}</option>`; // Append the option for this tecnico to the options string, including the selected attribute if applicable
    }
  }
  return opcionesTecnicos; // Return the generated options for the tecnico dropdown to be included in the edit modal
}

async function confirmDelete(id, user) { // Confirm deletion of a ticket and call the delete service if confirmed, then re-render tickets
  if (confirm("¿Eliminár este ticket?")) {
    await deleteTicket(id); // Call the delete service to remove the ticket by its ID
    await renderTickets(user); // Re-render tickets after deletion to reflect the changes, passing the current user to ensure role-based rendering is accurate
  }
}
