import { router } from "./router.js";

// Listen for hash changes in the URL and call the router function to update the view accordingly.
//  Also, call the router function when the DOM content is fully loaded to render the initial view based on the current URL hash.
window.addEventListener("hashchange", router);
document.addEventListener("DOMContentLoaded", router);