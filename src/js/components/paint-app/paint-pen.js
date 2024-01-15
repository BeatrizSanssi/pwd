/**
 * The paint-pen component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style></style>
<div id="pen" class="tool">
    <!-- Pen -->
    <div id="pen-size-selector" style="display: none;">
        <input type="range" id="pen-size" min="1" max="10" value="5">
    </div>   
    <!-- Pen Button -->
    <button class="tool-button" id="pen-button">
        <img src="js/components/paint-app/img/edit.svg" class="tool-icon" alt="Pen"/>
    </button>
</div>        
`
/*
 * Define custom element.
 */
customElements.define('paint-pen',
  /**
   * Represents a pen element.
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

      this.color = '#cccccc'
      this.size = 5
      /* this.canvas = canvas
      this.context = canvas.getContext('2d')
      this.color = initialSettings.color
      this.size = initialSettings.size */

      this.isDrawing = false
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.shadowRoot.getElementById('pen-size').addEventListener('input', (event) => {
        this.size = event.target.value
        // Optionally, notify the parent (paint app) about the change
      })

      this.shadowRoot.getElementById('color-picker').addEventListener('change', (event) => {
        this.color = event.target.value
        // Optionally, notify the parent (paint app) about the change
      })
      this.penSize.addEventListener('input', (event) => {
        this.context.lineWidth = event.target.value
      })
    }

    /**
     * Get the current color of the pen.
     *
     * @returns {string} The current color of the pen.
     */
    getCurrentColor () {
      return this.color
    }

    /**
     * Get the current size of the pen.
     *
     * @returns {number} The current size of the pen.
     */
    getCurrentSize () {
      return this.size
    }

    /**
     * Change the size of the pen.
     *
     * @param {event} event - The event.
     */
    changePenSize (event) {
      // this.context.lineWidth = event.target.value
      const isDisplayed = this.penSizeSelector.style.display !== 'none'
      this.penSizeSelector.style.display = isDisplayed ? 'none' : 'block'
    }

    /**
     * Start drawing on the canvas.
     *
     * @param {event} event - The event.
     */
    startDrawing (event) {
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width
      const scaleY = this.canvas.height / rect.height
      const devicePixelRatio = window.devicePixelRatio || 1
      const x = ((event.clientX - rect.left) * scaleX) * devicePixelRatio
      const y = ((event.clientY - rect.top) * scaleY) * devicePixelRatio

      this.context.beginPath()
      this.context.moveTo(x, y)
    }

    /**
     * Draw on the canvas.
     *
     * @param {event} event - The event.
     */
    draw (event) {
      if (!this.isDrawing) return
      console.log('Drawing...')

      // Cursor offset
      const cursorOffsetX = 4// Horizontal offset of the pen tip from the cursor's top-left corner
      const cursorOffsetY = 28
      // this.context.strokeStyle = this.colorPicker.value
      // this.context.lineWidth = this.penSize.value
      // Get mouse position relative to the canvas
      const rect = this.canvas.getBoundingClientRect()
      // const x = event.clientX - rect.left - cursorOffsetX
      // const y = event.clientY - rect.top - cursorOffsetY

      const scaleX = this.canvas.width / rect.width // Scaling factor for width
      const scaleY = this.canvas.height / rect.height // Scaling factor for height
      const devicePixelRatio = window.devicePixelRatio || 1
      // Adjust the mouse coordinates
      const x = ((event.clientX - rect.left) * scaleX - cursorOffsetX) * devicePixelRatio
      const y = ((event.clientY - rect.top) * scaleY - cursorOffsetY) * devicePixelRatio

      console.log(`Cursor position: ${event.clientX - rect.left}, ${event.clientY - rect.top}`)
      console.log(`Mouse position: ${x}, ${y}`)

      // Check eraser state and adjust context accordingly
      if (this.isErasing) {
        this.context.globalCompositeOperation = 'destination-out'
      } else {
        this.context.globalCompositeOperation = 'source-over'
      }

      // Drawing logic
      this.context.lineTo(x, y)
      this.context.stroke()
      this.context.beginPath()
      this.context.moveTo(x, y)
    }
  })
