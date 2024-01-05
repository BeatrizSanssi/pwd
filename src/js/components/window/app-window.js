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
<div class="window">
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
    #window
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
      this.#window = this.shadowRoot.getElementById('app-window')

      const myWindow = document.getElementById('myWindow')
      const titleBar = myWindow.querySelector('.title-bar')

      // Add dragging functionality
      let isDragging = false
      let xOffset = 0
      let yOffset = 0

      titleBar.addEventListener('mousedown', function (e) {
        isDragging = true
        xOffset = myWindow.offsetLeft - e.clientX
        yOffset = myWindow.offsetTop - e.clientY
      })

      document.addEventListener('mousemove', function (e) {
        if (isDragging) {
          myWindow.style.left = e.clientX + xOffset + 'px'
          myWindow.style.top = e.clientY + yOffset + 'px'
        }
      })

      document.addEventListener('mouseup', function () {
        isDragging = false
      })

      // Add close functionality
      myWindow.querySelector('.close-btn').addEventListener('click', function () {
        myWindow.style.display = 'none'
      })
    }
    // Add functionality to insert content into the window
    // ...your code here...
  })
