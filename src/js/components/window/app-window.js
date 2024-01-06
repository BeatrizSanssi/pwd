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
    width: 300px;
    height: 200px;
    position: absolute;
    border: 1px solid black;
    background-color: white;
}

.title-bar {
    background-color: #ddd;
    cursor: move;
    padding: 5px;
}

.content {
    padding: 10px;
}
  
  .close-btn {
float: right;
cursor: pointer;
  }

</style>
<div id="app-window">
  <div class="title-bar">Hello </div>
    <button class="close-btn">Close</button>
  <div class="content">
    <slot name="content"></slot>
</div>
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

      // Add event listeners
      /* this.#appWindow.addEventListener('click', (e) => {
        e.stopPropagation()
      }) */
      this.#closeBtn.addEventListener('click', (event) => {
        this.closeWindow()
      })
      this.#titleBar.addEventListener('mousedown', (event) => {
        isDragging = true
        xOffset = this.#appWindow.offsetLeft - event.clientX
        yOffset = this.#appWindow.offsetTop - event.clientY
      })
      // Add dragging functionality
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
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      this.openWindow()
    }

    /**
     * Insert content into the window.
     */
    async addContent () {
      const content = this.shadowRoot.querySelector('.content')
      content.innerHTML = `
      <memory-game></memory-game>
      <messenger-app></messenger-app>
      `
    }

    /**
     * Open the window.
     *
     * @param {string} app - The app to open.
     * @param {object} content - The content to insert.
     * @param {string} title - The title of the window.
     * @param {event} event - The event object.
     */
    async openWindow (app, content, title, event) {
      this.#closeBtn.style.display = 'block'
      this.#titleBar.style.display = 'block'
      await this.addContent()
    }

    /**
     * Close the window.
     *
     * @param {event} event - The event object.
     */
    closeWindow (event) {
      event.preventDefault()
      console.log('closeWindow called')
      this.#closeBtn.style.display = 'none'
      this.#titleBar.style.display = 'none'
      this.#appWindow.style.display = 'none'
    }
    // ... other methods like minimize, maximize, etc.
    // Add functionality to insert content into the window
    // ...your code here...
  })
