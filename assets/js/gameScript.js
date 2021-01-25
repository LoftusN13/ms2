/* Declared Variables */
const tiles = document.querySelectorAll(".game-tile");

let flippedTile = false;
let firstTile, secondTile; 

let pauseFlips = false;

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

    checkForMatch();
}

/* Check if Two Tiles Match */
function checkForMatch(){
    if(firstTile.dataset.type === secondTile.dataset.type) {
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

tiles.forEach(tile => tile.addEventListener("click", flipTile));
