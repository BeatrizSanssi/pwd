/**
 * The erasercomponent module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#color-picker {
    background-color: white;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    gap: 10px;
    width: 80%;
    border-radius: 4px;
}
.tool-button {
    border: none;
    background: none;
    cursor: pointer;
}
</style>
<div id="eraser">
    <!-- Eraser -->
    <div id="eraser-size-selector" style="display: none;">
        <input type="range" id="erazor-size" min="1" max="10" value="5">
    </div>
    <!-- Eraser Button -->
    <button class="tool-button" id="eraser-button">
        <img src="js/components/paint-app/img/eraser.png" class="tool-icon" alt="Eraser"/>
    </button>
</div>   
`
/*
 * Define custom element.
 */
customElements.define('eraser',
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
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.eraser = this.shadowRoot.querySelector('#eraser')
      this.eraserSize = this.shadowRoot.querySelector('#eraser-size')

      // Add event listeners
      this.eraser.addEventListener('click', this.toggleEraser.bind(this))
      this.eraserSize.addEventListener('input', this.setEraserSize.bind(this))
    }

    /**
     * Toggle eraser mode.
     */
    toggleEraser () {
      this.isErasing = !this.isErasing
      if (this.isErasing) {
        this.previousColor = this.context.strokeStyle // Save the current pen color
        this.context.globalCompositeOperation = 'destination-out' // Set to erase mode
        this.context.strokeStyle = 'rgba(0,0,0,1)' // Set color to fully opaque black
      } else {
        this.context.globalCompositeOperation = 'source-over' // Set back to draw mode
        this.context.strokeStyle = this.previousColor // Restore the pen color
      }
    }
  })
