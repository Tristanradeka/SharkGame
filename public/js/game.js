var c = document.querySelector(`canvas`)
var ctx = c.getContext(`2d`)
var timer = setInterval(main, 1000/60)

/*--------------shark------------
shark is the "player controllable" Object
-----------------------------------*/
var shark = new GameObject();
shark.img = document.querySelector(`#shark`)
shark.width = 420;
shark.height = 191;

//bool for checking whether it's the first time the player has played
var playedAlready = false;

//bool for checking if in score menu
var scoreMenuBool = false;


/*--------------Finish Line------------
shark is the "player controllable" Object
-----------------------------------*/
var finishLine = new GameObject();

/*--------------Powerups and Obstacles------------
1. pwrAmt and obsAmt are the amount of powerups and obstacles
2. pu and obs are the arrays that holds all of the objects
3. The "for loops" in the init function create the objects at random locations and with random x velocities" 
-----------------------------------*/
var pwrAmt = 5;
var pu = [];

//The obstacles
var obsAmt = 5;
var obs = [];


//The y coordinate that you want the first car to show up on.
var lane = 200;

/*----------bgX-------------
1. The canvas's background position  
   It controls where the background is on the x axis  
----------------------------------*/
var bgX = 0;

/*----------Fuel Bar Vars----------
1. maxFuel is he maximum amount of fuel you can have
2. fuel is the amount of fuel you currently have
3. barMaxWidth is the width that you want the fuel bar to be when it's full
4. fuel is the amount of fuel you want to deduct per second
---------------------------------*/
var maxFuel = 100;
var fuel = maxFuel; 
var barMaxWidth = 500;
var consumption = 20;

//NEW 2025 -- adding score
var score = 0;
var finalScore = 0;

/*--------Fuel Bar--------------
1. bar is the actual fuel bar
2. It controls the position and size of the fuel bar and fuel bar border HUD.
--------------------------------*/
var bar = new GameObject();
bar.color = `limegreen`;
bar.x = c.width/2 + 40;
bar.y = 50
bar.h = 10;
bar.w = maxFuel;

/*----Fuel Bar's Border (HUD)----
1. barBorder is the fuel bar's border (HUD)
2. barBorderPadding is the thickness of the border
   It reprsents how many pixels of the border show around the fuel bar
--------------------------------*/
var barBorderPadding = 20
var barBorder = new GameObject();
barBorder.x = bar.x;
barBorder.y = bar.y;
barBorder.w = barMaxWidth + (barBorderPadding * 2);
barBorder.h = bar.h + (barBorderPadding * 2);
barBorder.color = `black`;
//Change to the id of the image you want to use
barBorder.img = document.querySelector(`#yellow`);

/*---------Text Hud-------------
1. textHud is the shark behind the text readout (HUD)
--------------------------------*/
var textHud = new GameObject();
textHud.x = 60
textHud.y = 50;
textHud.w = 100;
textHud.h = 50;
textHud.color = `gray`;
//Change to the id of the image you want to use
textHud.img = document.querySelector(`#fuelhud`);

//Score Hud
var scoreText = new GameObject();
scoreText.x = 60;
scoreText.y = 90;

/*-----Physics--------*/
var frictionX, frictionY;

/*---------------This is the game-----------*/



