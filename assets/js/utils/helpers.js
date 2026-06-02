export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("es-AR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

export function statusBadge(status) {
  const map = {
    "abierto":     "badge-open",
    "en progreso": "badge-progress",
    "cerrado":     "badge-closed",
  };
  return map[status] || "badge-open";
}

export function priorityLabel(priority) {
  const map = {
    "alta":  "🔴 Alta",
    "media": "🟡 Media",
    "baja":  "🟢 Baja",
  };
  return map[priority] || priority;
}