import _ from 'underscore';

/**
 * Esta funcion permite crear un deck y barajarlo
 * @param {Array<String>} clases ejemplo ['C','D','H','S']
 * @param {Array<String>} extras ejemplo ['A','J','Q','K']
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */
export const crearDeck = (clases, extras) => {
    if(!clases || clases.length === 0) throw Error('Clase de carta son obligatorias como un arreglo de string');
    if(!extras || extras.length === 0) throw Error('Tipos extras son obligatorias como un arreglo de string');
    let deck = [];
    for( let clase of clases){
        for( let i = 2; i <= 10; i++){
            deck.push(`${i}${clase}`);
        }
        for( let extra of extras ){
            deck.push(`${extra}${clase}`)
        }
    }
    return _.shuffle( deck );
}