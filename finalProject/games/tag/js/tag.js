$(document).ready(function(){

    // Defining variables
    var player1Object;
    var player2Object;
    var player1Health;
    var player2Health;
    var speedP1;
    var speedP2;
    var cooldown;
    var isItPlayer1;
    var isItPlayer2;

    function startTag(){
        // Defines player components, calls function to create playing area
        player1Object = {x:50, y:100};
        player2Object = {x:500, y:300};
        player1Health = 300;
        player2Health = 200;
        speedP1 = 0;
        speedP2 = 0;
        cooldown = 0;
        isItPlayer1 = true;
        isItPlayer2 = false;
        
        tagGameArea.start();
    }

    function restartTag(){
        // Ends the game interval and calls to start the game again
        tagGameArea.clear();
        tagGameArea.context.fillStyle = "plum";
        tagGameArea.context.font = "bold 3em 'Jersey 10'";
        tagGameArea.context.fillText("Press Start", 200, 200); // Text prompts player to press the start button
        clearInterval(tagGameArea.interval);
    }
    

    // Creates and inserts the canvas element, enables keyboard controls listeners
    var tagGameArea = {
        canvas : $("#tagCanvas") [0], // Using jquery for selecting the html canvas element
        start : function() {
            this.canvas.width = 600;
            this.canvas.height = 450;
            this.context = this.canvas.getContext("2d");
            this.keys = {};
            this.interval = setInterval(updateTagArea, 60);
        
            // Keydown event using jquery
            $(window).on('keydown', function (e) {
                console.log("Key down:", e.key);
                tagGameArea.keys = (tagGameArea.keys || []);
                tagGameArea.keys[e.key] = true;

                // Prevents the arrow keys from scrolling the page after starting the game
                if (["ArrowUp", "ArrowDown"].includes(e.key))
                e.preventDefault();
            });
            // Keyup event using jquery
            $(window).on('keyup', function (e) {
                tagGameArea.keys[e.key] = false;
                });
            },
            clear : function() {
                tagGameArea.context.clearRect(0, 0, tagGameArea.canvas.width, tagGameArea.canvas.height);
            },
            stop : function() {
                console.log("Game ended.");
                clearInterval(tagGameArea.interval);
            }
        }

        function updateTagArea() {
            // Calls checks for collisions and movement, updates and draws elements on canvas
            console.log("Updating game area...");
            tagGameArea.clear();
        
            cooldown--; // reduces cooldown from player collision
            // Updates movement based on the WASD key inputs for player 1, adds player speed
            if (tagGameArea.keys["w"]) { player1Object.y -= 40 + speedP1; }
            if (tagGameArea.keys["s"]) { player1Object.y += 40 + speedP1; }
            if (tagGameArea.keys["a"]) { player1Object.x -= 40 + speedP1; }
            if (tagGameArea.keys["d"]) { player1Object.x += 40 + speedP1; }
            
            // Updates movement based on arrow key input for player 2, adds player speed
            if (tagGameArea.keys["ArrowUp"]) { player2Object.y -= 40 + speedP2; }
            if (tagGameArea.keys["ArrowDown"]) { player2Object.y += 40 + speedP2; }
            if (tagGameArea.keys["ArrowLeft"]) { player2Object.x -= 40 + speedP2; }
            if (tagGameArea.keys["ArrowRight"]) { player2Object.x += 40 + speedP2; }
            
            // Checks for any collisions on canvas borders
            playerWallCollision(player1Object);
            playerWallCollision(player2Object);

            // Checks to see if player 1 is "it"
            if (isItPlayer1) {
                tagGameArea.context.fillStyle = "maroon";
                tagGameArea.context.fillRect(player1Object.x,player1Object.y, 75, 75); // Draws player as a larger sprite and different color
                speedP1 += .1; // Gradually increases player 1's speed the longer they are it
                player1Health--; // Decreases player 1's health
                if (playerTagged(player1Object, player2Object) && cooldown <= 0) { // Checks to see if player 1 had tagged player 2 and cooldown in off
                    // Reverses player 1 and 2's roles
                    isItPlayer1 = false;
                    isItPlayer2 = true;
                    cooldown = 20; // prevents players from tagging for cooldown duration
                } 
            }
            // Draws player 1 normally
            else {
                tagGameArea.context.fillStyle = "red";
                tagGameArea.context.fillRect(player1Object.x,player1Object.y, 50, 50);
                speedP1 = 0; // Resets player 1's speed
            }

            // Checks to see if player 2 is "it"
            if (isItPlayer2) {
                tagGameArea.context.fillStyle = "aquamarine";
                tagGameArea.context.fillRect(player2Object.x,player2Object.y, 75, 75); // Draws player as a larger sprite and different color
                speedP2 += .1; // Gradually increases player 2's speed the longer they are it
                player2Health--; // Decreases player 2's health
                if (playerTagged(player2Object, player1Object) && cooldown <= 0) { // Checks to see if player 2 has tagged player 1 and cooldown is off
                    // Reverses player 1 and 2's roles
                    isItPlayer2 = false;
                    isItPlayer1 = true;
                    cooldown = 20; // prevents players from tagging for cooldown duration
                }
            }
            // Draws player 2 normally
            else {   
                tagGameArea.context.fillStyle = "blue";
                tagGameArea.context.fillRect(player2Object.x,player2Object.y, 50, 50);
                speedP2 = 0; // Resets player 2's speed
            }

            // Checks if player one has lost
            if(player1Health == 0)
            {
                tagGameArea.context.fillStyle = "aquamarine";
                tagGameArea.context.font = "bold 3em 'Jersey 10'";
                tagGameArea.context.fillText("Player 2 Wins!", 190, 200);
                tagGameArea.stop();
                return;
            }

            // Checks if player two has lost
            if(player2Health == 0)
            {
                tagGameArea.context.fillStyle = "maroon";
                tagGameArea.context.font = "bold 3em 'Jersey 10'";
                tagGameArea.context.fillText("Player 1 Wins!", 190, 200);
                tagGameArea.stop();
                return;
            }

            // Display health for player 1
            tagGameArea.context.fillStyle = "maroon";
            tagGameArea.context.font = "bold 2em 'Jersey 10'";
            tagGameArea.context.fillText("P1: " + player1Health, 10, 50);
            
            // Display health for player 2
            tagGameArea.context.fillStyle = "aquamarine";
            tagGameArea.context.fillText("P2: " + player2Health, 500, 50);

        }

    
    function playerWallCollision(player) {
        // Checks for collision of player with the boundaries of the canvas element
        if (player.y < 0)
            player.y += 50;
        if (player.y > (tagGameArea.canvas.height))
            player.y -= 50;
        if (player.x < 0)
            player.x += 50;
        if (player.x > (tagGameArea.canvas.width))
            player.x -= 50;
        return player.x, player.y;
    }

    function playerTagged(it, notIt)
        { // checks collision between the two players
            if (it.x < notIt.x + 50 && it.x + 75 > notIt.x && it.y < notIt.y + 50 && it.y + 75 > notIt.y)
                return true;
            return false;
        }

    // Listens for button inputs to play and restart the game
    $("#startTagGame").on("click", function () {
        restartTag();
        startTag();
    });

    $("#resetTagGame").on("click", function () {
        restartTag();
    });

    // Listens for the tab button for Tag to be clicked, then loads the game
    $("#game3").on("click", function() {
        startTag();
        restartTag();
    })
});