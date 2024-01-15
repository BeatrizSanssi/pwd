/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './paint-pen.js'
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
    width: 800px;
    height: 800px;
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
            <button class="tool-button" id="eraser-button">
                <img src="js/components/paint-app/img/eraser.png" class="tool-icon" alt="Eraser"/>
            </button>
            <!-- Pen -->
            <div id="pen-size-selector" style="display: none;">
                <input type="range" id="pen-size" min="1" max="10" value="5">
            </div>   
            <!-- Pen Button -->
            <button class="tool-button" id="pen-button">
                <img src="js/components/paint-app/img/edit.svg" class="tool-icon" alt="Pen"/>
            </button>

            <!-- Colorize Button -->
            <button class="tool-button" id="colorize-button">
                <img src="js/components/paint-app/img/colorize.svg" class="tool-icon" alt="Colorize"/>
            </button>

            <!-- Restart Button -->
            <button class="tool-button" id="restart-button">
                <img src="js/components/paint-app/img/restart alt.svg" class="tool-icon" alt="Restart"/>
            </button>

            <!-- Color Picker -->
            <div id="color-picker-container" style="display: none;">
                <input type="color" id="color-picker">
            </div>
            <!-- Color Picker Button -->
            <button class="tool-button" id="color-button">
                <img src="js/components/paint-app/img/color lens.svg" class="tool-icon" alt="Color Palett"/>
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

      this.canvas = this.shadowRoot.getElementById('paint-canvas')
      this.context = this.canvas.getContext('2d')
      this.colorPicker = this.shadowRoot.getElementById('color-picker')
      // this.penSize = this.shadowRoot.getElementById('pen-size')
      this.pen = this.shadowRoot.getElementById('pen')

      // this.isDrawing = false
      this.defaultColor = '#cccccc'

      this.context.strokeStyle = this.defaultColor
      this.context.lineWidth = 5

      // Set canvas size
      this.canvas.width = 800
      this.canvas.height = 800
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listeners to the canvas
      this.canvas.addEventListener('mousedown', (event) => {
        this.isDrawing = true
        this.startDrawing(event)
      })
      this.canvas.addEventListener('mouseup', () => {
        this.isDrawing = false
        this.context.closePath() // Close the path
      })
      this.canvas.addEventListener('mousemove', (event) => {
        if (this.isDrawing) {
          this.draw(event)
        }
      })
      this.colorPicker.addEventListener('change', (event) => {
        this.context.strokeStyle = event.target.value
      })
      this.penSize.addEventListener('input', (event) => {
        this.context.lineWidth = event.target.value
      })

      // Initialize the tools
      this.eraserButton = this.shadowRoot.getElementById('eraser-button')
      this.penButton = this.shadowRoot.getElementById('pen-button')
      this.penSizeSelector = this.shadowRoot.getElementById('pen-size-selector')

      // Initialize the color picker to the default color
      this.colorButton = this.shadowRoot.getElementById('color-button')
      this.colorPickerContainer = this.shadowRoot.getElementById('color-picker-container')
      this.colorPicker = this.shadowRoot.getElementById('color-picker')
      this.colorPicker.value = this.defaultColor

      this.penButton.addEventListener('click', () => {
        console.log('Pen button clicked')
        if (this.canvas.classList.contains('custom-cursor')) {
          this.canvas.classList.remove('custom-cursor')
          console.log('Cursor class removed')
        } else {
          this.canvas.classList.add('custom-cursor')
          console.log('Cursor class added')
        }
        this.changePenSize()
      })
      // Add event listener to eraser
      this.eraserButton.addEventListener('click', () => {
        this.toggleEraser()
        this.isErasing = false
      })
      // Add event listener to pen
      // this.penButton.addEventListener('click', () => {
      // this.changePenSize()
      // })

      // Add event listener to color picker
      this.colorButton.addEventListener('click', () => {
        this.toggleColorPicker()
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
