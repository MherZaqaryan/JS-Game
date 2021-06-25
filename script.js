matrix = [];
grasses = [];
grassEaters = [];
monsters = [];

var side = 15;

function matrixGenerator(size, grassesCount, grassEatersCount, monstersCount) {
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) matrix[i].push(0);
    }
    for (let i = 0; i < grassesCount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Grass(x, y);
        else i--;
    }
    for (let i = 0; i < grassEatersCount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new GrassEater(x, y);
        else i--;
    }
    for (let i = 0; i < monstersCount; i++) {
        let x = Math.round(Math.random() * (size - 1));
        let y = Math.round(Math.random() * (size - 1));
        if (matrix[y][x] == 0) new Monster(x, y);
        else i--;
    }
}

matrixGenerator(50, 10, 15, 25);

function setup() {
    createCanvas(matrix.length * side + 1, matrix.length * side + 1);
    frameRate(60);
    background("#acacac");
}

function draw() {
    fill("#acacac");
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] == 0) fill("#acacac");
            else if (matrix[y][x] == 1) fill("#0ac900");
            else if (matrix[y][x] == 2) fill("#e1ff00");
            else if (matrix[y][x] == 3) fill("#ff0066");
            else if (matrix[y][x] == 4) fill("#00aeff");
            else if (matrix[y][x] == 5) fill("#ff9d00");
            rect(x * side, y * side, side, side);
        }
    }
    for (const i in grasses) grasses[i].mult();
    for (const i in grassEaters) grassEaters[i].start();
    for (const i in monsters) monsters[i].start();
}