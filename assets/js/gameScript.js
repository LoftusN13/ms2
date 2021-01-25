/* Declared Variables */
const tiles = document.querySelectorAll(".game-tile");

let flippedTile = false;
let firstTile, secondTile;

/* Flip Game Tile When Clicked */
function flipTile() {
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
    setTimeout(() => {
     firstTile.classList.remove("flip");
     secondTile.classList.remove("flip");
   }, 1200);
}

tiles.forEach(tile => tile.addEventListener("click", flipTile));