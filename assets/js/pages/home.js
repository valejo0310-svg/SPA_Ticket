import { loadHTML } from '../utils/helpers.js';
import { characterCard } from '../components/characterCard.js';
import { deleteCharacter, updateCharacter } from '../services/api.js';
import { saveAllData } from '../services/api.js';

/**
 * Renderiza Home
 */

export async function renderHome() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML('./assets/js/views/home.html');


    renderCharacters(); // función separada para poder re-renderizar
    const recargarApi = document.getElementById('recargar-Api');
    recargarApi.addEventListener('click', async () => {
        const estaSeguro = confirm("¿Estás seguro de que deseas restablecer los datos de la api? Se perderan todos los cambios realizados.");
        if (!estaSeguro) {
        return false;
    }
        await saveAllData();
        renderCharacters(); // re-renderiza sin recargar la página
    });

    const container = document.getElementById('characters-container');
    const modal     = document.getElementById('edit-modal');
    const form      = document.getElementById('edit-form');
    const cancelBtn = document.getElementById('cancel-edit');

    let editingId = null; // guardamos el id del personaje que se está editando

    // ── Delegación de eventos en las cards ──────────────────────
    container.addEventListener('click', (e) => {

        // ELIMINAR
        const deleteBtn = e.target.closest('[data-action="delete"]');
        if (deleteBtn) {
            const id = Number(deleteBtn.dataset.id);
            deleteCharacter(id);
            renderCharacters();
            return;
        }

        // EDITAR — abre el modal con los datos actuales del personaje
        const editBtn = e.target.closest('[data-action="edit"]');
        if (editBtn) {
            editingId = Number(editBtn.dataset.id);

            const characters = JSON.parse(localStorage.getItem('db_characters') || '[]');
            const character  = characters.find(c => c.id === editingId);
            if (!character) return;

            // Precarga los valores en el formulario
            document.getElementById('edit-name').value    = character.name;
            document.getElementById('edit-status').value  = character.status;
            document.getElementById('edit-species').value = character.species;

            modal.classList.remove('hidden');
        }
    });

    // ── Guardar cambios ──────────────────────────────────────────
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        updateCharacter(editingId, {
            name:    document.getElementById('edit-name').value.trim(),
            status:  document.getElementById('edit-status').value.trim(),
            species: document.getElementById('edit-species').value.trim(),
        });

        modal.classList.add('hidden');
        editingId = null;
        renderCharacters();
    });

    // ── Cancelar / cerrar modal ──────────────────────────────────
    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        editingId = null;
    });

    // Cerrar también si se hace click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            editingId = null;
        }
    });
}

function renderCharacters() {
    const container = document.getElementById('characters-container');
    const characters = JSON.parse(localStorage.getItem('db_characters') || '[]');
    container.innerHTML = characters
        .map(character => characterCard(character))
        .join('');
}
