export function episodeCard(episode) {
    
    return `
   <div id="episode-container" class="card">

  <div id="episode-header" class="card-header">
    <h2 id="episode-name">${episode.name}</h2>
    <span id="episode-code">${episode.episode}</span>
  </div>

  <div id="episode-body" class="card-body">

    <p id="episode-date">
      <strong>Fecha de emisión:</strong>
      ${episode.air_date}
    </p>

    <p id="episode-characters">
      <strong>Cantidad de personajes:</strong>
      <span id="character-count">${episode.characters.length}</span>
    </p>

  </div>

</div>
    `;
    
}



export function btnCardEpisodes(){
    const btnEditar = document.getElementById('btn-editar')
    let confirms

    btnEditar.addEventListener('click', () =>{
        try {
            confirms = confirm('seguro que quieres editar el episodio?')

            if(confirm){
                // aqui se debe de poner la funcion que vamos a crear para ingresar
            }
        } catch (error) {
            console.error('hubo un problema al editar', error)
        }
    })

    const btnBorrar = document.getElementById('btn-delete')

    btnBorrar.addEventListener('click', ()=>{
        try {
            confirms = confirm('seguro que quieres borrar el episodio?')
            if(confirm){
                // editar en el local
            }
        } catch (error) {
            console.error('hubo un problema al borrar', error)
        }
    })
}

