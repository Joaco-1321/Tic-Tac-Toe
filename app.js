let body = document.getElementsByTagName('body')[0],
	main = document.createElement('main'),
	tablero = document.createElement('div'),
	section, juego, casilla,
	casillas = [],
	posX = [],
	posO = [],
	posiciones = [
		[3, 4, 5],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],
	turnoX = true,
	turno = 0;

body.addEventListener('load', maquetaPagina());

function maquetaPagina() {
	body.appendChild(main);

	for (let i = 0; i < 3; i++) {
		section = document.createElement('section');
		main.appendChild(section);
		switch (i) {
			case 0:
				section.classList.add('menu');
				break;

			case 1:
				section.classList.add('juego');
				break;

			case 2:
				section.classList.add('temporizador');
				break;
		}
	}
	dibujarTablero();
}

function dibujarTablero() {
	juego = document.getElementsByClassName('juego')[0];
	juego.classList.add('contenedor');
	tablero.classList.add('tablero');
	juego.appendChild(tablero);

	for (let i = 0; i < 9; i++) {
		casilla = document.createElement('div');
		casilla.classList.add('contenedor');
		casilla.addEventListener('click', turnoJugador);
		switch (i) {
			case 0:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '0px 2.5px 2.5px 0px';
				break;
			case 1:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '0px 2.5px 2.5px 2.5px';
				break;
			case 2:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '0px 0px 2.5px 2.5px';
				break;
			case 3:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '2.5px 2.5px 2.5px 0px';
				break;
			case 4:
				casilla.style.border = '2.5px solid black';
				break;
			case 5:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '2.5px 0px 2.5px 2.5px';
				break;
			case 6:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '2.5px 2.5px 0px 0px';
				break;
			case 7:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '2.5px 2.5px 0px 2.5px';
				break;
			case 8:
				casilla.style.borderStyle = 'solid';
				casilla.style.borderWidth = '2.5px 0px 0px 2.5px';
				break;
		}
		casillas.push(casilla);
		tablero.appendChild(casilla);
	}
}

function turnoJugador(event) {

	let celda = event['target'];

	if (turnoX) {
		celda.textContent = 'X';
		posX.push(casillas.indexOf(celda));
	} else {
		celda.textContent = 'O';
		posO.push(casillas.indexOf(celda));
	}

	celda.removeEventListener('click', turnoJugador);
	// console.log(posX);
	// console.log(posiciones);
	// console.log(posX.includes(posiciones));
	turnoX = !turnoX;
}

// function ganador() {

// 	jugador = turnoX ? posX : posO;

// 	for (let i = 0; i < posiciones.length; i++) {

// 	}
// }