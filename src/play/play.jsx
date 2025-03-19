import React from 'react';
import './play.css';

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = [];
        for (let y = 0; y < this.height; y++) {
            this.array.push([])
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.array[y].push('');
            }
        }
    }

    get_val(x, y) {
        return this.array[y][x];
    }

    set_val(x, y, new_val) {
        this.array[y][x] = new_val;
    }

    clear() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.set_val(x, y, 'nothing')
            }
        }
    }
}

class Snake {
    constructor(length, head_x, head_y, grid) {
        this.length = length;
        this.head_x = head_x;
        this.head_y = head_y;
        this.grid = grid;
        this.blocks = [[this.head_x, this.head_y]];
        for (let b = 1; b < this.length; b++) {
            this.blocks.push([(this.head_x - b), (this.head_y)]);
        }
    }

    game_over() {
        for (let b = 0; b < this.length; b++) {
            this.blocks.pop();
        }
        document.getElementById('score').innerHTML = "Score = " + (this.length - 4);
        this.length = 0;
    }
    
    move(direction) {
        if (direction === 'up') {

            for (let s = 1; s < this.length; s++) {
                if ((this.blocks[0][0] === this.blocks[s][0]) && ((this.blocks[0][1] - 1) === this.blocks[s][1])) {
                    this.game_over();
                    return 1;
                }
            }

            if (this.blocks[0][1] === 0) {
                this.game_over();
                return 1;
            } else {
                for (let s = (this.length - 1); s > 0; s--) {
                    this.blocks[s][0] = this.blocks[(s - 1)][0];
                    this.blocks[s][1] = this.blocks[(s - 1)][1];
                }
                this.blocks[0][1] -= 1;
                return 0;
            }

        } else if (direction === 'down') {

            for (let s = 1; s < this.length; s++) {
                if ((this.blocks[0][0] === this.blocks[s][0]) && ((this.blocks[0][1] + 1) === this.blocks[s][1])) {
                    this.game_over();
                    return 1;
                }
            }

            if (this.blocks[0][1] === (this.grid.height - 1)) {
                this.game_over();
                return 1;
            } else {
                for (let s = (this.length - 1); s > 0; s--) {
                    this.blocks[s][0] = this.blocks[(s - 1)][0];
                    this.blocks[s][1] = this.blocks[(s - 1)][1];
                }
                this.blocks[0][1] += 1;
                return 0;
            }

        } else if (direction === 'left') {

            for (let s = 1; s < this.length; s++) {
                if ((this.blocks[0][1] === this.blocks[s][1]) && ((this.blocks[0][0] - 1) === this.blocks[s][0])) {
                    this.game_over();
                    return 1;
                }
            }

            if (this.blocks[0][0] === 0) {
                this.game_over();
                return 1;
            } else {
                for (let s = (this.length - 1); s > 0; s--) {
                    this.blocks[s][0] = this.blocks[(s - 1)][0];
                    this.blocks[s][1] = this.blocks[(s - 1)][1];
                }
                this.blocks[0][0] -= 1;
                return 0;
            }

        } else if (direction === 'right') {

            for (let s = 1; s < this.length; s++) {
                if ((this.blocks[0][1] === this.blocks[s][1]) && ((this.blocks[0][0] + 1) === this.blocks[s][0])) {
                    this.game_over();
                    return 1;
                }
            }

            if (this.blocks[0][0] === (this.grid.width - 1)) {
                this.game_over();
                return 1;
            } else {
                for (let s = (this.length - 1); s > 0; s--) {
                    this.blocks[s][0] = this.blocks[(s - 1)][0];
                    this.blocks[s][1] = this.blocks[(s - 1)][1];
                }
                this.blocks[0][0] += 1;
                return 0;
            }
        }
    }
}

let direction = 'right';

