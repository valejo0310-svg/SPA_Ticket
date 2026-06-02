import { router } from "./router.js";

// Escucha cambios de hash para navegación SPA
window.addEventListener("hashchange", router);
document.addEventListener("DOMContentLoaded", router);