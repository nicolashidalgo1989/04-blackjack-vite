/**
 * Esta funcion muestra en el html del jugador
 * @param {String} carta
 * @returns {String}
 */
export const mostrarCarta = (carta, turno) => {
    turno.innerHTML += `
        <img class="carta" src="assets/cartas/${carta}.png" id="${carta}" alt="${carta}"/>
    `;
}