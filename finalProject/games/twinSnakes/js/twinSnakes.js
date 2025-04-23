import ('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap'); 

// Defining variables
var playerSnake1 = [];
var playerSnake2 = [];
var snakeLengthP1;
var snakeLengthP2;
var plum; 
var hud;
var player1Score;
var player2Score;
var directionP1;
var directionP2;
img = new Image();
img.src = 'games/twinSnakes/media/plum_isolated.png';

function startSnake(){
  // Defines player components, calls function to create playing area
  playerSnake1 = [{x:50, y:100}];
  playerSnake2 = [{x:500, y:300}];
  snakeLengthP1 = 6;
  snakeLengthP2 = 6;
  player1Score = 0;
  player2Score = 0;
  directionP1 = "right";
  directionP2 = "left";
  spawnPlum();
  snakeGameArea.start();
}

function restartSnake(){
  // Ends the game interval and calls to start the game again
  snakeGameArea.clear();
  clearInterval(snakeGameArea.interval);
}

function spawnPlum() {
  // defines a randomized plum spawn and locks it to a grid
    var x = Math.floor(Math.random() * (snakeGameArea.canvas.width / 25)) * 25;
    var y = Math.floor(Math.random() * (snakeGameArea.canvas.height / 25)) * 25;
    plum = { x: x, y: y };
}

// Creates and inserts the canvas element, enables keyboard controls listeners
var snakeGameArea = {
    canvas : document.getElementById("snakeCanvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        console.log("Canvas context:", this.context);
        this.keys = {};
        this.frameNo = 0;
        this.interval = setInterval(updateSnakeArea, 100);
      
   
        window.addEventListener('keydown', function (e) {
            console.log("Key down:", e.key);
            snakeGameArea.keys = (snakeGameArea.keys || []);
            snakeGameArea.keys[e.key] = true;

            // Prevents the arrow keys from scrolling the page after starting the game
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
              e.preventDefault();
        })
        window.addEventListener('keyup', function (e) {
            snakeGameArea.keys[e.key] = false;
            })
        },
        clear : function() {
            snakeGameArea.context.clearRect(0, 0, snakeGameArea.canvas.width, snakeGameArea.canvas.height);
        },
        stop : function() {
            alert("Game over! Press start to play again.");
            clearInterval(snakeGameArea.interval);
        }
    }

