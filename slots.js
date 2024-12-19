//declares variables to get the slots from slots.html
let spinnerOneEl = document.getElementById("slotValueOne")
let spinnerTwoEl = document.getElementById("slotValueTwo")
let spinnerThreeEl = document.getElementById("slotValueThree")
//declares variables to get values for slot numbers
let valueOne = 0
let valueTwo = 0
let valueThree = 0
//make slot button variable
let slotButton = document.getElementById("slotButton")

//Miles' Code
slotButton.hidden = true
let creditInfo = prompt("Enter Credit Card Number")
if(/^\d{16}$/.test(creditInfo)){
  slotButton.hidden = false
} else {
  slotValueOne.hidden = true
  slotValueTwo.innerText = "Invalid Credit Card Number"
  slotValueThree.hidden = true
}


function spin() {
  slotButton.hidden = true //hides the spin button so it can't be hit repeatedly

  //randomizes all three values
  valueOne = Math.floor(Math.random() * 10)
  valueTwo = Math.floor(Math.random() * 10)
  valueThree = Math.floor(Math.random() * 10)
  //changes the numbers on screen to the randomized values
  slotValueOne.innerText = valueOne
  slotValueTwo.innerText = valueTwo
  slotValueThree.innerText = valueThree
  //gives class "seven" if a seven is hit and removes the class if it is any other number
  if (valueOne == 7) {
    spinnerOneEl.classList.add("seven")
  } else {
    spinnerOneEl.classList.remove("seven")
  }
  if (valueTwo == 7) {
    spinnerTwoEl.classList.add("seven")
  } else {
    spinnerTwoEl.classList.remove("seven")
  }
  if (valueThree == 7) {
    spinnerThreeEl.classList.add("seven")
  } else {
    spinnerThreeEl.classList.remove("seven")
  }

}

//this is run when the spin button is clicked
function clickSpin() {

  let repeatInterval = setInterval(spin, 50) //runs the spin function every 50ms (0.05s)
  setTimeout(function () {
    clearInterval(repeatInterval) //stops repeatThis
    slotButton.hidden = false //makes spin button reappear
    checkSpin() //runs checkSpin function
  }, 3700) //runs these 3 lines after 3700ms (3.7s)

}

//runs when 777 is hit
function checkSpin() {
  if (valueOne == 7 && valueTwo == 7 && valueThree == 7) {
    slotButton.hidden = true //hides button
    window.location.href = "https://mn584.github.io/gambletobankruptcy/winscreen.html" //opens winscreen.html
  }
}

