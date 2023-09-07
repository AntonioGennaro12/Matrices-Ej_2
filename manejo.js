// SE AGREGA EJERCICIO 3 CON EL JUEGO DE OBSTACULO VERSIÓN ARCADE (IZQUIERDA A DERACHA)
// EJERCICIO 2 DE MATRICES (incluye 2.1, 2.2 y 2.3) 
// Configuración 
const juegoTablero  = document.querySelector("#juego-tablero");
const defTablero    = document.querySelector("#def-tablero");
const misFilas      = document.querySelector("#filas");
const misColumnas   = document.querySelector("#columnas"); 
const miFactorF     = document.querySelector("#fac_forma")
const botonTablero  = document.querySelector("#bot-tablero");
const botonGame     = document.querySelector("#bot-game");
// Tablero 
const miTablero     = document.querySelector("#mi-tablero");
//
let  misCasillas    = document.querySelectorAll(".casilla");
let  misFiguras     = document.querySelectorAll(".figura");
let  figuraAll      = document.querySelector(".figura");
/////// Toma ancho y alto disponible
let limiteX         = window.innerWidth;
let limiteY         = window.innerHeight;
console.log("X: "+limiteX+" ,Y: "+limiteY);
//////////
let gameRunning     = false;
let picRunning      = false;
//
const ANCHO_MIN     = 320;
const MAX_FILAS     = 100;
const MAX_COLUMNAS  = 100;
const MAX_CASILLAS  = MAX_FILAS*MAX_COLUMNAS;
//
const ALTO_TABLERO  = 4;
const ANCHO_TABLERO = 4;
misFilas.value      = ALTO_TABLERO;
misColumnas.value   = ANCHO_TABLERO;
// 
// Factor de Forma
const UNO_UNO       = 1;
const TRES_DOS      = 2;
const CUATRO_TRES   = 3;
const DIESEIS_NUE   = 4;
const DOS_UNO       = 5;
const TRES_UNO      = 6;
const CUATRO_UNO    = 7;
const CINCO_UNO     = 8;
///
const UNO_UNO_V     = 1;
const TRES_DOS_V    = 4/3;
const CUATRO_TRES_V = 3/2;
const DIESEIS_NUE_V = 16/9;
const DOS_UNO_V     = 2;
const TRES_UNO_V    = 3;
const CUATRO_UNO_V  = 4;
const CINCO_UNO_V   = 5;
// Factor de corrección para ancho de casillas
const AJUSTE_ANCHO  = 1.04;
//
const CYICLE_SHOW   = 20;
//
let filasTablero    = ALTO_TABLERO;
let colTablero      = ANCHO_TABLERO;
let anchoTabla      = 0;
let altoCelda       = 0;
let anchoCelda      = 0;
let nroFiguras      = filasTablero * colTablero;
let factorForma     = UNO_UNO_V;
let muestraFigura   = false;
let quedanFiguras   = 0;
//
let index1, index2  = 0
let tableroInterval = 0;
//
//// GAME
const EMO_PLAYERS   = ["🧒", "👩🏾‍🦱", "👱‍♀️", "👩🏽‍🦱", "👧", "👱", "👵🏼", "🧓"];
const EMO_GOAL      = ["🥅", "🏡", "🚪", "🏆"];
const EMO_ENEMIES   = ["👿", "😖", "🤬", "😠", "😡", "👹", "👺", "💀"];
let gameActive      = false;
let goalPos         = 0;
let goalEmo         = EMO_GOAL[0];
let emoEnemy        = EMO_ENEMIES [0];
let enemyPos        = 0;
let myEmo           = EMO_PLAYERS [0];
let myPos           = 0;
// 
let enemyDir        = 0;
const ENE_GO_L      = 1;
const ENE_GO_R      = 2;
//
let waitShow        = false;
//
botonTablero.style.display = "block";
botonGame.style.display = "none";
//
// FUNCIONES 
//
/**
 * Cambia al boton PLAY normal
 */
function startAgain() {
    botonTablero.textContent = "ARMAR TABLERO";
    botonTablero.style.backgroundColor = "lightgreen";
}
/**
 * Camabia al boton a REINICIAR
 */
function startGameBoton() {
    botonTablero.textContent = "REINICIAR TABLERO";
    botonTablero.style.backgroundColor = "gold";
}

