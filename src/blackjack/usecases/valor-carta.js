/**
 * Esta funcion retorna un numero entero de acuerdo al parametro ingresado
 * @param {String} carta
 * @returns {Number} valor de la carta
 */
export const valorCarta = carta => {
    let valor = carta.substring( 0, carta.length - 1);
    return ( isNaN(valor) ) ? 10 : (valor == 'A') ? 11 :  Number(valor);
}