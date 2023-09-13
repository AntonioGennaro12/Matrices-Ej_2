// SE AGREGA EJERCICIO 3 CON EL JUEGO DE OBSTACULO VERSIÓN ARCADE (IZQUIERDA A DERACHA)
// EJERCICIO 2 DE MATRICES (incluye 2.1, 2.2 y 2.3) 
// Configuración 
// Tablero 
const juegoTablero  = document.querySelector("#juego-tablero");
const defTablero    = document.querySelector("#def-tablero");
const misFilas      = document.querySelector("#filas");
const misColumnas   = document.querySelector("#columnas"); 
const miFactorF     = document.querySelector("#fac_forma")
const botonTablero  = document.querySelector("#bot-tablero");
const botonGame     = document.querySelector("#bot-game");
const miTablero     = document.querySelector("#mi-tablero");
// Navegación para celulares
const botonNavega   = document.querySelector("#bot-nav");
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
const ALTO_TABLERO  = 3;
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
const CYCLE_SHOW   = 10;
// 
let filasTablero    = ALTO_TABLERO;
let colTablero      = ANCHO_TABLERO;
let anchoTabla      = 0;
let altoCelda       = 0;
let anchoCelda      = 0;
let tamCelda        = 0;
const TAM_TXT       = 0.15; // Tamaño del texto en la Celda
const TAM_EMOGI     = 0.65; // Tamaño del Emogi
let nroFiguras      = filasTablero * colTablero;
let nroOrdenes      = 1;  // por defecto 1
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
const EMO_PRICE     = ["💎", "✨", "🎆", "💖", "🌟", "💰", "🏵️", "📀"];
const EMO_ENEMIES   = ["👿", "😖", "🤬", "😠", "😡", "👹", "👺", "💀",
                       "🧛", "🦇", "☠️", "🧟", "🕷️", "🐞",  "💣", "🕸️"];
