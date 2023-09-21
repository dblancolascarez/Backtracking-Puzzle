let board;
let tiles;
let rows;
let cols;
let w, h;
let source;
let tileSize = 800/rows; // Tamaño de cada ficha

window.onload = function () {
    loadImage();
}

function loadImage() {
    source = new Image();
    source.src = "image1.jpg";
    source.onload = function () {
        rows = 3;
        initializeGame();
        const dimension = document.getElementById("Tamaño");
        dimension.addEventListener('change', function() {
            rows = parseInt(this.value); initializeGame();
            initializeGame();
    })
    };
}

function initializeGame() {
    if (!source.complete) {
        return; 
    }
    board = matriz(rows);
    console.log(board);
    rows = board.length;
    cols = board[0].length;
    tiles = [];

    w = source.width;
    h = source.height;

    tileSize = w / cols; // Ajusta el tamaño de la ficha en función del tamaño de la imagen

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * tileSize;
            let y = j * tileSize;
            let index = board[i][j];
            let img = document.createElement("canvas");
            img.width = tileSize;
            img.height = tileSize;
            let ctx = img.getContext("2d");
            ctx.drawImage(source, x, y, tileSize, tileSize, 0, 0, tileSize, tileSize);
            let tile = new Tile(index, img);
            tiles.push(tile);
        }
    }
    draw();
}

function draw() {
    let canvas = document.getElementById('board');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja las fichas en el canvas
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let index = board[i][j]
            console.log(index);
            let x = i * tileSize;
            let y = j * tileSize;
            let tile = tiles[index];
            ctx.drawImage(tile.img, x, y);
        }
    }

    // Dibuja líneas para separar las fichas
    for (let i = 1; i < cols; i++) {
        let x = i * tileSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let j = 1; j < rows; j++) {
        let y = j * tileSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function matriz(n){
    const rows = n;
    array = [];
    let contador = 0;
    
    for(let i= 0; i < rows; i++){
        array[i] = [];
        for (let j = 0; j < rows; j++){
            if (contador == n*n){
                array[i][j] = -1;
            }
            else{
                array[i][j] = contador;
                contador++; 
            }
            
        }
    }
	return array;

}