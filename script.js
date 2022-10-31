
//Establish HTML Variables and capture data from the DOM
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");
const pixels = 10;

// Create the "Player Class" which will be used as a temple for any players that are created
class Player {
  constructor(x, y, colour) {
    this.color = colour;
    this.dead = false;
    this.key = "";
    this.x = x;
    this.y = y;
    this.direction = "LEFT";

    this.constructor.counter = (this.constructor.counter || 0) + 1;
    this.id = this.constructor.counter;

    Player.allInstances.push(this);
  }
}

//Create the array of player data that will be used for game loop elements
Player.allInstances = [];

//Create Players here.
let player1 = new Player(100, 100, "red");
let player2 = new Player(540, 540, "blue");

//This "Listens" for keyboard interactions to control the player movements
window.addEventListener("keydown", (event) => {
  let currentKey = event.keyCode;
  setDirection(player1, 38, 40, 37, 39, currentKey);
  setDirection(player2, 87, 83, 65, 68, currentKey);
});

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

//This functions checks the .direction of each player and the moves the player based on their current heading
function move(players) {
  players.forEach((player) => {
    if (player.direction == "LEFT") {
      player.x = player.x - pixels;
      player.y = player.y;
    }
    if (player.direction == "RIGHT") {
      player.x = player.x + pixels;
      player.y = player.y;
    }
    if (player.direction == "UP") {
      player.x = player.x;
      player.y = player.y - pixels;
    }
    if (player.direction == "DOWN") {
      player.x = player.x;
      player.y = player.y + pixels;
    }
    if (player.direction == "STOP") {
      player.x = player.x;
      player.y = player.y;
    }
  });
}

//Now that the players have moved, this function renders or draws them onto the play area
function renderPlayers(players) {
  // context.clearRect(0, 0, canvas.width, canvas.height);
  players.forEach((player) => {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, pixels, pixels);
    context.strokeStyle = "black";
    context.strokeRect(player.x, player.y, pixels, pixels);
  });
}

// function playerCollision() {
//   let players.forEach=player {
//     for (let i = 0; < players.length; i++)
//       let player = players[i];
//     if (player.x === player.x && player.y === player.y) {
//       gameOver = true;
//     } winCheck(player)
//   }
// }
// function gameOver() {
//   console.log
// }
//This function checks to see if a player is trying to leave the playable area. If they are, it removes their direction so that they become stationary
function collisionCheck(players) {
  players.forEach((player) => {
    if (player.x >= 580 || player.x <= 0) {
      player.dead = true
      player.direction = "STOP";

      context.fillStyle = "black";
      context.font = "50px Bungee, cursive";
      context.fillText("game over", canvas.width / 2, canvas.height / 2);
    }
    if (player.y >= 580 || player.y <= 0) {
      player.dead = true
      player.direction = "STOP";

      context.fillStyle = "black";
      context.font = " 50px Bungee, cursive";
      context.fillText("game over", canvas.width / 2, canvas.height / 2);
    }
  }); winCheck()
}
//     if (!playableArea.has(`${player.x}x${player.y}y`) && player.dead === false) {
//       player.dead = true;
//       player.direction = '';
//       playerCount -= 1;
//     }
//     playableArea.delete(`${player.x}x${player.y}y`);
//   }); 
// }

// Not sure yet
// let outcome, winnerColor, playerCount,player = Player.allInstances.length;

// // // // Not sure yet
// function draw() {
//   if (Player.allInstances.filter(player => !player.key).length === 0) {

//     if (playerCount === 1) {
//       const alivePlayers = Player.allInstances.filter(player => player.dead === false);
//       outcome = `Player ${alivePlayers[0].id} wins!`;
//       winnerColor = alivePlayers[0].colour;
//     } else if (playerCount === 0) {
//       outcome = 'Draw!';
//     }
//   }
//   if (outcome) {
//     createResultsScreen(winnerColor);
//     clearInterval(game);
//   };

//   Player.allInstances.forEach(player => {

//     if (player.key) {

//       player.direction = player.key;

//       context.fillStyle = player.colour;
//       context.fillRect(player.x, player.y, pixels, pixels);
//       context.strokeStyle = 'black';
//       context.strokeRect(player.x, player.y, pixels, pixels);

//       if (!playableArea.has(`${player.x}x${player.y}y`) && player.dead === false) {
//         player.dead = true;
//         player.direction = '';
//         playerCount -= 1;
//       }
//       playableArea.delete(`${player.x}x${player.y}y`);
//     }
//   }); 



function winCheck(players) {
  player.forEach((player) => {
    if (player.dead == true) {
      // win logic;


      clearInterval(game);
    }

  });
}

function main(info) {
  move(info);

  renderPlayers(info);
  // draw();
  collisionCheck(info);
  // playerCollision();


}

let game = setInterval(() => {
  main(Player.allInstances);
}, 200);
