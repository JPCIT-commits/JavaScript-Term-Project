// Defining variables
var playerPaddle1;
var playerPaddle2;
var player1Score;
var player2Score;
var ball;
var trajectoryX;
var trajectoryY;
var spawnDirection;
img2 = new Image();
img2.src = 'games/paddles/media/plum_isolated.png';

function startPaddles(){
    // Initializes player components, calls function to create playing area
    playerPaddle1 = {x:10, y:200};
    playerPaddle2 = {x:560, y:200};
    player1Score = 0;
    player2Score = 0;
    trajectoryX = 0;
    trajectoryY = 0;
    spawnDirection = 0;
    spawnBall();
    paddlesGameArea.start();
  }

function restartPaddles(){
    // Ends the game interval and calls to start the game again
    paddlesGameArea.clear();
    paddlesGameArea.context.fillStyle = "plum";
    paddlesGameArea.context.font = "bold 3em 'Jersey 10'";
    paddlesGameArea.context.fillText("Press Start", 200, 200); // Text prompts player to press the start button
    clearInterval(paddlesGameArea.interval);
}

function spawnBall(){
    ball ={x: 300, y: 200};
    spawnDirection = Math.floor(Math.random() * 2) // Chooses 2 random numbers to determine spawn trajectory (left or right)
    if (spawnDirection == 0) {
    trajectoryX = Math.random() * (4 - 8) + 8;
    trajectoryY = Math.random() * (4 - 8) + 8;
    }  
    else {
    trajectoryX = Math.random() * (-4 + 8) - 8;
    trajectoryY = Math.random() * (-4 + 8) - 8;
    }
}

  // Creates and inserts the canvas element, enables keyboard controls listeners
var paddlesGameArea = {
    canvas : document.getElementById("paddlesCanvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        this.keys = {};
        this.interval = setInterval(updatePaddlesArea, 25);
      
   
        window.addEventListener('keydown', function (e) {
            console.log("Key down:", e.key);
            paddlesGameArea.keys = (paddlesGameArea.keys || []);
            paddlesGameArea.keys[e.key] = true;

            // Prevents the arrow keys from scrolling the page after starting the game
            if (["ArrowUp", "ArrowDown"].includes(e.key))
              e.preventDefault();
        })
        window.addEventListener('keyup', function (e) {
            paddlesGameArea.keys[e.key] = false;
            })
        },
        clear : function() {
            paddlesGameArea.context.clearRect(0, 0, paddlesGameArea.canvas.width, paddlesGameArea.canvas.height);
        },
        stop : function() {
            console.log("Game ended.");
            clearInterval(paddlesGameArea.interval);
        }
    }

    function updatePaddlesArea() {
        // calls checks for collisions and movement, updates and draws elements on canvas
        console.log("Updating game area...");
        paddlesGameArea.clear();
    
        // Updates movement based on the W and D key inputs for player 1
        if (paddlesGameArea.keys["w"]) { playerPaddle1.y -= 10; }
        if (paddlesGameArea.keys["s"]) { playerPaddle1.y += 10; }
    
        // Updates movement based on arrow key input for player 2
        if (paddlesGameArea.keys["ArrowUp"]) { playerPaddle2.y -= 10; }
        if (paddlesGameArea.keys["ArrowDown"]) { playerPaddle2.y += 10; }

        // Ball collision logic
        if (ball.y <= 0) // if the ball hits the ceiling, it will start traveling downward
            trajectoryY = Math.abs(trajectoryY);
        if (ball.y >= (paddlesGameArea.canvas.height) -30) {// if the ball hits the ground, it will start traveling upward
            trajectoryY = -Math.abs(trajectoryY);
        }
        if (ball.x <= playerPaddle1.x + 30 && ball.y <= playerPaddle1.y +90 && ball.y >= playerPaddle1.y - 20)// ball hits player 1's paddle
            trajectoryX = Math.abs(trajectoryX) + 1; // Speeds ball up when hit
        if (ball.x >= playerPaddle2.x - 30 && ball.y <= playerPaddle2.y +90 && ball.y >= playerPaddle2.y - 20) {// ball hits player 2's paddle
            trajectoryX = -Math.abs(trajectoryX) - 1; // Speed ball up when hit
        }
        // Updates ball to match its trajectory
        ball.x += trajectoryX;
        ball.y += trajectoryY;

        // Checks to see if the paddles are at the boundaries, prevents movement past them
        if(paddleWallCollision(playerPaddle1) == "upper") // prevents player 1 from moving past upper boundary
            playerPaddle1.y += 10;
        if(paddleWallCollision(playerPaddle1) == "lower") // prevents player 1 from passing lower boundary
            playerPaddle1.y -= 10;
        if(paddleWallCollision(playerPaddle2) == "upper") // prevents player 2 from passing upper boundary
            playerPaddle2.y += 10;
        if(paddleWallCollision(playerPaddle2) == "lower") // prevents player 2 from passing lower boundary
            playerPaddle2.y -= 10;
        
        // Detects is the ball has passed a player's boundary, updates respective score, spawns a new ball
        if (ball.x < 0) {
            player2Score++;
            spawnBall();
        }
        if (ball.x > (paddlesGameArea.canvas.width)) {
            player1Score++;
            spawnBall();
        }

        // Checks win conditions
        if (player1Score == 10){
            paddlesGameArea.context.fillStyle = "maroon";
            paddlesGameArea.context.font = "bold 3em 'Jersey 10'";
            paddlesGameArea.context.fillText("Player 1 Wins!", 190, 200);
            paddlesGameArea.stop();
            return;
        }
        if (player2Score == 10){
            paddlesGameArea.context.fillStyle = "aquamarine";
            paddlesGameArea.context.font = "bold 3em 'Jersey 10'";
            paddlesGameArea.context.fillText("Player 2 Wins!", 190, 200);
            paddlesGameArea.stop();
            return;
        }

        // Draws paddle 1
        paddlesGameArea.context.fillStyle = "red";
        paddlesGameArea.context.fillRect(playerPaddle1.x,playerPaddle1.y, 30, 100);
        // Draws paddle 2
        paddlesGameArea.context.fillStyle = "blue";
        paddlesGameArea.context.fillRect(playerPaddle2.x,playerPaddle2.y, 30, 100);
        // Draws the ball
        paddlesGameArea.context.drawImage(img2, ball.x, ball.y, 25, 25);
        
        // Draws player 1's score
        paddlesGameArea.context.fillStyle = "maroon";
        paddlesGameArea.context.font = "bold 2em 'Jersey 10'";
        paddlesGameArea.context.fillText("P1: " + player1Score, 10, 50);
        // Draws player 2's score
        paddlesGameArea.context.fillStyle = "aquamarine";
        paddlesGameArea.context.fillText("P2: " + player2Score, 500, 50);
    }   

function paddleWallCollision(paddle) {
    // Checks for collision of player paddles with the boundaries of the canvas element
    if (paddle.y < 0)
        return "upper";
    if (paddle.y > (paddlesGameArea.canvas.height) - 90) // Accounts for paddle origin with 90 pixel difference
        return "lower";
}

// Listens for button inputs to play and restart the game
document.getElementById("startPaddlesGame").addEventListener("click", function(e){
    restartPaddles();
    startPaddles();
})
document.getElementById("resetPaddlesGame").addEventListener("click", function(e){
    restartPaddles();
})
