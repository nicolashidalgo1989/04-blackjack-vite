import { crearDeck, mostrarCarta, pedirCarta, valorCarta } from './usecases/';

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
let deck            = [];
let puntosJugadores = [];
let turnoC          = false;

document.querySelector('.titulo').innerText = 'Black Jack';

const turnoComputadora = () => {
    turnoC = true;
    btnPedirCarta.disabled = true;
    setTimeout( () => {
        if(puntosJugadores[turno] < puntajeMinimo){
            const carta = pedirCarta(deck);
            mostrarCarta(carta, cartas[turno]);
            sumarPuntaje(carta);
        } else {
            detener();
        }
    }, 200);
}

const sumarPuntaje = carta => {
    puntosJugadores[turno] += valorCarta(carta);
    puntos[turno].textContent = puntosJugadores[turno];
    if(!turnoC){
        if(puntosJugadores[turno] >= puntajeMinimo){
            siguienteTurno();
        }
    } else {
        disableBtns();
        (puntosJugadores[turno] < puntajeMinimo) ? turnoComputadora() : detener();
    }
}

const detener = () => {
    disableBtns();
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

    deck = crearDeck(clases, extras);

    disableBtns();

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

    btnPedirCarta.disabled = false;

    deck;
}

const activarJugador = () => {
    document.querySelectorAll('.player').forEach( p => p.classList.remove('active') );
    document.querySelectorAll('.player')[turno].classList.add('active');
}

btnDetener.addEventListener( 'click', siguienteTurno );

btnPedirCarta.addEventListener( 'click', () => {
    const carta = pedirCarta(deck);
    mostrarCarta(carta, cartas[turno]);
    sumarPuntaje(carta);
    btnDetener.disabled = false;
});

const disableBtns = () => {
    btnPedirCarta.disabled = true;
    btnDetener.disabled    = true;
}

btnNuevoJuego.addEventListener( 'click', inicializarJuego )

inicializarJuego();