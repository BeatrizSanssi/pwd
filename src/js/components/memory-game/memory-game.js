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
.memory-grid {
    display: grid;
    clear: both;
    grid-template-columns: repeat(4, 1fr); 
    gap: 20px;
    margin: 30px;
}

.memory-card {
    position: relative;
    width: 150px;
    height: 150px;
    perspective: 1000px;
}

.card-inner {
    width: 100%;
    height: 100%;
    align-items: center;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    transform: rotateY(0deg);
    cursor: pointer;
}

.card-inner.flipped {
    transform: rotateY(180deg);
}
  
.front, .back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}

.front {
  transform: rotateY(180deg);
}
  
.back {
  transform: rotateY(0deg);
}
  
.memory-card.flipped .card-inner {
  transform: rotateY(180deg);
}

#gridSizeSelector {
  position: absolute;
  left: 10px;
  cursor: pointer;
}

#start-game {
  position: absolute;
  left: 10px;
  top: 130px;
  cursor: pointer;
}

#attemptsText {
  font-weight: bold;
  color: white;
  margin: 10px;
  padding: 10px;
  float: right;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: grey;
}

#attempts {
  float: left;
  margin: 10px;
  padding: 10px;
}

.modal {
    display: none;
    position: inherit;
    z-index: 1;
    width: fit-content;
    height: fit-content;
    overflow: auto;
    background-color: grey;
    color: white;
    padding-top: 20px;
    border-radius: 5px;
    border: 1px white solid;
  }

  .modal-content {
    font-size: 20px;
    background-color: grey;
    margin: 5% auto;
    padding: 20px;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
</style>
<div class="memory-game">
<div id="attempts"><p id="attemptsText">Attempts: <span id="attemptCount"> 0</span></p>
</div>  
    <div id="game-controls">
    <p>Select grid size</p>
      <select id="gridSizeSelector">
        <option value="4x4">4x4</option>
        <option value="4x2">4x2</option>
        <option value="2x2">2x2</option>
      </select>
      <button id="start-game" type="button">Start Game</button>
    </div>
    <div id="game-board" class="memory-grid">
    <div class="memory-card">
      <div class="card-inner"></div>
  </div>
</div>
<div id="winningModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p id="winningMessage"></p>
  </div>
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
    #memoryGame
    #memoryGrid
    #attemptCount
    #startGame
    #gridSizeSelector
    cardImages = [
      'js/components/memory-game/img/cat1.png',
      'js/components/memory-game/img/cat2.png',
      'js/components/memory-game/img/monkey2.png',
      'js/components/memory-game/img/sloth.png',
      'js/components/memory-game/img/hedgehogInSocks.png',
      'js/components/memory-game/img/freezingBunnyInHat.png',
      'js/components/memory-game/img/smartMouseWithGlasses.png',
      'js/components/memory-game/img/dog2.png',
      'js/components/memory-game/img/dog3.png',
      'js/components/memory-game/img/sleepingKoala.png',
      'js/components/memory-game/img/monkeyface1.png',
      'js/components/memory-game/img/donkey.jpg',
      'js/components/memory-game/img/happySlothWithFlower.png',
      'js/components/memory-game/img/racoonPeace.png'
    ]

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
      this.#memoryGame = this.shadowRoot.querySelector('.memory-game')
      this.#gameBoard = this.shadowRoot.getElementById('game-board')
      this.#memoryGrid = this.shadowRoot.querySelector('.memory-grid')
      this.#startGame = this.shadowRoot.getElementById('start-game')
      this.#gridSizeSelector = this.shadowRoot.getElementById('gridSizeSelector')
      this.gameControls = this.shadowRoot.getElementById('game-controls')
      this.attemptsElement = this.shadowRoot.getElementById('attempts')
      this.attemptCountElement = this.shadowRoot.querySelector('#attemptCount')
      this.attemptCountElement.textContent = this.attemptCount
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      console.log('Memory Game: connectedCallback called')

      this.attemptCountElement = this.shadowRoot.querySelector('#attemptCount')
      console.log('Attempt Count Element:', this.attemptCountElement)
      if (this.attemptCountElement) {
        this.attemptCountElement.innerText = ''
      } else {
        console.error('Attempt count element not found')
      }
      if (this.cardsArray) {
        this.shuffle(this.cardsArray)
      }

      const modal = this.shadowRoot.getElementById('winningModal')
      const closeButton = this.shadowRoot.querySelector('.close')
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none'
        this.offerNewGame()
      })

      // Add eventlistener to the start game button
      this.#startGame.addEventListener('click', () => {
        const gridSize = this.#gridSizeSelector.value
        this.startGame(gridSize)
      })
      this.attemptsElement.style.display = 'none'
    }

    /**
     * Called after the element is inserted into the DOM.
     *
     * @param {string} gridSize - The size of the grid.
     */
    async startGame (gridSize) {
      console.log('Memory Game: startGame called with:', gridSize)
      this.gameControls.style.display = 'none'
      // Show the attempts div and initialize attempt count
      this.attemptsElement.style.display = 'block'
      this.attemptCount = 0
      this.attemptCountElement.textContent = this.attemptCount
      this.gameStarted = true

      // Set number of pairs based on grid size
      const pairsNeeded = this.getPairsCount(gridSize)

      // Set the cards array with the required number of pairs
      this.setCardsArray(pairsNeeded)

      this.resetBoard()
      await this.createMemoryGrid()
    }

    /**
     * Calculates the number of pairs needed based on the grid size.
     *
     * @param {string} gridSize - The size of the grid.
     * @returns {number} The number of pairs needed for the grid.
     */
    getPairsCount (gridSize) {
      const [rows, cols] = gridSize.split('x').map(Number)
      return (rows * cols) / 2
    }

    /**
     * Sets the cards array with the required number of pairs.
     *
     * @param {number} pairsNeeded - The number of pairs needed.
     */
    setCardsArray (pairsNeeded) {
      // Get a random subset of card images
      const selectedImages = this.getRandomSubset(this.cardImages, pairsNeeded)

      // Double and shuffle the array for pairs
      this.cardsArray = [...selectedImages, ...selectedImages]
      this.shuffle(this.cardsArray)
    }

    /**
     * Get a random subset of elements from an array.
     *
     * @param {Array} array - The original array.
     * @param {number} size - The size of the subset.
     * @returns {Array} The random subset of elements.
     */
    getRandomSubset (array, size) {
      const shuffled = array.slice()
      this.shuffle(shuffled)
      return shuffled.slice(0, size)
    }

    /**
     * Shuffle the cards.
     *
     * @param {Array} array - The array to shuffle.
     */
    // shuffle () {
    shuffle (array) {
      if (!array) {
        console.error('Array is undefined or null')
        return
      }

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    }

    /**
     * Create the memory grid.
     */
    async createMemoryGrid () {
      console.log('Memory Game: createMemoryGrid called')
      // await this.shuffle()
      this.#gameBoard.innerHTML = ''

      this.cardsArray.forEach(image => {
        const card = document.createElement('div')
        card.classList.add('memory-card')
        card.dataset.image = image

        const cardInner = document.createElement('div')
        cardInner.classList.add('card-inner')
        cardInner.dataset.image = image

        // Back of the card (visible initially)
        const cardBack = document.createElement('img')
        cardBack.src = 'js/components/memory-game/img/PlantsLitenLiten.jpg'
        cardBack.classList.add('card-image', 'back')

        // Front of the card (hidden initially)
        const cardFront = document.createElement('img')
        cardFront.src = image
        cardFront.classList.add('card-image', 'front')

        // Append front and back to card-inner
        cardInner.appendChild(cardBack)
        cardInner.appendChild(cardFront)

        // Append card-inner to card
        card.appendChild(cardInner)

        // Make each card focusable
        cardInner.setAttribute('tabindex', '0')

        // Add keydown event listener to flip the card on Enter or Space key press
        cardInner.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            this.handleCardClick(cardInner)
          }
        })
        // Add click event listener to flip the card on click
        card.addEventListener('click', () =>
          this.handleCardClick(cardInner))
        this.#gameBoard.appendChild(card)
      })
    }

    /**
     * Handle card click.
     *
     * @param {HTMLElement} cardInner - The card inner element.
     */
    handleCardClick (cardInner) {
      if (this.lockBoard || cardInner === this.firstCard) return
      console.log('Card clicked:', cardInner)
      // cardInner.classList.toggle('flipped')
      if (cardInner === this.firstCard) return

      cardInner.classList.add('flipped')

      if (!this.hasFlippedCard) {
        // First card is flipped
        this.hasFlippedCard = true
        this.firstCard = cardInner
      } else {
        // Second card is flipped
        this.secondCard = cardInner
        this.lockBoard = true

        // Check for a match after a short delay
        setTimeout(() => {
          this.checkForMatch()
        }, 500) // Adjust this delay as needed

        // Increment and update the attempt count
        this.incrementAttemptCount()
      }
    }

    /**
     * Increment and update the attempt count.
     */
    incrementAttemptCount () {
      this.attemptCount++
      this.attemptCountElement.textContent = this.attemptCount
    }

    /**
     * Check for match.
     */
    checkForMatch () {
      const isMatch = this.firstCard.dataset.image === this.secondCard.dataset.image
      if (isMatch) {
        this.disableCards()
      } else {
        this.unflipCards()
      }
    }

    /**
     * Disable cards.
     */
    disableCards () {
      // Remove the cards from the DOM after a short delay
      setTimeout(() => {
        this.firstCard.remove()
        this.secondCard.remove()
        this.resetBoard()
      }, 1000)
      // Remove matched images from cardsArray
      this.cardsArray = this.cardsArray.filter(image => image !== this.firstCard.dataset.image)

      // Call gameWon() to check if the game is over
      this.gameWon()
    }

    /**
     * Unflip cards.
     */
    unflipCards () {
      // this.lockBoard = true
      setTimeout(() => {
        this.firstCard.classList.remove('flipped')
        this.secondCard.classList.remove('flipped')

        this.resetBoard()
        this.gameWon()
      }, 1000)
    }

    /**
     * Check if the game is won.
     */
    gameWon () {
      // Check if there are no more cards on the board
      // const remainingCards = this.shadowRoot.querySelectorAll('.memory-card')
      console.log('Checking for win: Remaining cards count', this.cardsArray.length) // Debugging log
      if (this.cardsArray.length === 0) {
        const winningMessageElement = this.shadowRoot.getElementById('winningMessage')
        console.log('Winning message element:', winningMessageElement)
        winningMessageElement.textContent = `Yay! You found all the pairs with ${this.attemptCount} attempts!`

        const modal = this.shadowRoot.getElementById('winningModal')
        modal.style.display = 'block'
      }
    }

    /**
     * Offer the player a new game.
     */
    offerNewGame () {
      this.resetBoard()
      this.gameControls.style.display = 'block'
      this.attemptsElement.style.display = 'none'
      this.#gridSizeSelector.value = '4x4'
    }

    /**
     * Reset board.
     */
    resetBoard () {
      [this.hasFlippedCard, this.lockBoard, this.firstCard, this.secondCard] = [false, false, null, null]
    }
  })
