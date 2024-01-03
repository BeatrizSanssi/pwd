const memoryGame = document.getElementById('memoryGame')
const grid = memoryGame.querySelector('.memory-grid')

/*
 * Get image URLs.
 */
const NUMBER_OF_IMAGES = 9

const IMG_URLS = new Array(NUMBER_OF_IMAGES)
for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
  IMG_URLS[i] = (new URL(`images/${i}.png`, import.meta.url)).href
}

const backImage = url(..img/PlantsLitenLiten.jpg)

const cardImages = [

  'img/cat1.png',
  'img/cat2.png',
  'img/monkey.png',
  'img/sloth.png',
  'img/hedgehogInSocks.png',
  'img/freezingBunnyInHat.png',
  'img/smartMouseWithGlasses.png',
  'img/dog2.png',
  'img/dog3.png',
  'img/sleepingKoala.png',
  'img/monkeyface.png'
]

// Duplicate each image to create pairs
let cardsArray = [...cardImages, ...cardImages]

/**
 * Shuffle the cards.
 */
 function shuffle () {
  for (let i = this.cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]]
  }
}

/**
 * Create the memory grid.
 */
function createMemoryGrid () {
  shuffle(cardsArray)
  cardsArray.forEach(image => {
    const card = document.createElement('div')
    card.classList.add('memory-card')
    card.dataset.image = image

    const cardFace = document.createElement('img')
    cardFace.src = image
    cardFace.classList.add('card-image')
    card.appendChild(cardFace)

    card.addEventListener('click', handleCardClick)
    grid.appendChild(card)
  })
}

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

/**
 * Handle card click.
 */
function handleCardClick () {
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

/**
 * Check for match.
 */
function checkForMatch () {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image

  isMatch ? disableCards() : unflipCards()
}

/**
 * Disable cards.
 */
function disableCards () {
  firstCard.removeEventListener('click', handleCardClick)
  secondCard.removeEventListener('click', handleCardClick)
  resetBoard()
}

/**
 * Unflip cards.
 */
function unflipCards () {
  lockBoard = true
  setTimeout(() => {
    firstCard.firstChild.style.display = 'none'
    secondCard.firstChild.style.display = 'none'

    resetBoard()
  }, 1500)
}

/**
 * Reset board.
 */
function resetBoard () {
  [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

document.addEventListener('DOMContentLoaded', function () {
  const gridSizeSelector = document.getElementById('gridSizeSelector')
  const startGameButton = document.getElementById('startGame')
  const attemptCountElement = document.getElementById('attemptCount')
  let attemptCount = 0

  startGameButton.addEventListener('click', () => {
    const gridSize = gridSizeSelector.value
    startGame(gridSize)
  })

  /**
   * Start the game.
   *
   * @param {number} gridSize - The size of the grid.
   */
  function startGame (gridSize) {
    // Reset attempts
    attemptCount = 0
    attemptCountElement.innerText = attemptCount

    // Create and display the memory grid based on selected size
    // Implement logic for randomized tiles
    // Implement click and keyboard event listeners for tiles
    // Implement the rest of the game logic
  }

  // Function to handle tile flip
  /**
   * Flip a tile.
   *
   * @param {HTMLElement} tile - The tile to flip.
   */
  function flipTile (tile) {
    // Flip tile logic
    // Ensure only two tiles can be flipped at a time
    // Check for match or flip back after delay
    // Update attempt count
  }

  // Additional functions for checking matches, flipping tiles back, etc.
})
createMemoryGrid()