const EMO_DEATH     = "⚰️";
const EMO_BARRIER   = "🚧";
//
let gameActive      = false; 
let goalPos         = 0;
let goalEmo         = EMO_GOAL[0];
let myEmo           = EMO_PLAYERS [0];
let myPos           = 0;
// ENEMIGOS
let emoEnemy        = [];   // podrian ser más de 120
let enemyPos        = [];   // podrian ser más de 120
let enemyDir        = [];   // podrian ser más de 120
let enemyOrd        = [];   // podrian ser más de 120
let eneWrote        = [];   //podrian ser más de 120
const MAX_ORDER     = 16;
const MAX_ENEMY     = 256;  // por definción
let nroEnemies      = 0;
// BARRERAS
let barrier         = [];   // podrian ser mas de 250 
const BARRIER_OCCUP = 0.15;  // 15% del total de casillas
const COL_BARRERAS  = 5;
//
const ENE_GO_CW_R   = 1;
const ENE_GO_CW_L   = 2;
const ENE_GO_CC_R   = 3;
const ENE_GO_CC_L   = 4;
// Sonidos
let gamesound       = new Audio("8bit-music-for-game.mp3");
let applause        = new Audio("applause.wav");    
let funeral         = new Audio("negros_bailando_con_ataud.mp3"); 
const SOUND_VOL     = 0.05;    // Volumen bajo   
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
    if (gameRunning === true) {
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

        altoCelda   = ((limiteY * 0.82) / filasTablero);
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
        // Ajusta alto celda para no exceder 
        if (altoCelda > (anchoCelda * 1.25)) {
            altoCelda = (anchoCelda * 1.25);
        }
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
    quedanFiguras   = CYCLE_SHOW;  //nroFiguras;
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
    misFiguras[index2].style.fontSize = (tamCelda * TAM_EMOGI) + "px";
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
 * Pinta de verde claro la zona segura en el centro
 */
function pintaSafeZone()  {
    let wrote = false
    let cell = ((nroOrdenes)*colTablero)+nroOrdenes; // carga valor de inicio -1
    do {
        cell++;
        if ((cell%colTablero) > (colTablero-(nroOrdenes+2))) {
            cell+=((2*nroOrdenes)+1); 
        }
        else {
        misFiguras[cell].style.backgroundColor = "lightgreen";
        wrote = true;
        }
    } while( cell <(nroFiguras-(nroOrdenes*colTablero)));
    if (wrote === false) {
        misFiguras[(colTablero-1)].style.fontSize = (tamCelda * TAM_TXT) + "px";
        misFiguras[(colTablero-1)].textContent = "No Safe Zone";
        index2 = (colTablero-1);
        setTimeout (clearCasText, 1000 );    
    }
}
/**
 * muestra en la casilla la posición 
 * @param {Number} pos 
 */
function muestraPos(pos) {
    let fila = Math.floor(pos/colTablero);
    let col  = pos%colTablero;
    misFiguras[pos].style.fontSize = (tamCelda * TAM_TXT) + "px";
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

function printHelp() {
    misFiguras[nroFiguras-1].style.fontSize = (tamCelda * TAM_TXT) + "px"; 
    misFiguras[nroFiguras-1].textContent = "❓";
}

function clearControles () {
    for (let i=0; i< 10; i++){
        misFiguras[i].style.fontSize = (tamCelda * TAM_EMOGI) + "px";  
        misFiguras[i].textContent = "";  
    }
    for (let i=(nroFiguras-1); i > (nroFiguras-7); i--){
        misFiguras[i].style.fontSize = (tamCelda * TAM_EMOGI) + "px"; 
        misFiguras[i].textContent = "";   
    }
    cargaBarreras();
    printHelp();
    picRunning = false;
}

function muestraControles () {
    if (nroFiguras < 16 ) { return;}
    for (let i=0; i< 10; i++){
        misFiguras[i].style.fontSize = (tamCelda * TAM_TXT) + "px";    
    }
    for (let i=(nroFiguras-1); i > (nroFiguras-7); i--){
        misFiguras[i].style.fontSize = (tamCelda * TAM_TXT) + "px";    
    }
    misFiguras[0].textContent = "Chess Like";
    misFiguras[1].textContent = "Negro";
    misFiguras[2].textContent = "Blanco";
    misFiguras[3].textContent = "Rojo";
    misFiguras[4].textContent = "Verde";
    misFiguras[5].textContent = "Amarillo";
    misFiguras[6].textContent = "Celeste";
    misFiguras[7].textContent = "Rosa";
    misFiguras[8].textContent = "Niebla";
    misFiguras[9].textContent = "Transparente";
    misFiguras[nroFiguras-6].textContent = "Nav Celular";
    misFiguras[nroFiguras-5].textContent = "Zona Segura";
    misFiguras[nroFiguras-4].textContent = "Cambia Enemigos";
    misFiguras[nroFiguras-3].textContent = "Cambia Jugador";
    misFiguras[nroFiguras-2].textContent = "Cambia Objetivo";
    misFiguras[nroFiguras-1].textContent = "Muestra Controles";
    picRunning = true;
    setTimeout (clearControles, 3000 );
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
        case 0: dibujaTabAjedres (); break; /// DIBUJA TABLERO tipo AJEDRÉS / DAMAS
        case 1: pintaCeldas("black"); break; // DISTINTOS COLORES DE FONDO PARA JUGAR
        case 2: pintaCeldas("white"); break;
        case 3: pintaCeldas("red"); break;  
        case 4: pintaCeldas("yellowgreen"); break;
        case 5: pintaCeldas("yellow"); break;
        case 6: pintaCeldas("lightblue"); break; 
        case 7: pintaCeldas("pink"); break;   
        case 8: pintaCeldas("whitesmoke"); break; 
        case 9: pintaCeldas("transparent"); break;  // borra todos los fondos de celda
        // Especilaes
        case (nroFiguras-6): // Muestra botones navegación para celulares
            if (botonNavega.style.display == "none") {
                botonNavega.style.display = "flex";
            }
            else { 
                botonNavega.style.display = "none";
            }
            break; 
        case (nroFiguras-5): // Muestra safe zone
                pintaSafeZone(); break; 
        case (nroFiguras-4): // Selecciona Enemigos
        for (let i=0; i<nroEnemies;i++){
            emoEnemy[i] = EMO_ENEMIES[ Math.floor(Math.random()*EMO_ENEMIES.length)];
            }
            break; 
        case (nroFiguras-3): // Selecciona Jugador
            myEmo = EMO_PLAYERS[ Math.floor(Math.random()*EMO_PLAYERS.length)];
            misFiguras[myPos].textContent = myEmo;
            break;
        case (nroFiguras-2):  // Selecciona GOAL
            goalEmo = EMO_GOAL[ Math.floor(Math.random()*EMO_GOAL.length)];
            misFiguras[goalPos].textContent = goalEmo;
            break;  
        case (nroFiguras-1): muestraControles(); break;      
    }
}
/****** JUEGO TIPO LABERINTO / OBSTACULOS *******/
// habilita escucha de teclado
document.addEventListener("keydown", function(event) {
    manejadorTeclado (event.key);
});
/////////////////////////////////////////
/**
 * Muestra Premios
 */
function muestraPremio(){
    misFiguras[myPos+1].textContent = EMO_PRICE[ Math.floor(Math.random()*EMO_PRICE.length)];
}
/**
 * Muestra DEATH
 */
function muestraDeath(){
    misFiguras[myPos].textContent = EMO_DEATH;
}
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
        applause.pause();
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
    gameActive = false;
    waitShow   = true;
    gamesound.pause();
    applause.play();
    botonGame.textContent = "¡¡¡ G A N A S T E !!!"
    botonGame.style.backgroundColor = "lightsalmon";
    muestraPremio();
    quedanFiguras = CYCLE_SHOW;
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
        funeral.pause();
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
    gameActive = false;
    waitShow   = true;
    funeral.currentTime = 12;
    gamesound.pause();
    funeral.play();
    botonGame.textContent = "--- P E R D I S T E ---"
    botonGame.style.color = "white";
    botonGame.style.backgroundColor = "black";
    muestraDeath();
    quedanFiguras = CYCLE_SHOW*2;
    stopTimer();
    setTimeout (lostShowOn, 150);
}
// Funciones del Navegador por teclado de PC
/**
 * Movimiento hacia la izquierda
 * @param {Number} pos 
 * @returns nueva posición
 */
