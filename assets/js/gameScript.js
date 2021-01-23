let cards = document.querySelectorAll(".game-tile");

function flipCard() {
  this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));