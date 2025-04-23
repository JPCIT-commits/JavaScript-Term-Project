var playerPaddle1;
var playerPaddle2;
var player1Score;
var player2Score;
var ball;
img = new Image();
img.src = 'games/paddles/media/plum_isolated.png';

function startPaddles(){
    // Defines player components, calls function to create playing area
    playerPaddle1 = [{x:50, y:100}];
    playerPaddle2 = [{x:500, y:300}];
    player1Score = 0;
    player2Score = 0;
    spawnBall();
    pongGameArea.start();
  }

  function restartPaddles(){
    // Ends the game interval and calls to start the game again
    pongGameArea.clear();
    clearInterval(pongGameArea.interval);
  }
  
  function spawnBall(){

  }

  // Creates and inserts the canvas element, enables keyboard controls listeners
var pongGameArea = {
    canvas : document.getElementById("pongCanvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        pongGame.insertBefore(this.canvas, startPongGame);
        this.keys = {};
        this.frameNo = 0;
        this.interval = setInterval(updatePongArea, 100);
      
   
        window.addEventListener('keydown', function (e) {
            console.log("Key down:", e.key);
            pongGameArea.keys = (pongGameArea.keys || []);
            pongGameArea.keys[e.key] = true;

            // Prevents the arrow keys from scrolling the page after starting the game
            if (["ArrowUp", "ArrowDown"].includes(e.key))
              e.preventDefault();
        })
        window.addEventListener('keyup', function (e) {
            pongGameArea.keys[e.key] = false;
            })
        },
        clear : function() {
            pongGameArea.context.clearRect(0, 0, pongGameArea.canvas.width, pongGameArea.canvas.height);
        },
        stop : function() {
            alert("Game over! Press start to play again.");
            clearInterval(pongGameArea.interval);
        }
    }

    function updatePongArea() {
        // calls checks for collisions and movement, updates and draws elements on canvas
          console.log("Updating game area...");
          pongGameArea.clear();
      
          // Updates movement based on the W and D key inputs for player 1
          if (pongGameArea.keys["w"]) { head.y -= 25; }
          if (pongGameArea.keys["s"]) { head.y -= 25; }
      
          // Updates movement based on arrow key input for player 2
          if (pongGameArea.keys["ArrowUp"]) { head.y -= 25; }
          if (pongGameArea.keys["ArrowDown"]) { head.y -= 25; }

        
    }
// Listens for button inputs to play and restart the game
document.getElementById("startPongGame").addEventListener("click", function(e){
    restartPaddles();
    startPaddles();
})
document.getElementById("resetPongGame").addEventListener("click", function(e){
    restartPaddles();
})
