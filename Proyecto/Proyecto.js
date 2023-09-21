let board;
let tiles;
let rows;
let w,h;


window.onload = function(){
	setGame();
}

function loadImage(){
	source = loadImage("image1.jpg")
}

function setGame(){
	board = matriz(3);
	rows = board[0];
	shuffle = shuffleMatriz(board);
	w = 800/rows;
	h = 800/rows;

	for(let r = 0; r < length.board; r++){
		for( let c = 0; c < length.board; c++){
			let img = createImage(w,h);
			let x = i*w;
			let y = j*h;
			img.copy(source,x,y,w,h,0,0,w,h);
			let index = board[i][j];
			let tile = new Tile(index,img); 
			tiles.push(tile);
		}
	}
}

function draw() {
	background(0);
  
	// Draw the current board
	for (let i = 0; i < cols; i++) {
	  for (let j = 0; j < rows; j++) {
		let index = board[i][j];
		let x = i * w;
		let y = j * h;
		let tileIndex = board[index];
		if (tileIndex = 0) {
		  let img = tiles[tileIndex].img;
		  image(img, x, y, w, h);
		}
	  }
	}
	
	// Show it as grid
	for (let i = 0; i < rows; i++) {
	  for (let j = 0; j < rows; j++) {
		let x = i * w;
		let y = j * h;
		strokeWeight(2);
		noFill();
		rect(x, y, w, h);
	  }
	}
}


function updateBox(tile, num) { //Actualiza todas las casillas del tablero
    tile.innerText = "";
    tile.classList.value = ""; /* Limpia el texto de las cajas (2,4,8,16,32...) */
    tile.classList.add("tile");
    if (num >= 0) {
        tile.innerText = num;
        tile.classList.add("box");
        
    }


}



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
		console.log(array[i]);
    }
	console.log(array);
	return array;

}

function shuffleMatriz(array){
	const rows = array.length;
	const totalElementos = rows*rows;
	const arrayDesordenados = [];
	let contador = 0;
	let indice = 0;

	for (let i = 0; i < rows; i++){
		for (let j = 0; j < rows; j++){
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
			indice++;
		}
	}
	return array;
    
}