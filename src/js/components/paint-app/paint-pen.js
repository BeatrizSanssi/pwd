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
</style>
<div id="pen">
    <!-- Pen -->
    <div id="pen-size-selector" style="display: none;">
        <input type="range" id="pen-size" min="1" max="10" value="5">
    </div>   
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

      // Get the pen and pen size selector in the shadow DOM
      this.penSizeSelector = this.shadowRoot.getElementById('pen-size-selector')
      this.penSize = this.shadowRoot.getElementById('pen-size')
      // this.color = '#cccccc'
      this.size = 5
      // this.isDrawing = false
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      this.penSize.addEventListener('input', (event) => {
        console.log('Pen size changed:', event.target.value)
        this.size = event.target.value
        this.dispatchEvent(new CustomEvent('pen-size-change', {
          detail: this.size,
          bubbles: true
        }))
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