function moveLeft (pos) {
    if (((--pos%colTablero) == (colTablero-1))||((pos%colTablero) < 0) ||
            (barrier[pos] === true)) { return(++pos); }
    else { return (pos); }
}
/**
 * Movimiento hacia la derecha 
 * @param {Number} pos 
 * @returns nueva posición
 */
function moveRight (pos) {
    if (((++pos%colTablero) == 0)||((pos%colTablero) >= nroFiguras) ||
            (barrier[pos] === true))  { return(--pos); }
    else { return (pos); }
}
/**
 * Movimiento hacia Arriba
 * @param {Number} pos 
 * @returns nueva posición
 */
function moveUp (pos) {
    if (((pos-=colTablero) < 0) || (barrier[pos] === true) ) { return (pos+=colTablero);}
    else {return (pos)}
}
/**
 * Movimiento hacia Abajo
 * @param {Number} pos 
 * @returns nueva posición
 */
function moveDown (pos) { 
if (((pos+=colTablero) >= nroFiguras) || (barrier[pos] === true)) { return (pos-=colTablero);}
else {return (pos);}
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
                myPos = moveLeft (myPos);
                break;
            case "ArrowRight": // Maneja el movimiento hacia la derecha
                rightAr = true;
                myPos = moveRight (myPos);
                break;
            case "ArrowUp": // Maneja el movimiento hacia arriba
                myPos = moveUp (myPos);
                break;
            case "ArrowDown": // Maneja el movimiento hacia abajo
                myPos = moveDown (myPos);
                break;
            case "e":
            case "E":
            case "x":
            case "X":    
                playTablero();
                break;
        }
        /// Aca tendría que escribir, pero primero debe testear si no esta por  
        ///  entrar al portal por la izquierda (arrow right) que Gana el Juego. 
        if (myPos == goalPos)  {
            misFiguras[lastPos].textContent = myEmo;
            myPos = lastPos;
            if (rightAr) { // Si no es Arrow right no gana... se queda donde está
                ganaJuego();
            }        
        } 
        else {
            misFiguras[myPos].textContent = myEmo; // carga Emogi en nueva posición
        }
    }
}
/// Navegación alternativa con Celular (tecla final -5)
function butUp()    { manejadorTeclado ("ArrowUp");   }
function butDown()  { manejadorTeclado ("ArrowDown"); }
function butLeft()  { manejadorTeclado ("ArrowLeft"); } 
function butRight() { manejadorTeclado ("ArrowRight");}
//////////////////////////////////
/**
 * Maneja el movimiento de los enemigos (CW y CCW)
 * @param {Number} enemy 
 * @param {Number*} order 
 */
