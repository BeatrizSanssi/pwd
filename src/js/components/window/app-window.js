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
  .window {
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

.close-button {
    float: right;
    cursor: pointer;
}

.content {
    padding: 10px;
}

.window {
width: 300px;
height: 200px;
position: absolute;
border: 1px solid #000;
}
  
  .title-bar {
background-color: #ddd;
cursor: move;
padding: 5px;
}
  
  .close-btn {
float: right;
cursor: pointer;
  }

</style>
<div class="app-Window">
  <div class="title-bar">
    <button class="close-btn">Close</button>
  </div>
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
   * Represents a memory game
   */
  class extends HTMLElement {
    // Define class properties
    appWindow
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
      this.appWindow = this.shadowRoot.getElementById('app-window')

      // Add dragging functionality
      let isDragging = false
      let xOffset = 0
      let yOffset = 0

      // const myWindow = document.getElementById('myWindow')
      const titleBar = this.appWindow.querySelector('.title-bar')

      titleBar.addEventListener('mousedown', (e) => {
        isDragging = true
        xOffset = this.appWindow.offsetLeft - e.clientX
        yOffset = this.appWindow.offsetTop - e.clientY
      })

      document.addEventListener('mousemove', (e) => {
        if (isDragging) {
          this.appWindow.style.left = e.clientX + xOffset + 'px'
          this.appWindow.style.top = e.clientY + yOffset + 'px'
        }
      })

      document.addEventListener('mouseup', () => {
        isDragging = false
      })

      // Add close functionality
      const closeButton = this.appWindow.querySelector('.close-btn')
      closeButton.addEventListener('click', () => {
        this.closeWindow()
      })
    }

    /**
     * Insert content into the window.
     */
    addContent () {
      // Add functionality to insert content into the window
      // ...your code here...
    }

    /**
     * Open the window.
     *
     * @param {string} app - The app to open.
     */
    openWindow (app) {
      this.style.display = 'block'
    }

    /**
     * Close the window.
     */
    closeWindow () {
      this.style.display = 'none'
    }
    // ... other methods like minimize, maximize, etc.
    // Add functionality to insert content into the window
    // ...your code here...
  })
