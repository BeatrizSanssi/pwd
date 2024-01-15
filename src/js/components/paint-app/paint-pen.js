/**
 * The paint-pen component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#pen {
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

      // Get the pen button and pen size selector in the shadow DOM
      this.penButton = this.shadowRoot.getElementById('pen-button')
      this.penSize = this.shadowRoot.getElementById('pen-size')

      // this.color = '#cccccc'
      this.size = 5
      this.isDrawing = false
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.penButton.addEventListener('click', () => {
        this.changePenSize()
      })
      this.penSize.addEventListener('input', (event) => {
        console.log('Pen size changed:', event.target.value)
        this.dispatchEvent(new CustomEvent('pen-size-change', { detail: event.target.value }))
      })
    }

    /**
     * Get the current color of the pen.
     *
     * @returns {string} The current color of the pen.
     *
    getCurrentColor () {
      return this.color
    } */

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
  })
