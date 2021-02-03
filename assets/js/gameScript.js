/* Declared Variables */
const tiles = document.querySelectorAll(".game-tile");

let flippedTile = false;
let firstTile, secondTile; 

let pauseFlips = false;

const reset = document.querySelectorAll(".reset-btn");

const pairCount = document.getElementById("pair-count");
let pairCounter = 0;

const matchCount = document.getElementById("match-count");
let matchCounter = 0;

let timerOn = true;
let time = 0;
let timer;
let mins;
let secs;

let modal = document.getElementById("congratsModal");

function startTimer() {
    timer = setInterval(function () {
        time++;
        mins = ("0" + Math.floor(time / 60)).slice(-2);
        secs = ("0" + (time % 60)).slice(-2);
        document.getElementById("timer").innerHTML = `Timer: ${mins}:${secs}`;
    }, 1000);
}

/* Flip Game Tile When Clicked */
function flipTile() {
     if (timerOn === true) {
        startTimer();
        timerOn = false;
    }

    if(pauseFlips) return;
    if(this === firstTile) return;
    
    this.classList.add("flip");

    if(!flippedTile) {
        flippedTile = true;
        firstTile = this;
        return;  
    }  
    

    secondTile = this;
    hasFlippedCard = false;
    pairCounter++;
    pairCount.innerHTML = `Total Pairs Flipped: ${pairCounter}`;

    checkForMatch();
}

/* Check if Two Tiles Match */
function checkForMatch(){
    if(firstTile.dataset.type === secondTile.dataset.type) {
        matchCounter++;
        matchCount.innerHTML = `Total Matches: ${matchCounter}`;
        disableTiles();
        return;
    }
    unflipTiles();
}

/* Disable Matched Tiles */
function disableTiles() {
    firstTile.removeEventListener("click", flipTile);
    secondTile.removeEventListener("click", flipTile);

    resetTiles();
}

/* Flip Tiles Back If Not Matched */
function unflipTiles() {
    pauseFlips = true;

    setTimeout(() => {
        firstTile.classList.remove("flip");
        secondTile.classList.remove("flip");
        resetTiles();
   }, 1200);
}

function resetTiles() {
   [flippedTile, pauseFlips] = [false, false];
   [firstTile, secondTile] = [null, null];
}

(function shuffle() {
   tiles.forEach(tile => {
        let ramdomPos = Math.floor(Math.random() * 12);
        tile.style.order = ramdomPos;
   });
})();

/*function resetGame(){ 
    tiles.forEach(tile => {
        tile.classList.remove("flip");
        let ramdomPos = Math.floor(Math.random() * 12);
        tile.style.order = ramdomPos;
    })
 
    /* shuffle tiles */

    /* reset pair counter to 0 */
    /*pairCounter = 0;
    pairCount.innerHTML = `Total Pairs Flipped: ${pairCounter}`;

    /* reset match counter to 0 */
    /*matchCounter = 0;
    matchCount.innerHTML = `Total Matches: ${matchCounter}`;

    mins = ("0" + 0);
    secs = ("0" + 0);
    document.getElementById("timer").innerHTML = `Timer: ${mins}:${secs}`;
    clearInterval(timer);
     
} */

function congratsModal(){
    if (matchCount == 6) {
        console.log("hey");
    }
}

function resetGame() {
    location.reload();
    return false;
}


     
tiles.forEach(tile => tile.addEventListener("click", flipTile));

reset.addEventListener("click", resetGame);
