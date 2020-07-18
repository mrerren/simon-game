
// <><><><><> ANIMATIONS AND EFFECT <><><><><>

// preset sound effect
var logoIntroSound = new Audio("sounds/sound-effect/logo-intro.mp3");

var gamePlaySound = new Audio("sounds/sound-effect/game-play.mp3");

var startGameSound = new Audio("sounds/sound-effect/start-game-new.mp3");

var gameOverSound = new Audio("sounds/wrong.mp3");
// ---------------

// sound effect 
setTimeout(function() {
    logoIntroSound.play();
}, 1500);

// looping game play sound effect
setTimeout(function() {
    setInterval(function() {
        gamePlaySound.play(); 
    });
},11500);
// --------------------

// fadding animation 
setTimeout(function() {
    $("#game-intro").css("animation", "scale-anim 30s ease forwards 1s");
}, 3500);

setTimeout(function() {
    $("#game-intro").fadeOut(1000);

    $("#simon-game").fadeIn(4000);
}, 10000);

function eventHandler(i) {
    $(`#${buttonColor[i]}`).addClass("fade");
    setTimeout(function() {
        $(`#${buttonColor[i]}`).removeClass("fade");
    }, 100 * i);   

}

var handler = setInterval(function() {
    for(let i = 0; i <= buttonColor.length; i++) {
        eventHandler(i);
    }
}, 1000);

// ---------------

// sound and animation
function playSound(playOn) {
    let theSound = new Audio(`sounds/${playOn}.mp3`);
    theSound.play();
}

function animatePress(pressOn) {
    $(`#${pressOn}`).addClass("pressed");

    setTimeout(function() {
        $(`#${pressOn}`).removeClass("pressed");
    }, 100);
}
// ------------------

// <><><><><><><><><><><><><><><><><><><><><><><><><>



// <><><><><> GAME PLAY <><><><><>

let gamePattern = [];

let userClickedPattern = [];

const buttonColor = ["red", "blue", "green", "yellow"];

let j = 1;

// start the game
function startGame() {
    $('h1#level-title').text("Press A Key to Start");

    $(document).one("keypress", function() {

        clearInterval(handler);

        startGameSound.play();
        
        $('h1#level-title').text("Level 1");
        
        nextSequence();

    });
}

startGame();

function nextSequence() {

    levelUp();
    
    palyerTurn();

}
// ---------------

// level up 
function levelUp() {
    startGameSound.play();
    
    gamePattern.splice(0, gamePattern.length);
    userClickedPattern.splice(0, userClickedPattern.length);
    
    for(let i = 1; i <= j; i++) {
        $('h1#level-title').text(`Level ${i}`);
        compTurn(i);
    } j++;
}
// -----------------

// computer turn
function compTurn(i) {

    setTimeout(function() { 

        let randomNumber = Math.floor(Math.random() * 4);

        let randomChosenColor = buttonColor[randomNumber];

        // show the sequence to the user with animations and sounds
        $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);

        let theSound = new Audio(`sounds/${randomChosenColor}.mp3`)
        theSound.play();
        // ------------------

        gamePattern.push(randomChosenColor);

    }, 1000 * i); 

}
// ------------

// player turn
function palyerTurn() {

    $("#green").click(function(event) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        playerAnswer();

    })

    $("#red").click(function(event) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        playerAnswer();

    });

    $("#yellow").click(function(event) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        playerAnswer();

    });
    
    $("#blue").click(function(event) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

    
        animatePress(userChosenColor);
        playSound(userChosenColor);
            
        playerAnswer();

    });
}
// -------------

// player answer checker
function playerAnswer() {

    // if player answer is not same with computer answer
    for(let i = 1; i <= userClickedPattern.length; i++) {
        if (userClickedPattern[i - 1] != gamePattern[i -1]) {
            gameOver();
        } else {
            
        }
    }

    // if player answer is same with computer answer
    if(userClickedPattern.length === gamePattern.length){
        resultAnswer(userClickedPattern, gamePattern);
    }

}
// ------------

// Result Answer
function resultAnswer(player, comp) {
    // comparing two arrays
    let equal = player.length == comp.length && player.every(function(element, index) {
        return element === comp[index];
    });

    // make a decision for a result
    if (equal) {
        setTimeout(function() {
            levelUp();
        }, 1000);
    }
}
// ------------

// game over
function gameOver() {
    $("body").addClass("game-over");
    gameOverSound.play();

    setTimeout(function() {
        $("body").removeClass("game-over");
        $("#game-over").show();
        $("#simon-game").hide();
    }, 250);

    //reload the game
    setTimeout(function() {
        location.reload(true);
    }, 5000);
}

// <><><><><><><><><><><><><><><><><><><><><><><><><>