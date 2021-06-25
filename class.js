class Grass {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        matrix[y][x] = 1;
        grasses.push(this);
    }

    mult() {
        this.multiplay++;
        if (this.multiplay < 1) return;
        let emptyCells = this.chooseCell(0);
        if (emptyCells.length > 0) {
            let randIndex = Math.round(Math.random() * (emptyCells.length - 1));
            let x = emptyCells[randIndex][0];
            let y = emptyCells[randIndex][1];
            matrix[y][x] = 1;
            new Grass(x, y);
        }
        this.multiplay = 0;
    }

    chooseCell(number) {
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            if (matrix[y][x] != number) continue;
            found.push(this.directions[i]);
        }
        return found;
    }

}

class GrassEater {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.directions = [];
        grassEaters.push(this);
        matrix[y][x] = 2;
    }

    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(number) {
        this.updateDirections();
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            if (matrix[y][x] != number) continue;
            found.push(this.directions[i]);
        }
        return found;
    }

    start() {
        if (this.chooseCell(1).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 10) {
            this.mult()
        }
        if (this.energy <= 0) {
            this.remove()
        }
    }

    mult() {
        if (this.energy < 30) return;
        var emptyCells = this.chooseCell(0);
        var randIndex = Math.round(Math.random() * (emptyCells.length - 1));
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[this.y][this.x] = 2;
        new GrassEater(x, y);
        this.energy = 10;
    }

    eat() {
        let foods = this.chooseCell(1);
        let randIndex = Math.round(Math.random() * (foods.length - 1));
        let x = foods[randIndex][0];
        let y = foods[randIndex][1];
        for (const i in grasses) {
            if (!(grasses[i].x == x && grasses[i].y == y)) continue;
            grasses.splice(i, 1);
        }
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
        this.energy += 2;
        this.x = x;
        this.y = y;
    }
    
    move() {
        let emptyCells = this.chooseCell(0);
        let randIndex = Math.round(Math.random() * (emptyCells.length - 1));
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[y][x] = 2;
        matrix[this.y][this.x] = 0;
        this.x = x;
        this.y = y;
        this.energy-=2;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in grassEaters) {
            if (!(this.x == grassEaters[i].x && this.y == grassEaters[i].y)) continue;
            grassEaters.splice(i, 1);
            break;
        }
    }

}

class Monster {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 10;
        monsters.push(this);
        matrix[y][x] = 3;
    }

    updateDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(number) {
        this.updateDirections();
        let found = [];
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            if (matrix[y][x] != number) continue;
            found.push(this.directions[i]);
        }
        return found;
    }

    start() {
        if (this.chooseCell(2).length > 0) {
            this.eat()
        }
        else if (this.chooseCell(0).length > 0) {
            this.move()
        }
        if (this.energy >= 20) {
            this.mult()
        }
        if (this.energy <= 0) {
            this.remove()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0);
        let randIndex = Math.round(Math.random() * (emptyCells.length - 1));
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.x = x;
        this.y = y;
        this.energy--;
    }

    eat() {
        let foods = this.chooseCell(2);
        let randIndex = Math.round(Math.random() * (foods.length - 1));
        let x = foods[randIndex][0];
        let y = foods[randIndex][1];
        for (const i in grassEaters) {
            if (!(grassEaters[i].x == x && grassEaters[i].y == y)) continue;
            grassEaters.splice(i, 1);
        }
        matrix[y][x] = 3;
        matrix[this.y][this.x] = 0;
        this.energy += 1;
        this.x = x;
        this.y = y;
    }

    mult() {
        if (this.energy < 30) return;
        var emptyCells = this.chooseCell(0);
        var randIndex = Math.round(Math.random() * (emptyCells.length - 1));
        let x = emptyCells[randIndex][0];
        let y = emptyCells[randIndex][1];
        matrix[this.y][this.x] = 3;
        new Monster(x, y);
        this.energy = 8;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in monsters) {
            if (!(this.x == monsters[i].x && this.y == monsters[i].y)) continue;
            monsters.splice(i, 1);
            break;
        }
    }

}