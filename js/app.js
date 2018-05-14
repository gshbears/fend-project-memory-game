// https://www.freeformatter.com/javascript-beautifier.html

const elementCards = document.querySelector('.deck')
const elementStars = document.querySelector('.stars')
const elementMoves = document.querySelector('.moves')
const elementModalStars = document.querySelector('.cardMatch')

let intMoves = 0;
let tStartTime = 0;
let tendTime = 0;
let intMatchCount = 0;
/*
 * Create a list that holds all of your cards
 */
var memoryCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
	"fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle"
];
var openedCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function resetStars() {
	// clear any remaining stars
	while (elementStars.hasChildNodes()) {
		elementStars.removeChild(elementStars.lastChild);
	}
	const fragment = document.createDocumentFragment(); // ← uses a DocumentFragment instead of a <div>
	//Add 3 star to page
	for (let x = 0; x < 3; ++x) {
		const newElement = document.createElement('li');
		const newChileElement = document.createElement('i');
		newChileElement.className = "fa fa-star";
		newElement.appendChild(newChileElement);
		fragment.appendChild(newElement);
	}
	elementStars.appendChild(fragment); // reflow and repaint here -- once!
}

function resetModalStars() {
	// clear any remaining stars
	while (elementModalStars.hasChildNodes()) {
		elementModalStars.removeChild(elementModalStars.lastChild);
	}

	const fragment = document.createDocumentFragment(); // ← uses a DocumentFragment instead of a <div>
	//Add 3 star to page
	for (let x = 0; x < 3; ++x) {
		const newElement = document.createElement('li');
		const newChildElement = document.createElement('i');
		newChildElement.className = "fa fa-star";
		newElement.appendChild(newChildElement);
		fragment.appendChild(newElement);
	}
	elementModalStars.appendChild(fragment); // reflow and repaint here -- once!
}


function clearCards() {
	openedCards.pop();
	openedCards.pop();
	while (elementCards.hasChildNodes()) {
		elementCards.removeChild(elementCards.lastChild);
	}
}

function addAllCards() {
	const fragment = document.createDocumentFragment(); // ← uses a DocumentFragment instead of a <div>
	memoryCards.forEach(function (card) {
		const newElement = document.createElement('li');
		newElement.className = "card";
		const newChileElement = document.createElement('i');
		newChileElement.className = card;
		newElement.appendChild(newChileElement);
		fragment.appendChild(newElement);
	})
	elementCards.appendChild(fragment); // reflow and repaint here -- once!
}

function resetMoves() {
	intMatchCount = 0;
	intMoves = 0;
	elementMoves.innerHTML = intMoves;
}

function resetTimer() {
	tStartTime = performance.now();
}

function resetForm() {
	shuffle(memoryCards);
	// clear previous card game
	clearCards();
	// build new card Game
	addAllCards();
	//  for (let card of memeoryCards) {
	resetStars();
	resetModalStars();

	resetMoves();
	resetTimer();
}

document.querySelector('.restart').addEventListener('click', function () {
	resetForm();
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	console.log(array);
	return array;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
const styledModal = document.getElementById('styledModal');

function updateScore() {

	intMoves += 1;
	elementMoves.innerHTML = intMoves;
	//Remove stars as attempts increase
	if (intMoves === 10) {
		elementStars.removeChild(elementStars.lastChild);
		elementModalStars.removeChild(elementModalStars.lastChild);
	} else if (intMoves === 20) {
		elementStars.removeChild(elementStars.lastChild);
		elementModalStars.removeChild(elementModalStars.lastChild);
	}
	checkTime();
}

function lockCards() {
	console.log("Match");
	console.log(openedCards[0]);
	console.log(openedCards[1]);

	openedCards[0].className = "card match";
	openedCards[1].className = "card match";
}

function noMatch() {
	console.log("No Match");
	console.log(openedCards[0]);
	console.log(openedCards[1]);
	openedCards[0].className = "card";
	openedCards[1].className = "card";
}

function compareCards() {
	if (openedCards.length === 1) {
		openedCards[0].className = "card open show";
	} else {
		openedCards[1].className = "card open show";
		setTimeout(function () {
			if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
				lockCards();
				intMatchCount += 1;
			} else {
				noMatch();
			}
			updateScore();
			openedCards.pop();
			openedCards.pop();
		}, 800);
	}
}

function checkTime() {
	console.log(intMatchCount);
	if (intMatchCount === 8) {
		console.log(tStartTime);
		tendTime = performance.now();
		console.log(tendTime);
		tendTime = ((tendTime - tStartTime) / 1000);
		console.log(tendTime);
		endGame();
	}
}

elementCards.addEventListener('click', function (evt) {
	if (evt.target.className === "card" && openedCards.length != 2) {
		openedCards.push(evt.target);
		compareCards(openedCards);
	}
})

// Modal Pop-up
function endGame() {
	//  Display the time of the game to to the user in the modal
	document.querySelector('.yourTime').innerHTML = "Your Time: " + Math.round(tendTime) + " seconds"
	styledModal.showModal();
}
document.querySelector('.close').addEventListener('click', function () {
	styledModal.close();
	resetForm();
})
