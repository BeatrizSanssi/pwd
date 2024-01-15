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
    align-items: center;
    justify-content: center;
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
    max-width: 100%;
    height: auto;
}

#paint-canvas {
    background-color: white;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    width: 80%;
    height: 80%;
}

#paint-tools {
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
    #penButton
    #colorButton
    #penSizeSelector
    #paintPen
    #colorPicker
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
      this.#initializeElements()
      this.#addEventListeners()
      this.#initializeCanvas()
    }

    /**
     * Initialize elements.
     */
    #initializeElements () {
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
    #addEventListeners () {
    // Adjust the canvas size when the window is resized
      window.addEventListener('resize', () => this.#adjustCanvasSize())

      // Pen size change event listener
      this.penButton.addEventListener('pen-size-change', (event) => {
        this.context.lineWidth = event.detail
      })

      // Color change event listener
      this.colorButton.addEventListener('color-change', (event) => {
        this.context.strokeStyle = event.detail
      })

      // Canvas event listeners
      this.#setupCanvasEventListeners()
    }

    /**
     * Setup canvas event listeners.
     */
    #setupCanvasEventListeners () {
      this.canvas.addEventListener('mousedown', (event) => {
        this.isDrawing = true
        this.startDrawing(event)
      })

      this.canvas.addEventListener('mouseup', () => {
        this.isDrawing = false
        this.context.closePath()
      })

      this.canvas.addEventListener('mousemove', (event) => {
        if (this.isDrawing) {
          this.draw(event)
        }
      })
    }

    /**
     * Initialize the canvas.
     */
    #initializeCanvas () {
      this.canvas.width = 800
      this.canvas.height = 800
      this.#adjustCanvasSize()
    }

    /**
     * Adjust the canvas size.
     */
    #adjustCanvasSize () {
      const rect = this.getBoundingClientRect()
      this.canvas.width = rect.width
      this.canvas.height = rect.height
    }

    /**
     * Called after the element is inserted into the DOM.
     *
    connectedCallback () {
      // Adjust the canvas size when the window is resized
      this.adjustCanvasSize()
      // Add eventlisteners to the pen
      this.#penButton.addEventListener('pen-size-change', (event) => {
        this.context.lineWidth = event.detail
      })
      this.shadowRoot.querySelector('#pen-button').addEventListener('click', () => {
        this.#paintPen.changePenSize()
      })
      // Add event listeners to the color picker
      this.#colorButton.addEventListener('color-change', (event) => {
        this.context.strokeStyle = event.detail
      })
      this.shadowRoot.querySelector('#color-button').addEventListener('click', () => {
        this.#colorPicker.changeColor()
      })
      // Add event listeners to the canvas
      this.canvas.addEventListener('mousedown', (event) => {
        this.isDrawing = true
        this.startDrawing(event)
      })
      this.canvas.addEventListener('mouseup', () => {
        this.isDrawing = false
        this.context.closePath()
      })
      this.canvas.addEventListener('mousemove', (event) => {
        if (this.isDrawing) {
          this.draw(event)
        }
      })
    } */

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
     * @param {event} event - The event.
     */
    startDrawing (event) {
      this.isDrawing = true
      const rect = this.canvas.getBoundingClientRect()
      const scaleX = this.canvas.width / rect.width
      const scaleY = this.canvas.height / rect.height
      const devicePixelRatio = window.devicePixelRatio || 1
      const x = ((event.clientX - rect.left) * scaleX) * devicePixelRatio
      const y = ((event.clientY - rect.top) * scaleY) * devicePixelRatio

      this.context.beginPath()
      this.context.moveTo(x, y)
    }

    /**
     * Draw on the canvas.
     *
     * @param {event} event - The event.
     */
    draw (event) {
      if (!this.isDrawing) return
      console.log('Drawing...')

      // Cursor offset
      const cursorOffsetX = 4// Horizontal offset of the pen tip from the cursor's top-left corner
      const cursorOffsetY = 28
      // this.context.strokeStyle = this.colorPicker.value
      // this.context.lineWidth = this.penSize.value
      // Get mouse position relative to the canvas
      const rect = this.canvas.getBoundingClientRect()
      // const x = event.clientX - rect.left - cursorOffsetX
      // const y = event.clientY - rect.top - cursorOffsetY

      const scaleX = this.canvas.width / rect.width // Scaling factor for width
      const scaleY = this.canvas.height / rect.height // Scaling factor for height
      const devicePixelRatio = window.devicePixelRatio || 1
      // Adjust the mouse coordinates
      const x = ((event.clientX - rect.left) * scaleX - cursorOffsetX) * devicePixelRatio
      const y = ((event.clientY - rect.top) * scaleY - cursorOffsetY) * devicePixelRatio

      console.log(`Cursor position: ${event.clientX - rect.left}, ${event.clientY - rect.top}`)
      console.log(`Mouse position: ${x}, ${y}`)

      /* // Check eraser state and adjust context accordingly
      if (this.isErasing) {
        this.context.globalCompositeOperation = 'destination-out'
      } else {
        this.context.globalCompositeOperation = 'source-over'
      } */

      // Drawing logic
      this.context.lineTo(x, y)
      this.context.stroke()
      this.context.beginPath()
      this.context.moveTo(x, y)
    }
  })
