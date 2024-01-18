/**
 * The window web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
.app-window {
  max-width: 800px;
  max-height: fit-content;
  position: relative;
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  justify-content: space-evenly;
  align-content: center;
}

.title-bar {
  background-color: #ddd;
  cursor: move;
  padding: 5px;
}

.content {
  max-width: 800px;
  max-height: 800px;
  margin: 30px;
  padding: 10px;
  align-content: center;
  justify-content: center;
}
  
.close-button {
  margin: 5px;
  float: right;
  cursor: pointer;
}

</style>

<div class="app-window">
  <div class="title-bar"></div>
    <button class="close-button">Close</button>
  <div class="content"></div>
</div>
`
/*
 * Define custom element.
 */
customElements.define('app-window',
  /**
   * Represents a window element.
   */
  class extends HTMLElement {
    #appWindow
    #isDragging = false
    #startX
    #startY
    /**
     * The title bar div element.
     *
     * @type {HTMLDivElement}
     */
    #titleBar
    /**
     * The close button element.
     *
     * @type {HTMLButtonElement}
     */
    #closeButton
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Get the window element in the shadow root.
      this.#appWindow = this.shadowRoot.querySelector('.app-window')
      this.#titleBar = this.shadowRoot.querySelector('.title-bar')
      this.#closeButton = this.shadowRoot.querySelector('.close-button')

      // Add event listeners
      this.#closeButton.addEventListener('click', (event) => {
        event.preventDefault()
        this.closeWindow()
      })

      this.#appWindow.addEventListener('mousedown', (event) => {
        this.#isDragging = true
        this.#startX = event.clientX - this.#appWindow.offsetLeft
        this.#startY = event.clientY - this.#appWindow.offsetTop
      })

      document.addEventListener('mousemove', (event) => {
        if (this.#isDragging) {
          this.#appWindow.style.left = (event.clientX - this.#startX) + 'px'
          this.#appWindow.style.top = (event.clientY - this.#startY) + 'px'
        }
      })

      document.addEventListener('mouseup', () => {
        this.#isDragging = false
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      await this.openWindow()
    }

    /**
     * Inserts content into the window.
     *
     * @param {Element} element - The element to insert.
     * @param {string} title - The title of the window.
     */
    addContent (element, title) {
      const contentDiv = this.shadowRoot.querySelector('.content')
      const titleBar = this.shadowRoot.querySelector('.title-bar')

      if (!contentDiv) {
        console.error('Content element not found')
        return
      }
      if (!titleBar) {
        console.error('Title bar element not found')
        return
      }

      if (element instanceof HTMLElement) {
        contentDiv.innerHTML = ''
        contentDiv.appendChild(element)
        titleBar.textContent = title
      } else {
        console.error('Invalid element provided:', element)
      }
    }

    /**
     * Opens the window.
     *
     * @param {Element} element - The element to insert.
     * @param {string} title - The title of the window.
     */
    async openWindow (element, title) {
      this.#appWindow.style.display = 'block'
      this.#closeButton.style.display = 'block'
      this.#titleBar.style.display = 'block'
      if (element && title) {
        await this.addContent(element, title)
      }
    }

    /**
     * Starts dragging the window.
     *
     * @param {MouseEvent} event - The event object.
     */
    onMove (event) {
      this.#appWindow.style.left = event.clientX + 'px'
      this.#appWindow.style.top = event.clientY + 'px'
    }

    /**
     * Stops dragging the window.
     *
     * @param {MouseEvent} event - The event object.
     */
    onUp (event) {
      this.#appWindow.style.left = event.clientX + 'px'
      this.#appWindow.style.top = event.clientY + 'px'
    }

    /**
     * Closes the window.
     */
    closeWindow () {
      this.#appWindow.style.display = 'none'
    }
  })
