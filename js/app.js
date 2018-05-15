// https://www.freeformatter.com/javascript-beautifier.html

const elementCards = document.querySelector('.deck')
const elementStars = document.querySelector('.stars')
const elementMoves = document.querySelector('.moves')
const elementModalStars = document.querySelector('.cardMatch')
const elementTimer = document.querySelector('.timer')

let intMoves = 0;
let tStartTime = 0;
let tendTime = 0;
let intMatchCount = 0;
/*
 * Create a list that holds all of your cards
 */
let memoryCards = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb",
	"fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle"
];
let openedCards = [];
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
		if (elementModalStars.class != "yourRating"){
			elementModalStars.removeChild(elementModalStars.lastChild);
		}
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
	tStartTime = 0;
	tendTime = 0;
	elementTimer.innerHTML = getTimePlayedString(tendTime);
}
function startTimer() {
  setInterval(function(){
		if (intMatchCount != 8 && tStartTime !=0){
			tendTime = ((performance.now() - tStartTime) / 1000);
			elementTimer.innerHTML = getTimePlayedString(tendTime);
		}
	}, 1000);
}
function getTimePlayedString(tTime){
	let intMin = Math.floor(tTime / 60) % 60;
	let intSec = Math.round(tTime % 60);
	let strMin = "0 Minutes "
	let strSec = "0 Seconds"
	if (intMin===1){
	  strMin = intMin + " Minute "
	}else{
		strMin = intMin + " Minutes "
	}
	if (intSec===1){
		strSec = intSec + " Second"
	}else{
		strSec = intSec + " Seconds"
	}
	return strMin + strSec;
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
//	startTimer();
}
document.addEventListener("DOMContentLoaded", function(event) {
  	resetForm();
  });

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
	if (intMoves === 13) {
		elementStars.removeChild(elementStars.lastChild);
		elementModalStars.removeChild(elementModalStars.lastChild);
	} else if (intMoves === 20) {
		elementStars.removeChild(elementStars.lastChild);
		elementModalStars.removeChild(elementModalStars.lastChild);
	}
	checkEndGame();
}

function openCards(intCard) {
		openedCards[intCard].className = "card open";
		setTimeout(function () {
			openedCards[intCard].className = "card open show";
		},500);
}

function lockCards() {
	console.log("Match");
  setTimeout(function () {
		openedCards[0].className = "card match";
		openedCards[1].className = "card match";
		console.log(openedCards[0]);
		console.log(openedCards[1]);
		openedCards.pop();
		openedCards.pop();
	},750);
}

function noMatch() {
	console.log("No Match");
	console.log(openedCards[0]);
	console.log(openedCards[1]);
	setTimeout(function(){
		openedCards[0].className = "card no_Match";
		openedCards[1].className = "card no_Match";
		setTimeout(function(){
			openedCards[0].className = "card close";
			openedCards[1].className = "card close";
			setTimeout(function(){
				openedCards[0].className = "card";
				openedCards[1].className = "card";
				openedCards.pop();
				openedCards.pop();
			},750);
		},750);
	},750);
}

function compareCards() {
	if (openedCards.length === 1) {
			openCards(0);
	} else {
		openCards(1);
			if (openedCards[0].firstElementChild.className === openedCards[1].firstElementChild.className) {
				 lockCards();
			   intMatchCount += 1;
			} else {
			   noMatch();
			}
			updateScore();
	}
}
function checkEndGame(){
		setTimeout(function () {
			if (intMatchCount === 8) {
				endGame();
		//		resetTimer();
		  }
	},1000);
}

elementCards.addEventListener('click', function (evt) {
	if (intMoves===0 && openedCards.length === 0){
		//	startTimer() on 1st card clicked;
		tStartTime = performance.now();
		startTimer();
	}
	if (evt.target.className === "card" && openedCards.length != 2) {
		openedCards.push(evt.target);
		compareCards(openedCards);
	}
})

// Modal Pop-up
function endGame() {
	//  Display the time of the game to to the user in the modal
	document.querySelector('.yourTime').innerHTML = "Your Time: " + getTimePlayedString(tendTime);
	styledModal.showModal();
}
document.querySelector('.close').addEventListener('click', function () {
	styledModal.close();
	resetForm();
})
