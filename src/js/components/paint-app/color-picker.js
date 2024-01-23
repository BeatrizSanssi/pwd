/**
 * The color-picker component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#color-picker {
  color: rgb(76, 99, 76);
  padding: 10px;
  margin: 10px;
  gap: 10px;
  width: 80%;
  border-radius: 4px;
}
</style>
<div id="color-picker">
    <!-- Color Picker -->
    <div id="color-picker-container" style="display: none;">
        <input type="color" id="color-input" value="#FFFFFF">
    </div>
</div>
`
/*
 * Define custom element.
 */
customElements.define('color-picker',
  /**
   * Represents a painting app element.
   */
  class extends HTMLElement {
    #defaultColor
    /**
     * The Color-picker container div element.
     *
     * @type {HTMLDivElement}
     */
    #colorPickerContainer
    /**
     * The color input element.
     *
     * @type {HTMLInputElement}
     */
    #colorInput

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the color picker container in the shadow DOM
      this.#colorPickerContainer = this.shadowRoot.querySelector('#color-picker-container')

      // Set the default color to white
      this.#defaultColor = '#FFFFFF'
      this.currentColor = this.#defaultColor
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      await this.getCurrentColor()

      this.#colorInput = this.shadowRoot.querySelector('#color-input')
      this.#colorInput.addEventListener('change', () => {
        this.changeColor(this.#colorInput.value)
      })
    }

    /**
     * Changes the color of the pen.
     *
     * @param {string} newColor - The new color.
     */
    changeColor (newColor) {
      // this.#colorInput.value
      newColor = this.#colorInput.value
      this.currentColor = newColor
      const isDisplayed = this.#colorPickerContainer.style.display !== 'none'
      this.#colorPickerContainer.style.display = isDisplayed ? 'none' : 'block'
      this.dispatchEvent(new CustomEvent('color-change', { detail: this.currentColor }))
    }

    /**
     * Gets the current color.
     *
     * @returns {string} The current color.
     */
    getCurrentColor () {
      return this.currentColor
    }

    /**
     * Hides the color picker.
     */
    hideColorPicker () {
      this.#colorPickerContainer.style.display = 'none'
    }
  })
