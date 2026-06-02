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


export async function loadHTML(path) {

    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Error cargando HTML: ${path}`);
        }
        return await response.text();
    } catch (error) {
        console.error(error);
        return '<h2>Error cargando contenido</h2>';
    }
}