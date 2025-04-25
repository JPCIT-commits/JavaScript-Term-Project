------------------------------------------------------------------------------------------------------------------
# Plum Station Website
------------------------------------------------------------------------------------------------------------------
## Games
This website hosts three games in total. Brief overviews of each are shown below:
------------------------------------------------------------------------------------------------------------------
### Twin Snakes

#### Description
A local versus take on the classic Snake game. Duke it out between two players, controlling each snake with WASD
and arrow key schemes respectively. Winning conditions go to the last who survives.

#### Known issues
When a snake turns into another when directly adjacent to the head, one snake will "phase through" the other, 
ignoring collision logic.

#### Plans to resolve issues
Update the snake head collision logic to prevent this from happening.

#### Plans for future releases
Update allowing player's to set variables themselves, such as defining starting snake length, points to win, and 
speed.

------------------------------------------------------------------------------------------------------------------
### Paddles

#### Desicription
A versus game inspired by Pong, hit the ball back and forth until it passes a player's goal. 
The W and D keys as well as the up and down arrow keys are used to control player 1 and player 2 respectively. 
First to five points wins.

#### Known issues
When the ball reaches a certain velocity, the game's collision logic can't keep up -- resulting in the ball sometimes passing
through the paddle.

#### Plans to resolve issues
Work on a patch that rewrites some of the collision logic relative to speed, and change the game's draw rate to better suit
objects with high speeds.

#### Plans for future releases
Update to game mechanics to allow a player to "spike" the ball, leading to a large increase in velocity. Balancing necessary.

------------------------------------------------------------------------------------------------------------------
### Tag

#### Description
An assymetrical versus game where one player chases the other, losing health so long as they are "it". 
Player 1 start's as the "it" player, having to tag player 2 to make them "it".
Both players a have full range movement with the WASD and the Arrow Keys respectively.
When a player's health hits 0, the game ends. 

#### Known issues
Due to the nature of an asymetric two-player game, balance tweaks may be necessary in the future.

#### Plans to resolve issues
Gradually implement tweaks to starting health variables for each player based on feedback from others.

#### Plans for future releases
Update to the hud elements to make them more intuitive (i.e. health bars for each player).

------------------------------------------------------------------------------------------------------------------
## Contact info
### Author
Jack Perry

### Email
perry128@mail.nmc.edu
------------------------------------------------------------------------------------------------------------------
## Copyright Info
HTML, CSS, JavaScript and graphics on this website were all created by the author.
For any code reused from this site, please provide credit to the author in the comments or documentation.

The font used for this site is sourced from Google Fonts and used under the SIL OPEN FONT LICENSE Version 1.1.
------------------------------------------------------------------------------------------------------------------