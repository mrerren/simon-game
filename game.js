// <><><><><> ANIMATIONS AND EFFECT <><><><><>

// preset sound effect
var logoIntroSound = new Audio("sounds/sound-effect/logo-intro.mp3");

var gamePlaySound = new Audio("sounds/sound-effect/game-play.mp3");

var startGameSound = new Audio("sounds/sound-effect/start-game-new.mp3");

var mouseClick = new Audio("sounds/sound-effect/mouse-click-new.mp3");

var gameOverSound = new Audio("sounds/wrong.mp3");
// ---------------

// fading sound effect
// ## game play
function gamePS_fading() {
    var fadePoint = gamePlaySound.currentTime + 2;

    var fadeAudio = setInterval(function () {
        // Only fade if past the fade out point or not at zero already
        if ((gamePlaySound.currentTime >= fadePoint) && (gamePlaySound.volume != 0.0)) {
            gamePlaySound.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (gamePlaySound.volume <= 0.1) {
            clearInterval(fadeAudio);
        }
    }, 200);
}

// -------------------

// looping sound effect
// ## game play
var gamePS_looping;

function gamePS_interval() {
    gamePS_looping = setInterval(function() {
        gamePlaySound.play(); 
    });
}

// stop looping game play sound effect
function gamePS_clearLooping() {
    clearInterval(gamePS_looping);
    
    gamePS_fading();
}
// --------------

// intro game effect
function gameIntro() {
    // sound effect 
    setTimeout(function() {
        logoIntroSound.play();
    }, 1500);

    // looping game play sound effect
     setTimeout(gamePS_interval, 11500);
    // --------------------

    // fading animation 
    setTimeout(function() {
        $("#logo-intro").css("animation", "scale-anim 30s ease forwards 1s");
    }, 3500);

    setTimeout(function() {
        $("#logo-intro").fadeOut(1000);

        $("#simon-game").fadeIn(4000);
    }, 10000);
}
// -------------------

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

// handler interval button game play fading effect
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

// <><><><><><><><><><><><><><><><><><><><><><><><><>



// <><><><><> GAME PLAY <><><><><>

let gamePattern = [];

let userClickedPattern = [];

const buttonColor = ["red", "blue", "green", "yellow"];

let j = 1;

// power button
$("#logo-intro").hide();
$("#power-button").click(function() {
    // activate effect
    mouseClick.play();

    $("#power-button").fadeOut(1500);

    $("#logo-intro").fadeIn(2000);

    // activate function
    gameIntro();

    startGame();
});
// --------------

// start the game
function startGame() {
    $('h1#level-title').text("Simon");

    $("#play-button").click(function() {

        $("#play-button").fadeOut();

        clearInterval(handler);

        startGameSound.play();
        
        $('h1#level-title').text("Level 1");
        
        nextSequence();

    });
}

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
        console.log("computer turn");

        if ( i == j) {
            setTimeout(function() {
                console.log("player turn");
                for(let i = 0; i < buttonColor.length; i++) {
                    $(`#${buttonColor[i]}`).prop("disabled", false);
                }
            }, (1000 * i) + 1000);
        }

    } j++;
}
// -----------------

// computer turn
function compTurn(i) {
    
    for(let i = 0; i < buttonColor.length; i++) {
        $(`#${buttonColor[i]}`).prop("disabled", true);
    }

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
    
    gamePS_clearLooping();

    $("body").addClass("game-over");
    gameOverSound.play();

    setTimeout(function() {
        $("body").removeClass("game-over");
        $("#game-over").show();
        $("#simon-game").hide();
    }, 250);

    // reload the game
    setTimeout(function() {
        location.reload(true);
    }, 5000);
}

// <><><><><><><><><><><><><><><><><><><><><><><><><>