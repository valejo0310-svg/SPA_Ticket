
import { loadHTML } from '../utils/helpers.js';
import { getLocations } from '../services/api.js';
import {locationCard} from '../components/locationCard.js'



/**
 * Renderiza Home
 */
export async function renderLocations() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/locations.html'
    );
    const container = document.getElementById(
        'locations-container'
    );
    const keylocations = localStorage.getItem('db_locations')
    const locations = JSON.parse(keylocations)
    container.innerHTML = locations
        .map(location => locationCard(location))
        .join('');
}