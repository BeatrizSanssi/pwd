/**
 * The pen web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style></style>
<!-- Pen -->
<div id="pen-size-selector" style="display: none;">
    <input type="range" id="pen-size" min="1" max="10" value="5">
</div>   
<!-- Pen Button -->
<button class="tool-button" id="pen-button">
    <img src="js/components/paint-app/img/edit.svg" class="tool-icon" alt="Pen"/>
</button>        
`
/*
 * Define custom element.
 */
customElements.define('pen',
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
      const x = event.clientX - rect.left - cursorOffsetX
      const y = event.clientY - rect.top - cursorOffsetY

      const scaleX = this.canvas.width / canvasRect.width // Scaling factor for width
      const scaleY = this.canvas.height / canvasRect.height // Scaling factor for height

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
  })
