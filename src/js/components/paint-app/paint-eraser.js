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
        <input type="range" id="eraser-size" min="5" max="100" value="40">
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
    #defaultEraserSize
    /**
     * The eraser size selector div element.
     *
     * @type {HTMLDivElement}
     */
    #eraserSizeSelector
    /**
     * The eraser size input element.
     *
     * @type {HTMLInputElement}
     */
    #eraserSize
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the eraser and eraser size selector in the shadow DOM
      this.#eraserSizeSelector = this.shadowRoot.getElementById('eraser-size-selector')
      this.#eraserSize = this.shadowRoot.getElementById('eraser-size')

      // Set the default eraser size to 40
      this.#defaultEraserSize = 40
      this.currentEraserSize = this.#defaultEraserSize
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      await this.getCurrentEraserSize()

      this.#eraserSize.addEventListener('change', () => {
        this.changeEraserSize(this.#eraserSize.value)
      })
    }

    /**
     * Gets the current size of the erasor.
     *
     * @returns {number} The current size of the erasor.
     */
    getCurrentEraserSize () {
      return this.currentEraserSize
    }

    /**
     * Changes the size of the eraser.
     *
     * @param {event} event - The event.
     */
    changeEraserSize (event) {
      const isDisplayed = this.#eraserSizeSelector.style.display !== 'none'
      this.#eraserSizeSelector.style.display = isDisplayed ? 'none' : 'block'
      this.#eraserSize.addEventListener('input', (event) => {
        this.currentEraserSize = event.target.value
        this.dispatchEvent(new CustomEvent('eraser-size-change', {
          detail: this.currentEraserSize,
          bubbles: true
        }))
      })
    }

    /**
     * Hides the eraser size selector.
     */
    hideSizeSelector () {
      this.#eraserSizeSelector.style.display = 'none'
    }
  })
