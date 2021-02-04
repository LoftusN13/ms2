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

/* Flip Game Tile When Clicked */
function flipTile() {

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

function resetGame() {
    location.reload();
    return false;
}
     
tiles.forEach(tile => tile.addEventListener("click", flipTile));

reset.addEventListener("click", resetGame);
