var scores, roundScores, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        //Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //Display result
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";
        
        //Update round score if roled number if NOT 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            //Next player turn
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
    
        // Update user interface
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector(".final-score").value;
        var winningScore;
        
        //Anithing else, beside undefined, 0, null or "" coerced to true, then use inputed winning score
        if(input) {
            winningScore = input;
        } else { //undefined, 0, null or "" coerced to false, then use winning score of 100
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!!!";
            hideDice();
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
        //next Player turn
        nextPlayer();
        }
   }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
        
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    hideDice();
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    hideDice();
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}

function hideDice() {
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}