// Poker game logic
let deck = [];
let hand = [];
let heldCards = [false, false, false, false, false];

// Initialize deck
function initializeDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const ranks = [
    "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"
  ];
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

// Draw initial hand
function drawHand() {
  hand = [];
  for (let i = 0; i < 5; i++) {
    hand.push(deck.pop());
  }
  displayHand();
}

// Redraw cards
function redrawHand() {
  for (let i = 0; i < 5; i++) {
    if (!heldCards[i]) {
      hand[i] = deck.pop();
    }
  }
  displayHand();
}

// Display hand
function displayHand() {
  const handContainer = document.getElementById("handContainer");
  handContainer.innerHTML = "";
  hand.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.innerText = `${card.rank}${card.suit}`;
    cardEl.onclick = () => toggleHold(index);
    cardEl.style.border = heldCards[index] ? "2px solid green" : "1px solid black";
    handContainer.appendChild(cardEl);
  });
}

// Toggle hold status
function toggleHold(index) {
  heldCards[index] = !heldCards[index];
  displayHand();
}

// Evaluate hand with numeric rankings
function evaluateHand() {
  const ranks = hand.map(card => card.rank);
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

  const resultElement = document.createElement("div");
  resultElement.className = `rank-${resultRank}`;
  resultElement.innerText = `Your hand rank: ${resultRank}`;
  document.body.appendChild(resultElement);
}

// Start game
function startPokerGame() {
  initializeDeck();
  drawHand();
}

// Attach event listeners
document.getElementById("drawButton").onclick = redrawHand;
document.getElementById("evaluateButton").onclick = evaluateHand;