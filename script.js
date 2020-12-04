const gameContainer = document.getElementById("game");
let firstClick = true;
let noClicking = false;
const matchedCards = [];

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {

  if (noClicking === true) return;

  currentCard = event.target;

  // Check that card is not already previously matched
  if (matchedCards.indexOf(currentCard) !== -1) return;

  if (firstClick) {
    currentCard.style.backgroundColor = currentCard.classList.value;
    previousCard = currentCard;
    firstClick = false;
  }
  // Don't allow duplicate clicks
  else if (previousCard === currentCard) {
    return;
  }
  else {
    // Cards match
    if (previousCard.classList.value === currentCard.classList.value) {
      currentCard.style.backgroundColor = currentCard.classList.value;
      firstClick = true;
      matchedCards.push(currentCard, previousCard);
    }
    // Cards do not match
    else {
      currentCard.style.backgroundColor = currentCard.classList.value;
      noClicking = true;
      setTimeout(function () {
        previousCard.style.backgroundColor = 'white';
        currentCard.style.backgroundColor = 'white';
        noClicking = false;
      }, 500)
      firstClick = true;
    }

    // Check if game is over
    if (matchedCards.length === 10) {
      setTimeout(function () {
        alert('You win!');
      }, 50)
    }
  }
}



// when the DOM loads
createDivsForColors(shuffledColors);
