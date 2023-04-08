//! const ya que no cambian
const body = document.getElementsByTagName("body")[0],
  /**
   **	 array que guarda las celdas para mayor
   **	 facilidad de acceso
   */
  celdas = [],
  combinacionesValidas = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  /**
   **	array que guarda los puntos de
   **	X [0] y O [1] respectivamente
   */
  puntos = [0, 0],
  /**
   **	array que contiene los divs con los puntajes
   **	global para mayor facilidad de acceso
   */
  puntaje = [],
  /**
   **	contiene el temporizador
   ** global para mayor facilidad de acceso
   */
  tiempo = document.createElement("div"),
  tablero = document.createElement("div");

/**
 **	 array que guarda las celdas en las que se
 **	 puso una X [0] o una O [1] respectivamente
 */
let celdasJugadas = [[], []],
  esTurnoDe_X = true,
  turnos = 0,
  tiempoRestante = 5,
  temp;

/**
 **	 añado un eventListener al body para que al cargar
 **	 la página se ejecute la función maquetaPagina()
 */
body.addEventListener("load", maquetaPagina());

/**
 **	maqueta la pagina
 *
 * @returns void
 */
function maquetaPagina() {
  const header = document.createElement("header"),
    main = document.createElement("main");

  let section;

  header.classList.add("contenedor");
  header.innerHTML = "<h1>Tic Tac Toe</h1>";
  body.appendChild(header);

  for (let i = 0; i < 3; i++) {
    section = document.createElement("section");

    switch (i) {
      case 0:
        section.classList.add("puntuacion", "contenedor");
        break;

      case 1:
        section.classList.add("juego", "contenedor");
        break;

      case 2:
        section.classList.add("temporizador", "contenedor");
        break;
    }

    main.appendChild(section);
  }

  body.appendChild(main);
  dibujarPuntaje();
  dibujarTablero();
  dibujarTiempo();
}

/**
 **	dibuja el puntaje
 *
 * @returns void
 */
function dibujarPuntaje() {
  const puntuacion = document.getElementsByClassName("puntuacion")[0],
    div = document.createElement("div");

  for (let i = 0; i < 2; i++) {
    puntaje.push(document.createElement("div"));
    puntaje[i].classList.add("puntaje", "contenedor");

    if (i == 0) {
      puntaje[i].classList.add("actual");
      puntaje[i].textContent = `X ${puntos[i]}`;
    } else {
      puntaje[i].textContent = `O ${puntos[i]}`;
    }

    div.appendChild(puntaje[i]);
  }

  puntuacion.appendChild(div);
}

/**
 **	dibuja el tablero
 *
 * @returns void
 */
function dibujarTablero() {
  const juego = document.getElementsByClassName("juego")[0];

  let casilla;

  tablero.classList.add("tablero");

  for (let i = 0; i < 9; i++) {
    casilla = document.createElement("div");
    casilla.classList.add("contenedor");
    casilla.addEventListener("click", turnoJugador);
    casilla.style.borderStyle = "solid";

    switch (i) {
      case 0:
        casilla.style.borderWidth = "0px 2.5px 2.5px 0px";
        break;
      case 1:
        casilla.style.borderWidth = "0px 2.5px 2.5px 2.5px";
        break;
      case 2:
        casilla.style.borderWidth = "0px 0px 2.5px 2.5px";
        break;
      case 3:
        casilla.style.borderWidth = "2.5px 2.5px 2.5px 0px";
        break;
      case 4:
        casilla.style.border = "2.5px solid black";
        break;
      case 5:
        casilla.style.borderWidth = "2.5px 0px 2.5px 2.5px";
        break;
      case 6:
        casilla.style.borderWidth = "2.5px 2.5px 0px 0px";
        break;
      case 7:
        casilla.style.borderWidth = "2.5px 2.5px 0px 2.5px";
        break;
      case 8:
        casilla.style.borderWidth = "2.5px 0px 0px 2.5px";
        break;
    }

    celdas.push(casilla);
    tablero.appendChild(casilla);
  }

  juego.appendChild(tablero);
}

/**
 **	dibuja el temporizador
 *
 * @returns void
 */
