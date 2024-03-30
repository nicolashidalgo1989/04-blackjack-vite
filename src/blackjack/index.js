import newDeck, { nombreJuego } from './usecases/crear-deck'

const puntajeMinimo       = 21, 
        clases            = ['C','D','H','S'],
        extras            = ['A','J','Q','K'],
        btnDetener        = document.querySelector('#btnDetener'), 
        btnNuevoJuego     = document.querySelector('#btnNuevoJuego'), 
        btnPedirCarta     = document.querySelector('#btnPedirCarta'),
        indicadorTurno    = document.querySelector('.indicadorTurno'),
        contenedorJugadores = document.getElementById('contenedor-jugadores');

let cartas, puntos;

let turno           = 0;
let deck            = newDeck(clases, extras);
let puntosJugadores = [];  
let turnoC          = false;

document.querySelector('.titulo').innerText = nombreJuego;
 
const turnoComputadora = () => {   
    turnoC = true;
    btnPedirCarta.disabled = true;
    setTimeout( () => {
        if(puntosJugadores[turno] < puntajeMinimo){
            pedirCarta();
        } else {
            detener();
        }
    }, 200);
}

const pedirCarta = () => { 
    if(puntosJugadores[turno] < puntajeMinimo){ 
        if( deck.length === 0) throw 'No hay mas cartas que mostrar';  
        let carta = deck.pop();
        btnDetener.disabled = false; 
        mostrarCarta(carta);
        sumarPuntaje(carta);
    } else {
        throw 'No puedes pedir mas cartas'
    }
}

const mostrarCarta = carta => {
    cartas[turno].innerHTML += `
        <img class="carta" src="assets/cartas/${carta}.png" id="${carta}" alt="${carta}"/>
    `;
} 

const sumarPuntaje = carta => {
    let valor = carta.substring( 0, carta.length - 1); 
    puntosJugadores[turno] += ( isNaN(valor) ) ? 10 : (valor == 'A') ? 11 :  Number(valor);
    puntos[turno].textContent = puntosJugadores[turno]; 
    if(!turnoC){ 
        if(puntosJugadores[turno] >= puntajeMinimo){
            siguienteTurno();
        }
    } else {
        btnPedirCarta.disabled = true;
        btnDetener.disabled = true;
        (puntosJugadores[turno] < puntajeMinimo) ? turnoComputadora() : detener();
    }
}

const detener = () => {  
    btnPedirCarta.disabled = true;
    btnDetener.disabled = true;
    setTimeout( () => {
        puntosJugadores.forEach( (puntos, i) => {
            if(i === puntosJugadores.length - 1){
                console.log( `Computadora: ${puntos} - ${puntos === puntajeMinimo ? 'GANA' : 'PIERDE'}`);
            } else {
                console.log( `Jugador ${i + 1}: ${puntos} - ${puntos === puntajeMinimo ? 'GANA' : 'PIERDE'}`);
            }
        }); 
    }, 280)
}

const siguienteTurno = () => {   
    turno += 1;     
    indicadorTurno.textContent = turno + 1;   
    activarJugador();
    if((turno + 1) === puntosJugadores.length){
        indicadorTurno.textContent = 'Computadora';
        turnoComputadora();
    }
}

let reset = () => { 
    turno           = 0;
    deck            = [];
    puntosJugadores = [];  
    turnoC          = false;
    contenedorJugadores.innerHTML = '';
}

const inicializarJuego = () => {
    
    reset();

    let cantidad = prompt('Cuantos jugadores?');

    btnPedirCarta.disabled = true;
    btnDetener.disabled    = true;

    indicadorTurno.textContent = turno + 1;

    for( let i = 0; i <= cantidad; i++){
        puntosJugadores.push(0);
        contenedorJugadores.innerHTML += `
            <div class="player col-6">
                <h2>${ 'Jugador ' + ( i + 1 ) }  - <small class="puntos">0</small></h2>
                <div class="cartas"></div>
            </div>
        `;
    }
    
    contenedorJugadores.children[contenedorJugadores.children.length - 1].querySelector('h2').innerHTML = `
        <h2>Computadora  - <small class="puntos">0</small></h2>
    `;

    cartas = document.querySelectorAll('.cartas');
    puntos = document.querySelectorAll('.puntos');
    cartas.forEach( c => c.innerHTML   = '' );
    puntos.forEach( p => p.textContent = 0 );

    activarJugador();

    deck;
} 

const activarJugador = () => {
    document.querySelectorAll('.player').forEach( p => p.classList.remove('active') );
    document.querySelectorAll('.player')[turno].classList.add('active');
}

btnDetener.addEventListener( 'click', siguienteTurno )
btnPedirCarta.addEventListener( 'click', pedirCarta )
btnNuevoJuego.addEventListener( 'click', inicializarJuego )

inicializarJuego();