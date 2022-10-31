//Establish HTML Variables and capture data from the DOM
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");
const pixels = 10;
// Create the "Player Class" which will be used as a temple for any players that are created
class Player {
    constructor(x, y, colour) {
        this.color = colour;
        this.x = x;
        this.y = y;
        this.direction = "";
        this.constructor.counter = (this.constructor.counter || 0) + 1;
        this.id = this.constructor.counter;
//Create the array of player data that will be used for game loop elements
//Utwórz tablicę danych gracza, która będzie używana do elementów pętli gry
        Player.allInstances.push(this);
    }
}

//Create Players here.
Player.allInstances = [];

let player1 = new Player(50, 50, "red");
let player2 = new Player(550, 550, "blue");


//This Function is linked to the event listener and transfters key presses to a direction of travel
function setDirection(player, up, down, left, right, currentKey) {
    switch (currentKey) {
        case up:
            if (player.direction !== "DOWN") {
                player.key = "UP";
            }
            break;
        case right:
            if (player.direction !== "LEFT") {
                player.key = "RIGHT";
            }
            break;
        case down:
            if (player.direction !== "UP") {
                player.key = "DOWN";
            }
            break;
        case left:
            if (player.direction !== "RIGHT") {
                player.key = "LEFT";
            }
            break;
        default:
            break;
    }
    player.direction = player.key;
}

//This function creates the game playing area or window
function setPlayableArea(pixels, canvas) {
    let playableArea = new Set();
    for (let i = 0; i < canvas.width / pixels; i++) {
        for (let x = 0; i < canvas.height / pixels; i++) {
            playableArea.add(`${i * pixels}x${x * pixels}y`);
        }
    }
    return playableArea;
}

// Variable that is assigned the return value of the above function. Still just the playable area though
let playableArea = setPlayableArea(pixels, canvas);
//grid 
function map() {
    let arr = [];
    for (let i = 0; i < 60; i++) {
        for (let j = 0; j < 60; j++) {
            arr[i] = ["none"];
        }
    }
    for (let i = 0; i < 60; i++) {
        for (let j = 0; j < 60; j++) {
            arr[i][j] = "none";
            context.fillStyle = "black";
            context.fillRect([i] * 10, [j] * 10, pixels, pixels);
            // context.strokeStyle = "white";
            // context.strokeRect([i] * 10, [j] * 10, pixels, pixels)
        }
    }
    return arr;
}
//This functions checks the .direction of each player and the moves the player based on their current heading
function move(players) {
    players.forEach((player) => {
        if (player.direction == "LEFT") {
            if (grid[player.x / 10 - 1][player.y / 10] != "none") {
                clearInterval(game);
                return whoWin(player);
            }
            player.x = player.x - pixels;
            player.y = player.y;
        }
        if (player.direction == "RIGHT") {
            if (grid[player.x / 10 + 1][player.y / 10] != "none") {
                clearInterval(game);
                return whoWin(player);
            }
            player.x = player.x + pixels;
            player.y = player.y;
        }
        if (player.direction == "UP") {
            if (grid[player.x / 10][player.y / 10 - 1] != "none") {
                clearInterval(game);
                return whoWin(player);
            }
            player.x = player.x;
            player.y = player.y - pixels;
        }
        if (player.direction == "DOWN") {
            if (grid[player.x / 10][player.y / 10 + 1] != "none") {
                clearInterval(game);
                return whoWin(player);
            }
            player.x = player.x;
            player.y = player.y + pixels;
        }
        if (player.direction == "STOP") {
            player.x = player.x;
            player.y = player.y;
        }
        grid[player.x / 10][player.y / 10] = player.color;
    });
}

//Now that the players have moved, this function renders or draws them onto the play area
function renderPlayers(players) {
    players.forEach((player) => {
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, pixels, pixels);
        context.strokeStyle = "black";
        context.strokeRect(player.x, player.y, pixels, pixels);
    });
}
//This function checks to see if a player is trying to leave the playable area. If they are, it removes their direction so that they become stationary
function edgeCheck(players) {
    players.forEach((player) => {
        if (player.x >= 590 || player.x <= 0) {
            whoWin(player);
            clearInterval(game);
        }
        if (player.y >= 590 || player.y <= 0) {
            whoWin(player);
            clearInterval(game);
        }
    });
}
//checked who win
function whoWin(player) {
    if (player.id == 1) {
        context.fillStyle = "white";
        context.font = "20px sans-serif";
        let textString = "The Blue Player Wins",
            textWidth = context.measureText(textString).width;
        context.fillText(textString, canvas.width / 2 - textWidth / 2, 100);
    } else {
        context.fillStyle = "white";
        context.font = "20px sans-serif";
        let textString = "The Red Player Wins",
            textWidth = context.measureText(textString).width;
        context.fillText(textString, canvas.width / 2 - textWidth / 2, 100);
    }
}

let grid = map();

function main(info) {
    move(info);
    renderPlayers(info);
    edgeCheck(info);
}

//This "Listens" for keyboard interactions to control the player movements
window.addEventListener("keydown", (event) => {
    let currentKey = event.keyCode;
    if (currentKey == 13) {
        location.reload()
    } else {
        setDirection(player1, 38, 40, 37, 39, currentKey);
        setDirection(player2, 87, 83, 65, 68, currentKey);
    }
});

let game = setInterval(() => {
    main(Player.allInstances);
}, 100);

