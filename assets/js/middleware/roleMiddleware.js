import { getSession } from "../utils/storage.js";

// definition of which roles can access which routes
const ROUTE_PERMISSIONS = {
  "#/dashboard": ["admin", "tecnico", "cliente"], // all roles can access dashboard
  "#/tickets": ["admin", "tecnico", "cliente"], // all roles can access tickets
  "#/users": ["admin"], // only admin can access users
  "#/profile": ["admin", "tecnico", "cliente"], // all roles can access profile
};

// Checks if the current user has permission to access the given route (hash)

export function canAccessRoute(hash) { // Get the current user session
  const user = getSession(); // If no user session exists, deny access
  if (!user) return false; // Get the allowed roles for the given route

  const allowed = ROUTE_PERMISSIONS[hash]; // If the route is not defined in permissions, deny access
  if (!allowed) return false;  // Check if the user's role is included in the allowed roles for the route
  return allowed.includes(user.role); //
}

// Helper functions to check user roles
export const isAdmin   = (user) => user?.role === "admin";
export const isTecnico = (user) => user?.role === "tecnico"; 
export const isCliente = (user) => user?.role === "cliente"; 