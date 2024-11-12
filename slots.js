//Creates number variables
let spinnerOneEl = document.getElementById("slotValueOne")
let spinnerTwoEl = document.getElementById("slotValueTwo")
let spinnerThreeEl = document.getElementById("slotValueThree")
//Starts numbers at 0
let valueOne = 0
let valueTwo = 0
let valueThree = 0
//Changes the numbers on screen on enter
slotValueOne.innerText = valueOne
slotValueTwo.innerText = valueTwo
slotValueThree.innerText = valueThree


function spin() {
  //Randomizes numbers
  valueOne = Math.floor(Math.random() * 10)
  valueTwo = Math.floor(Math.random() * 10)
  valueThree = Math.floor(Math.random() * 10)
  //Changes the numbers on screen
  slotValueOne.innerText = valueOne
  slotValueTwo.innerText = valueTwo
  slotValueThree.innerText = valueThree
  //Gives class "seven" when seven has been rolled
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
  //Plays slot audio
  document.getElementById("yay").play()
}


function clickSpin(){
//Creates rolling animation
let repeatInterval = setInterval(spin, 50) // happens every 100ms (0.1s)
setTimeout(function(){
  clearInterval(repeatInterval) // stops repeatThis
  checkSpin() // runs at the end
},3700) // will happen after 2000ms (2s)

}

function checkSpin(){
  //Creates win screen whe 777 is rolled
  if (valueOne == 7 && valueTwo == 7 && valueThree == 7) {
    slotButton.hidden = true
  }
}