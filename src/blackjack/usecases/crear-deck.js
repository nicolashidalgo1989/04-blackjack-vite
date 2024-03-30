import _ from 'underscore';

export const nombreJuego = 'BlackJack';

const crearDeck = (clases, extras) => {
    let deck = [];
    for( let clase of clases){
        for( let i = 2; i <= 10; i++){
            deck.push(`${i}${clase}`);
        }
        for( let extra of extras ){
            deck.push(`${extra}${clase}`)
        }
    }
    btnPedirCarta.disabled = false; 
    deck = _.shuffle( deck );  
    return deck;
} 

export default crearDeck;