function init()
{
    /*---------Physics----------------
    NOTE: Friction is a percentage of the speed you want. 
    It will should be a number between 0 and 1. 
    You're players velocity gets multiplied by the friction so....
    
    1 = no friction at all (You'll never stop moving)
    0 = too much friction (You won't be able to move)

    Usually numbers between 7.5 and 9.8 feel nice
    NOTES:
    1. When you make the friction a lower number (closer to 0)
       you need to make the shark.force greater to compensate.
    2. If you make the friction a higher number (closer to 1)
       you'll need to lower the shark.force.
    ----------------------------------*/
    frictionX = .87;
    frictionY = .87;
    /*------------
    The force represents how much you want to speed up each frame
    It is allowing our shark to accelerate instead of move at a constant speed
    Change this number to make the shark accelerate slower or faster
    --------------------*/ 
    shark.force = .85;

    //Sets the shark to it's starting position
    shark.x = 150;
    shark.y = 150;
    shark.vx = 0;
    shark.vy = 0;

   //reset score to 0
   score = 0;

    //Sets the finish line to its starting position
    finishLine.color = `#009900`
    finishLine.h = c.height;
    finishLine.w = 20;
    finishLine.x = 18000;
    finishLine.y = c.height/2;
    finishLine.vx = -10;

    //Sets the lane to it's starting y position
    lane = 50

    //Creates and sets up the powerups
    for(var i=0; i<pwrAmt; i++)
    {
        pu[i] = new GameObject();
        pu[i].w = 32; 
        pu[i].h = 32;
        pu[i].x = rand(0, c.width);
        pu[i].y = rand(lane, c.height);
        pu[i].vx = rand(-15, -5)
        //Change to the id of the image you want to use
        pu[i].img = document.querySelector(`#fish2`);
    }

    //Creates and sets up the obstacles
    for(var i=0; i<obsAmt; i++)
    {
        obs[i] = new GameObject();
        obs[i].w = 25; 
        obs[i].h = 25;
        obs[i].x = rand(c.width, c.width*2);
        //Puts an obstacle at a lane's y position
        obs[i].y = lane;
        //increases the lane's y position
        lane += 200;
        obs[i].vx = rand(-15, -5)
        obs[i].color = `red`
        //Change to the id of the image you want to use
        obs[i].img = document.querySelector(`#mine`);
    }

    //sets the background position
    bgX = 0;
    //sets the fuel to full
    fuel = maxFuel; 
}

/*----------Game States-------------------*/

//Controls which function gets used
var currentState = menu;

//The main menu
function menu()
{

    var graphics = new GameObject();
    graphics.w = c.width;
    graphics.h = c.height;
    graphics.x = c.width/2;
    graphics.y = c.height/2;
    graphics.img = document.querySelector(`#menu`)

    if(enter)
    {
        currentState = game;
    }

    if(tab)
    {
        currentState = scoreMenu;
    }

    graphics.renderImg();
    ctx.save();
        ctx.textAlign = `center`;
        ctx.fillStyle = `yellow`;
        ctx.font = `32px Arial`
        ctx.fillText(`Are you hungry? Press 'enter' to play!`,c.width/2,c.height/2)
    ctx.restore();

    init()

}


function win()
{
    var graphics = new GameObject();
    graphics.w = c.width;
    graphics.h = c.height;
    graphics.x = c.width/2;
    graphics.y = c.height/2;
    graphics.img = document.querySelector(`#winscreen`)

    if(enter)
    {
        currentState = game;
    }

    graphics.renderImg();
    ctx.save();
        ctx.textAlign = `center`;
        ctx.fillStyle = `yellow`;
        ctx.font = `32px Arial`
        ctx.fillText(`You Win! Fish are food, not friends!`,c.width/2,c.height/2-100)
        ctx.fillText(`Are you hungry? Press 'enter' to play again!`,c.width/2,c.height/2)
    ctx.restore();

    init()
}

