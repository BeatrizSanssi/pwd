const memoryGame = document.getElementById('memoryGame');
const grid = memoryGame.querySelector('.memory-grid');

/*
 * Get image URLs.
 */
const NUMBER_OF_IMAGES = 9

const IMG_URLS = new Array(NUMBER_OF_IMAGES)
for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
  IMG_URLS[i] = (new URL(`images/${i}.png`, import.meta.url)).href
}

const cardImages = [
    
    'path/to/image1.png',
    'path/to/image2.png',
    
]

// Duplicate each image to create pairs
let cardsArray = [...cardImages, ...cardImages]

// Function to shuffle cards
function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

// Function to create the memory grid
function createMemoryGrid() {
    shuffle(cardsArray)
    cardsArray.forEach(image => {
        const card = document.createElement('div')
        card.classList.add('memory-card')
        card.dataset.image = image

        const cardFace = document.createElement('img')
        cardFace.src = image;
        cardFace.classList.add('card-image')
        card.appendChild(cardFace)

        card.addEventListener('click', handleCardClick)
        grid.appendChild(card)
    })
}

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function handleCardClick() {
    if (lockBoard) return
    if (this === firstCard) return

    this.firstChild.style.display = 'block' // Show the image

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    secondCard = this
    checkForMatch()
}

function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image

    isMatch ? disableCards() : unflipCards()
}

function disableCards() {
    firstCard.removeEventListener('click', handleCardClick)
    secondCard.removeEventListener('click', handleCardClick)
    resetBoard()
}

function unflipCards() {
    lockBoard = true
    setTimeout(() => {
        firstCard.firstChild.style.display = 'none'
        secondCard.firstChild.style.display = 'none'

        resetBoard()
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

createMemoryGrid()