/**
 * Camabia al boton a espera / show
 */
function startShowBoton() {
    botonTablero.textContent = " . . . . . ";
    botonTablero.style.backgroundColor = "pink";
}

/**
 * Llena contenido de columnnas en cada fila...
 * @returns String con texto HTML
 */
function llenaColumnas() {
    let mistring = "";
    for (let i=0;i<colTablero;i++){
        mistring += `
        <div class="casilla" onclick="picBox(${index1})"> <div class="figura"></div> </div>
        `;
        index1++;
    }
    return (mistring);
} 

/**
 * funcion llamada al clikear para aplicar la config o reiniciar
 * @returns nothing
 */
function playTablero() {
    if (gameRunning == true) {
        gameRunning = false;
        gameActive = false;  // del game
        clearTablero();
        stopTimer();
        botonGame.style.display = "none";
        defTablero.style.display = "flex";
        setTimeout (startAgain(), 500);
    }
    else {
        defTablero.style.display = "flex";
        filasTablero = parseInt(misFilas.value);
        colTablero = parseInt(misColumnas.value);
        switch (parseInt(miFactorF.value)) {
            case UNO_UNO:       factorForma = UNO_UNO_V;        break; 
            case TRES_DOS:      factorForma = TRES_DOS_V;       break;
            case CUATRO_TRES:   factorForma = CUATRO_TRES_V;    break;
            case DIESEIS_NUE:   factorForma = DIESEIS_NUE_V;    break;
            case DOS_UNO:       factorForma = DOS_UNO_V;        break;
            case TRES_UNO:      factorForma = TRES_UNO_V;       break;
            case CUATRO_UNO:    factorForma = CUATRO_UNO_V;     break;
            case CINCO_UNO:     factorForma = CINCO_UNO_V;      break;
        }

        nroFiguras = filasTablero * colTablero;
        console.log(nroFiguras);

        if (((colTablero * 30) > limiteX) || ((filasTablero * 20 ) > (limiteY-40))) {
            botonTablero.textContent = "Esp. Insuficiente!!";
                botonTablero.style.backgroundColor = "red";
                setTimeout(startAgain, 1000);
                return;
        }
        /// Armar tablero
        index1 = 0;
        miTablero.innerHTML = ""; // borra tablero existente
        for (let f=0;f<filasTablero;f++){
            miTablero.innerHTML += `
            <div class="row">
                ${llenaColumnas()}
            </div>
            `;
        } 
        const misCasillasI   = document.querySelectorAll(".casilla");
        const misFigurasI    = document.querySelectorAll(".figura");
        misCasillas   = misCasillasI;
        misFiguras    = misFigurasI;

        altoCelda   = ((limiteY * 0.85) / filasTablero);
        if (((limiteX*0.98)/colTablero) >= (altoCelda*factorForma)) {
            anchoTabla = ((altoCelda * AJUSTE_ANCHO) * factorForma * colTablero);
            if (anchoTabla <= ANCHO_MIN) { 
                anchoTabla = ANCHO_MIN; 
            }
        }
        else { 
            anchoTabla = limiteX*0.98; 
        }
        juegoTablero.style.width = anchoTabla + "px";
        anchoCelda = anchoTabla / colTablero;
        for (let i=0; i< nroFiguras;i++){
            misCasillas[i].style.height = altoCelda + "px"; 
        }         
        initAll();
    }
}

/**
 * Borra el contenido del tablero
 */
function clearTablero() {
    for (let i=0;i<nroFiguras;i++){
        misFiguras[i].style.display = "block";
        misFiguras[i].textContent = "";
        //misFiguras[i].style.backgroundColor = "antiquewhite";  
    }
}

/**
 * Completa la inicialización
 */
function initAll () {
    nroFiguras     = filasTablero * colTablero;
    muestraFigura = false;
    clearTablero();
    defTablero.style.display = "none";
    quedanFiguras   = CYICLE_SHOW;  //nroFiguras;
    startShowBoton();
    gameRunning     = true;
    tableroInterval = setInterval(showInicial, 250); 
}
/**
 * Show de bienvenida
 */
