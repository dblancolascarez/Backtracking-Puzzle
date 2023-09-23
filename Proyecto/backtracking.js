// Define el tamaño máximo de movimientos que se van a realizar, después de 15 se pega
const PROFUNDIDAD_MAXIMA = 15;

/**
 * @typedef {{
 *    direccion: "arriba" | "izquierda" | "derecha" | "abajo",
 *    posicion: number
 * }} Movimiento
* @typedef {{
*   posiciones: number[],
*   posicionVacia: number,
*   movimientos: Movimiento[]
* }} Solucion
*/

/**
* Las posiciones se cuentan desde cero
* Los números dentro de la lista de posiciones representan las posiciones en las que deberian de estar
* En el ejemplo de abajo el 5 que esta de primero en la lista deberia de estar en la quinta posición
* El cero en la última posición debería estar de primero, eso representan los números e intentarán acomodarse
* Se importa la función
* import backtracking from "./backtracking";
* Ejemplo de uso para una matriz de 3x3 con el espacio vacio en la tercera posicion
* backtracking([
*     5, 8, 2,
*     3, 4, 7,
*     1, 6, 0
* ], 2);
* Devuelve la solución más ordenada que encontró junto la posición en la que quedó la celda vacía y la lista de movimientos(que tiene la dirección y posición a la que se mueve)
* @param {number[]} posiciones
* @param {number} posicionVacia
* @param {Movimiento[]} [movimientos]
* @return {Solucion}
*/
const backtracking = (posiciones, posicionVacia, movimientos = []) => {
    const posiblesSoluciones = [];
    const posibilidades = generarPosibilidades(posiciones, posicionVacia);
    for(let posibilidad of posibilidades){
        const posibleSolucion = aplicarMovimiento(posiciones, posicionVacia, movimientos, posibilidad);
        if(esSolucion(posibleSolucion.posiciones, posibleSolucion.posicionVacia)) return posibleSolucion;
        if(posibleSolucion.movimientos.length >= PROFUNDIDAD_MAXIMA){
            posiblesSoluciones.push(posibleSolucion);
        } else {
            posiblesSoluciones.push(backtracking(
                posibleSolucion.posiciones,
                posibleSolucion.posicionVacia,
                posibleSolucion.movimientos));
        }
    }    
    return extraerMejorSolucion(posiblesSoluciones);
}

/**
* Calcula las direcciones en las que se puede mover la celda vacia
* @param {number[]} posiciones
* @param {number} posicionVacia
* @return {Movimiento[]}
*/
const generarPosibilidades = (posiciones, posicionVacia) => {
    const n = Math.sqrt(posiciones.length);
    if(n % 1 != 0) throw new Error("La lista tiene que ser cuadrada");
    const movimientos = [];
    if(posicionVacia >= n) {
        movimientos.push({direccion: "arriba", posicion: posicionVacia - n});
    }
    if(posicionVacia % n != 0){
        movimientos.push({direccion: "izquierda", posicion: posicionVacia - 1});
    }
    if((posicionVacia + 1) % n != 0){
        movimientos.push({direccion: "derecha", posicion: posicionVacia + 1});
    }
    if(posicionVacia < posiciones.length - n){
        movimientos.push({direccion: "abajo", posicion: posicionVacia + n});
    }
    return movimientos;
}

/**
* @param {number[]} posiciones
* @param {number} posicionVacia
* @param {Movimiento[]} movimientos
* @param {Movimiento} movimiento
* @return {Solucion}
*/
const aplicarMovimiento = (posiciones, posicionVacia, movimientos, movimiento) => {
    const nuevasPosiciones = [...posiciones];
    nuevasPosiciones[posicionVacia] = posiciones[movimiento.posicion];
    nuevasPosiciones[movimiento.posicion] = posiciones[posicionVacia];
    const nuevaPosicionVacia = movimiento.posicion;
    const nuevosMovimientos = [...movimientos, movimiento];
    const posibleSolucion = {
        posiciones: nuevasPosiciones,
        posicionVacia: nuevaPosicionVacia,
        movimientos: nuevosMovimientos
    };
    return posibleSolucion;
}

/**
* @param {number[]} posiciones
* @param {number} posicionVacia
*/
const calcularCantidadOrdenados = (posiciones, posicionVacia) => {
    let ordenados = 0;
    posiciones.forEach((posicion, indice) => {
        if(posicion == indice || indice == posicionVacia) ordenados++;
    });
    return ordenados;
}

/**
* @param {number[]} posiciones
* @param {number} posicionVacia
*/
const esSolucion = (posiciones, posicionVacia) => {
    return calcularCantidadOrdenados(posiciones, posicionVacia) == posiciones.length;
}

/**
* @param {Solucion[]} soluciones
* @return {Solucion}
*/
const extraerMejorSolucion = (soluciones) => {
    let masOrdenado = null;
    let cantidadMasOrdenados = 0;
    soluciones.forEach(solucion => {
        const cantidadOrdenadosSolucion = calcularCantidadOrdenados(
            solucion.posiciones,
            solucion.posicionVacia
        );
        if(cantidadOrdenadosSolucion > cantidadMasOrdenados){
            cantidadMasOrdenados = cantidadOrdenadosSolucion;
            masOrdenado = solucion;
        }
    });
    return masOrdenado
}

// export default backtracking;
// module.exports = backtracking;
