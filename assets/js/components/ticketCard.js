import { formatDate, statusBadge, priorityLabel } from "../utils/helpers.js";
import { isAdmin, isTecnico }                      from "../middleware/roleMiddleware.js";
import { getSession }                              from "../utils/storage.js";

export function ticketCard(ticket, tecnicoNombre, { onEdit, onDelete}) {
  
  const user  = getSession();
  const card  = document.createElement("div");
  card.className = "ticket-card";
  card.dataset.id = ticket.id;

  // Botones condicionales por rol
  const editBtn = (isAdmin(user) || isTecnico(user))
    ? `<button class="btn btn-sm btn-secondary btn-edit">✏️ Editar estado</button>`
    : "";

  const deleteBtn = isAdmin(user)
    ? `<button class="btn btn-sm btn-danger btn-delete">🗑️ Eliminar</button>`
    : "";

  card.innerHTML = `
    <div class="card-header">
      <h3>${ticket.title}</h3>
      <span class="badge ${statusBadge(ticket.status)}">${ticket.status}</span>
    </div>
    <p>${ticket.description}</p>
    <div class="card-meta">
      <span>${priorityLabel(ticket.priority)}</span>
      <span>📅 ${formatDate(ticket.createdAt)}</span>
      <span>🔧 ${tecnicoNombre}</span>
    </div>
    <div class="card-actions">
      ${editBtn}
      ${deleteBtn}
    </div>
  `;

  card.querySelector(".btn-edit")  ?.addEventListener("click", () => onEdit(ticket));
  card.querySelector(".btn-delete")?.addEventListener("click", () => onDelete(ticket.id));

  return card;
}