function updateSnakeArea() {
  // calls checks for collisions and movement, updates and draws elements on canvas
    console.log("Updating game area...");
    snakeGameArea.clear();

    // Updates movement based on WASD key input for player 1
    var headP1 = playerSnake1[playerSnake1.length - 1];
    if (snakeGameArea.keys["a"]) {directionP1 = "left"; }
    if (snakeGameArea.keys["d"]) {directionP1 = "right"; }
    if (snakeGameArea.keys["w"]) {directionP1 = "up"; }
    if (snakeGameArea.keys["s"]) {directionP1 = "down"; }

    // Updates movement based on arrow key input for player 2
    var headP2 = playerSnake2[playerSnake2.length - 1];
    if (snakeGameArea.keys["ArrowLeft"]) {directionP2 = "left"; }
    if (snakeGameArea.keys["ArrowRight"]) {directionP2 = "right"; }
    if (snakeGameArea.keys["ArrowUp"]) {directionP2 = "up"; }
    if (snakeGameArea.keys["ArrowDown"]) {directionP2 = "down"; }

    detectMovementInput(headP1, directionP1);
    detectMovementInput(headP2, directionP2);
    
    // Checking to see if a plum has been collected by either player, if so, calls to spawn a new plum
    if (headP1.x == plum.x && headP1.y == plum.y) 
    {
        snakeLengthP1++;
        player1Score++;
        spawnPlum();
    }
    if (headP2.x == plum.x && headP2.y == plum.y) 
    {
        snakeLengthP2++;
        player2Score++;
        spawnPlum(); 
    }

    // Checking collisions and win conditions for players for players
    if (snakeCollision(headP1, playerSnake2) && snakeCollision(headP2, playerSnake1))
    {
      snakeGameArea.context.fillStyle = "plum";
      snakeGameArea.context.font = "bold 3em 'Jersey 10'";
      snakeGameArea.context.fillText("Tie!", 250, 200);
      snakeGameArea.stop();
      return;
    }
    if (snakeCollision(headP1, playerSnake1) || snakeCollision(headP1, playerSnake2) || wallCollision(headP1) || player2Score == 10)
      {
        snakeGameArea.context.fillStyle = "aquamarine";
        snakeGameArea.context.font = "bold 3em 'Jersey 10'";
        snakeGameArea.context.fillText("Player 2 Wins!", 190, 200);
        snakeGameArea.stop();
        return;
      }
    if (snakeCollision(headP2, playerSnake2) || snakeCollision(headP2, playerSnake1) || wallCollision(headP2) || player1Score == 10)
      {
        snakeGameArea.context.fillStyle = "maroon";
        snakeGameArea.context.font = "bold 3em 'Jersey 10'";
        snakeGameArea.context.fillText("Player 1 Wins!", 190, 200);
        snakeGameArea.stop();
        return;
      }
    
    console.log("snake 1 length: ", playerSnake1);
    // Updates snake positions
    playerSnake1.push({...headP1});
    playerSnake2.push({...headP2});
    if (playerSnake1.length > snakeLengthP1) 
      playerSnake1.shift();
    if (playerSnake2.length > snakeLengthP2)
      playerSnake2.shift();

    // Draws a plum
    snakeGameArea.context.drawImage(img, plum.x, plum.y, 25, 25);

    // Draws snake 1
    for (let i = 0; i < playerSnake1.length; i++)
    {
        snakeGameArea.context.fillStyle = "red";
        snakeGameArea.context.fillRect(playerSnake1[i].x,playerSnake1[i].y, 25, 25);
    }

    // Draws snake 2
    for (let i = 0; i < playerSnake2.length; i++)
    {
        snakeGameArea.context.fillStyle = "blue";
        snakeGameArea.context.fillRect(playerSnake2[i].x,playerSnake2[i].y, 25, 25);
    }

    // Display score for player 1
    snakeGameArea.context.fillStyle = "maroon";
    snakeGameArea.context.font = "bold 2em 'Jersey 10'";
    snakeGameArea.context.fillText("P1: " + player1Score, 10, 50);
    
    // Display score for player 2
    snakeGameArea.context.fillStyle = "aquamarine";
    snakeGameArea.context.fillText("P2: " + player2Score, 500, 50);


}

function detectMovementInput(head, direction) {
  // Decides which movement function to make based on current input
  switch (direction) {
    case "left":
      head.x -= 25;
    break;
    case "right":
      head.x += 25;
    break;
    case "up":
      head.y -= 25;
      break;
    case "down":
      head.y += 25;
      break;
    default:
      break;
  }
}


function snakeCollision(head, snakeBody = 0) {
  // Checks for collision with any other snake body item
    console.log("Checking collision");
    for (let i=0; i < snakeBody.length - 1; i++)
    {
        if (head.x == snakeBody[i].x && head.y == snakeBody[i].y){
          console.log("Snake collision detected.");
          return true;
        }
      }
    return false;
}

function wallCollision(head) {
  // Checks for collision with the boundaries of the canvas element
    if (head.x < 0 || head.x >= snakeGameArea.canvas.width || head.y < 0 || head.y >= snakeGameArea.canvas.height)
        return true;
    return false;
}
document.getElementById("startSnakeGame").addEventListener("click", function(e){
  // Listens for button inputs to play and restart the game
  restartSnake();
  startSnake();
})
document.getElementById("resetSnakeGame").addEventListener("click", function(e){
  restartSnake();
})

