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
    constructor(length, head_x, head_y) {
        this.length = length;
        this.head_x = head_x;
        this.head_y = head_y;
        this.blocks = [[this.head_x, this.head_y]];
        for (let b = 1; b < this.length; b++) {
            this.blocks.push([(this.head_x - b), (this.head_y)]);
        }
    }
    
    move(direction) {
        if (direction === 'up') {
            for (let s = (this.length - 1); s > 0; s--) {
                this.blocks[s][0] = this.blocks[(s - 1)][0];
                this.blocks[s][1] = this.blocks[(s - 1)][1];
            }
            this.blocks[0][1] -= 1;
        } else if (direction === 'down') {
            for (let s = (this.length - 1); s > 0; s--) {
                this.blocks[s][0] = this.blocks[(s - 1)][0];
                this.blocks[s][1] = this.blocks[(s - 1)][1];
            }
            this.blocks[0][1] += 1;
        } else if (direction === 'left') {
            for (let s = (this.length - 1); s > 0; s--) {
                this.blocks[s][0] = this.blocks[(s - 1)][0];
                this.blocks[s][1] = this.blocks[(s - 1)][1];
            }
            this.blocks[0][0] -= 1;
        } else if (direction === 'right') {
            for (let s = (this.length - 1); s > 0; s--) {
                this.blocks[s][0] = this.blocks[(s - 1)][0];
                this.blocks[s][1] = this.blocks[(s - 1)][1];
            }
            this.blocks[0][0] += 1;
        }
    }

    game_over() {
        for (let b = 0; b < this.length; b++) {
            this.blocks.pop();
        }
        this.length = 0;
    }
}

let direction = 'right';

function draw(grid) {
    let game = document.getElementById('field');
    let ctx = game.getContext('2d');
    ctx.clearRect(0, 0, 577, 577)
    for (let y = 0; y < grid.height; y++) {
        for (let x = 0; x < grid.width; x++) {
            if (grid.get_val(x, y) === 'snake') {
                ctx.fillStyle = 'green';
                ctx.fillRect((1 + (9 * x)), (1 + (9 * y)), 8, 8);
            }
        }
    }
}
function update_grid(grid, snake) {
    grid.clear()
    for (let s = 0; s < snake.length; s++) {
        grid.set_val(snake.blocks[s][0], snake.blocks[s][1], 'snake');
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
let Player = new Snake(4, 15, 31);

function movement() {
    game_screen.clear();
    Player.move(direction);
    update_grid(game_screen, Player);
    draw(game_screen);
}

function start_interval() {
    let interval = setInterval(movement, 400);
}


export function Play() {
    return (
        <main>
            <div id='game'>
                <canvas id='field' width='577' height='577'></canvas>
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