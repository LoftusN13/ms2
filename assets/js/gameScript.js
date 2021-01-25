/* Declared Variables */
const tiles = document.querySelectorAll(".game-tile");

let flippedTile = false;
let firstTile, secondTile; 

let pauseFlips = false;

/* Flip Game Tile When Clicked */
function flipTile() {
    if(pauseFlips) return;
    this.classList.add("flip");

    if(!flippedTile) {
        flippedTile = true;
        firstTile = this;
        return;
    }

    secondTile = this;
    flippedTile = false;

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
}

/* Flip Tiles Back If Not Matched */
function unflipTiles() {
    pauseFlips = true;

    setTimeout(() => {
     firstTile.classList.remove("flip");
     secondTile.classList.remove("flip");
     pauseFlips = false;
   }, 1200);
}

tiles.forEach(tile => tile.addEventListener("click", flipTile));
