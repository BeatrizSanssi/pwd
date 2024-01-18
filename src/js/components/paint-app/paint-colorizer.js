/**
 * The paint-colorizer component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#paint-colorizer {
  color: rgb(76, 99, 76);
  padding: 10px;
  margin: 10px;
  gap: 10px;
  width: 80%;
  border-radius: 4px;
}
</style>
<div id="paint-colorizer">
    <!-- Colorizer -->
    <div id="colorizer-container" style="display: none;">
        <input type="color" id="paint-colorizer-input">
    </div>
</div>
`
/*
 * Define custom element.
 */
customElements.define('paint-colorizer',
  /**
   * Represents a painting app element.
   */
  class extends HTMLElement {
    #colorizerContainer
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the colorizer container in the shadow DOM
      this.#colorizerContainer = this.shadowRoot.querySelector('#colorizer-container')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.paintColorizer = this.shadowRoot.querySelector('#paint-colorizer')
      this.paintColorizer.addEventListener('fill', (event) => {
        this.dispatchEvent(new CustomEvent('color-fill', { detail: event.target.value }))
        this.colorize(event)
      })
    }

    /**
     * Chooses a color for the colorizer.
     *
     * @param {event} event - The event.
     */
    colorize (event) {
      const isDisplayed = this.#colorizerContainer.style.display !== 'none'
      this.#colorizerContainer.style.display = isDisplayed ? 'none' : 'block'
    }

    /**
     * Hides the colorizer.
     */
    hideColorizer () {
      this.#colorizerContainer.style.display = 'none'
    }
  })