//The lose screen
function lose() {
    var graphics = new GameObject();
    graphics.w = c.width;
    graphics.h = c.height;
    graphics.x = c.width / 2;
    graphics.y = c.height / 2;
    graphics.img = document.querySelector(`#losescreen`);

    graphics.renderImg();
    ctx.save();
    ctx.textAlign = `center`;
    ctx.fillStyle = `yellow`;
    ctx.strokeStyle = `black`;
    ctx.lineWidth = 1.5;
    ctx.font = `40px Arial`;
    ctx.fillText(`You died!`, c.width / 2, c.height / 2 - 100);
    ctx.strokeText(`You died!`, c.width / 2, c.height / 2 - 100);
    ctx.fillText(`Are you hungry? Press 'Enter' to try again!`, c.width / 2, c.height / 2);
    ctx.strokeText(`Are you hungry? Press 'Enter' to try again!`, c.width / 2, c.height / 2);
    ctx.fillText(`Final Score: ${finalScore}`, c.width / 2, c.height / 2 + 75);
    ctx.strokeText(`Final Score: ${finalScore}`, c.width / 2, c.height / 2 + 75);
    ctx.restore();

    // Prevent duplicate event listeners
    document.removeEventListener("keydown", handleEnterKey);
    document.addEventListener("keydown", handleEnterKey);

    // Only create input field and button if they don’t already exist
    if (!document.getElementById("playerNameInput")) {
        playerNameInput = document.createElement("input");
        playerNameInput.type = "text";
        playerNameInput.id = "playerNameInput";
        playerNameInput.placeholder = "Enter your name";
        playerNameInput.style.position = "absolute";
        playerNameInput.style.left = c.offsetLeft + c.width / 2 - 80 + "px";
        playerNameInput.style.top = c.offsetTop + c.height / 2 + 100 + "px";
        playerNameInput.style.zIndex = "10";
        document.body.appendChild(playerNameInput);
    }

    if (!document.getElementById("submitButton")) {
        submitButton = document.createElement("button");
        submitButton.innerText = "Submit Score";
        submitButton.id = "submitButton";
        submitButton.style.position = "absolute";
        submitButton.style.left = c.offsetLeft + c.width / 2 - 60 + "px";
        submitButton.style.top = c.offsetTop + c.height / 1.8 + 100 + "px";
        submitButton.style.zIndex = "10";
        document.body.appendChild(submitButton);

        // Handle submit button click
        submitButton.addEventListener("click", () => {
            const playerName = playerNameInput.value.trim();
            if (playerName) {
                submitScore(playerName, finalScore);
                removeUIElements();
            }
        });
    }
}

function scoreMenu()
{
    //Set up score display
}

// Function to remove input field and button
function removeUIElements() {
    let nameInput = document.getElementById("playerNameInput");
    let submitBtn = document.getElementById("submitButton");
    
    if (nameInput) nameInput.remove();
    if (submitBtn) submitBtn.remove();
}

// Function to handle "Enter" key for restarting the game
function handleEnterKey(event) {
    if (event.key === "Enter") {
        document.removeEventListener("keydown", handleEnterKey); // Remove event listener to prevent repeated calls
        removeUIElements();  // Clean up UI elements
        currentState = game; // Immediately switch state
    }
}