function random_coords(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw(grid) {
    let game = document.getElementById('field');
    let ctx = game.getContext('2d');
    ctx.clearRect(0, 0, 577, 577)
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            if (grid.get_val(x, y) === 'snake') {
                ctx.fillStyle = 'green';
                ctx.fillRect((1 + (9 * x)), (1 + (9 * y)), 8, 8);
            } else if (grid.get_val(x, y) === 'apple') {
                ctx.fillStyle = 'red';
                ctx.fillRect((1 + (9 * x)), (1 + (9 * y)), 8, 8);
            }
        }
    }
}

function up() {
    if (direction != 'down') {
        direction = 'up';
    }
}

function down() {
    if (direction != 'up') {
        direction = 'down';
    }
}

function left() {
    if (direction != 'right') {
        direction = 'left';
    }
}

function right() {
    if (direction != 'left') {
        direction = 'right';
    }
}

let game_screen = new Grid(64, 64);
let Player = new Snake(4, 15, 31, game_screen);
let apple = [20, 31];
let check_coords;

function new_apple() {
    let coords = [random_coords(0, 63), random_coords(0, 63)];
    for (let b = 0; b < Player.length; b++) {
        if (coords === Player.blocks[b]) {
            new_apple();
            return;
        }
    }
    return coords;
}

function update_grid(grid, snake) {
    grid.clear()
    if ((direction === 'up') && (snake.blocks[0][0] === apple[0]) && (snake.blocks[0][1] === (apple[1] + 1))) {
        snake.blocks.unshift([snake.blocks[0][0], (snake.blocks[0][1] - 1)]);
        snake.length += 1;
        apple = new_apple();
        grid.set_val(apple[0], apple[1], 'apple');
    } else if ((direction === 'down') && (snake.blocks[0][0] === apple[0]) && (snake.blocks[0][1] === (apple[1] - 1))) {
        snake.blocks.unshift([snake.blocks[0][0], (snake.blocks[0][1] + 1)]);
        snake.length += 1;
        apple = new_apple();
        grid.set_val(apple[0], apple[1], 'apple');
    } else if ((direction === 'left') && (snake.blocks[0][0] === (apple[0] + 1)) && (snake.blocks[0][1] === apple[1])) {
        snake.blocks.unshift([(snake.blocks[0][0] - 1), snake.blocks[0][1]]);
        snake.length += 1;
        apple = new_apple();
        grid.set_val(apple[0], apple[1], 'apple');
    } else if ((direction === 'right') && (snake.blocks[0][0] === (apple[0] - 1)) && (snake.blocks[0][1] === apple[1])) {
        snake.blocks.unshift([(snake.blocks[0][0] + 1), snake.blocks[0][1]]);
        snake.length += 1;
        apple = new_apple();
        grid.set_val(apple[0], apple[1], 'apple');
    }
    for (let s = 0; s < snake.length; s++) {
        grid.set_val(snake.blocks[s][0], snake.blocks[s][1], 'snake');
    }
    grid.set_val(apple[0], apple[1], 'apple');
}

function movement() {
    game_screen.clear();
    check_coords = Player.move(direction);
    if (check_coords === 0) {
        update_grid(game_screen, Player);
        draw(game_screen);
    }
}

function check_collision(interval) {
    if (check_coords === 1) {
        clearInterval(interval);
        game_screen.clear();
        draw(game_screen);
    }
}

function start_interval() {
    let interval = setInterval(movement, 100);
    let check_interval = setInterval(check_collision, 100, interval);
}

export function Play() {
    return (
        <main>
            <div id='game'>
                <canvas id='field' width='577' height='577'></canvas>
                <div id='score'></div>
            </div>
            <div id='controls'>
                <button name='up' onClick={up}></button>
                <br></br>
                <button name='left' onClick={left}></button>
                <button name='down' onClick={down}></button>
                <button name='right' onClick={right}></button>
                <br></br>
                <button name='start' onClick={start_interval}>Start</button>
            </div>
        </main>
    )
}