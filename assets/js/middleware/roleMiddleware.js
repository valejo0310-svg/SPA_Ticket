import { getSession } from "../utils/storage.js";

// Mapa de rutas y qué roles pueden acceder
const ROUTE_PERMISSIONS = {
  "#/dashboard": ["admin", "tecnico", "cliente"],
  "#/tickets": ["admin", "tecnico", "cliente"],
  "#/users": ["admin"],
  "#/profile": ["admin", "tecnico", "cliente"],
};

export function canAccessRoute(hash) {
  const user = getSession();
  if (!user) return false;

  const allowed = ROUTE_PERMISSIONS[hash];
  if (!allowed) return false;               // ruta desconocida → sin acceso
  return allowed.includes(user.role);
}

// Helpers reutilizables en páginas/componentes
export const isAdmin   = (user) => user?.role === "admin";
export const isTecnico = (user) => user?.role === "tecnico";
export const isCliente = (user) => user?.role === "cliente";