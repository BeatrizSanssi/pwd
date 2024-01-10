/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>

  
</style>
<div id="paint-app">
<canvas id="paint-canvas"></canvas>
    <div>
      <input type="color" id="color-picker">
      <input type="range" id="pen-size" min="1" max="10" value="5">
    </div>
</div>
`

/*
 * Define custom element.
 */
customElements.define('paint-app',
  /**
   * Represents a painting app element.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.canvas = this.shadowRoot.getElementById('paint-canvas')
      this.context = this.canvas.getContext('2d')
      this.colorPicker = this.shadowRoot.getElementById('color-picker')
      this.penSize = this.shadowRoot.getElementById('pen-size')

      this.isDrawing = false
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listeners
      this.canvas.addEventListener('mousedown', () => { this.isDrawing = true })
      this.canvas.addEventListener('mouseup', () => { this.isDrawing = false })
      this.canvas.addEventListener('mousemove', () => {
        this.draw()
      })
      this.colorPicker.addEventListener('change', () => {
        this.changeColor()
      })
      this.penSize.addEventListener('change', () => {
        this.changePenSize()
      })
    }

    /**
     * Draw on the canvas.
     *
     * @param {event} event - The event.
     */
    draw (event) {
      if (!this.isDrawing) return
      this.context.strokeStyle = this.colorPicker.value
      this.context.lineWidth = this.penSize.value
    // Drawing logic here
    }

    /**
     * Change the color of the pen.
     *
     * @param {event} event - The event.
     */
    changeColor (event) {
      this.context.strokeStyle = event.target.value
    }

    /**
     * Change the size of the pen.
     *
     * @param {event} event - The event.
     */
    changePenSize (event) {
      this.context.lineWidth = event.target.value
    }
  })
