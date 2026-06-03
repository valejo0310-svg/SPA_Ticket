import { renderNavbar } from "../components/navbar.js";
import { ticketCard } from "../components/ticketCard.js";
import { openModal } from "../components/modal.js";
import { getSession } from "../utils/storage.js";
import { isAdmin, isTecnico, isCliente } from "../middleware/roleMiddleware.js";
import { validateTicketForm } from "../utils/validators.js";
import { getTickets, getTicketsByCliente, getTicketsByTecnico, createTicket, updateTicket, deleteTicket, getTecnicos } from "../services/ticketService.js";

export async function ticketsPage(app) {
  const user = getSession();

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
  renderNavbar();

  await renderTickets(user);

  document
    .getElementById("btnNuevoTicket")
    ?.addEventListener("click", () => openCreateModal(user));
}

async function renderTickets(user) {
  let tickets = [];
  if (isAdmin(user)) tickets = await getTickets();
  else if (isTecnico(user)) tickets = await getTicketsByTecnico(user.id);
  else if (isCliente(user)) tickets = await getTicketsByCliente(user.id);
  const tecnicos = await getTecnicos();
  const container = document.getElementById("ticketContainer");
  container.innerHTML = "";

  if (!tickets.length) {
    container.innerHTML = `<p class="empty-state">No hay tickets para mostrar.</p>`;
    return;
  }

  tickets.forEach((ticket) => {
    const tecnico = Object.values(tecnicos).find(
      (u) => String(u.id) === String(ticket.tecnicoId)
    );
    const tecnicoNombre = tecnico ? tecnico.name : "Sin asignar";
    const card = ticketCard(ticket,tecnicoNombre, {
      onEdit: (t) => openEditModal(t),
      onDelete: (id) => confirmDelete(id, user),
    });
    container.appendChild(card);
  });
}

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

      await createTicket({ title, description, priority, tecnicoId: (user.role === "tecnico" ? user.id : ""), clienteId: user.id });
      await renderTickets(user);
    },
  });
}

 async function openEditModal(ticket) {
  const tecnicos = await getTecnicos();
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
    onConfirm: async () => {
      const status    = document.getElementById("mStatus").value;
      const tecnicoId = document.getElementById("mTecnico").value;
      await updateTicket(ticket.id, { status, tecnicoId }); 
      await renderTickets(getSession());
      const user = getSession();
      await renderTickets(user);
    },
  });
}
function listaTecnicos(ticket, users) {
  let opcionesTecnicos = "";
  for (const clave in users) {
    const user = users[clave];
    if (user.role === "tecnico") {
      const selected = String(ticket.tecnicoId) === String(user.id) ? "selected" : "";
      opcionesTecnicos += `<option value="${user.id}" ${selected}>${user.name}</option>`;
    }
  }
  return opcionesTecnicos;
}

async function confirmDelete(id, user) {
  if (confirm("¿Eliminár este ticket?")) {
    await deleteTicket(id);
    await renderTickets(user);
  }
}