function showInicial () {
    if(quedanFiguras > 0) {
        if (!muestraFigura) {
            muestraFigura = true;
            for (i=0;i<nroFiguras;i++){
                misFiguras[i].style.display = "block";
                if (i%2) { misFiguras[i].style.backgroundColor = "lightgreen"; }
                else { misFiguras[i].style.backgroundColor = "yellow"; }                  
            }
        }
        else {
            muestraFigura = false;
            for (i=0;i<nroFiguras;i++){
                misFiguras[i].style.display = "none";
            }
        }
        quedanFiguras--;
    }
    else{ 
        stopTimer();
        quedanFiguras = nroFiguras;
        muestraFigura = false;
        for (i=0;i<nroFiguras;i++){
            misFiguras[i].style.display = "block";
            misFiguras[i].style.backgroundColor = "antiquewhite";  
        }
        // ACA INICIA EL JUEGO
        startGameBoton();
        botonGame.style.display = "block";
        gameRunning     = true;
        //tableroInterval = setInterval(miGame, 1000); 
    } 
}

/**
 * Detiene el Intervalo del Temporizador
 */
function stopTimer () {
    clearInterval(tableroInterval);
} 
/**
 * Borra el texto de la casilla
 */
function clearCasText (){
    misFiguras[index2].textContent = "";
    picRunning = false;
}
/**
 * Pinta todas las celdas de un color
 * @param {String} color 
 */
function pintaCeldas(color) {
    for (let i=0; i<nroFiguras;i++) {
        misFiguras[i].style.backgroundColor = color;
    }
} 

/**
 * Pinta una celda de un color
 * @param {Number} idx 
 * @param {String} color 
 */
function pintaCelda(idx, color) {
            misFiguras[idx].style.backgroundColor = color;
    } 

/**
 * muestra en la casilla la posición
 * @param {Number} pos 
 */
function muestraPos(pos) {
    let fila = Math.floor(pos/colTablero);
    let col  = pos%colTablero;
    misFiguras[pos].textContent = "pos: "+fila+"-"+col;
    index2 = pos;
    setTimeout (clearCasText, 1000 );
}

/**
 * pinta el tablero de balnco y negro como si fuera un damero o ajedrés 
 */
function dibujaTabAjedres () {
    for (index1=0; index1<nroFiguras;index1++) {
        if (colTablero%2 != 0) {
            pintaCelda(index1, "black");
            if(++index1<nroFiguras) {pintaCelda(index1, "white");}
        }
        else if ((Math.floor(index1/colTablero)%2)==0){
            pintaCelda(index1, "black");
            pintaCelda(index1+=1, "white");
        }
        else {
            pintaCelda(index1, "white");
            pintaCelda(index1+=1, "black");  
        }  
    }
}

/**
 * Click en casilla
 * @param {*} pos (posición de la celda dentro de reticula)
 * @returns nothing
 */
function picBox(pos) {
    if (picRunning === true) { return; }
    if (!gameActive) { 
        picRunning = true;
        muestraPos(pos);
    }
    switch (pos) {
        case 0:   /// DIBUJA TABLERO tipo AJEDRÉS / DAMAS
            dibujaTabAjedres ();
            break;
        case 1: pintaCeldas("black"); break; // DISTINTOS COLORES DE FONDO PARA JUGAR
        case 2: pintaCeldas("white"); break;
        case 3: pintaCeldas("red"); break;  
        case 4: pintaCeldas("yellowgreen"); break;
        case 5: pintaCeldas("yellow"); break;
        case 6: pintaCeldas("lightblue"); break; 
        case 7: pintaCeldas("pink"); break;   
        case 8: pintaCeldas("whitesmoke"); break; 
        case (nroFiguras-4): // Selecciona Enemigos
            emoEnemy = EMO_ENEMIES[ Math.floor(Math.random()*EMO_ENEMIES.length)];
            break; 
        case (nroFiguras-3): // Selecciona Jugador
            myEmo = EMO_PLAYERS[ Math.floor(Math.random()*EMO_PLAYERS.length)];
            misFiguras[myPos].textContent = myEmo;
            break;
        case (nroFiguras-2):  // Selecciona GOAL
            goalEmo = EMO_GOAL[ Math.floor(Math.random()*EMO_GOAL.length)];
            misFiguras[goalPos].textContent = goalEmo;
            break;  
        case (nroFiguras-1): pintaCeldas(""); break;      
    }
}

