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
  })
