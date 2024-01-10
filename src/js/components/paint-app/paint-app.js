/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>

  
</style>
<div id="paint-app">
<canvas id="paint-canvas"></canvas>
    <div>
      <input type="color" id="color-picker">
      <input type="range" id="pen-size" min="1" max="10" value="5">
    </div>
</div>

`

/*
 * Define custom element.
 */
customElements.define('paint-app',
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