//// JUEGO TIPO LABERINTO / OBSTACULOS

// habilita escucha de teclado
document.addEventListener("keydown", function(event) {
    manejadorTeclado (event.key);
});

/////////////////////////////////////////
/**
 * Juego GANADO - show In
 */
function winShowOn() {
    botonGame.style.backgroundColor = "yellow";
    setTimeout (winShowOff, 250)
}
/**
 * Juego GANADO - show Out
 */
function winShowOff() {
    if (--quedanFiguras == 0) {
        botonGame.textContent = "PLAY GAME / REINICIAR"
        botonGame.style.backgroundColor = "lightsteelblue";
        waitShow        = false;
    }
    else {
        botonGame.style.backgroundColor = "red";
        setTimeout (winShowOn, 250);
    }
}

/**
 * GANA EL JUEGO
 */
function ganaJuego() {
    waitShow        = true;
    botonGame.textContent = "¡¡¡ G A N A S T E !!!"
    botonGame.style.backgroundColor = "lightsalmon";
    quedanFiguras = 20;
    stopTimer();
    setTimeout (winShowOn, 250);
}
/////////////////////////////////////////
/**
 * Juego perdido - show In
 */
function lostShowOn() {
    botonGame.style.backgroundColor = "grey";
    setTimeout (lostShowOff, 150);
}

/**
 * Juego perdido - show Out
 */
function lostShowOff() {
    if (--quedanFiguras == 0) {
        botonGame.style.color = "black";
        botonGame.textContent = "PLAY GAME / REINICIAR"
        botonGame.style.backgroundColor = "lightsteelblue";
        waitShow  = false;
    }
    else {
        botonGame.style.backgroundColor = "black";
        setTimeout (lostShowOn, 150);
    }
}

/**
 * PIERDE EL JUEGO
 */
function pierdeJuego() {
    waitShow        = true;
    botonGame.textContent = "--- P E R D I S T E ---"
    botonGame.style.color = "white";
    botonGame.style.backgroundColor = "black";
    quedanFiguras = 20;
    stopTimer();
    setTimeout (lostShowOn, 150);
}


/**
 * Manejador de teclado para movimiento del Jugador.
 * @param {String} tecla 
 */
function manejadorTeclado (tecla) {
    if (gameActive === true) {
        misFiguras[myPos].textContent = "";
        let lastPos = myPos;
        let rightAr = false;
        switch(tecla) {
            case "ArrowLeft": // Maneja el movimiento hacia la izquierda
                myPos--;
                if (((myPos%colTablero) == (colTablero-1))||((myPos%colTablero) < 0)) {
                    myPos++;
                }
                break;
            case "ArrowRight": // Maneja el movimiento hacia la derecha
                rightAr = true;
                myPos++;
                if (((myPos%colTablero) == 0)||((myPos%colTablero) >= nroFiguras)) {
                    myPos--;
                }
                break;
            case "ArrowUp": // Maneja el movimiento hacia arriba
                if (((myPos-=colTablero) < 0)) {
                    myPos+=colTablero;
                }
                break;
            case "ArrowDown": // Maneja el movimiento hacia abajo
                if (((myPos+=colTablero) > nroFiguras)) {
                    myPos-=colTablero;
                }
                break;
            case "e":
            case "E":
            case "x":
            case "X":    
                playTablero();
                break;
        }
        /// Aca tendría que escribir, pero primero debe testear si no esta por chocar 
        /// con el enemigo (perder) o entrar al portal por la izquierda (arrow right) que Gana el Juego. 
        if (myPos == enemyPos) { // de cualquier lado que choque con el enemigo pierde...
            misFiguras[lastPos].textContent = myEmo;
            if (waitShow = false) {  // verifica si ya no esta mostrando que se ganó o se perdió...
            pierdeJuego();
            }
        }
        else if (myPos == goalPos)  {
            misFiguras[lastPos].textContent = myEmo;
            myPos = lastPos;
            if (rightAr) { // Si no es Arrow right no gana... se queda donde está
                ganaJuego();
            }        
        } 
        else {
            misFiguras[myPos].textContent = myEmo; 
        }
    }
}

/**
 * muestra en la casilla un Mensaje
 * @param {Number} pos 
 */
