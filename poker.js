// Function to display both hands
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