//The game
function game()
{
    //Check whether score needs to be reset
    if(playedAlready)
    {
        score = 0;
        playedAlready = false;
    }

    //Accelerate (increase the velocity of) the shark with key presses
    if(d){ shark.vx += shark.force}
    if(a){ shark.vx += -shark.force}
    if(w){ shark.vy += -shark.force}
    if(s){ shark.vy += shark.force }

    //apply friction to the velocity
    shark.vx *= frictionX;
    shark.vy *= frictionY;
    
    //Makes the shark actually move
    shark.move();

    //Keeps the shark on the screen
    if(shark.x > c.width)
    {
        shark.x = c.width;
    }
    if(shark.x < 0)
    {
        shark.x = 0;
    }
    if(shark.y > c.height)
    {
        shark.y = c.height;
    }
    if(shark.y < 0)
    {
        shark.y = 0;
    }

    /*------------------------------
    1. Remove fuel every frame
    -------------------------------*/
    fuel-=consumption/60;

    /*--------Background and Finish Line------------
    1. Move the background by setting its css background-position-x to the bgX variable's value
    2. Move the finishLine
    3. draw the finish line
    -------------------------------*/
    bgX += finishLine.vx;
    c.style.backgroundPositionX = `${bgX}px`;

    //Move the finish line
    finishLine.x += finishLine.vx;
    
    //Draw the finish line first so that other objects go on top of it
    finishLine.renderRect();
   

    /*--------Powerup Logic----------*/
    for(var i=0; i<pwrAmt; i++)
    {
        //Move each powerup
        pu[i].move()

        /*------------------------------
        1. Check if it's offscreen on the left and reset it to the right. 
        2. Also change its y position and velocity
        -------------------------------*/

        if(pu[i].x < 0)
        {
            pu[i].x = c.width;
            pu[i].y = rand(0, c.height);
            pu[i].vx = rand(-15, -5)
        }

        /*------------------------------
        1. If a powerup collides with the shark reset it to 
           the right side of the screen
        2. Add fuel
        -------------------------------*/

        if(shark.collide(pu[i]))
        {
            pu[i].x = c.width;
            pu[i].y = rand(0, c.height);
            pu[i].vx = rand(-15, -5)
            fuel += 20;
            score += 5;
        }

        /*-----------------------------
        Draw the powerups
        !IMPORTANT! - Change this to draw the image instead of the rect. 
        HINT: use renderImg()
        -------------------------------*/
        pu[i].renderImg(`#fuelcan`)
    }

    for(var i=0; i<obsAmt; i++)
    {
        //Move each obstacle
        obs[i].move()

        /*------------------------------
        1. Check if it's offscreen on the left and reset it to the right. 
        2. Also change its velocity
        -------------------------------*/

        if(obs[i].x < 0)
        {
            obs[i].x = c.width;
            obs[i].vx = rand(-15, -5)
        }

        /*------------------------------
        1. If a obstacle collides with the shark reset it to 
           the right side of the screen
        2. Send to lose screen
        -------------------------------*/

        if(shark.collide(obs[i]))
        {
            playedAlready = true;
            finalScore = score;
            currentState = lose;
        }

        /*-----------------------------
        Draw the obstacles
        !IMPORTANT! - Change this to draw the image instead of the rect. 
        HINT: use renderImg()
        -------------------------------*/
        obs[i].renderImg();
    }
    
    
    /*----------Fuel Limitation--------------
    1. Limit the fuel so that it can't go below 0 or above the max
    -------------------------------*/
    if(fuel < 0)
    {
        fuel = 0;
        //You lose
        playedAlready = true;
        finalScore = score;
        currentState = lose;
    }
    if(fuel > 100)
    {
        fuel = maxFuel;
    }

    //If player avatar collides with the finish line
    if(shark.collide(finishLine))
    {
        //You win
        currentState = win
    }

    


    /*--------Fuel Bar and Fuel Bar Border------------ 
    1. Set the width of the fuel bar to reflect the amount of   
       fuel in the tank
    2. Draw the bar border 
    3. Draw the bar over the bar border
    -------------------------------------------------*/
    bar.w = fuel/maxFuel * barMaxWidth;
    barBorder.renderRect();
    barBorder.renderImg();
    bar.renderRect();
   
    /*--------Fuel Text Readout------------ 
    1. Center the text
    2. Set the font and font size
    3. Draw the bar over the bar border
    4. Set the color of the text
    5. Round the fuel value and draw it on screen
    -------------------------------------------------*/
    textHud.renderImg();
    ctx.textAlign=`center`;
    ctx.font = `24px Arial`;
    ctx.fillStyle = `yellow`;
    ctx.fillText(`${Math.round(fuel)}`, textHud.x, textHud.y + 10)

    

    //Draw Score text
    ctx.textAlign=`center`;
    ctx.font = `24px Arial`;
    ctx.fillStyle = `yellow`;
    ctx.fillText(`Score: ${score}`,scoreText.x,scoreText.y);

   /*--------shark------------ 
    1. Draw the shark
    !IMPORTANT! - Change this to draw the image instead of the rect
    -------------------------------------------------*/
    
    shark.renderImg()

    
}


/*----------Function that makes the game work (60FPS)-------------*/
function main()
{
    //Erase the screen
    ctx.clearRect(0,0,c.width,c.height); 

    currentState()

}

/*---------Random Number Generator---------------------------------*/
function rand(_low, _high)
{
    return Math.random()*(_high - _low) + _low 
}

//Function for score submission
function submitScore(name, score) {
    fetch("http://localhost:5000/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, score }),
    })
    .then(response => response.json())
    .then(data => {
        alert("Score submitted!");
        cleanupUI();
    })
    .catch(error => console.error("Error submitting score:", error));
}

function cleanupUI() {
    if (playerNameInput) document.body.removeChild(playerNameInput);
    if (submitButton) document.body.removeChild(submitButton);
}