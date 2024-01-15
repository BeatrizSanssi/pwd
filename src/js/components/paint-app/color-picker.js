/**
 * The color-picker component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style></style>
<div id="color-picker-container" style="display: none;">
    <!-- Color Picker -->
    <div id="color-picker-container" style="display: none;">
        <input type="color" id="color-picker">
    </div>
    <!-- Color Picker Button -->
    <button class="tool-button" id="color-button">
        <img src="js/components/paint-app/img/color lens.svg" class="tool-icon" alt="Color Palett"/>
    </button>
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
      this.shadowRoot.querySelector('#color-picker').addEventListener('input', (event) => {
        this.dispatchEvent(new CustomEvent('color-picker-change', { detail: event.target.value }))
      })
      this.shadowRoot.querySelector('#color-button').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('color-button-click'))
      })
    }

    /**
     * Toggle the color picker.
     */
    toggleColorPicker () {
      const isDisplayed = this.colorPickerContainer.style.display !== 'none'
      this.colorPickerContainer.style.display = isDisplayed ? 'none' : 'block'
    }

    /**
     * Change the color of the pen.
     *
     * @param {event} event - The event.
     */
    changeColor (event) {
      // this.context.strokeStyle = event.target.value
      const isDisplayed = this.colorPickerContainer.style.display !== 'none'
      this.colorPickerContainer.style.display = isDisplayed ? 'none' : 'block'
    }
  })
