// Helper functions for formatting dates, mapping status to badge classes, mapping priority to labels, and loading HTML templates
export function formatDate(isoString) {
  const d = new Date(isoString); // create a Date object from the ISO string
  return d.toLocaleDateString("es-AR", { // format the date in "day/month/year hour:minute" format for Spanish (Argentina) locale
    day: "2-digit", month: "2-digit", year: "numeric", // specify the date format with 2-digit day and month, and numeric year
    hour: "2-digit", minute: "2-digit" // specify the time format with 2-digit hour and minute
  });
}

// Map status values to corresponding badge CSS classes for styling
export function statusBadge(status) {
  const map = {
    "abierto": "badge-open", 
    "en progreso": "badge-progress",
    "cerrado": "badge-closed",
  };
  return map[status] || "badge-open"; // return the corresponding badge class based on the status, defaulting to "badge-open" if the status is not recognized
}

// Map priority values to corresponding labels for display
export function priorityLabel(priority) {
  const map = {
    "alta": "Alta",
    "media": "Media",
    "baja": "Baja",
  };
  return map[priority] || priority; // return the corresponding label based on the priority, defaulting to the original priority value if it is not recognized
}

// Load an HTML template from the specified path and return it as a string, handling errors gracefully
export async function loadHTML(path) {
    try {
        const response = await fetch(path); // fetch the HTML file from the specified path
        if (!response.ok) {
          throw new Error(`Error cargando HTML: ${path}`); // throw an error if the response is not successful, including the path of the HTML file that failed to load
        }
        return await response.text();
    } catch (error) {
      console.error(error);
      return '<h2>Error cargando contenido</h2>';
    }
}