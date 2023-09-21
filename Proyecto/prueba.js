function matriz(n){
    const rows = n;
    array = [];
    let contador = 1;
    
    for(let i= 0; i < rows; i++){
        array[i] = [];
        for (let j = 0; j < rows; j++){
            if (contador == n*n){
                array[i][j] = 0;
            }
            else{
                array[i][j] = contador;
                contador++; 
            }
            
        }
    }
    for (let i = 0; i < rows; i++){
        console.log(array[i]);
    }
    
    

}


function shuffleMatriz(array){
	const rows = array.length;
	const totalElementos = rows*rows;
	const arrayDesordenados = [];
	let contador = 0;

	for (let i = 0; i < rows; i++){
		for (let j = 0; j < rows; i++){
			arrayDesordenados.push(array[i][j]);
		}
	}
	console.log(arrayDesordenados);

	for (let i = totalElementos - 1; i > 0; i--){
		const posicionNum = Math.floor(Math.random() * (i+1)); //Posicion con la que va a cambiar el ultimo numero
		const temp = arrayDesordenados[i]; // Guarda en la variable temporal el numero en la posicion i del array
		arrayDesordenados[i] = arrayDesordenados[posicionNum]; //Asigna el numero de la posicion aleatoria a la posicion i del array
		arrayDesordenados[posicionNum] = temp; //Asigna el numero guardado en temp a la posicion aleatoria
	}
	
	for (let i = 0; i < rows; i++){
		for(let j = 0; j < rows; j++){
			array[i][j] = arrayDesordenados[indice]; //Agrega los elementos del array a la matriz
			contador++;
		}
	}
    for (let i = 0; i < rows; i++){
        console.log(array[i]);
    }
    
}

matriz(3);
shuffleMatriz([[1,2,3],[4,5,6],[7,8,9]]);