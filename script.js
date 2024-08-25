game = {
    board: {    
    },

    generateBoard() {
        for (let y = 0; y <= 23; y++) {
            game.board[`line${y}`] = {
            };
        }

        for (line in game.board) {
            for (let y = 0; y <= 23; y++) {
                if (line === `line${y}`) {
                    for (let x = 0; x <= 9; x++) {
                        game.board[line][`${y}-${x}`] = {
                            "x": x,
                            "y": y,
                            "value": "   ",
                            "color": "none",
                        }
                    }  
                }                          
            }      
        }

        let display = document.getElementById('display')

        for (let y = 19; y >= 0; y--) {
            for (let x = 0; x <= 9; x++) {
                let cell = document.createElement('div');
                cell.style["background-color"] = "transparent";
                cell.id = `${y}-${x}`
                cell.addEventListener("mouseover", () => {game.figure.slideToCell(x)})
                cell.addEventListener("click", () => {game.figure.dropDown()})
                cell.addEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    game.figure.rotate();
                })
                display.appendChild(cell);
            }
        }
    },

    drawBoard() {
        for (let y = 0; y <= 19; y++) {
            for (let x = 0; x <= 9; x++) {
                let line = `line${y}`
                let cell = `${y}-${x}`
                
                if (game.board[`${line}`][`${cell}`].value === "[X]") {
                    document.getElementById(`${cell}`).classList = "block";
                    document.getElementById(`${cell}`).style["background-color"] = game.board[`${line}`][`${cell}`].color;
                } else if (game.board[`${line}`][`${cell}`].value === "[?]") {
                    document.getElementById(`${cell}`).classList = "block";
                    document.getElementById(`${cell}`).style["background-color"] = game.board[`${line}`][`${cell}`].color;
                } else if (game.board[`${line}`][`${cell}`].value === "[!]") {
                    document.getElementById(`${cell}`).classList = "shadow";
                    document.getElementById(`${cell}`).style["background-color"] = "transparent";
                } else if (game.board[`${line}`][`${cell}`].value === "[*]") {
                    document.getElementById(`${cell}`).classList = "block"
                    document.getElementById(`${cell}`).style["background-color"] = game.figure.colors[8];
                } else {
                    document.getElementById(`${cell}`).classList = "empty"
                    document.getElementById(`${cell}`).style["background-color"] = "transparent";
                }
            }        
        }
    },

    figure: {
        body: {
            1: {
                x: "",
                y: "",
            },

            2: {
                x: "",
                y: "",
            },

            3: {
                x: "",
                y: "",
            },

            4: {
                x: "",
                y: "",
            }
        },

        shadow: {
            1: {
                x: "",
                y: "",
            },

            2: {
                x: "",
                y: "",
            },

            3: {
                x: "",
                y: "",
            },

            4: {
                x: "",
                y: "",
            }
        },

        colors: {
            0: "transparent",
            1: "#f94144",
            2: "#f3722c",
            3: "#f8961e",
            4: "#f9c74f",
            5: "#90be6d",
            6: "#43aa8b",
            7: "#3A75AD",
            8: "#2D3B4E",
        },

        type: "",

        state: "",

        nextFigure: "",

        linesSkipped: "",

        color: "",

        bounce: "none",

        getNextFigure() {
            if (game.difficulty === 1) {                             
                    let roll;
                    let i;
                    let piece;

                    // roll for piece
                    for (roll = 0; roll < 6; roll++) {
                        i = Math.floor(Math.random() * 35);
                        piece = game.randomizer.pool[i];
                        if (!game.randomizer.history.includes(piece) || roll === 5 ){
                            break;
                        }
                        if (game.randomizer.order.length) {
                            game.randomizer.pool[i] = game.randomizer.order[0];
                        }
                    }

                    //update piece order
                    if (game.randomizer.order.includes(piece)) {
                        game.randomizer.order.splice(game.randomizer.order.indexOf(piece), 1);
                    }
                    game.randomizer.order.push(piece);

                    game.randomizer.pool[i] = game.randomizer.order[0];

                    //update history
                    game.randomizer.history.shift();
                    game.randomizer.history[3] = piece;

                    if (piece !== game.figure.type) {
                        game.figure.nextFigure = piece;
                    } else (game.figure.getNextFigure())
            } else if (game.difficulty === 2) {
                let roll;
                    let i;
                    let piece;

                // roll for piece
                for (roll = 0; roll < 6; roll++) {
                    i = Math.floor(Math.random() * 35);
                    piece = game.randomizer.pool[i];
                    if (!game.randomizer.history.includes(piece) || roll === 5 ){
                        break;
                    }

                    if (game.randomizer.order.length) {
                        game.randomizer.pool[i] = game.randomizer.order[0];
                    }
                }

                //update piece order
                if (game.randomizer.order.includes(piece)) {
                    game.randomizer.order.splice(game.randomizer.order.indexOf(piece), 1);
                }
                game.randomizer.order.push(piece);

                game.randomizer.pool[i] = game.randomizer.order[0];

                //update history
                if (piece !== 3 && piece !== 5 && piece !== 7){
                    game.randomizer.history.shift();
                    game.randomizer.history[3] = piece;
    
                } else if (piece === 3 || piece === 5) {
                    let i = Math.floor(Math.random() * 3);
                    if (i === 1) {
                        game.randomizer.history.shift();
                        game.randomizer.history[3] = piece;

                    } else game.figure.nextFigure = piece;
                } else if (piece === 7) {
                    let i = Math.floor(Math.random() * 3);
                    if (i !== 1) {
                        game.randomizer.history.shift();
                        game.randomizer.history[3] = piece;

                    } else {
                        piece = [1, 2, 4, 6][Math.floor(Math.random() * 4)]
                    }
                }

                if (piece !== game.figure.type) {
                    game.figure.nextFigure = piece;
                } else (game.figure.getNextFigure())
            }

            document.getElementById("next_figure").classList = `type${game.figure.nextFigure}`
        },

        drawNextFigure(type) {
            if(type === 1) {
                game.figure.body = {
                    1: {
                        x: 3,
                        y: 19,
                    },

                    2: {
                        x: 4,
                        y: 19,
                    },

                    3: {
                        x: 5,
                        y: 19,
                    },

                    4: {
                        x: 4,
                        y: 18,
                    }
                }

                game.figure.type = 1;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 1;
            } else if (type === 2) {
                game.figure.body = {
                    1: {
                        x: 3,
                        y: 19,
                    },

                    2: {
                        x: 4,
                        y: 19,
                    },

                    3: {
                        x: 5,
                        y: 19,
                    },

                    4: {
                        x: 5,
                        y: 18,
                    }
                }

                game.figure.type = 2;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 2;
            } else if (type === 3) {
                game.figure.body = {
                    1: {
                        x: 3,
                        y: 19,
                    },

                    2: {
                        x: 4,
                        y: 19,
                    },

                    3: {
                        x: 4,
                        y: 18,
                    },

                    4: {
                        x: 5,
                        y: 18,
                    }
                }

                game.figure.type = 3;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 3;
            } else if (type === 4) {
                game.figure.body = {
                    1: {
                        x: 4,
                        y: 19,
                    },

                    2: {
                        x: 5,
                        y: 19,
                    },

                    3: {
                        x: 4,
                        y: 18,
                    },

                    4: {
                        x: 5,
                        y: 18,
                    }
                }

                game.figure.type = 4;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 4;
            } else if (type === 5) {
                game.figure.body = {
                    1: {
                        x: 4,
                        y: 19,
                    },

                    2: {
                        x: 5,
                        y: 19,
                    },

                    3: {
                        x: 3,
                        y: 18,
                    },

                    4: {
                        x: 4,
                        y: 18,
                    }
                }

                game.figure.type = 5;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 5;
            } else if (type === 6) {
                game.figure.body = {
                    1: {
                        x: 3,
                        y: 19,
                    },

                    2: {
                        x: 4,
                        y: 19,
                    },

                    3: {
                        x: 5,
                        y: 19,
                    },

                    4: {
                        x: 3,
                        y: 18,
                    }
                }

                game.figure.type = 6;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 6;
            } else if (type === 7) {
                game.figure.body = {
                    1: {
                        x: 3,
                        y: 19,
                    },

                    2: {
                        x: 4,
                        y: 19,
                    },

                    3: {
                        x: 5,
                        y: 19,
                    },

                    4: {
                        x: 6,
                        y: 19,
                    }
                }

                game.figure.type = 7;
                game.figure.state = 1;
                game.figure.linesSkipped = 0;
                game.figure.color = 7;
            }

            //check for game over
            for (block in game.figure.body) {
                let blockX = game.figure.body[block].x;
                let blockY = game.figure.body[block].y;
                if (game.board[`line` + `${blockY}`][`${blockY}-${blockX}`].value === "[X]") {
                    game.figure.body[1].y++;
                    game.figure.body[2].y++;
                    game.figure.body[3].y++;
                    game.figure.body[4].y++;
                    game.stat.updateFiguresStat(type)
                    game.figure.updateFigurePosition();
                    game.drawBoard();
                    game.stat.updateDisplayedStat();
                    game.gameOver();
                    return
                }
            }

            game.stat.updateFiguresStat(type)
            game.figure.updateFigurePosition();
            game.figure.getNextFigure();
            game.stat.updateDisplayedStat();
            game.drawBoard();
        },

        resetCells() {
            for (line in game.board) {
                for (cell in game.board[line]) {
                    if (game.board[line][cell].value === "[?]" || game.board[line][cell].value === "[!]") {
                        game.board[line][cell].value = "   "
                        game.board[line][cell].color = game.figure.colors[0];
                    }
                }
            };
        },
 
        updateFigurePosition() {
            game.figure.resetCells();
 
            game.figure.placeShadow();

            for (block in game.figure.shadow) {
                let cellName = `${game.figure.shadow[block].y}-${game.figure.shadow[block].x}`;
                for (line in game.board) {
                    if (game.board[line][cellName]){
                        game.board[line][cellName].value = "[!]"
                    }
                }
            };

            for (block in game.figure.body) {
                let cellName = `${game.figure.body[block].y}-${game.figure.body[block].x}`;
                for (line in game.board) {
                    if (game.board[line][cellName]){
                        game.board[line][cellName].value = "[?]"
                        game.board[line][cellName].color = game.figure.colors[`${game.figure.color}`] 
                    }
                }
            };

            game.drawBoard();
        },

        placeShadow() {
            let x1 = game.figure.body[1].x;
            let y1 = game.figure.body[1].y;
            let x2 = game.figure.body[2].x;
            let y2 = game.figure.body[2].y;
            let x3 = game.figure.body[3].x;
            let y3 = game.figure.body[3].y;
            let x4 = game.figure.body[4].x;
            let y4 = game.figure.body[4].y;

            function check() {
                let line1 = `line` + `${y1}`;
                let line2 = `line` + `${y2}`;
                let line3 = `line` + `${y3}`;
                let line4 = `line` + `${y4}`;
                let cell1 = `${y1}-${x1}`;
                let cell2 = `${y2}-${x2}`;
                let cell3 = `${y3}-${x3}`;
                let cell4 = `${y4}-${x4}`;

                if (line1 in game.board && line2 in game.board && line3 in game.board && line4 in game.board) {
                    if (game.board[`${line1}`][`${cell1}`].value === "[X]" ||
                        game.board[`${line2}`][`${cell2}`].value === "[X]" ||
                         game.board[`${line3}`][`${cell3}`].value === "[X]" ||
                        game.board[`${line4}`][`${cell4}`].value === "[X]"
                    ) {
                        game.figure.shadow[1].x = x1;
                        game.figure.shadow[1].y = y1 + 1;
                        game.figure.shadow[2].x = x2;
                        game.figure.shadow[2].y = y2 + 1;
                        game.figure.shadow[3].x = x3;
                        game.figure.shadow[3].y = y3 + 1;
                        game.figure.shadow[4].x = x4; 
                        game.figure.shadow[4].y = y4 + 1;
                        return
                    } else { 
                        y1--;
                        y2--;
                        y3--;
                        y4--;
                        check()
                    }
                } else {
                    game.figure.shadow[1].x = x1;
                    game.figure.shadow[1].y = y1 + 1;
                    game.figure.shadow[2].x = x2;
                    game.figure.shadow[2].y = y2 + 1;
                    game.figure.shadow[3].x = x3;
                    game.figure.shadow[3].y = y3 + 1;
                    game.figure.shadow[4].x = x4; 
                    game.figure.shadow[4].y = y4 + 1 ;
                    return
                }
            }    
            
            check()
        },
    
        canMoveDown() {
            let canMoveDown = true;

            if (game.clock.status === 0) {
                canMoveDown = false;
            }

            for (block in game.figure.body) {
                let blockX = game.figure.body[block].x;
                let blockY = game.figure.body[block].y;

                if (blockY > 0) {
                    if (game.board[`line` + `${blockY-1}`][`${blockY-1}-${blockX}`].value === "[X]" ) {
                        canMoveDown = false;
                    }
                } else canMoveDown = false;
            }

            return canMoveDown;
        },

        moveDown() {
            if (game.figure.canMoveDown()) {
                for(block in game.figure.body) {
                    game.figure.body[block].y--;
                };
                game.figure.linesSkipped++
                game.figure.updateFigurePosition();
            }
        },

        dropDown() {
            if (game.figure.canMoveDown()) {
                setTimeout(() => {
                    game.figure.moveDown();
                    game.figure.dropDown();
                }, 5 )
            } else game.figure.checkCollision();
        },

        canMoveLeft() {
            let canMoveLeft = true;

            if (game.clock.status === 0) {
                canMoveLeft = false;
            }
            
            for (block in game.figure.body) {
                let blockX = game.figure.body[block].x;
                let blockY = game.figure.body[block].y;

                if(blockX > 0) {
                    if (game.board[`line` + `${blockY}`][`${blockY}-${blockX-1}`].value === "[X]" ) {
                        canMoveLeft = false;
                    }
                } else canMoveLeft = false;
            }

            return canMoveLeft;
        },

        moveLeft() {
            if (game.figure.canMoveLeft()) {
                for(block in game.figure.body) {
                    game.figure.body[block].x--;
                };
                game.figure.updateFigurePosition();
            }
        },

        canMoveRight() {
            let canMoveRight = true;
            
            if (game.clock.status === 0) {
                canMoveRight = false;
            }

            for (block in game.figure.body) {
                let blockX = game.figure.body[block].x;
                let blockY = game.figure.body[block].y;

                if (blockX < 9) {
                    if (game.board[`line` + `${blockY}`][`${blockY}-${blockX+1}`].value === "[X]" ) {
                        canMoveRight = false;
                    }
                } else canMoveRight = false;
            }

            return canMoveRight;
        },

        moveRight() {
            if (game.figure.canMoveRight()) {
                for(block in game.figure.body) {
                    game.figure.body[block].x++;
                };
                game.figure.updateFigurePosition();
            }
        },

        slideToCell(column){
            function checkIfAlreadyThere() {
                let alreadyThere = false;
                for (block in game.figure.body) {
                    if (game.figure.body[block].x === column) {
                        alreadyThere = true;
                    }
                }
                return alreadyThere;
            }

            function getDirection() {
                let direction = "";
                if (!checkIfAlreadyThere()) {
                    if (game.figure.body[1].x > column) {
                        direction = "left";
                    } else direction = "right"
                }
                return direction;
            }

            function slideLeft() {
                if (game.figure.canMoveLeft()) {
                    setTimeout(() => {
                        game.figure.moveLeft();
                        slideLeft();
                    }, 5 )
                }
            }

            function slideRight() {
                if (game.figure.canMoveRight()) {
                    setTimeout(() => {
                        game.figure.moveRight();
                        slideRight();
                    }, 5 )
                }
            }

            if (!checkIfAlreadyThere()) {
                if (getDirection() === "left") {
                    game.figure.moveLeft();
                } else if (getDirection() === "right") {
                    game.figure.moveRight();
                }
            } else return
        },

        checkCollision() {
            setTimeout(() => {
                for (block in game.figure.body) {
                    let blockX = game.figure.body[block].x;
                    let blockY = game.figure.body[block].y;
                    if (blockY > 0) {
                        if (game.board[`line` + `${blockY-1}`][`${blockY-1}-${blockX}`].value === "[X]" ) {
                            game.figure.collide();
                        }
                    } else game.figure.collide();
                }
            }, 100)           
        },

        collide() {
            for (block in game.figure.body) {
                let cellName = `${game.figure.body[block].y}-${game.figure.body[block].x}`;
                for (line in game.board) {
                    if (game.board[line][cellName]){
                        game.board[line][cellName].value = "[X]"
                    }
                }
            };

            game.stat.score = game.stat.score + game.figure.linesSkipped;

            if (game.status !== 0) {
                game.figure.drawNextFigure(game.figure.nextFigure);
                game.drawBoard();
                game.checkLineClear();
            }
        },

        canRotate() {
            let canRotate = true;

            // Check for gameClock 
            if (game.clock.status === 0) {
                canRotate = false;
            }

            if (game.figure.type === 1) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[2].y + 1}`][`${game.figure.body[2].y + 1}-${game.figure.body[2].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value === "[X]"
                    ) {
                        canRotate = false;
                    }
                } else if (game.figure.state === 2) {
                    if (game.figure.body[1].x === 9) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value !== "[X]") {
                            game.figure.bounce ="left"
                            canRotate = true;
                        }
                    } else if (game.figure.body[1].x < 9 && game.figure.body[1].x > 1) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" 
                        ) { 
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value !== "[X]") {
                                game.figure.bounce ="left"
                                canRotate = true;
                            } else canRotate = false;
                        } 
                    } else if (game.figure.body[1].x === 1) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" 
                        ) { 
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        }
                    }
                } else if (game.figure.state === 3) {
                    if (game.board[`line`+`${game.figure.body[3].y - 1}`][`${game.figure.body[3].y - 1}-${game.figure.body[3].x}`].value === "[X]") {
                        if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value !== "[X]") {
                            game.figure.bounce = "up";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state === 4) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) { 
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]") {
                            game.figure.bounce = "right";
                            canRotate = true;
                        }
                    } else if (game.figure.body[1].x < 8 && game.figure.body[1].x > 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" 
                        ) { 
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x -1}`].value === "[X]"
                        ) { 
                            if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]") {
                                game.figure.bounce = "right";
                                canRotate = true;
                            } else canRotate = false;
                        }
                    } else if (game.figure.body[1].x === 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x -1}`].value === "[X]"
                        ) { 
                            canRotate = false;
                        }
                    }
                }
            } 
            
            if (game.figure.type === 2) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[2].y + 1}`][`${game.figure.body[2].y + 1}-${game.figure.body[2].x}`].value === "[X]") {
                            canRotate = false;
                    }
                } else if (game.figure.state === 2) {
                    if (game.figure.body[3].x === 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        }
                    } else if (game.figure.body[3].x > 0 && game.figure.body[3].x < 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]") {
                                canRotate = false;
                            } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]") {
                                if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 2}`].value !== "[X]" &&
                                    game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 2}`].value !== "[X]"
                                ) {
                                    game.figure.bounce = "left";
                                    canRotate = true;
                                } else canRotate = false;
                            }
                    } else if (game.figure.body[3].x === 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 2}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 2}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else {
                            game.figure.bounce ="left";                            
                            canRotate = true;
                        }
                    }
                } else if (game.figure.state === 3) {
                    if (game.board[`line`+`${game.figure.body[3].y + 1}`][`${game.figure.body[3].y + 1}-${game.figure.body[3].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[4].y - 1}`][`${game.figure.body[4].y - 1}-${game.figure.body[4].x}`].value === "[X]" 
                    ) {
                        canRotate = false;
                    } else if (game.board[`line`+`${game.figure.body[3].y - 1}`][`${game.figure.body[3].y - 1}-${game.figure.body[3].x}`].value === "[X]") {
                        if (game.board[`line`+`${game.figure.body[3].y + 2}`][`${game.figure.body[3].y + 2}-${game.figure.body[3].x}`].value !== "[X]" &&
                            game.board[`line`+`${game.figure.body[4].y + 2}`][`${game.figure.body[4].y + 2}-${game.figure.body[4].x}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "up";
                            canRotate = true;
                        } else canRotate = false;
                    } else if (game.board[`line`+`${game.figure.body[4].y + 1}`][`${game.figure.body[4].y + 1}-${game.figure.body[4].x}`].value === "[X]") {
                        if (game.board[`line`+`${game.figure.body[2].y - 1}`][`${game.figure.body[2].y - 1}-${game.figure.body[2].x}`].value !== "[X]") {
                            game.figure.bounce = "left";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state === 4) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 2}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "right";
                            canRotate = true;
                        } else canRotate = false;
                    } else {
                        if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]") {
                            if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 2}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value !== "[X]" 
                            ) {
                                game.figure.bounce = "right";
                                canRotate = true;
                            }   else canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]") {
                            if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]"
                            ) {
                                game.figure.bounce = "up";
                                canRotate = true;
                            } else canRotate = false;
                        } 
                    } 
                }
            }
            
            if (game.figure.type === 3) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[4].y + 1}`][`${game.figure.body[4].y + 1}-${game.figure.body[4].x}`].value === "[X]") {
                        canRotate = false;
                    } else if (game.board[`line`+`${game.figure.body[1].y - 1}`][`${game.figure.body[1].y - 1}-${game.figure.body[1].x}`].value === "[X]") {
                        if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value !== "[X]" &&
                            game.board[`line`+`${game.figure.body[2].y + 2}`][`${game.figure.body[2].y + 2}-${game.figure.body[2].x}`].value !== "[X]" 
                        ) {
                            game.figure.bounce = "up";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state == 2) {
                    if(game.figure.body[1].x === 9) {
                        if (game.board[`line`+`${game.figure.body[3].y - 1}`][`${game.figure.body[3].y - 1}-${game.figure.body[3].x}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value !== "[X]") {
                            game.figure.bounce = "left";
                            canRotate = true;
                        } else canRotate = false;
                    } else if (game.figure.body[1].x < 8 && game.figure.body[1].x > 1) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value !== "[X]") {
                                game.figure.bounce = "up";
                                canRotate = true;
                            } else canRotate = false;
                        } 
                    } else if (game.figure.body[1].x === 1) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" 
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value !== "[X]") {
                                game.figure.bounce = "up";
                                canRotate = true;
                            } else canRotate = false;
                        }
                    }
                }
            }  

            if (game.figure.type === 5) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[2].y + 1}`][`${game.figure.body[2].y + 1}-${game.figure.body[2].x}`].value === "[X]" 
                    ) {
                        canRotate = false;
                    } else if (game.board[`line`+`${game.figure.body[3].y + 1}`][`${game.figure.body[3].y + 1}-${game.figure.body[3].x}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y + 2}`][`${game.figure.body[3].y + 2}-${game.figure.body[3].x}`].value === "[X]"
                    ) {
                        if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value !== "[X]" &&
                            game.board[`line`+`${game.figure.body[2].y - 1}`][`${game.figure.body[2].y - 1}-${game.figure.body[2].x}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "right";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state === 2) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        }
                    } else if (game.figure.body[1].x > 0 && game.figure.body[1].x < 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]") {
                            if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 2}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value !== "[X]"
                            ) {
                                game.figure.bounce = "right";
                                canRotate = true;
                            }  else canRotate = false;
                        }
                    } else if (game.figure.body[1].x === 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 2}`].value === "[X]" 
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 2}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "left";
                            canRotate = true;
                        } else canRotate = false;
                    }
                }
            }

            if (game.figure.type === 6) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[1].y + 1}`][`${game.figure.body[1].y + 1}-${game.figure.body[1].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[2].y + 1}`][`${game.figure.body[2].y + 1}-${game.figure.body[2].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[2].y - 1}`][`${game.figure.body[2].y - 1}-${game.figure.body[2].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[3].y + 1}`][`${game.figure.body[3].y + 1}-${game.figure.body[3].x}`].value === "[X]" || 
                        game.board[`line`+`${game.figure.body[3].y - 1}`][`${game.figure.body[3].y - 1}-${game.figure.body[3].x}`].value === "[X]" 
                    ) {
                        canRotate = false;
                    } 
                } else if (game.figure.state === 2) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        }
                    } else if (game.figure.body[1].x > 0 && game.figure.body[1].x < 8) {
                        if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 2}`].value !== "[X]"
                            ) {
                                game.figure.bounce = "left";
                                canRotate = true;
                            } else canRotate = false;
                        }
                    } else if (game.figure.body[1].x === 8) {
                        if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value !== "[X]" &&
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 2}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "left";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state === 3) {
                    if (game.board[`line`+`${game.figure.body[3].y - 1}`][`${game.figure.body[3].y - 1}-${game.figure.body[3].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[4].y - 1}`][`${game.figure.body[4].y - 1}-${game.figure.body[4].x}`].value === "[X]"
                    ) {
                        if (game.board[`line`+`${game.figure.body[2].y + 2}`][`${game.figure.body[2].y + 2}-${game.figure.body[2].x}`].value !== "[X]" &&
                            game.board[`line`+`${game.figure.body[3].y + 2}`][`${game.figure.body[3].y + 2}-${game.figure.body[3].x}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "up";
                            canRotate = true;
                        } else canRotate = false;
                    }
                } else if (game.figure.state === 4) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 2}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "right";
                            canRotate = true;
                        } else canRotate = false;
                    } else if (game.figure.body[1].x > 0 && game.figure.body[1].x < 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value !== "[X]" ||
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value !== "[X]"
                            ) {
                                game.figure.bounce = "left";
                                canRotate = true;
                            } else canRotate = false;
                        }
                        if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 2}`].value !== "[X]"
                            ) {
                                game.figure.bounce = "right";
                                canRotate = true;
                            } else canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]") {

                        }
                    } else if (game.figure.body[1].x === 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]"
                        ) {
                            canRotate = false;
                        }
                    }
                }
            }

            if (game.figure.type === 7) {
                if (game.figure.state === 1) {
                    if (game.board[`line`+`${game.figure.body[2].y + 1}`][`${game.figure.body[2].y + 1}-${game.figure.body[2].x}`].value === "[X]" || 
                        game.board[`line`+`${game.figure.body[2].y + 2}`][`${game.figure.body[2].y + 2}-${game.figure.body[2].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[2].y + 3}`][`${game.figure.body[2].y + 3}-${game.figure.body[2].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[3].y + 1}`][`${game.figure.body[3].y + 1}-${game.figure.body[3].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[3].y + 2}`][`${game.figure.body[3].y + 2}-${game.figure.body[3].x}`].value === "[X]" ||
                        game.board[`line`+`${game.figure.body[4].y + 1}`][`${game.figure.body[4].y + 1}-${game.figure.body[4].x}`].value === "[X]"                         
                    ){
                        canRotate = false;
                    }
                } else if (game.figure.state === 2) {
                    if (game.figure.body[1].x === 0) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 2}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value === "[X]" 
                        ) {
                            canRotate = false;
                        } else if (game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 2}`].value !== "[X]" &&
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 3}`].value !== "[X]" 
                                ) {
                                    game.figure.bounce = "right";
                                    canRotate = true;
                                } else canRotate = false;
                    } else if (game.figure.body[1].x > 0 && game.figure.body[1].x < 8) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value === "[X]"
                        ) {
                            if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 2}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 2}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 3}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 2}`].value === "[X]" ||
                                game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 3}`].value === "[X]" 
                            ) {
                                canRotate = false;
                            } else {
                                game.figure.bounce = "big-left";
                                canRotate = true;
                            }
                        } else if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x + 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x + 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x + 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 2}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x + 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value !== "[X]" &&
                                 game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 2}`].value !== "[X]"
                        ) {
                            game.figure.bounce = "left";
                            canRotate = true;
                        } else canRotate = false;
                    } else if (game.figure.body[1].x === 9) {
                        if (game.board[`line`+`${game.figure.body[1].y}`][`${game.figure.body[1].y}-${game.figure.body[1].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[2].y}`][`${game.figure.body[2].y}-${game.figure.body[2].x - 2}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 2}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[3].y}`][`${game.figure.body[3].y}-${game.figure.body[3].x - 3}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 1}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 2}`].value === "[X]" ||
                            game.board[`line`+`${game.figure.body[4].y}`][`${game.figure.body[4].y}-${game.figure.body[4].x - 3}`].value === "[X]" 
                        ) {
                            canRotate = false;
                        } else {
                            game.figure.bounce = "big-left";
                            canRotate = true;
                        }
                    }
                }
            }

            return canRotate;
        },

        rotate() {
            if (game.figure.canRotate()) {
                if (game.figure.type === 1) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].x++;
                        game.figure.body[1].y++;
                        game.figure.body[2].x--;
                        game.figure.body[3].x--;
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[4].x++;
                        game.figure.body[4].y++;
                        game.figure.state = 3;
                    } else if (game.figure.state === 3) {
                        game.figure.body[2].x++;
                        game.figure.body[3].x++;
                        game.figure.body[4].x--;
                        game.figure.body[4].y--;
                        game.figure.state = 4;
                    } else {
                        game.figure.body[1].x--;
                        game.figure.body[1].y--;
                        game.figure.state = 1;
                    }
                } else if (game.figure.type === 2) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].x++;
                        game.figure.body[1].y++;
                        game.figure.body[3].x--;
                        game.figure.body[3].x--;
                        game.figure.body[3].y--;
                        game.figure.body[4].x--;
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[1].x--;
                        game.figure.body[2].x--;
                        game.figure.body[3].x++;
                        game.figure.body[3].y++;
                        game.figure.body[4].x++;
                        game.figure.body[4].y++;
                        game.figure.state = 3;
                    } else if (game.figure.state === 3) {
                        game.figure.body[1].x++;
                        game.figure.body[2].x++
                        game.figure.body[2].x++;
                        game.figure.body[2].y++;
                        game.figure.body[4].x--;
                        game.figure.body[4].y--;
                        game.figure.state = 4;
                    } else if (game.figure.state === 4) {
                        game.figure.body[1].x--;
                        game.figure.body[1].y--;
                        game.figure.body[2].x--;
                        game.figure.body[2].y--;
                        game.figure.body[3].x++;
                        game.figure.body[4].x++;
                        game.figure.state = 1;
                    }
                } else if (game.figure.type === 3) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].x++;
                        game.figure.body[1].y++;
                        game.figure.body[2].x--;
                        game.figure.body[3].y++;
                        game.figure.body[4].x--;
                        game.figure.body[4].x--;
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[1].x--;
                        game.figure.body[1].y--;
                        game.figure.body[2].x++;
                        game.figure.body[3].y--;
                        game.figure.body[4].x++;
                        game.figure.body[4].x++;
                        game.figure.state = 1;
                    }
                } else if (game.figure.type === 5) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].x--;
                        game.figure.body[1].y++;
                        game.figure.body[2].x--;
                        game.figure.body[2].x--;
                        game.figure.body[3].x++;
                        game.figure.body[3].y++;
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[1].x++;
                        game.figure.body[1].y--;
                        game.figure.body[2].x++;
                        game.figure.body[2].x++;
                        game.figure.body[3].x--;
                        game.figure.body[3].y--;
                        game.figure.state = 1;
                    }
                } else if (game.figure.type === 6) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].y++;
                        game.figure.body[2].y++;
                        game.figure.body[3].x--;
                        game.figure.body[4].x++;
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[1].x++;
                        game.figure.body[1].x++;
                        game.figure.body[2].x--;
                        game.figure.body[2].y--;
                        game.figure.body[4].x++;
                        game.figure.body[4].y++;
                        game.figure.state = 3;
                    } else if (game.figure.state === 3) {
                        game.figure.body[1].x--;
                        game.figure.body[2].x++;
                        game.figure.body[3].y--;
                        game.figure.body[4].y--;
                        game.figure.state = 4;
                    } else if (game.figure.state === 4) {
                        game.figure.body[1].x--;
                        game.figure.body[1].y--;
                        game.figure.body[3].x++;
                        game.figure.body[3].y++;
                        game.figure.body[4].x--;
                        game.figure.body[4].x--;
                        game.figure.state = 1;
                    }
                } else if (game.figure.type === 7) {
                    if (game.figure.state === 1) {
                        game.figure.body[1].x++;
                        game.figure.body[1].y = game.figure.body[1].y + 3;
                        game.figure.body[2].y = game.figure.body[2].y + 2;
                        game.figure.body[3].x--;
                        game.figure.body[3].y++;
                        game.figure.body[4].x = game.figure.body[4].x - 2;                    
                        game.figure.state = 2;
                    } else if (game.figure.state === 2) {
                        game.figure.body[1].x--;
                        game.figure.body[1].y = game.figure.body[1].y - 3;
                        game.figure.body[2].y = game.figure.body[2].y - 2;
                        game.figure.body[3].x++;
                        game.figure.body[3].y--;
                        game.figure.body[4].x = game.figure.body[4].x + 2;                      
                        game.figure.state = 1;
                    }
                }
    
                game.figure.checkForBounce();
    
                game.figure.updateFigurePosition();
            }
        },

        checkForBounce() {
            if (game.figure.bounce === "left") {
                game.figure.body[1].x--;
                game.figure.body[2].x--;
                game.figure.body[3].x--;
                game.figure.body[4].x--;
                game.figure.bounce = "none";
            } else if (game.figure.bounce === "right") {
                game.figure.body[1].x++;
                game.figure.body[2].x++;
                game.figure.body[3].x++;
                game.figure.body[4].x++;
                game.figure.bounce = "none";
            } else if (game.figure.bounce === "up") {
                game.figure.body[1].y++;
                game.figure.body[2].y++;
                game.figure.body[3].y++;
                game.figure.body[4].y++;
                game.figure.bounce = "none";
            } else if (game.figure.bounce === "big-left") {
                game.figure.body[1].x = game.figure.body[1].x - 2;
                game.figure.body[2].x = game.figure.body[2].x - 2;
                game.figure.body[3].x = game.figure.body[3].x - 2;
                game.figure.body[4].x = game.figure.body[4].x - 2;
                game.figure.bounce = "none";
            }
        }
    },

    checkLineClear() {
        let condition = "[X][X][X][X][X][X][X][X][X][X]";
        let clearedLines = [];
        for(line in game.board) {
            if (Object.keys(game.board[line]).map(key => game.board[line][key].value).join("") === condition) {
                clearedLines.push(line);
            }
        }
        if (clearedLines.length !== 0) {
            game.lineClear(clearedLines);
        }
    },

    lineClear(clearedLines) {
        game.clock.stop();
        for (i = 0; i <= clearedLines.length - 1; i++) {
            for (let n = 0; n <= 4; n++) {
                let lineNumber = `${clearedLines[i]}`.match(/\d+/)[0];

                setTimeout(() => {
                    game.board[`line`+lineNumber][`${lineNumber}-${4-n}`].value = "[*]";
                    game.board[`line`+lineNumber][`${lineNumber}-${5+n}`].value = "[*]";
                    game.drawBoard()
                }, n*35)
            }   
        }
     

        setTimeout(() => {
            for (i = 0; i <= clearedLines.length - 1; i++) {
                for (let n = 4; n >= 0; n--) {
                    let lineNumber = `${clearedLines[i]}`.match(/\d+/)[0];
    
                    setTimeout(() => {
                        game.board[`line`+lineNumber][`${lineNumber}-${4-n}`].value = " ";
                        game.board[`line`+lineNumber][`${lineNumber}-${5+n}`].value = " ";
                        game.drawBoard()
                    }, n*35)
                }   
            }
        }, 300)

        setTimeout(() => {
            for (i = 0; i <= clearedLines.length - 1; i++) {
                for (cell in game.board[`${clearedLines[i]}`]) {
                    game.board[`${clearedLines[i]}`][cell].value = "[D]";
                }
            }
            game.drawBoard()
        }, 500)



        setTimeout(() => {
            game.boardShifts();
            game.stat.scoreLineClear(clearedLines.length);
            game.stat.updateLvl(clearedLines.length)
        }, 600) 
    },
    
    boardShifts() {
        function isLineToDelete(obj) {
            let LineToDelete = false;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const item = obj[key];
                    if (item.value === "[D]") {
                        LineToDelete = true
                    }
                }
            }
            return LineToDelete
        }

        function shiftDown(fromLine) {
            for (let i = parseInt(fromLine); i <= 19; i++) {
                for (let n = 0; n <= 9; n++) {
                    let lineToSet = `line` + `${i}`;
                    let cellToSet = `${i}-${n}`;
                    let lineToGet = `line` + `${i+1}`;
                    let cellToGet = `${i+1}-${n}`;
                    if (game.board[lineToGet][cellToGet].value !== "[?]") {
                        game.board[lineToSet][cellToSet].value = game.board[lineToGet][cellToGet].value;
                        game.board[lineToSet][cellToSet].color = game.board[lineToGet][cellToGet].color;
                    }
                }
            }
        }
        
        function shiftLine() {
            for (let i = 19; i >= 0; i--) {
                let line = `line` + `${i}`
                if (isLineToDelete(game.board[`${line}`])) {
                    shiftDown(i);
                    shiftLine();
                } 
            }
        }
        
        shiftLine()

        game.figure.updateFigurePosition()
        game.drawBoard();
        game.clock.start();
    },

    clock: {
        status: 0,

        speed: 887,

        tick: null,

        start() {
            game.clock.tick = setInterval(() => {
                if (game.figure.canMoveDown()) {
                    for(block in game.figure.body) {
                        game.figure.body[block].y--;
                    };
                    game.figure.updateFigurePosition("down");
                }
                game.figure.checkCollision();
                game.stat.updateDisplayedStat()
            }, game.clock.speed);
            game.clock.status = 1;
            game.status = 1;
        },
    
        stop() {
            clearInterval(game.clock.tick);
            game.clock.tick = null;
            game.clock.status = 0;
            game.status = 0;
        },
    
        toggle() {
            if (game.clock.tick !== null) {
                game.clock.stop();
            } else {
                game.clock.start();
            }
        },

        increaseSpeed() {
            if (game.stat.currentLvl === 0) {
                game.clock.speed = 887;
            } else if (game.stat.currentLvl === 1) {
                game.clock.speed = 795;
            } else if (game.stat.currentLvl === 2) {
                game.clock.speed = 702;
            } else if (game.stat.currentLvl === 3) {
                game.clock.speed = 610;
            } else if (game.stat.currentLvl === 4) {
                game.clock.speed = 517;
            } else if (game.stat.currentLvl === 5) {
                game.clock.speed = 425;
            } else if (game.stat.currentLvl === 6) {
                game.clock.speed = 332;
            } else if (game.stat.currentLvl === 7) {
                game.clock.speed = 240;
            } else if (game.stat.currentLvl === 8) {
                game.clock.speed = 157;
            } else if (game.stat.currentLvl === 9) {
                game.clock.speed = 111;
            } else if (game.stat.currentLvl >= 10 && game.stat.currentLvl <= 12) {
                game.clock.speed = 92;
            } else if (game.stat.currentLvl >= 13 && game.stat.currentLvl <= 15) {
                game.clock.speed = 74;
            } else if (game.stat.currentLvl >= 16 && game.stat.currentLvl <= 18) {
                game.clock.speed = 55;
            } else if (game.stat.currentLvl >= 19 && game.stat.currentLvl <= 28) {
                game.clock.speed = 37;
            } else if (game.stat.currentLvl > 28) {
                game.clock.speed = 19;
            } 
        }
    },

    stat: {
        linesCleared: 0,

        currentLvl: 0,

        figures: {
            type1: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },
            
            type2: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },

            type3: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },

            type4: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },

            type5: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },

            type6: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            },

            type7: {
                timesSpawned: 0,
                absent: 0,
                longestAbsence: 0
            }
        },

        score: 0,

        topScore: 0,

        scoreLineClear(clearedLines) {
            let lvl = game.stat.currentLvl;
            let score = game.stat.score;
            if (lvl === 0) {
                if (clearedLines === 1) {
                    score = score + 40;
                } else if (clearedLines === 2) {
                    score = score + 100;
                } else if (clearedLines === 3) {
                    score = score + 300;
                } else if (clearedLines === 4) {
                    score = score + 1200;
                }
            } else if (lvl === 1) {
                if (clearedLines === 1) {
                    score = score + 80;
                } else if (clearedLines === 2) {
                    score = score + 200;
                } else if (clearedLines === 3) {
                    score = score + 600;
                } else if (clearedLines === 4) {
                    score = score + 2400;
                }
            } else if (lvl > 1 && lvl < 9) {
                if (clearedLines === 1) {
                    score = score + 120;
                } else if (clearedLines === 2) {
                    score = score + 300;
                } else if (clearedLines === 3) {
                    score = score + 900;
                } else if (clearedLines === 4) {
                    score = score + 3600;
                }
            } else if (lvl === 9) {
                if (clearedLines === 1) {
                    score = score + 400;
                } else if (clearedLines === 2) {
                    score = score + 1000;
                } else if (clearedLines === 3) {
                    score = score + 3000;
                } else if (clearedLines === 4) {
                    score = score + 12000;
                }
            } else if (lvl > 9) {
                if (clearedLines === 1) {
                    score = score + (40 * (lvl + 1));
                } else if (clearedLines === 2) {
                    score = score + (100 * (lvl + 1));
                } else if (clearedLines === 3) {
                    score = score + (300 * (lvl + 1));
                } else if (clearedLines === 4) {
                    score = score + (1200 * (lvl + 1));
                }
            }
            game.stat.score = score;
        },

        updateLvl(clearedLines) {
            game.stat.linesCleared = game.stat.linesCleared + clearedLines;
            game.stat.currentLvl = Math.floor(game.stat.linesCleared / 10)
            game.clock.increaseSpeed()
            game.stat.updateDisplayedStat();
        },

        updateFiguresStat(type) {
            for (item in game.stat.figures) {
                let spawnedFigure = `type${type}`
                if (item === spawnedFigure) {
                    game.stat.figures[item].timesSpawned++
                    if (game.stat.figures[item].longestAbsence < game.stat.figures[item].absent) {
                        game.stat.figures[item].longestAbsence = game.stat.figures[item].absent
                    }
                    game.stat.figures[item].absent = 0;
                } else {
                    game.stat.figures[item].absent++
                }
            }
        },

        updateDisplayedStat() {
            //update displayed main stat
            let displayLines = document.getElementById("lines");
            let displayLvl = document.getElementById("lvl");
            let displayScore = document.getElementById("score");
            let displayTopScore = document.getElementById("top-score");

            displayLines.innerText = String(game.stat.linesCleared).padStart(3, "0");
            displayLvl.innerText = String(game.stat.currentLvl).padStart(2, "0");
            displayScore.innerText = String(game.stat.score).padStart(6, "0");
            displayTopScore.innerText = String(game.stat.topScore).padStart(6, "0");
            
            /*
            //update displayed figures stat
            let type1Counter = document.getElementById("type1-counter");
            let type1Absent = document.getElementById("type1-absent");
            let type2Counter = document.getElementById("type2-counter");
            let type2Absent = document.getElementById("type2-absent");
            let type3Counter = document.getElementById("type3-counter");
            let type3Absent = document.getElementById("type3-absent");
            let type4Counter = document.getElementById("type4-counter");
            let type4Absent = document.getElementById("type4-absent");
            let type5Counter = document.getElementById("type5-counter");
            let type5Absent = document.getElementById("type5-absent");
            let type6Counter = document.getElementById("type6-counter");
            let type6Absent = document.getElementById("type6-absent");
            let type7Counter = document.getElementById("type7-counter");
            let type7Absent = document.getElementById("type7-absent");

            type1Counter.innerText = game.stat.figures.type1.timesSpawned;
            type1Absent.innerText = game.stat.figures.type1.absent;
            type2Counter.innerText = game.stat.figures.type2.timesSpawned;
            type2Absent.innerText = game.stat.figures.type2.absent;
            type3Counter.innerText = game.stat.figures.type3.timesSpawned;
            type3Absent.innerText = game.stat.figures.type3.absent;
            type4Counter.innerText = game.stat.figures.type4.timesSpawned;
            type4Absent.innerText = game.stat.figures.type4.absent;
            type5Counter.innerText = game.stat.figures.type5.timesSpawned;
            type5Absent.innerText = game.stat.figures.type5.absent;
            type6Counter.innerText = game.stat.figures.type6.timesSpawned;
            type6Absent.innerText = game.stat.figures.type6.absent;
            type7Counter.innerText = game.stat.figures.type7.timesSpawned;
            type7Absent.innerText = game.stat.figures.type7.absent; */
        },
    },
    difficulty: "",

    status: 0,

    gameOver() {
        game.clock.stop();
        if (game.stat.score > game.stat.topScore) {
            game.stat.topScore = game.stat.score;
        }
        console.log(`GAME OVER`)
    },

    selectDifficulty(n) {
        if (n === 1) {
            game.difficulty = 1;
            game.randomizer.pool = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
            game.randomizer.order = [];
            game.randomizer.history = [5, 3, 5];
            game.randomizer.history[3] = [1, 2, 6, 7][Math.floor(Math.random() * 4)]
        } else if (n === 2) {
            game.difficulty = 2;
            game.randomizer.pool = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
            game.randomizer.history = [5, 3, 5];
            game.randomizer.history[3] = [1, 2, 6, 7][Math.floor(Math.random() * 4)]
        }
    },

    newGame() {
        game.generateBoard();
        game.figure.getNextFigure();
        game.figure.drawNextFigure(game.figure.nextFigure)
        game.drawBoard();
        game.clock.start();
    },

    randomizer: {
        pool: [],
        order: [],
        history: [],
    },

    debug: {
        forceBlock(y, x, val) {
            game.board[`line` + y][`${y}-${x}`].value = val;
            game.drawBoard();
        },

        deleteFigure() {
            game.figure.body[1].x = "";
            game.figure.body[1].y = "";
            game.figure.body[2].x = "";
            game.figure.body[2].y = "";
            game.figure.body[3].x = "";
            game.figure.body[3].y = "";
            game.figure.body[4].x = "";
            game.figure.body[4].y = "";
            game.figure.updateFigurePosition()
        },

        redrawFigure() {
            game.figure.drawNextFigure(game.figure.nextFigure);
            console.clear()
            console.log(game.stat.figures.type1.longestAbsence)
            console.log(game.stat.figures.type2.longestAbsence)
            console.log(game.stat.figures.type3.longestAbsence)
            console.log(game.stat.figures.type4.longestAbsence)
            console.log(game.stat.figures.type5.longestAbsence)
            console.log(game.stat.figures.type6.longestAbsence)
            console.log(game.stat.figures.type7.longestAbsence)
        },

        testRandomizer(n) {
            for (let i = 0; i <= n; i++) {
                game.debug.redrawFigure()
            }
        }
    }
}

document.body.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft") {
        game.figure.moveLeft();
    } else if (ev.key === "ArrowRight") {
        game.figure.moveRight();
    } else if (ev.key === "ArrowDown") {
        game.figure.moveDown();
        game.figure.checkCollision();
    } else if (ev.key === "ArrowUp") {
        game.figure.rotate();
    } else if (ev.key === "Shift") {
        game.clock.toggle();
    } else if (ev.key === " ") {
        game.figure.dropDown();
    } else {
        console.log(ev.key)
    }
})

game.selectDifficulty(1);
game.newGame();