function ememyMove (enemy, order) {
    let enePos = enemyPos[enemy];
    let eneLastPos = enePos;
    //if (barrier[enePos] === false) { misFiguras[enePos].textContent = ""; } // si no hay barrera en posición actual
    if (eneWrote[enePos] === true) { misFiguras[enePos].textContent = ""; } // si no hay barrera en posición actual
    eneWrote[enePos] = false;
    switch (enemyDir[enemy]) {                                              // Los enemigos pasan por debajo de las barreras     
        case ENE_GO_CW_R: // esta yendo hacia la derecha Clock Wise
            enePos++;
            if ((enePos%colTablero) > (colTablero-(2+order))) {     // si se pasó a la derecha
                enePos += (colTablero-1);                           // va la fila de abajo 
            } 
            if (enePos > (nroFiguras-(colTablero*order))) {          // si llega a la ultima fila 
                enePos = (nroFiguras-(colTablero*order))-(3+order);  // cambia el esentido y 
                enemyDir[enemy] = ENE_GO_CW_L;                                    // va hacia la izquierda
            }    
            break;
        case ENE_GO_CW_L: // esta yendo hacia la izquierda Clock Wise
            enePos--;
            if ((enePos%colTablero) <= (0+order)) {     // si llega al borde izquierdp 
                enePos -= (colTablero-1);               // va a la fila dearriba 
            }
            if (enePos < (colTablero*order)) { // si llega a la fila superior 
                enePos = (colTablero*order)+(2+order);   // cambia el sentido 
                enemyDir[enemy] = ENE_GO_CW_R;              // y va hacia la derecha
            }
            break;
        case ENE_GO_CC_R: //esta yendo hacia la derecha Counter Clock Wise
            enePos++;
            if ((enePos%colTablero) > (colTablero-(2+order))) {    // si se pasó a la derecha
                enePos -= (colTablero+1);                          // va la fila de arriba 
            } 
            if (enePos < (colTablero*order)) {                      // si llega a la fila superior 
                enePos = (colTablero*order)+(colTablero-(3+order));   // cambia el esentido y 
                enemyDir[enemy] = ENE_GO_CC_L;                       // va hacia la izquierda
                }   
            break;
        case ENE_GO_CC_L: // esta yendo hacia la izquierda Counter Clock Wise
            enePos--;
            if ((enePos%colTablero) < (1+order)) {     // si llega al borde izquierdp 
                enePos += (colTablero+1);               // va a la fila de abajo 
            }
            if (enePos > (nroFiguras-(colTablero*order))) {    // si llega a la ultima fila 
                enePos = (nroFiguras-(colTablero*order))-(colTablero-2)+order;  // cambia el esentido y 
                enemyDir[enemy] = ENE_GO_CC_R;              // y va hacia la derecha
            }
            break;
    }
    if (enePos == myPos) {                                    // Si se da esta situción se pierde el juego
        misFiguras[eneLastPos].textContent = emoEnemy[enemy]; // el enemigo queda en la pos anterioir
        pierdeJuego();                                        // y se detiene todo con DERROTA  
    }
    else if (barrier[enePos] === true) { // si justo hay una barrera la pasa por debajo     
        enemyPos[enemy] = enePos;  // guarda la posición nueva, avanza pero no se muestra
     }  
    else if  (misFiguras[enePos].textContent != "") { // por si hay otro enemigo.. sucede al principio 
        enemyPos[enemy] = eneLastPos;  // choca con otro enemigo se queda en la posición anterior, no avanza
    }                               
    else {                                                   // si todo bién mueve al enemigo                
        misFiguras[enePos].textContent = emoEnemy[enemy];    // a la nueva casilla y 
        enemyPos[enemy] = enePos;                            // guarda la posición para la proxima..
        eneWrote[enePos] = true;
    }
}
/**
 * MOVIMIENTO DE EMOGYS MALOS (sentido horario y anti-horario horario)
 */    
