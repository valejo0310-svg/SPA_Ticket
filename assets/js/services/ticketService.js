import { dataApi }  from "./httpClient.js";
import { authApi }  from "./httpClient.js";

// ticket service for handling CRUD operations on tickets and fetching technicians
export async function getTickets() {
  const { data } = await dataApi.get("/tickets");  // fetch all tickets from the data API and return the data
  return data;
}

// fetch tickets assigned to a specific client by filtering with clienteId query parameter
export async function getTicketsByCliente(clienteId) {
  const { data } = await dataApi.get(`/tickets?clienteId=${clienteId}`); // fetch tickets for a specific client and return the data
  return data;
}

// fetch tickets assigned to a specific technician by filtering with tecnicoId query parameter
export async function getTicketsByTecnico(tecnicoId) {
  const { data } = await dataApi.get(`/tickets?tecnicoId=${tecnicoId}`); // fetch tickets for a specific technician and return the data
  return data;
}

export async function createTicket(ticket) { // create a new ticket by sending a POST request to the data API with the ticket data, including createdAt timestamp and default status "abierto"
  const { data } = await dataApi.post("/tickets", {
    ...ticket, // spread the ticket object to include all provided fields
    createdAt: new Date().toISOString(), // set the createdAt field to the current date and time in ISO format
    status: "abierto" // set the default status to "abierto" when creating a new ticket
  });
  return data;
}

// update an existing ticket by sending a PATCH request to the data API with the ticket ID and the changes to be applied
export async function updateTicket(id, changes) {
  const { data } = await dataApi.patch(`/tickets/${id}`, changes); // send a PATCH request to update the ticket with the specified ID using the provided changes, and return the updated ticket data
  return data;
}

export async function deleteTicket(id) { // delete a ticket by sending a DELETE request to the data API with the ticket ID
  await dataApi.delete(`/tickets/${id}`); 
}

// fetch all technicians by filtering users with the role "tecnico" from the authentication API and return the data
export async function getTecnicos() {
  const { data } = await authApi.get("/users?role=tecnico");
  return data;
}