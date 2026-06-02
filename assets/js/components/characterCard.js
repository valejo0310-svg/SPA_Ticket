/**
 * Character Card Component
 */

export function characterCard(character) {
    const confirmarLabel = (character.nuevo)? character.nuevo.toUpperCase()  : "API";
    const color = (character.nuevo)? "#5ec95aff"  : "#2563eb";

    return `
        <article class="card" id="container-character">
       <button style = "background-color: ${color};" class = "btn btn--status" id="new">${confirmarLabel}</button>
            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Status:</strong>
                    ${character.status}
                </p>
                <p>
                    <strong>Gender:</strong>
                    ${character.gender}
                </p>
                <p>
                    <strong>Species:</strong>
                    ${character.species}
                </p>
            </div>
            <div class="card-actions">
                <button
                    class="btn btn--edit"
                    data-action="edit"
                    data-id="${character.id}"
                >Editar</button>
                <button
                    class="btn btn--delete"
                    data-action="delete"
                    data-id="${character.id}"
                >Eliminar</button>
            </div>
        </article>
    `;
}
