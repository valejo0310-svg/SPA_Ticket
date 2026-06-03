import { formatDate, statusBadge, priorityLabel } from "../utils/helpers.js";
import { isAdmin, isTecnico } from "../middleware/roleMiddleware.js";
import { getSession } from "../utils/storage.js";

// component for rendering a ticket card with conditional buttons based on user role
export function ticketCard(ticket, tecnicoNombre, { onEdit, onDelete}) {
  const user  = getSession(); //get current user session to determine role and permissions
  const card  = document.createElement("div");
  card.className = "ticket-card"; // base class for styling
  card.dataset.id = ticket.id; // store ticket id for reference in event handlers

  // conditionally render edit button for admins and technicians, delete button only for admins
  const editBtn = (isAdmin(user) || isTecnico(user))
    ? `<button class="btn btn-sm btn-secondary btn-edit">Editar estado</button>`
    : "";

  const deleteBtn = isAdmin(user)
    ? `<button class="btn btn-sm btn-danger btn-delete">Eliminar</button>`
    : "";
// set inner HTML of the card with ticket details and conditional buttons
  card.innerHTML = `
    <div class="card-header">
      <h3>${ticket.title}</h3>
      <span class="badge ${statusBadge(ticket.status)}">${ticket.status}</span>
    </div>
    <p>${ticket.description}</p>
    <div class="card-meta">
      <span>${priorityLabel(ticket.priority)}</span>
      <span> ${formatDate(ticket.createdAt)}</span>
      <span> ${tecnicoNombre}</span>
    </div>
    <div class="card-actions">
      ${editBtn}
      ${deleteBtn}
    </div>
  `;

  card.addEventListener("dblclick",() => 
    onEdit(ticket)) // allow double-clicking the card to edit the ticket for easier access
  card.querySelector(".btn-edit")  ?.addEventListener("click", () =>
     onEdit(ticket)); // add click event listener to edit button if it exists
  card.querySelector(".btn-delete")?.addEventListener("click", () => 
    onDelete(ticket.id)); // add click event listener to delete button if it exists

  return card; 
}