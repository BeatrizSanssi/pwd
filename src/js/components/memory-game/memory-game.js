/**
 * The memory-game web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
  /* Add your CSS styles here */
  .memory-card {
    /* styles for memory card */
  }
  /* ... other styles ... */
</style>
<div id="game-board" class="memory-grid">
  <!-- Memory grid will be here -->
</div>
`

/*
 * Define custom element.
 */
customElements.define('memory-game',
  /**
   * Represents a memory game
   */
  class extends HTMLElement {
    // Define class properties
    cardsArray = []
    lockBoard = false
    firstCard = null
    secondCard = null
    hasFlippedCard = false
    #gameBoard

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the game board element in the shadow root.
      this.#gameBoard = this.shadowRoot.getElementById('game-board')

      // Define the card images and create memory grid.
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
      this.cardsArray = [...cardImages, ...cardImages]
      this.handleCardClick = this.handleCardClick.bind(this)
      this.createMemoryGrid()
    }

    /**
     * Shuffle the cards.
     */
    shuffle () {
      for (let i = this.cardsArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
      ;[this.cardsArray[i], this.cardsArray[randomIndex]] = [this.cardsArray[randomIndex], this.cardsArray[i]]
      }
    }

    /**
     * Create the memory grid.
     */
    createMemoryGrid () {
      this.shuffle()
      this.cardsArray.forEach(image => {
        const card = document.createElement('div')
        card.classList.add('memory-card')
        card.dataset.image = image

        // Front of the card (hidden initially)
        const cardFront = document.createElement('img')
        cardFront.src = image
        cardFront.classList.add('card-image', 'front')
        card.appendChild(cardFront)

        // Back of the card (visible initially)
        const cardBack = document.createElement('img')
        cardBack.src = 'img/card-back.png' // Path to your back image
        cardBack.classList.add('card-image', 'back')
        card.appendChild(cardBack)

        card.addEventListener('click', this.handleCardClick.bind(this))
        this.#gameBoard.appendChild(card)
      })
    }

    /**
     * Handle card click.
     *
     * @param {Event} event - The click event.
     */
    handleCardClick (event) {
      const card = event.target.closest('.memory-card')
      if (this.lockBoard || card === this.firstCard) return

      card.classList.toggle('flipped')

      if (!this.hasFlippedCard) {
        this.hasFlippedCard = true
        this.firstCard = card
        return
      }

      this.secondCard = card
      this.checkForMatch()
    }

    /**
     * Check for match.
     */
    checkForMatch () {
      const isMatch = this.firstCard.dataset.image === this.secondCard.dataset.image

      isMatch ? this.disableCards() : this.unflipCards()
    }

    /**
     * Disable cards.
     */
    disableCards () {
      this.firstCard.removeEventListener('click', this.handleCardClick)
      this.secondCard.removeEventListener('click', this.handleCardClick)
      this.resetBoard()
    }

    /**
     * Unflip cards.
     */
    unflipCards () {
      this.lockBoard = true
      setTimeout(() => {
        this.firstCard.firstChild.style.display = 'none'
        this.secondCard.firstChild.style.display = 'none'

        this.resetBoard()
      }, 1500)
    }

    /**
     * Reset board.
     */
    resetBoard () {
      this.hasFlippedCard = false
      this.lockBoard = false
      this.firstCard = null
      this.secondCard = null
      this.firstCard = null
      this.secondCard = null
    }

    /* document.addEventListener('DOMContentLoaded', function () {
        const gridSizeSelector = document.getElementById('gridSizeSelector')
        const startGameButton = document.getElementById('startGame')
        const attemptCountElement = document.getElementById('attemptCount')
        let attemptCount = 0

        startGameButton.addEventListener('click', () => {
          const gridSize = gridSizeSelector.value
          startGame(gridSize)
        }) */

    /**
     * Start the game.
     *
     * @param {number} gridSize - The size of the grid.
     */
    startGame (gridSize) {
      // Reset attempts
      this.attemptCount = 0
      this.attemptCountElement.innerText = this.attemptCount

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
    flipTile (tile) {

      // Flip tile logic
      // Ensure only two tiles can be flipped at a time
      // Check for match or flip back after delay
      // Update attempt count
    }
  })
