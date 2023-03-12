let body = document.getElementsByTagName('body')[0],
	casillas = [],
	puntajeX = 0,
	puntajeO = 0,
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
	turno = 1,
	tiempo = 5,
	temp;

body.addEventListener('load', maquetaPagina());

function maquetaPagina() {

	let section,
		main;

	main = document.createElement('main');

	for (let i = 0; i < 3; i++) {

		section = document.createElement('section');

		switch (i) {
			case 0:
				section.classList.add('puntuacion', 'contenedor');
				break;

			case 1:
				section.classList.add('juego', 'contenedor');
				break;

			case 2:
				section.classList.add('temporizador', 'contenedor');
				break;
		}

		main.appendChild(section);

	}

	body.appendChild(main);
	dibujarPuntuacion();
	dibujarTablero();
	dibujarTemporizador();
}

function dibujarPuntuacion() {

	let puntuacion,
		div = document.createElement('div'),
		divX = document.createElement('div'),
		divO = document.createElement('div');

	puntuacion = document.getElementsByClassName('puntuacion')[0];
	divX.classList.add('puntaje', 'contenedor');
	divO.classList.add('puntaje', 'contenedor');
	divX.textContent = 'puntos X: ' + puntajeX;
	divO.textContent = 'puntos O: ' + puntajeO;
	div.appendChild(divX);
	div.appendChild(divO);
	puntuacion.appendChild(div);

}

function dibujarTablero() {

	let tablero,
		juego,
		casilla;

	juego = document.getElementsByClassName('juego')[0];
	tablero = document.createElement('div');
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

function dibujarTemporizador() {

	let temporizador = document.getElementsByClassName('temporizador')[0],
		div = document.createElement('div');

	div.textContent = 'tiempo: ' + tiempo;
	div.classList.add('contenedor', 'tiempo');
	temporizador.appendChild(div);

}

function turnoJugador(event) {

	let casilla = event['target'];

	clearInterval(temp);
	tiempo = tiempo != 5 ? 6 : 5;
	temp = setInterval(bajaTemporizador, 1000);

	if (turnoX) {
		casilla.textContent = 'X';
		posX.push(casillas.indexOf(casilla));
	} else {
		casilla.textContent = 'O';
		posO.push(casillas.indexOf(casilla));
	}

	casilla.removeEventListener('click', turnoJugador);

	if (turno > 4) {
		ganador();
	}

	turno++;
	turnoX = !turnoX;

}

function bajaTemporizador() {

	let temporizador = document.getElementsByClassName('tiempo')[0];

	temporizador.textContent = 'tiempo: ' + --tiempo;

	if (tiempo == 1) {
		tiempo = 6;
		turnoX = !turnoX;
	}

}

function ganador() {

	let jugador = turnoX ? posX : posO,
		contador,
		posGan = 0,
		posJug = 0,
		divX = document.getElementsByClassName('puntaje')[0],
		divO = document.getElementsByClassName('puntaje')[1];

	do {

		contador = 0;
		posJug = 0;

		do {
			if (posiciones[posGan].includes(jugador[posJug])) {
				contador++;
			}
			posJug++
		} while (contador < 3 && posJug < jugador.length);

		posGan++

	} while (contador < 3 && posGan < posiciones.length);

	if (contador === 3) {
		clearInterval(temp);
		for (let casilla of casillas) {
			casilla.removeEventListener('click', turnoJugador);
		}
		turnoX ? puntajeX++ : puntajeO++;
		turnoX ? divX.textContent = 'puntos X: ' + puntajeX : divO.textContent = 'puntos O: ' + puntajeO;
	}
}