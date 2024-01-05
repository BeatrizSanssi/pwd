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
</style>
`
/*
 * Define custom element.
 */
customElements.define('window',
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
      this.#window = this.shadowRoot.getElementById('window')

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
