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
    max-width: fit-content;
    max-height: fit-content;
    position: relative;
    margin: 30px;
    padding: 10px;
    border: 1px solid black;
    background-color: white;
    justify-content: space-around;
}

.title-bar {
    background-color: #ddd;
    cursor: move;
    padding: 5px;
}

.content {
    padding: 10px;
    margin: 20px;
    width: 80%;
}
  
.close-btn {
  margin: 10px;
  float: right;
  cursor: pointer;
}

</style>
<div class="app-window">
  <div class="title-bar"></div>
    <button class="close-btn">Close</button>
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
    #closeBtn
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
      this.#closeBtn = this.shadowRoot.querySelector('.close-btn')

      // this.onMove = this.onMove.bind(this)
      // this.onUp = this.onUp.bind(this)
      // Add event listeners
      /* this.#appWindow.addEventListener('click', (e) => {
        e.stopPropagation()
      }) */
      this.#closeBtn.addEventListener('click', () => {
        this.closeWindow()
      })
      this.#titleBar.addEventListener('mousedown', (event) => {
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
    // this.#appWindow.addEventListener('mousemove', this.onMove)
    // this.#appWindow.addEventListener('mouseup', this.onUp)

    /* // Add dragging functionality
      let isDragging = false
      let xOffset = 0
      let yOffset = 0

      // this.#titleBar = this.#appWindow.querySelector('title-bar')
      document.addEventListener('mousemove', (event) => {
        if (isDragging) {
          this.#appWindow.style.left = event.clientX + xOffset + 'px'
          this.#appWindow.style.top = event.clientY + yOffset + 'px'
        }
      })

      document.addEventListener('mouseup', (event) => {
        isDragging = false
      })
    } */

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      this.openWindow()
    }

    /**
     * Insert content into the window.
     *
     * @param {Element} element - The element to insert.
     * @param {string} title - The title of the window.
     */
    async addContent (element, title) {
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
     * Open the window.
     */
    async openWindow () {
      this.#appWindow.style.display = 'block'
      this.#closeBtn.style.display = 'block'
      this.#titleBar.style.display = 'block'
      await this.addContent()
    }

    /**
     * Start dragging the window.
     *
     * @param {MouseEvent} event - The event object.
     */
    onMove (event) {
      console.log('onMove called')
      this.#appWindow.style.left = event.clientX + 'px'
      this.#appWindow.style.top = event.clientY + 'px'
    }

    /**
     * Stop dragging the window.
     *
     * @param {MouseEvent} event - The event object.
     */
    onUp (event) {
      console.log('onUp called')
      this.#appWindow.style.left = event.clientX + 'px'
      this.#appWindow.style.top = event.clientY + 'px'
    }

    /**
     * Close the window.
     */
    closeWindow () {
      console.log('closeWindow called')
      this.#appWindow.style.display = 'none'
    }
    // ... other methods like minimize, maximize, etc.
    // Add functionality to insert content into the window
    // ...your code here...
  })
