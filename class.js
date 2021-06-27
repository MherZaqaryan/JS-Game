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
        if (this.multiplay < 2) return;
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
        this.energy = 5;
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
        this.energy += 3;
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
        this.energy -= 2;
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

class Predator {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 20;
        predators.push(this);
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
            this.move();
        }
        else {
            this.energy -= 0.2;
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
        this.energy -= 1;
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
        this.energy += 2;
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
        new Predator(x, y);
        this.energy -= 5;
    }

    remove() {
        if (this.energy > 0) return;
        matrix[this.y][this.x] = 0;
        for (var i in predators) {
            if (!(this.x == predators[i].x && this.y == predators[i].y)) continue;
            predators.splice(i, 1);
            break;
        }
    }

}

class Destroyer {

    constructor(y) {
        this.y = y;
        this.directions = [];
        for (let j = -2; j <= 2; j++) {
            let y = this.y + j;
            for (let x = 0; x < matrix[this.y].length; x++) {
                if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
                this.directions.push([x, y]);
            }
        }
        this.cooldown = 20;
        this.time = 5;
        destroyers.push(this);
    }

    start() {
        this.cooldown--;
        if (this.cooldown <= 0) {
            this.destroy();
        }
        if (this.time <= 0) {
            this.mult();
            this.remove();
        }
    }

    destroy() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            this.removeObject(x, y);
            matrix[y][x] = 4;
        }
        this.time--;
    }

    remove() {
        for (const d in this.directions) {
            matrix[this.directions[d][1]][this.directions[d][0]] = 0;
        }
        for (var i in destroyers) {
            if (!(this.x == destroyers[i].x && this.y == destroyers[i].y)) continue;
            destroyers.splice(i, 1);
            break;
        }
        this.time = 5;
    }

    mult() {
        new Destroyer(Math.round(Math.random() * (matrix.length - 1)));
        this.cooldown = 20;
    }

    removeObject(x, y) {
        for (const i in grasses) {
            if (!(grasses[i].x == x && grasses[i].y == y)) continue;
            grasses.splice(i, 1);
        }
        for (const i in grassEaters) {
            if (!(grassEaters[i].x == x && grassEaters[i].y == y)) continue;
            grassEaters.splice(i, 1);
        }
        for (const i in predators) {
            if (!(predators[i].x == x && predators[i].y == y)) continue;
            predators.splice(i, 1);
        }
    }

}

class Grenade {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bursted = false;
        this.multiplayCooldown = 10;
        this.cooldown = 10;
        this.disappearCooldown = 5;
        matrix[y][x] = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ]
        grenades.push(this);
    }

    start() {
        this.cooldown--;
        this.multiplayCooldown--;
        if (this.bursted) this.disappearCooldown--;
        if (this.multiplayCooldown <= 0) {
            this.multiplayCooldown = 10;
            this.mult();
        }
        if (this.cooldown <= 0) {
            this.burst();
        }
        if (this.disappearCooldown <= 0) {
            this.remove();
        }
    }

    mult() {
        let x = Math.round(Math.random() * (matrix.length - 1));
        let y = Math.round(Math.random() * (matrix.length - 1));
        if (matrix[y][x] == 0) new Grenade(x, y);
        else this.mult();
    }

    remove() {
        for (const d in this.directions) {
            let x = this.directions[d][0];
            let y = this.directions[d][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 0;
        }
        matrix[this.y][this.x] = 0;
        for (var i in grenades) {
            if (!(this.x == grenades[i].x && this.y == grenades[i].y)) continue;
            grenades.splice(i, 1);
            break;
        }
    }

    burst() {
        matrix[this.y][this.x] = 5;
        for (const i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (!(x >= 0 && y >= 0 && x < matrix.length && y < matrix.length)) continue;
            matrix[y][x] = 5;
            this.removeObject(x, y)
        }
        this.bursted = true;
    }

    removeObject(x, y) {
        for (const i in grassEaters) {
            if (!(grassEaters[i].x == x && grassEaters[i].y == y)) continue;
            grassEaters.splice(i, 1);
        }
        for (const i in predators) {
            if (!(predators[i].x == x && predators[i].y == y)) continue;
            predators.splice(i, 1);
        }
    }

}