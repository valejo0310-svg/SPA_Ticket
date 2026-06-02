import { createCharacter } from '../services/api.js';
import { navigateTo } from '../app.js';

export async function renderAddCharacter() {
    const content = document.getElementById('content');

    content.innerHTML = `
        <section>
            <h1>Crear personaje</h1>

            <form id="character-form" class="card">
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Nombre del personaje" 
                    required
                >

                <input 
                    type="text" 
                    id="status" 
                    placeholder="Estado: Alive, Dead o Unknown" 
                    required
                >

                <input 
                    type="text" 
                    id="species" 
                    placeholder="Especie" 
                    required
                >

                <input 
                    type="text" 
                    id="gender" 
                    placeholder="Género" 
                    required
                >

                <input 
                    type="text" 
                    id="image" 
                    placeholder="URL de la imagen" 
                    required
                >

                <button type="submit" class="btn">
                    Guardar personaje
                </button>
            </form>
        </section>
    `;

    initializeFormAddEvents();
}

function initializeFormAddEvents() {
    const form = document.getElementById('character-form');

    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const status = document.getElementById('status').value.trim();
        const species = document.getElementById('species').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const image = document.getElementById('image').value.trim();

        createCharacter({
            name,
            status,
            species,
            gender,
            image
        });

        form.reset();

        navigateTo('/');
    });
}