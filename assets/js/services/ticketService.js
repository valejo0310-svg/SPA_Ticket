import { dataApi }  from "./httpClient.js";
import { authApi }  from "./httpClient.js";

export async function getTickets() {
  const { data } = await dataApi.get("/tickets");
  return data;
}

export async function getTicketsByCliente(clienteId) {
  const { data } = await dataApi.get(`/tickets?clienteId=${clienteId}`);
  return data;
}

export async function getTicketsByTecnico(tecnicoId) {
  const { data } = await dataApi.get(`/tickets?tecnicoId=${tecnicoId}`);
  return data;
}

export async function createTicket(ticket) {
  const { data } = await dataApi.post("/tickets", {
    ...ticket,
    createdAt: new Date().toISOString(),
    status: "abierto"
    
  });
  return data;
}

export async function updateTicket(id, changes) {
  const { data } = await dataApi.patch(`/tickets/${id}`, changes);
  return data;
}

export async function deleteTicket(id) {
  await dataApi.delete(`/tickets/${id}`);
}

// Trae los técnicos desde auth-server para asignar en tickets
export async function getTecnicos() {
  const { data } = await authApi.get("/users?role=tecnico");
  return data;
}