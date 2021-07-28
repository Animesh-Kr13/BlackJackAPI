let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let newDeck = document.getElementById("new-deck");
let startButton = document.getElementById("start-game");
let newCards = document.getElementById("new-card");
let resetBtn = document.getElementById("reset-btn");
let deckId;


function startGame(first, second) {
    isAlive = true;
    let firstCard = first;
    let secondCard = second;
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "✨ You've got Blackjack! ✨";
        hasBlackJack = true;
        newCards.classList.add("hidden");
        resetBtn.classList.remove("hidden");
    } else {
        message = "❌ You're out of the game! ❌";
        isAlive = false;
        newCards.classList.add("hidden");
        resetBtn.classList.remove("hidden");
    }
    messageEl.textContent = message;
}


function getNewCard(value) {
    if (isAlive === true && hasBlackJack === false) {
        let card = value;
        sum += card;
        cards.push(card);
        renderGame();       
    }
}

async function getCardsId(){
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
    let data = await response.json();

    deckId = data.deck_id;
    
    newDeck.classList.add("hidden");
    startButton.classList.remove("hidden");

}

newDeck.addEventListener("click", getCardsId);

async function getCards(){
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    let data = await response.json();

    document.querySelector(".player").innerHTML= `
            <img src="${data.cards[0].images.png}">
            <img src="${data.cards[1].images.png}">
    `
    startButton.classList.add("hidden");
    newCards.classList.remove("hidden");
    determineCardValue(data.cards[0].value , data.cards[1].value);
}

startButton.addEventListener("click", getCards);

async function newCard(){
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let data = await response.json();

    console.log(data);
    document.querySelector(".player").innerHTML += `
            <img src="${data.cards[0].images.png}">
            `
    
    determineCardValue(data.cards[0].value);
}

newCards.addEventListener("click", newCard);

function determineCardValue(...cardsVal) {
    const valueOptions = ["0","1","2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    if(cardsVal.length === 1){
        let card1ValueIndex = valueOptions.indexOf(cardsVal[0]);
        if(card1ValueIndex > 10 && card1ValueIndex < 14){
            card1ValueIndex = 10;
        } else if (card1ValueIndex > 13){
            card1ValueIndex = 11;
        }
        getNewCard(card1ValueIndex);
    } else {
        let card1ValueIndex = valueOptions.indexOf(cardsVal[0]);
        let card2ValueIndex = valueOptions.indexOf(cardsVal[1]);
        if(card1ValueIndex > 10 && card1ValueIndex < 14){
            card1ValueIndex = 10;
        } else if (card1ValueIndex > 13){
            card1ValueIndex = 11;
        }

        if(card2ValueIndex > 10 && card2ValueIndex < 14){
            card2ValueIndex = 10;
        } else if (card2ValueIndex > 13){
            card2ValueIndex = 11;
        }
        startGame(card1ValueIndex, card2ValueIndex);
    }

}

resetBtn.addEventListener("click" , () => {
    cards = [];
    sum = 0;
    isAlive = false;
    hasBlackJack = false;
    message = "";
    messageEl.textContent = "Want to play a round?";
    sumEl.textContent = "Sum: ";
    cardsEl.textContent = "Cards: ";
    document.querySelector(".player").innerHTML= "";
    resetBtn.classList.add("hidden");
    newDeck.classList.remove("hidden");
})