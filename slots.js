let spinnerOneEl = document.getElementById("slotValueOne")
let spinnerTwoEl = document.getElementById("slotValueTwo")
let spinnerThreeEl = document.getElementById("slotValueThree")
let valueOne = 0
let valueTwo = 0
let valueThree = 0
slotValueOne.innerText = valueOne
slotValueTwo.innerText = valueTwo
slotValueThree.innerText = valueThree


function spin() {
  slotButton.hidden = true

  valueOne = Math.floor(Math.random() * 10)
  valueTwo = Math.floor(Math.random() * 10)
  valueThree = Math.floor(Math.random() * 10)
  slotValueOne.innerText = valueOne
  slotValueTwo.innerText = valueTwo
  slotValueThree.innerText = valueThree
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

  document.getElementById("yay").play()

}

function clickSpin() {

  let repeatInterval = setInterval(spin, 50) // happens every 100ms (0.1s)
  setTimeout(function () {
    clearInterval(repeatInterval) // stops repeatThis
    checkSpin() // runs at the end
    slotButton.hidden = false
  }, 3700) // will happen after 2000ms (2s)

}

function checkSpin() {
  if (valueOne == 7 && valueTwo == 7 && valueThree == 7) {
    slotButton.hidden = true
  }
}