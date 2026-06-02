export function locationCard(location) {
    
    return `
   <div id="tarjeta-ubicacion" class="card">
        <h2 id="titulo-ubicacion">${location.name}</h2>
        
        <div id="info-ubicacion" >
            <div class="dato-linea">
                <span class="etiqueta">Tipo:</span> ${location.type}
            </div>
            <div class="dato-linea">
                <span class="etiqueta">Dimensión:</span> ${location.dimension}
            </div>
            <div class="dato-linea">
                <span class="etiqueta"> Numero de habitantes:</span> ${location.residents.length}
            </div>
        </div>
    </div>
    `;
    
}