function muestraMsg(pos, texto) {
    let fila = Math.floor(pos/colTablero);
    let col  = pos%colTablero;
    misFiguras[pos].textContent = texto;
    index2 = pos;
    setTimeout (clearCasText, 1000 );
}


/**
 * MOVIMIENTO DE EMOGYS MALOS (sentido horario)
 */    
function miGame () {
    if (gameActive == true) {
        let eneLastPos = enemyPos;
        misFiguras[enemyPos].textContent = ""; // borro en posición actual
        switch (enemyDir) {
            case ENE_GO_R: // esta yendo hacia la derecha
                enemyPos++;
                if ((enemyPos%colTablero) > (colTablero-2) ) { // si se pasó a la derecha
                    enemyPos += (colTablero-1);                  // va la fila de abajo 
                } 
                if (enemyPos > (nroFiguras-colTablero)) {        // si llega a la ultima fila 
                    enemyPos = ((nroFiguras-colTablero)-2);      // cambia el esentido y 
                    enemyDir = ENE_GO_L;                         // va hacia la izquierda
                }
                break;
            case ENE_GO_L: // esta yendo hacia la izquierda
                enemyPos--;
                if ((enemyPos%colTablero) <= 0) {     // ssi llega al borde izquierdp 
                    enemyPos -= (colTablero-1);        // va a la fila dearriba 
                }
                if (enemyPos < colTablero ) {         // si llega a la primera fila 
                    enemyPos = colTablero+1;          // cambia el sentido 
                    enemyDir = ENE_GO_R;              // y va hacia la derecha
                }
                break;
        }
        if (enemyPos == myPos) {
            misFiguras[eneLastPos].textContent = emoEnemy;
            pierdeJuego();
        }
        else {
            misFiguras[enemyPos].textContent = emoEnemy; 
        }
    }
}

/**
 * Rehabilita despues d emostra error en cantidad de columanas
 */
function againGame () {
    botonGame.textContent = "PLAY GAME";
    botonGame.style.backgroundColor = "lightsteelblue";
}
/**
 * Función que inicia el juego o reinicia
 */
function playGame() {
    if (!waitShow) {
        if (gameActive == true) {
            gameActive = false;
            stopTimer();
            botonTablero.style.display = "block";
            botonGame.textContent = "PLAY GAME"
            botonGame.style.backgroundColor = "lightsteelblue";
        }
        else {
        // Oculta boton "ARMAR Tablero" / "Reiniciar" 
        // Y muestra solo boton PLAY GAME / DETENER GAME y REINICIAR GAME
        if (colTablero < 3 ) {
            botonGame.textContent = "MINIMO 3 COLUMNAS"
            botonGame.style.backgroundColor = "lightsalmon";
            setTimeout (againGame, 1000);
        }
        else if (filasTablero < 4 ) {
            botonGame.textContent = "MINIMO 4 FILAS"
            botonGame.style.backgroundColor = "lightsalmon";
            setTimeout (againGame, 1000);
        }
        else {
            botonTablero.style.display = "none";
            botonGame.textContent = "DETENER GAME / REINICIAR";
            gameActive = true;
            // Inicializa Game
            clearTablero();
            let tamCelda = 0;
            // define tamaño de EMOGI
            if (anchoCelda > altoCelda ) { tamCelda = altoCelda;}
            else { tamCelda = anchoCelda;}
            misFiguras.forEach(function(elemento) {
                elemento.style.fontSize = (tamCelda*0.65)+"px"; });
            // ubica la "Meta"
            goalPos = ((Math.floor(filasTablero/2))*colTablero)+(colTablero-1);
            misFiguras[goalPos].textContent = goalEmo;
            // Player
            myPos = Math.floor(filasTablero/2)*colTablero;
            misFiguras[myPos].textContent = myEmo;
            enemyDir = ENE_GO_R;
            // ENEMIGO
            do {
                enemyPos = [Math.floor(Math.random()*nroFiguras)];
            } while ((enemyPos == myPos)||(enemyPos == goalPos));
            emoEnemy = EMO_ENEMIES[ Math.floor(Math.random()*EMO_ENEMIES.length)];
            misFiguras[enemyPos].textContent = emoEnemy;
            // Inicia...
            tableroInterval = setInterval(miGame, 300);
            } 
        }
    }
}
/* FIN */ 