function miGame () {
    if (gameActive === true) {
        for (let idx = 0; idx < nroEnemies; idx++) {
            ememyMove (idx, enemyOrd[idx]); //nro de enemigo  y orden 
        }     
    }
}
/**
 * inicia sonido de juego
 */
function startSonido() {
    gamesound.play();
    gamesound.volume = SOUND_VOL;
    gamesound.loop = true;
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
    if (!waitShow) { // si esta mostrando secuencia de ganancia o pérdida..
        if (gameActive === true) {
            detieneGame();
        }
        else {
            // Chequea tamaño mínimo de tablero (4 filas x 3 columnas)
            if (colTablero < 4 ) {
                botonGame.textContent = "MINIMO 4 COLUMNAS"
                botonGame.style.backgroundColor = "lightsalmon";
                setTimeout (againGame, 1000);
            }
            else if (filasTablero < 3 ) {
                botonGame.textContent = "MINIMO 3 FILAS"
                botonGame.style.backgroundColor = "lightsalmon";
                setTimeout (againGame, 1000);
            }
            else {
                // Oculta boton "ARMAR Tablero" / "Reiniciar" muestra boton PLAY GAME/DETENER GAME y REINICIAR GAME   
                botonTablero.style.display = "none";
                botonGame.textContent = "DETENER GAME / REINICIAR";
                waitShow = false;
                gameActive = true;
                // Inicializa Game
                clearTablero();
                defineTamEmogis();
                // ubica la "Meta"
                goalPos = ((Math.floor(filasTablero/2))*colTablero)+(colTablero-1);
                misFiguras[goalPos].textContent = goalEmo; // Meta: luego se puede cambiar
                // Ubica Player
                myPos = Math.floor(filasTablero/2)*colTablero;
                misFiguras[myPos].textContent = myEmo; // pone uno por default, luego se puede cambiar 
                // Genera enemigos pero no los muestra todavía
                generaEnemigos(); // generaEnemigos();
                // Genera los obstaculos y los muestra directamente, son fijos
                generaBarreras();
                // Inicia Juego
                console.log("nroEn: "+nroEnemies);
                printHelp();
                tableroInterval = setInterval(miGame, 250);
                startSonido();
            } 
        }
    }
}
/**
 * Detine el juego a solicitud del jugador 
 */
function detieneGame() {
    gameActive = false;
    stopTimer();
    gamesound.pause();
    botonTablero.style.display = "block";
    botonGame.textContent = "PLAY GAME";
    botonGame.style.backgroundColor = "lightsteelblue";
}
/**
 * Define el tamaño de los emogis
 */
function defineTamEmogis() {
    tamCelda = 0;
    // define tamaño de EMOGI
    if (anchoCelda > altoCelda) { tamCelda = altoCelda; }
    else { tamCelda = anchoCelda; }
    misFiguras.forEach(function (elemento) {
        elemento.style.fontSize = (tamCelda * TAM_EMOGI) + "px";
    });
}
/**
 * POSICIONA LOS ENEMIGOS en el Tablero. los pone en posiciones aleatorias excluyendo los laterales del tablero   
 */