function dibujarTiempo() {
  const temporizador = document.getElementsByClassName("temporizador")[0];

  tiempo.classList.add("contenedor");
  tiempo.textContent = "tiempo " + tiempoRestante--;
  temporizador.appendChild(tiempo);
}

/**
 **	función que va disminuyendo el temporizador
 ** si el tiempo llega a 1, se cambia de turno
 *
 * @returns void
 */
function cuentaAtras() {
  if (tiempoRestante === 6) {
    esTurnoDe_X = !esTurnoDe_X;
    puntaje[0].classList.toggle("actual");
    puntaje[1].classList.toggle("actual");
  }

  tiempo.textContent = "tiempo " + --tiempoRestante;

  if (tiempoRestante === 1) {
    tiempoRestante = 6;
  }
}

/**
 ** función que se ejecuta al hacer click en
 ** alguna de las celdas, la llena con la ficha
 ** del jugador que sea su turno
 *
 * @returns void
 */
function turnoJugador(event) {
  const casilla = event["target"];

  let ganador, indice, letra;

  idle = 0;

  if (esTurnoDe_X) {
    letra = "X";
    indice = 0;
  } else {
    letra = "O";
    indice = 1;
  }

  casilla.textContent = letra;
  casilla.removeEventListener("click", turnoJugador);
  celdasJugadas[indice].push(celdas.indexOf(casilla));

  ganador = verificaGanador();

  if (!ganador) {
    if (++turnos < 9) {
      tiempoRestante = 5;
      tiempo.textContent = "tiempo " + tiempoRestante;

      clearInterval(temp);
      temp = setInterval(cuentaAtras, 1000);

      esTurnoDe_X = !esTurnoDe_X;
      puntaje[0].classList.toggle("actual");
      puntaje[1].classList.toggle("actual");
    } else {
      clearInterval(temp);
      tablero.classList.toggle("actual");
      setTimeout(reiniciarJuego, 2000);
    }
  } else {
    setTimeout(reiniciarJuego, 2000);
  }
}

/**
 **	verifica si hay un ganador
 ** retorna true o false depeniendo de si hay ganador o no
 *
 * @returns boolean
 */
function verificaGanador() {
  const jugador = esTurnoDe_X ? celdasJugadas[0] : celdasJugadas[1];

  let ganador = false,
    contador,
    posGan = 0,
    posJug = 0;

  do {
    contador = 0;
    posJug = 0;

    do {
      if (combinacionesValidas[posGan].includes(jugador[posJug])) {
        contador++;
      }

      posJug++;
    } while (contador < 3 && posJug < jugador.length);

    if (contador === 3) {
      for (let i = 0; i < contador; i++) {
        celdas[combinacionesValidas[posGan][i]].classList.toggle("ganador");
      }
    }

    posGan++;
  } while (contador < 3 && posGan < combinacionesValidas.length);

  if (contador === 3) {
    ganador = true;
    clearInterval(temp);

    for (let casilla of celdas) {
      casilla.removeEventListener("click", turnoJugador);
    }

    if (esTurnoDe_X) {
      puntaje[0].textContent = "X " + ++puntos[0];
      puntaje[0].classList.toggle("ganador");
    } else {
      puntaje[1].textContent = "O " + ++puntos[1];
      puntaje[1].classList.toggle("ganador");
    }
  }

  return ganador;
}

/**
 **	función que reinicia el juego manteniendo los puntajes
 *
 * @returns void
 */
function reiniciarJuego() {
  turnos = 0;

  for (let i = 0; i < 9; i++) {
    if (celdas[i].textContent !== "") {
      celdas[i].textContent = "";
    }

    celdas[i].classList.remove("ganador");
    celdas[i].removeEventListener("click", turnoJugador);
    celdas[i].addEventListener("click", turnoJugador);
  }

  if (esTurnoDe_X) {
    puntaje[0].classList.remove("ganador");
  } else {
    puntaje[1].classList.remove("ganador");
  }

  puntaje[0].classList.toggle("actual");
  puntaje[1].classList.toggle("actual");

  celdasJugadas[0] = [];
  celdasJugadas[1] = [];

  tablero.classList.remove("actual");

  esTurnoDe_X = !esTurnoDe_X;

  tiempoRestante = 5;
  tiempo.textContent = "tiempo " + tiempoRestante;
}
