/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './paint-pen.js'
import './color-picker.js'
// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#paint-app {
    background-color: rgb(76, 99, 76);
    align-content: center;
    
    color: white;
    
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
    width: fit-content;
    height: fit-content;
}

#paint-canvas {
    background-color: white;
    color: rgb(76, 99, 76);
    height: 600px;
    width: 600px;
    padding: 10px;
    margin: 20px;
}

#paint-tools {
    background-color: white;
    display: block;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 20px;
    gap: 10px;
    width: 600px;
    height: 30px;
    border-radius: 4px;
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

  .custom-cursor {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAABJklEQVRYR+3WoQ7CMBAG4A2D4Y1QPARBEYJBoEAhECRIFA4DeN4Az0sQnoBnQAD/CE1I0/buul2Z2JLLlnXbfbneuuVZjba8RpaswfhmQ7MyQyRdIU6IJacdtDBjJN8jWl/EFvs5BdLAjJD0+AMxBhKkgeki+xnRcVRig3OLFD3TR5IL4o4IgdoYf7hAVVXG9MgNSXoB0A5jU83K2M169YAOOD9BPLUwNsTksUEDDMxCkOLGMtPkg7hA1Fv9GY/FUBCTfI2DYuFjbTEYLoTsEVsoxahBpNOkCpFg1CFcTBIIB5MMQmGSQkKY5BAf5i8QH+bFWC7FCxrjmc7PAYVRgcRURg0ixahCJBh1CLXOcHqu0mukX+1Kk5f9hWgwqhXwPbzpGV9l3pVeSyTrnRavAAAAAElFTkSuQmCC'), auto;
}
  
</style>
<div id="paint-app">
    <canvas id="paint-canvas"></canvas>
        <div id="paint-tools">  
          <!-- Pen Button -->
          <button class="tool-button" id="pen-button">
            <img src="js/components/paint-app/img/edit.svg" class="tool-icon" alt="Pen"/>
            <paint-pen></paint-pen>
          </button>
            <!-- Eraser Button -->
            
            <!-- Color Picker -->
          <button class="tool-button" id="color-button">
            <img src="js/components/paint-app/img/color lens.svg" class="tool-icon" alt="Color Palett"/>
            <color-picker></color-picker>
          </button>
            
            <!-- Colorize Button -->
            <button class="tool-button" id="colorize-button">
                <img src="js/components/paint-app/img/colorize.svg" class="tool-icon" alt="Colorize"/>
            </button>

            <!-- Restart Button -->
            <button class="tool-button" id="restart-button">
                <img src="js/components/paint-app/img/restart alt.svg" class="tool-icon" alt="Restart"/>
            </button>
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

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      await this.initializeElements()
      this.addEventListeners()
      this.initializeCanvas()
    }

    /**
     * Initialize elements.
     */
    initializeElements () {
      this.canvas = this.shadowRoot.getElementById('paint-canvas')
      this.context = this.canvas.getContext('2d')

      // Initialize other elements
      this.penButton = this.shadowRoot.getElementById('pen-button')
      this.colorButton = this.shadowRoot.getElementById('color-button')
      this.paintPen = this.shadowRoot.querySelector('paint-pen')
      this.colorPicker = this.shadowRoot.querySelector('color-picker')

      // Set default values
      this.isDrawing = false
      this.defaultColor = '#cccccc'
      this.context.strokeStyle = this.defaultColor
      this.context.lineWidth = 5
    }

    /**
     * Add event listeners.
     */
    addEventListeners () {
    // Adjust the canvas size when the window is resized
      window.addEventListener('resize', () => this.adjustCanvasSize())

      // Pen size change event listener
      this.paintPen.addEventListener('pen-size-change', (event) => {
        this.context.lineWidth = event.detail
      })

      // Click event for pen button
      this.penButton.addEventListener('click', () => {
        this.paintPen.changePenSize()
        this.paintPen.classList.add('custom-cursor')
      })

      // Color change event listener
      this.colorPicker.addEventListener('color-change', (event) => {
        this.context.strokeStyle = event.detail
      })

      // Click event for color button
      this.colorButton.addEventListener('click', () => {
        this.colorPicker.changeColor()
      })

      // Canvas event listeners
      this.setupCanvasEventListeners()
    }

    /**
     * Get the mouse position relative to the canvas.
     *
     * @param {event} event - The event.
     * @returns {object} The mouse position relative to the canvas.
     */
    getMousePosition (event) {
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width // the scale factor for width
      const scaleY = this.canvas.height / rect.height // the scale factor for height
      const x = (event.clientX - rect.left) * scaleX // scale mouse coordinates after they have
      const y = (event.clientY - rect.top) * scaleY // been adjusted to be relative to canvas
      return { x, y }
    }

    /**
     * Setup canvas event listeners.
     */
    setupCanvasEventListeners () {
      this.canvas.addEventListener('mousedown', (event) => {
        event.stopPropagation()
        this.isDrawing = true
        const { x, y } = this.getMousePosition(event)
        this.startDrawing(x, y)
      })

      this.canvas.addEventListener('mouseup', () => {
        this.isDrawing = false
        this.context.closePath()
      })

      this.canvas.addEventListener('mousemove', (event) => {
        if (this.isDrawing) {
          const { x, y } = this.getMousePosition(event)
          this.draw(x, y)
        }
      })
    }

    /**
     * Initialize the canvas.
     */
    initializeCanvas () {
      this.context = this.canvas.getContext('2d')
      if (!this.context) {
        console.error('Unable to get canvas context!')
        return
      }
      this.adjustCanvasSize()
    }

    /**
     * Adjust the canvas size.
     */
    adjustCanvasSize () {
      const rect = this.getBoundingClientRect()
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    }

    /**
     * Start drawing on the canvas.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    startDrawing (x, y) {
      this.context.beginPath()
      this.context.moveTo(x, y)
    }

    /**
     * Draw on the canvas.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    draw (x, y) {
      if (!this.isDrawing) return
      console.log('Drawing...')

      this.context.lineTo(x, y)
      this.context.stroke()
      this.context.beginPath()
      this.context.moveTo(x, y)
    }
  })
