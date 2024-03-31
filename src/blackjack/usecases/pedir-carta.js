/**
 * Este funcion retorna la ultima carta del deck
 * @param {Array<String>} deck es un arreglo de strings
 * @returns {String} retorna una carta Ejemplo: '7S'
 */
export const pedirCarta = deck => {
    if( !deck || deck.length === 0) throw 'No hay mas cartas que mostrar';
    const carta = deck.pop();
    return carta;
}