import { loadHTML } from '../utils/helpers.js';
import { episodeCard, btnCardEpisodes } from '../components/episodeCard.js';


/**
 * Renderiza Home
 */
export async function renderEpisodes() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/episodes.html'
    );
    const container = document.getElementById(
        'episodes-container'
    );
    
    const keyepisodes = localStorage.getItem('db_episodes')
    const episodes = JSON.parse(keyepisodes)
    container.innerHTML = episodes
        .map(episode => episodeCard(episode))
        .join('');
        btnCardEpisodes()
}