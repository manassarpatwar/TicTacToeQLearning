
var CANVAS;
var env;
function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(windowWidth/2-200, windowHeight/2-200);
    env = new TicTacToe(3);
}

function windowResized(){
    canvas.position(windowWidth/2-200, windowHeight/2-200);
}

function draw(){
    clear();
    // background(0);
    env.drawBoard();
    noLoop();
}

class TicTacToe{
    constructor(size, players = ["X","O"]){
        this.size = size;
        this.board = [];
        this.players = players;
        this.default = "";
        for(let i = 0; i < size; i++){
            //rows
            this.board[i]  = []
            for(let j = 0; j < size; j++){
                //columns
                this.board[i][j] = this.default;
            }
        }
    }

    drawBoard(cellSize = 100, stkWt = 5){
        push();
        noFill();
        stroke(0);
        strokeWeight(stkWt);
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                push();
                translate(i*cellSize+stkWt/2, j*cellSize+stkWt/2);
                rect(0, 0, cellSize, cellSize);
                // strokeWeight(1);
                // fill(0);
                // textSize(30);
                // textAlign(CENTER, CENTER);
                // if(this.board[i][j] != this.default){
                //     text(this.board[i][j], cellSize/2, cellSize/2);
                // }
                pop();
            }
        }
        pop();
    }

    checkRows(board = this.board){
        for(let row of board){
            for(let i = 0; i < this.players.length; i++){
                if(row.every(r => r == this.players[i]))
                    return {done: true, player : i };
            }
        }
        return {done: false};
    }

    checkColumns(){
        return this.checkRows(this.invert(this.board));
    }

    done(){
        let rows = this.checkRows();
        if(rows.done)
            return rows.player;

        let columns = this.checkColumns();
        if(columns.done)
            return columns.player;
        
        let diagonals = this.checkDiagonals();
        if(diagonals.done)
            return diagonals.player;

        return false;
    }

    invert(board){
        return Array.from(Array(board.length).keys()).map(i => board.map(row => row[i]));
    }

    checkDiagonals(){
        let diagonal1 = [];
        let diagonal2 = [];
        //Check diagonals
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++){
                if(i == j)
                    diagonal1.push(this.board[i][j]);
                
                if((i+j) == (this.size-1))
                    diagonal2.push(this.board[i][j]);
            }
        }


        for(let m = 0; m < this.players.length; m++){
            if(diagonal1.every(d => d == this.players[m]))
            return {done: true, player : m };
            if(diagonal2.every(d => d == this.players[m]))
                return {done: true, player : m };
        }
        return {done: false};
    }
}

