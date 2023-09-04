// EJERCICIO 2 DE MATRICES (incluye 2.1, 2.2 y 2.3) 
// Configuración 
const juegoTablero  = document.querySelector("#juego-tablero");
const defTablero    = document.querySelector("#def-tablero");
const misFilas      = document.querySelector("#filas");
const misColumnas   = document.querySelector("#columnas"); 
const miFactorF     = document.querySelector("#fac_forma")
const botonJugar    = document.querySelector("#bot-jugar");
// Tablero 
const miTablero     = document.querySelector("#mi-tablero");
//
let  misCasillas    = document.querySelectorAll(".casilla");
let  misFiguras     = document.querySelectorAll(".figura");
/////// Toma ancho y alto disponible
let limiteX         = window.innerWidth;
let limiteY         = window.innerHeight;
console.log("X: "+limiteX+" ,Y: "+limiteY);
//////////
let memoInterval    = 0;
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
let filasTablero   = ALTO_TABLERO;
let colTablero     = ANCHO_TABLERO;
let nroFiguras     = filasTablero * colTablero;
let factorForma    = UNO_UNO_V;
let muestraFigura  = false;
let quedanFiguras  = 0;
//
let index1, index2 = 0
//
let tableroInterval = 0;
//
// FUNCIONES 
//
/**
 * Cambia al boton PLAY normal
 */
function startAgain() {
    botonJugar.textContent = "PLAY";
    botonJugar.style.backgroundColor = "lightgreen";
}
/**
 * Camabia al boton a REINICIAR
 */
function startGameBoton() {
    botonJugar.textContent = "REINICIAR";
    botonJugar.style.backgroundColor = "gold";
}

/**
 * Camabia al boton a espera / show
 */
function startShowBoton() {
    botonJugar.textContent = " . . . . . ";
    botonJugar.style.backgroundColor = "pink";
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
        stopTimer();
        defTablero.style.display = "flex";
        setTimeout (startAgain(), 500);
    }
    else {
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
            botonJugar.textContent = "Esp. Insuficiente!!";
                botonJugar.style.backgroundColor = "red";
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

        let altoCelda   = ((limiteY * 0.85) / filasTablero);
        if (((limiteX*0.98)/colTablero) >= (altoCelda*factorForma)) {
            let ancho = ((altoCelda * AJUSTE_ANCHO) * factorForma * colTablero);
            if (ancho > ANCHO_MIN) {
            juegoTablero.style.width = ancho + "px";
            }
            else juegoTablero.style.width = ANCHO_MIN + "px";
        }
        else {
            juegoTablero.style.width = (limiteX*0.98) + "px";
        }
        
        for (let i=0; i< nroFiguras;i++){
            misCasillas[i].style.height = altoCelda + "px"; 
        }         
        initAll();
    }
}
/**
 * Completa la inicialización
 */
function initAll () {
    nroFiguras     = filasTablero * colTablero;
    muestraFigura = false;
    
    for (i=0;i<nroFiguras;i++){
        misFiguras[i].style.display = "block";
        misFiguras[i].style.backgroundColor = "antiquewhite";  
    }
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
        gameRunning     = true;
        tableroInterval = setInterval(miGame, 2000); 
    } 
}

/**
 * Juego a futuro
 */    
function miGame () {
    return;  
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
 * Click en casilla
 * @param {*} pos (posición de la celda dentro de reticula)
 * @returns nothing
 */
function picBox(pos) {
    if (picRunning === true) { return; }
    picRunning = true;
    muestraPos(pos);
    switch (pos) {
        case 0: pintaCeldas("black"); break;
        case 1: pintaCeldas("white"); break;
        case 2: 
            for (index1=0; index1<nroFiguras;index1++) {
                if (colTablero%2 != 0) {
                    pintaCelda(index1, "black");
                    pintaCelda(index1+=1, "white");
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
            break;
        case 3: pintaCeldas("red"); break;  
        case 4: pintaCeldas("yellowgreen"); break;
        case 5: pintaCeldas("yellow"); break;
        case 6: pintaCeldas("blue"); break; 
        case 7: pintaCeldas("pink"); break;   
        case (nroFiguras-1): pintaCeldas(""); break;      
    }
}
/* FIN */
