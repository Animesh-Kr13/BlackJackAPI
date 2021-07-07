let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let deckId;


// function getRandomCard() {
//     let randomNumber = Math.floor( Math.random()*13 ) + 1
//     if (randomNumber > 10) {
//         return 10
//     } else if (randomNumber === 1) {
//         return 11
//     } else {
//         return randomNumber
//     }
// }

// function startGame() {
//     isAlive = true
//     let firstCard = getRandomCard()
//     let secondCard = getRandomCard()
//     cards = [firstCard, secondCard]
//     sum = firstCard + secondCard
//     renderGame()
// }

// function renderGame() {
//     cardsEl.textContent = "Cards: "
//     for (let i = 0; i < cards.length; i++) {
//         cardsEl.textContent += cards[i] + " "
//     }
    
//     sumEl.textContent = "Sum: " + sum
//     if (sum <= 20) {
//         message = "Do you want to draw a new card?"
//     } else if (sum === 21) {
//         message = "You've got Blackjack!"
//         hasBlackJack = true
//     } else {
//         message = "You're out of the game!"
//         isAlive = false
//     }
//     messageEl.textContent = message
// }


// function newCard() {
//     if (isAlive === true && hasBlackJack === false) {
//         let card = getRandomCard()
//         sum += card
//         cards.push(card)
//         renderGame()        
//     }
// }

async function getCardsId(){
    let response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/");
    let data = await response.json();

    console.log(data);
    deckId = data.deck_id;
    console.log(deckId);
    getCards();

}

getCardsId();

async function getCards(){
    let response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
    let data = await response.json();

    console.log(data);
    document.body.innerHTML += `<img src="${data.cards[0].images.svg}">`
}

