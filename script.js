const game = {
    Board: {
        line1: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line2: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line3: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line4: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line5: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line6: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line7: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line8: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line9: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line10: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line11: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line12: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line13: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line14: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line15: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line16: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line17: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line18: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line19: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line20: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
    },

    Spawn: {
        line1: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line2: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line3: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line4: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
    },

    drawBoard() {
        console.clear()

        for(let i = 1; i<=4; i++) {
            console.log(`|` + game.Spawn[`line` + i].join("") + `|` + `     Spawn${i}`)
        }
        
        console.log("________________________________")

        for(let i = 1; i <= 20; i++) {
            console.log(`|` + game.Board[`line` + i].join("") + `|` + `     Line${i}`)
        }

    },

    clockTick() {
        console.clear();
        this.downTick();
        this.drawBoard();
    },

    downTick() {
        for(let i = 20; i >=1; i--) {
            if (i === 20) {
                for (let n = 0; n <= 9; n++) {
                    if (game.Board.line20[n] === "[_]") {
                        game.Board.line20[n] = game.Board.line19[n]
                    } else {
                        return;
                    }
                } 
            } else if (i < 20 && i >= 3) {
                for (let n = 0; n <= 9; n++) {
                    if (game.Board[`line` + `${i + 1}`][n] === "[_]") {
                        game.Board[`line` + i][n] = game.Board[`line` + `${i - 1}`][n];
                        game.Board[`line` + `${i - 1}`][n] = game.Board[`line` + `${i - 2}`][n]
                    } else {
                        return;
                    }
                } 
            } else if (i === 2) {
                for (let n = 0; n <= 9; n++) {
                    if (game.Board[`line` + `${i + 1}`][n] === "[_]") {
                        game.Board[`line` + i][n] = game.Board[`line` + `${i - 1}`][n];
                        game.Board.line1[n] = game.Spawn.line4[n]
                    } else {
                        return;
                    }
                }
            } else if (i === 1) {
                for (let n = 0; n <= 9; n++) {
                    game.Board.line1[n] = game.Spawn.line4[n]
                }
            }
               
        }
    },

    checkIfCanMove() {

    }
}

game.drawBoard()

// check if line can move
// move everything