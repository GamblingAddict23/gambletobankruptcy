// Poker game logic
let deck = [];
let hand = [];
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

// Display both hands
function displayHands() {
  const playerHandContainer = document.getElementById("playerHandContainer");
  const dealerHandContainer = document.getElementById("dealerHandContainer");

  if (!playerHandContainer || !dealerHandContainer) {
    console.error("Hand containers not found!");
    return;
  }

  // Display player's hand
  playerHandContainer.innerHTML = "<h2>Player's Hand</h2>";
  playerHand.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerText = `${convertRankToNumber(card.rank)}${card.suit}`;
    cardEl.onclick = () => toggleHold(index);
    cardEl.style.border = heldCards[index] ? "2px solid green" : "1px solid black";
    playerHandContainer.appendChild(cardEl);
  });

  // Display dealer's hand
  dealerHandContainer.innerHTML = "<h2>Dealer's Hand</h2>";
  dealerHand.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerText = `${convertRankToNumber(card.rank)}${card.suit}`;
    dealerHandContainer.appendChild(cardEl);
  });
}

// Convert card rank to numeric value (1 through Ace)
function convertRankToNumber(rank) {
  const rankMap = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "J": "11",
    "Q": "12",
    "K": "13",
    "A": "14"
  };
  return rankMap[rank] || rank;
}

// Toggle hold status for player's cards
function toggleHold(index) {
  heldCards[index] = !heldCards[index];
  displayHands();
}
}