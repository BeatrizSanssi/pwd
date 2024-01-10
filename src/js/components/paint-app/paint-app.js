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
#paint-app {
    background-color: rgb(76, 99, 76);
    align-items: center;
    justify-content: space-around;
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
    width: 500px;
    height: 500px;
}

#paint-canvas {
    background-color: white;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    width: 80%;
    height: 80%;
    justify-self: center;
}

.tool-button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .tool-icon {
    width: 24px;
    height: 24px;
  }
  
</style>
<div id="paint-app">
<canvas id="paint-canvas"></canvas>
    <div id="paint-tools">
        <button class="tool-button" id="eraser-button">
            <img src="js/components/paint-app/img/eraser.png" class="tool-icon" alt="Eraser"/>
        </button>
        <button class="tool-button" id="pen-button">
            <img src="js/components/paint-app/img/edit.svg" class="tool-icon" alt="Pen"/>
        </button>
        <button class="tool-button" id="color-picker-button">
            <img src="js/components/paint-app/img/color lens.svg" class="tool-icon" alt="Color Palett"/>
        </button>
        <button class="tool-button" id="colorize-button">
            <img src="js/components/paint-app/img/colorize.svg" class="tool-icon" alt="Colorize"/>
        </button>
        <button class="tool-button" id="restart-button">
            <img src="js/components/paint-app/img/restart alt.svg" class="tool-icon" alt="Restart"/>
        </button>
      <input type="color" id="color-picker">
      <div id="pen-size-selector" style="display: none;">
        <input type="range" id="pen-size" min="1" max="10" value="5">
      </div>   
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

      this.canvas = this.shadowRoot.getElementById('paint-canvas')
      this.context = this.canvas.getContext('2d')
      this.colorPicker = this.shadowRoot.getElementById('color-picker')
      this.penSize = this.shadowRoot.getElementById('pen-size')

      this.isDrawing = false
      this.defaultColor = '#cccccc'
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listeners to the canvas
      this.canvas.addEventListener('mousedown', () => { this.isDrawing = true })
      this.canvas.addEventListener('mouseup', () => { this.isDrawing = false })
      this.canvas.addEventListener('mousemove', () => {
        this.draw()
      })
      this.colorPicker.addEventListener('change', () => {
        this.changeColor()
      })
      // Initialize the tools
      this.eraserButton = this.shadowRoot.getElementById('eraser-button')
      this.penButton = this.shadowRoot.getElementById('pen-button')
      this.penSizeSelector = this.shadowRoot.getElementById('pen-size-selector')

      // Initialize the color picker to the default color
      this.colorPicker = this.shadowRoot.getElementById('color-picker')
      this.colorPicker.value = this.defaultColor

      // Add event listener to eraser
      this.eraserButton.addEventListener('click', () => {
        this.toggleEraser()
        this.isErasing = false
      })
      // Add event listener to pen
      this.penButton.addEventListener('click', () => {
        this.changePenSize()
      })

      // Initialize the drawing context with the default color
      this.context.strokeStyle = this.defaultColor
      // this.penSize.addEventListener('change', () => {
      //  this.changePenSize()
      // })
      /* this.eraserButton = this.shadowRoot.getElementById('eraser-button')
      this.eraserButton.addEventListener('click', () => {
        this.toggleEraser()
        this.isErasing = false
      }) */
    }

    /**
     * Draw on the canvas.
     *
     * @param {event} event - The event.
     */
    draw (event) {
      if (!this.isDrawing) return
      this.context.strokeStyle = this.colorPicker.value
      this.context.lineWidth = this.penSize.value
    // Drawing logic here
    }

    /**
     * Change the color of the pen.
     *
     * @param {event} event - The event.
     */
    changeColor (event) {
      this.context.strokeStyle = event.target.value
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