function generaEnemigos() {
    // Determina número de niveles u "orden"
    nroOrdenes = 1;
    do {
        nroOrdenes++;
    } while ((((filasTablero - 1) / nroOrdenes) >= 2) && 
             (((colTablero - 2) / nroOrdenes) >= 2) && (nroOrdenes < MAX_ORDER));
    nroOrdenes--
    nroEnemies = 0;
    for(index1=0; index1 < nroOrdenes; index1++) {
        nroEnemies+= nroOrdenes-index1;
    };
    console.log("nroEn: "+nroEnemies+" nroOrd: "+nroOrdenes); // número de enemigos a ubicar y de ordenes 
    // Borra todos los Vectores de enemigos y carga con valor de defecto
    initVectEnemy(); 
    let eneCarg = 0;
    let eneDir  = 0;
    let conta = 0;
    //
    for (let ord = 0; ord < nroOrdenes; ord++ ) {
        // para cada nro de orden genera el valor de la DIR (sentido horario o anti-horario)
        if ((Math.floor(Math.random() * 2)) == 0) { eneDir = ENE_GO_CW_R; } // Gira en Sentido horario 
            else { eneDir = ENE_GO_CC_R; } // Sentido anti-horario 
        let maxOrd = nroOrdenes - ord;     // Máximo dentro del orden
        for (let idx = 0; idx < maxOrd; idx++) {
            let i       = eneCarg; // "i" es el indice y se debe cargar el nro de enemigos que se lleva
            let find    = false;
            let xPos    = 0;
            conta       = 0;  // contador de seguridad
            do {
                xPos = [Math.floor(Math.random()*nroFiguras)];
                find = false;
                if ( ( (Math.floor(xPos/colTablero) != ord) && ((Math.floor(xPos/colTablero)) != (filasTablero-(ord+1))) &&
                       (xPos%colTablero != (ord+1)) && (xPos%colTablero != (colTablero-(ord+2))) ) ||
                     (((xPos%colTablero < 1) || (xPos%colTablero >= (colTablero-1))))  ) {     
                    if (++conta < 1000) { 
                        find = true; // para que no se cuelgue
                    }
                    else { console.log("el contador 'conta' es mas de: "+conta) }
                } 
                else {
                    for (let ind=0;ind<eneCarg;ind++){
                        if (parseInt(xPos) == parseInt(enemyPos[ind])){ 
                        find = true;
                        ind = eneCarg; // corta el loop
                        }
                    } 
                }                          
            } while (find === true);
            enemyPos[i] = xPos;
            eneCarg+=1;
            emoEnemy[i] = EMO_ENEMIES[Math.floor(Math.random() * EMO_ENEMIES.length)];
            //no muestro los enemigos ahora, primero se ponen las barreras...
            enemyDir[i] = eneDir; 
            enemyOrd[i] = ord;       
        }
    }
    nroEnemies = eneCarg;
    console.log("eneCarg: "+eneCarg);
    console.log("ePos: "+enemyPos);
    console.log("empE: "+emoEnemy);
    console.log("eOrd: "+enemyOrd);
    console.log("eDir: "+enemyDir);
    //console.log("eWrt: "+eneWrote);
}
/**
 * Recarga las barreras por si se borran
 */
function cargaBarreras() {
    for (let i=0; i< (barrier.length); i++) {
        if (barrier[i] === true) {
            misFiguras[i].textContent = EMO_BARRIER;
        }
    }
}

/**
 * Genera los OBSTACULOS 🚧 para el jugador y transparentes para los enemigos.
 */
function generaBarreras() {
    barrier.length = 0; // Borra el array completo e inicializa todo en "false" sin obstaculos  
    for (index1 = 0; index1 < nroFiguras; index1++) { 
        barrier.push(false);
    }
    let nroBarr = Math.floor(nroFiguras*BARRIER_OCCUP);  // DEFINE nro de BARRERAS
    let cargadas = 0;
    if (colTablero > COL_BARRERAS) { // barreras a partir de COL_BARRERAS.. 
        for (index1 = 0; index1 < nroBarr; index1++) { // tantas como definido  
            do {
                index2 = Math.floor(Math.random() * nroFiguras);
            //} while ((index2 != myPos) || (index2 != goalPos));
            } while (((index2 % colTablero) < 1) || ((index2 % colTablero) > (colTablero - 2)));
            barrier[index2] = true;
            cargadas++; 
            misFiguras[index2].textContent = EMO_BARRIER;
        }
    }
    console.log("nroBarr: "+cargadas);
    //console.log("baPr: "+barrier);
}
/**
 * Inicializa los Vectroes que manejan a los enemigos
 */
function initVectEnemy() {
    // Primero vacia todos los vectores
    enemyPos.length = 0;  // Posición del enemigo
    emoEnemy.length = 0;  // Emogi del enemigo
    enemyOrd.length = 0;  // Nro d eorden del enemigo 
    enemyDir.length = 0;  // Dirección (CW o CCW derecha o Izquierda)
    eneWrote.length = 0;  // si no fue escrito xq estaba ocupado
    // Luego inicializa todo a sus valores por defecto.
    for (let i = 0; i < nroEnemies; i++) {
        enemyPos.push(0);
        emoEnemy.push("");
        enemyOrd.push(0);
        enemyDir.push(0);
        eneWrote.push(false);
    }
}
/* FIN */ 
