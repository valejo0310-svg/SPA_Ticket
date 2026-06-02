/**
 * Router SPA
 */

import { renderHome } from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderAbout } from './pages/about.js';
import {renderEpisodes} from './pages/episodes.js';
import { renderLocations} from '../js/pages/location.js'
import { renderAddCharacter } from './pages/add.js';
/**
 * Rutas disponibles
 */
const routes = {
    '/': renderHome,
    '/contacts': renderContacts,
    '/about': renderAbout,
    '/episodes':renderEpisodes,
    '/locations': renderLocations,
    '/new': renderAddCharacter
};

/**
 * Router principal
 */
export async function router() {

    // Obtiene ruta real
    const path = window.location.pathname;
    // Busca render
    const render = routes[path];
    if (render) {
        await render();
    } else {
        document.getElementById('content').innerHTML = `
            <section>
                <h2>404 - Página no encontrada</h2>
            </section>
        `;
    }
}