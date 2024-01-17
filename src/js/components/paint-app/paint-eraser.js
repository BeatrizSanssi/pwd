/**
 * The paint eraser component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#paint-eraser {
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    gap: 10px;
    width: 80%;
    border-radius: 4px;
}
</style>
<div id="paint-eraser">
    <!-- Eraser -->
    <div id="eraser-size-selector" style="display: none;">
        <input type="range" id="eraser-size" min="5" max="20" value="10">
    </div>
</div>   
`
/*
 * Define custom element.
 */
customElements.define('paint-eraser',
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

      // this.eraser = this.shadowRoot.querySelector('#eraser')
      this.eraserSizeSelector = this.shadowRoot.getElementById('eraser-size-selector')
      this.eraserSize = this.shadowRoot.getElementById('eraser-size')

      this.currentEraserSize = 10
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listener to eraser
      /* this.eraser = this.shadowRoot.querySelector('#eraser')
      this.eraser.addEventListener('click', (event) => {
        this.dipatchEvent(new CustomEvent('eraser-change', { detail: event.target.value }))
        this.toggleEraser()
      }) */
      this.eraserSize.addEventListener('input', (event) => {
        console.log('Eraser size changed:', event.target.value)
        this.currentEraserSize = event.target.value
        this.dispatchEvent(new CustomEvent('eraser-size-change', {
          detail: this.currentEraserSize,
          bubbles: true
        }))
      })
      /* this.eraserButton.addEventListener('click', () => {
        this.toggleEraser()
        this.isErasing = false
      }) */

      /* // Add event listeners
      this.eraser.addEventListener('click', this.toggleEraser.bind(this))
      this.eraserSize.addEventListener('input', this.setEraserSize.bind(this)) */
    }

    /**
     * Get the current size of the erasor.
     *
     * @returns {number} The current size of the erasor.
     */
    getEraserCurrentSize () {
      return this.currentEraserSize
    }

    /**
     * Change the size of the eraser.
     *
     * @param {event} event - The event.
     */
    changeEraserSize (event) {
      // this.currentEraserSize = newSize
      const isDisplayed = this.eraserSizeSelector.style.display !== 'none'
      this.eraserSizeSelector.style.display = isDisplayed ? 'none' : 'block'
    }

    /**
     * Hide the eraser size selector.
     */
    hideSizeSelector () {
      this.eraserSizeSelector.style.display = 'none'
    }
  })
