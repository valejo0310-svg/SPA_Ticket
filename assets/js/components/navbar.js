import { logout } from "../services/authService.js";
import { getSession } from "../utils/storage.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
//this component is responsible for rendering the navigation bar and handling user

export function renderNavbar() {
  const user = getSession(); // get user session to display user info and conditionally render admin links
  if (!user) return;
// Conditionally render admin links based on user role
  const adminLinks = isAdmin(user)
    ? `<a href="#/users" class="nav-link">Usuarios</a>` // only show this link if user is admin
    : "";
// Create nav element and set its innerHTML to the navbar structure. 
// The links are dynamic based on the user's role (admin or not)
  const nav = document.createElement("nav"); 

  nav.className = "navbar"; // class for styling the navbar, defined in styles.css
  nav.innerHTML = `<nav class="navbar">
  <div class="navbar-container">
    <div class="nav-brand">TicketSPA</div>
    <button class="menu-toggle">☰</button>

    <div class="nav-links">
      <a href="#/dashboard" class="nav-link">Dashboard</a>
      <a href="#/tickets"   class="nav-link">Tickets</a>
      ${adminLinks}
      <a href="#/profile"   class="nav-link">Perfil</a>
    
      <span class="user-name">${user.name}</span>
      <button id="logoutBtn" class="btn-logout">Salir</button>
    </div>
  </div>
    </div>
    
    
</nav>

  `;

document.getElementById("app").prepend(nav); // prepend nav to the app container so it appears on top of the page

document.getElementById("logoutBtn")



// Add event listener to logout button to handle user logout when clicked
    .addEventListener("click", () => { 
      let logoutS = confirm("are you sure you want to logout?");
      if (logoutS) {
          logout();  // call logout function from authService to clear session and redirect to login page
    }
    });
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');


toggle.addEventListener('click', () => {
  links.classList.toggle('active');

});

}