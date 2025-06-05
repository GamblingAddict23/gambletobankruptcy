// Global variables
let deck = [];
let playerHand = [];
let dealerHand = [];
let heldCards = [false, false, false, false, false];

// Initialize deck
function initializeDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  shuffleDeck();
}

// Shuffle deck
function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Draw initial hands for dealer and player
function drawHands() {
  if (deck.length < 10) { // Ensure there are enough cards for both hands
    alert("Not enough cards left in the deck!");
    return;
  }
  playerHand = [];
  dealerHand = [];
  for (let i = 0; i < 5; i++) {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
  }
  displayHands();
}

// Display both hands
function displayHands() {
  const playerHandContainer = document.getElementById("playerHandContainer");
  const dealerHandContainer = document.getElementById("dealerHandContainer");

  if (!playerHandContainer || !dealerHandContainer) {
    console.error("Hand containers not found!");
    return;
  }

  // Display player's hand
  playerHandContainer.innerHTML = "";
  playerHand.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerText = `${card.rank}${card.suit}`;
    cardEl.onclick = () => toggleHold(index);
    cardEl.style.border = heldCards[index] ? "2px solid green" : "1px solid black";
    playerHandContainer.appendChild(cardEl);
  });

  // Display dealer's hand
  dealerHandContainer.innerHTML = "";
  dealerHand.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerText = `${card.rank}${card.suit}`;
    dealerHandContainer.appendChild(cardEl);
  });
}

// Toggle hold status for player's cards
function toggleHold(index) {
  heldCards[index] = !heldCards[index];
  displayHands();
}

// Redraw player's cards
function redrawPlayerHand() {
  if (deck.length < 5 - heldCards.filter(Boolean).length) {
    alert("Not enough cards left in the deck!");
    return;
  }
  for (let i = 0; i < 5; i++) {
    if (!heldCards[i]) {
      playerHand[i] = deck.pop();
    }
  }
  displayHands();
}

// Evaluate player's hand
function evaluateHand() {
  if (playerHand.length < 5) {
    alert("You must draw a full hand before evaluating!");
    return;
  }

  const ranks = playerHand.map(card => card.rank);
  const rankCounts = {};
  ranks.forEach(rank => {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  });

  const counts = Object.values(rankCounts);
  let resultRank = 1; // Default to High Card (rank 1)
  if (counts.includes(4)) {
    resultRank = 8; // Four of a Kind
  } else if (counts.includes(3) && counts.includes(2)) {
    resultRank = 7; // Full House
  } else if (counts.includes(3)) {
    resultRank = 4; // Three of a Kind
  } else if (counts.filter(count => count === 2).length === 2) {
    resultRank = 3; // Two Pair
  } else if (counts.includes(2)) {
    resultRank = 2; // One Pair
  }

  alert(`Your hand rank: ${resultRank}`);
}

// Start the game
function startPokerGame() {
  initializeDeck();
  drawHands();
}

// Attach event listeners to buttons
document.addEventListener("DOMContentLoaded", () => {
  const drawButton = document.getElementById("drawButton");
  const evaluateButton = document.getElementById("evaluateButton");

  if (!drawButton || !evaluateButton) {
    console.error("Buttons not found in the DOM!");
    return;
  }

  // Attach functionality to the buttons
  drawButton.onclick = redrawPlayerHand;
  evaluateButton.onclick = evaluateHand;

  // Start the game
  startPokerGame();
});