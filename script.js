const game = {
    board: {
        line24: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line23: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line22: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line21: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        
        line20: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line19: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line18: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line17: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line16: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line15: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line14: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line13: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line12: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line11: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line10: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line9: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line8: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line7: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line6: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line5: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line4: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line3: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line2: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],
        line1: ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "],

        draw() {
            console.clear();
            console.log(`| 0  1  2  3  4  5  6  7  8  9 |`)
            for(let i = 20; i >= 1; i--) {
                console.log(`|` + game.board[`line` + i].join("") + `|` + `     Line${i}`)
            };
            console.log(`| 0  1  2  3  4  5  6  7  8  9 |`)
            console.log(`Figure:`);
            console.log(`   number: ${game.figure.number}`)
            console.log(`   position: ${game.figure.position}`)
            console.log(`   highPoint: ${game.figure.highPoint}`)
            console.log(`   lowPoint: ${game.figure.lowPoint}`)
            console.log(`   leftPoint: ${game.figure.leftPoint}`)
            console.log(`   rightPoint: ${game.figure.rightPoint}`)
        },
    },

    figure: {
        generateFigure() {
            let generatedFigure = Math.floor(Math.random() * 7) + 1;
            if (generatedFigure === game.figure.nextFigure.number) {
                game.figure.generateFigure()
            } else if (generatedFigure === 1) {
                game.figure.nextFigure.number = 1;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "[?]", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "   ", "[?]", "   ", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 2) {
                game.figure.nextFigure.number = 2;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "[?]", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "   ", "   ", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 3) {
                game.figure.nextFigure.number = 3;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 4) {
                game.figure.nextFigure.number = 4;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 4;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 5) {
                game.figure.nextFigure.number = 5;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "[?]", "[?]", "   ", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 6) {
                game.figure.nextFigure.number = 6;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "[?]", "[?]", "[?]", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "[?]", "   ", "   ", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 19;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 5;
            } else if (generatedFigure === 7) {
                game.figure.nextFigure.number = 7;
                game.figure.nextFigure.line20 = ["   ", "   ", "   ", "[?]", "[?]", "[?]", "[?]", "   ", "   ", "   "];
                game.figure.nextFigure.line19 = ["   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   ", "   "];
                game.figure.nextFigure.highPoint = 20;
                game.figure.nextFigure.lowPoint = 20;
                game.figure.nextFigure.leftPoint = 3;
                game.figure.nextFigure.rightPoint = 6;
            }
        },

        nextFigure: {
            number: "",
            line20: [],
            line19: [],
            highPoint: "",
            lowPoint: "",
            leftPoint: "",
            rightPoint: "",
        },

        drawNextFigure() {
            let line19HasSpace = true;
            let line20HasSpace = true;

            checkIfLine19HasSpace = (() => {
                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line19[n] === "[?]" && game.board.line19[n] === "[X]") {
                        line19HasSpace = false;
                    } 
                }
            })();

            checkIfLine20HasSpace = (() => {
                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line20[n] === "[?]" && game.board.line20[n] === "[X]") {
                        line20HasSpace = false;
                    } 
                }
            })();

            if (line19HasSpace && line20HasSpace) {
                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line19[n] === "[?]") {
                        game.board.line19[n] = "[?]"
                    }
                }

                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line20[n] === "[?]") {
                        game.board.line20[n] = "[?]"
                    }
                }
                game.figure.number = game.figure.nextFigure.number;
                game.figure.highPoint = game.figure.nextFigure.highPoint;
                game.figure.lowPoint = game.figure.nextFigure.lowPoint;
                game.figure.leftPoint = game.figure.nextFigure.leftPoint;
                game.figure.rightPoint = game.figure.nextFigure.rightPoint;
                game.figure.position = 1;
                game.checkCollision();
                game.board.draw();
                game.figure.generateFigure();
            } else {
                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line19[n] === "[?]" && game.board.line19[n] === "   ") {
                        game.board.line19[n] = "[?]"
                    }
                }

                for (let n = 0; n <= 9; n++) {
                    if (game.figure.nextFigure.line20[n] === "[?]" && game.board.line20[n] === "   ") {
                        game.board.line20[n] = "[?]"
                    }
                }
                game.checkCollision();
                game.board.draw();
                game.gameOver = true;
                game.clockTick();
            } 
        },

        number: "",
        highPoint: "",
        lowPoint: "",
        leftPoint: "",
        rightPoint: "",
        position: "",

        canMoveDown() {
            let canMoveDown = true;
            if (game.figure.lowPoint >= 2) {
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                        if (game.board[`line` + line][n] === "[?]" && game.board[`line` + `${line - 1}`][n] === "[X]") {
                            canMoveDown = false;
                        }
                    }
                } 
            } else canMoveDown = false;
            return canMoveDown;
        },

        moveDown() {
            if (game.figure.canMoveDown()) {
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                        if (game.board[`line` + line][n] !== "   ") {
                            if (line !== game.figure.highPoint) {
                                game.board[`line` + `${line - 1}`][n] = game.board[`line` + line][n] 
                            } else {
                                game.board[`line` + `${line - 1}`][n] = game.board[`line` + line][n]
                                game.board[`line` + line][n] = "   "
                            }
                        }
                   }
                }
                game.figure.highPoint--;
                game.figure.lowPoint--;
                game.checkCollision();
                game.board.draw();
            } else {
                game.gameOver = true;
                game.clockTick();
            }
        },

        canMoveLeft() {
            let canMoveLeft = true;
            if (game.figure.leftPoint >= 1) {
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                        if (game.board['line' + line][n] === "[?]" && game.board['line' + line][n-1] === "[X]") {
                            canMoveLeft = false;
                        }
                    }
                }
            } else canMoveLeft = false;
            return canMoveLeft;
        },

        moveLeft() {
            if (game.figure.canMoveLeft()) {    
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                        if (n !== game.figure.rightPoint) {
                            game.board[`line` + line][n-1] = game.board[`line` + line][n];
                        } else {
                            game.board[`line` + line][n-1] = game.board[`line` + line][n];
                            game.board[`line` + line][n] = "   "
                        }
                        
                    }
                }
                game.figure.leftPoint--;
                game.figure.rightPoint--;
                game.board.draw();
            }
        },

        canMoveRight() {
            let canMoveRight = true;
            if (game.figure.rightPoint <= 8) {
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                        if (game.board['line' + line][n] === "[?]" && game.board['line' + line][n+1] === "[X]") {
                            canMoveRight = false;
                        }
                    }
                }
            } else canMoveRight = false;
            return canMoveRight;
        },

        moveRight() {
            if (game.figure.canMoveRight()) {    
                for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line++) {
                    for (let n = game.figure.rightPoint; n >= game.figure.leftPoint; n--) {
                        if (n !== game.figure.leftPoint) {
                            game.board[`line` + line][n+1] = game.board[`line` + line][n]
                        } else {
                            game.board[`line` + line][n+1] = game.board[`line` + line][n]
                            game.board[`line` + line][n] = "   "
                        }
                    }
                }
                game.figure.leftPoint++;
                game.figure.rightPoint++;
                game.board.draw();
            }
        },

        rotate() {
            if (game.figure.number === 1) {
                if (game.figure.position === 1) {
                    game.board[`line` + `${game.figure.highPoint + 1}`][`${game.figure.rightPoint - 1}`] = game.board[`line` + game.figure.highPoint][game.figure.rightPoint];
                    game.board[`line` + game.figure.highPoint][game.figure.rightPoint] = "   ";
                    game.figure.highPoint++;
                    game.figure.rightPoint--;
                    game.figure.position = 2;
                    game.board.draw();
                } else if (game.figure.position === 2) {
                    game.board[`line` + `${game.figure.highPoint - 1}`][`${game.figure.rightPoint + 1}`] = game.board[`line` + game.figure.lowPoint][game.figure.rightPoint];
                    game.board[`line` + game.figure.lowPoint][game.figure.rightPoint] = "   ";
                    game.figure.lowPoint++;
                    game.figure.rightPoint++;
                    game.figure.position = 3;
                    game.board.draw();
                } else if (game.figure.position === 3) {
                    game.board[`line` + `${game.figure.lowPoint - 1}`][`${game.figure.rightPoint - 1}`] = game.board[`line` + game.figure.lowPoint][game.figure.leftPoint];
                    game.board[`line` + game.figure.lowPoint][game.figure.leftPoint] = "   ";
                    game.figure.lowPoint--;
                    game.figure.leftPoint++;
                    game.figure.position = 4;
                    game.board.draw();
                } else {
                    game.board[`line` + `${game.figure.lowPoint + 1}`][`${game.figure.leftPoint - 1}`] = game.board[`line` + game.figure.highPoint][game.figure.leftPoint];
                    game.board[`line` + game.figure.highPoint][game.figure.leftPoint] = "   ";
                    game.figure.highPoint--;
                    game.figure.leftPoint--;
                    game.figure.position = 1;
                    game.board.draw();
                }
            } else if (game.figure.number === 2) {
                if (game.figure.position === 1) {
                    game.board[`line` + game.figure.lowPoint][game.figure.leftPoint] = game.board[`line` + game.figure.highPoint][game.figure.leftPoint];
                    game.board[`line` + game.figure.highPoint][game.figure.leftPoint] = "   ";
                    game.board[`line` + `${game.figure.highPoint + 1}`][`${game.figure.rightPoint - 1}`] = game.board[`line` + game.figure.highPoint][game.figure.rightPoint];
                    game.board[`line` + game.figure.highPoint][game.figure.rightPoint] = "   ";
                    game.board[`line` + game.figure.lowPoint][`${game.figure.rightPoint - 1}`] = game.board[`line` + game.figure.lowPoint][game.figure.rightPoint];
                    game.board[`line` + game.figure.lowPoint][game.figure.rightPoint] = "   ";
                    game.figure.highPoint++;
                    game.figure.rightPoint--;
                    game.figure.position = 2;
                    game.board.draw();
                } else if (game.figure.position === 2) {
                    
                }
            }
        }
    },

    
    checkCollision() {
        if (!game.figure.canMoveDown()) {
            for (let line = game.figure.lowPoint; line <= game.figure.highPoint; line ++) {
                for (let n = game.figure.leftPoint; n <= game.figure.rightPoint; n++) {
                    if (game.board[`line` + line][n] === "[?]") {
                        game.board[`line` + line][n] = "[X]"
                    }
                }
            }
            game.figure.drawNextFigure()
        }
    },

    gameOver: false,

    clockTick() {
        if(!game.gameOver) {
            game.figure.moveDown();
        } else {
            console.log("LOST")
            game.stopClock()
        }
    },

    clockSpeed: 600,

    clock: null,

    startClock() {
        game.clock = setInterval(() => {
            game.clockTick();
        }, game.clockSpeed)
    },

    stopClock() {
        clearInterval(game.clock);
        game.clock = null;
    },

    toggleClock() {
        if (game.clock !== null) {
            game.stopClock()
        } else game.startClock();
    }   
}


game.board.draw();
game.figure.generateFigure()
game.figure.drawNextFigure()

document.body.addEventListener("keydown", (ev) => {
    if (ev.key === " ") {
        game.toggleClock();
    } else if (ev.key === "ArrowLeft") {
        game.figure.moveLeft();
    } else if (ev.key === "ArrowRight") {
        game.figure.moveRight();
    } else if (ev.key === "ArrowDown") {
        game.figure.moveDown();
    } else if (ev.key === "ArrowUp") {
        game.figure.rotate();
    } else {
        console.log(ev.key)
    }
})