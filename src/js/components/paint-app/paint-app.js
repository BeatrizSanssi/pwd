/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './paint-pen.js'
import './color-picker.js'
import './paint-eraser.js'
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

.pen-cursor {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAABJklEQVRYR+3WoQ7CMBAG4A2D4Y1QPARBEYJBoEAhECRIFA4DeN4Az0sQnoBnQAD/CE1I0/buul2Z2JLLlnXbfbneuuVZjba8RpaswfhmQ7MyQyRdIU6IJacdtDBjJN8jWl/EFvs5BdLAjJD0+AMxBhKkgeki+xnRcVRig3OLFD3TR5IL4o4IgdoYf7hAVVXG9MgNSXoB0A5jU83K2M169YAOOD9BPLUwNsTksUEDDMxCkOLGMtPkg7hA1Fv9GY/FUBCTfI2DYuFjbTEYLoTsEVsoxahBpNOkCpFg1CFcTBIIB5MMQmGSQkKY5BAf5i8QH+bFWC7FCxrjmc7PAYVRgcRURg0ixahCJBh1CLXOcHqu0mukX+1Kk5f9hWgwqhXwPbzpGV9l3pVeSyTrnRavAAAAAElFTkSuQmCC') 4 28, auto;
}

.eraser-cursor {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADaklEQVRYR+2XWchPQRiHvw/ZJZQt8SnZS2TJkr7kRrhCWRJS9iX77kJ2kbVwgSQSF4oQ4kJJtpTsiZCdRPb1+WWGcb6zzfn/1Xfhracz58y87/zmPXNm5hQWlDIrLGV6Cv6FoPYM8iB8hWOwGq6lHXi+BfWm40PwDE5AMdSHH3AERsPDOHH5FDSQjvbAKpjpdFqGsoSuhyJ4C2Ngd5iwfAkaQfBtMAD2x2SgPHXTYQGoPBk2uu3zIWgUAbdAJzgX9zoCdc24Pwo1Qa/1nepzFTTejLA515seYmzTshQ0+e9Do1wFTSDABmgCdzKIkcslaAtLYV4ugibirEmqtN/KIEZv5jYUgbJUCT5mFTQOx02gL+dwBjEV8HkKW42Ynlzb2Di+c0jryGbjrBQr1T5Wm8aPYBZowfwMTeFeFkHDcdoe6F0TconhS4Ky1tRfgUmgudcd9kI91y9thvrjtC+hQ82JsXAStDK7ptdy3BGjuheg55d9BdlgCXr+qtbXMxfOwHzQyj0N1phW+rK0BtUJBk3KkE2zj5iwtnN4uNypeEW5G5TYdOME1TJpzSpGq7c+ghUw2wnSj/JiaBEWOEqQNkStCwraBdp5qNL80TaiOXMVujq+ekWPoSq89xGkDVIjkd0AbZo1YKXpLGogL6lvCNpGGsDvBY9yZXgDneF81ADDAku9jghB+8QDrT1roTEsNEIrmob6CgfDE9DrVqcdTV05E3MQ1wNRYvQ8TNApnhfHOVF3FoaBtg2tvOpQW8Bz0LFC1go0adWHMjcVdiTELSGoGg5Ka1rTPFNGlSX5ae7JvhuBKuuEuAi0VSRaMEOaiFp3fEyD0Emxj+N0kXIHuAvLQB9HKnMFaZQfUnn9aWQzoasbS3F0rxNhqszYkG6QXTwc4inoNO2nwIUQv5E807HWy6wgvftvXp6/GmuNWQf69XFtKDcaoLdZQfoCdBzwNX1ZwYEkHfRj+7CCXtOquqcarcLaFnY6fn0p678ss1lBWoV1LtY1rfWiof6trE8PylrDcrLgZ6/tQu/err5xwetSqVVZ5vsLFBk3ak9SB1pbtEWEmRY7nf6UpZZwPae0OM5J5yFlSkeHGaDN0ZqOD9rX9C/1IF9iFCdJkNtXFW60eeqYqp1c/2M+20wq3T6CUgXMtdF/QUkZ/AnZ7JYliRnM9gAAAABJRU5ErkJggg==') 4 28, auto;
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
          <button class="tool-button" id="eraser-button">
              <img src="js/components/paint-app/img/eraser.png" class="tool-icon" alt="Eraser"/>
              <paint-eraser></paint-eraser>
          </button>
            
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
      console.log(this.paintEraser)
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
      this.eraserButton = this.shadowRoot.getElementById('eraser-button')
      this.paintPen = this.shadowRoot.querySelector('paint-pen')
      this.colorPicker = this.shadowRoot.querySelector('color-picker')
      this.paintEraser = this.shadowRoot.querySelector('paint-eraser')

      // Set default values
      this.isDrawing = false
      this.isPenActive = false
      this.defaultColor = '#cccccc'
      this.context.strokeStyle = this.defaultColor
      this.context.lineWidth = 5
      this.isErasing = false
      this.currentEraserSize = 5
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
      this.penButton.addEventListener('click', (event) => {
        this.isPenActive = true
        this.isErasing = false
        this.paintPen.changePenSize()
        this.canvas.classList.add('pen-cursor')
        this.canvas.classList.remove('eraser-cursor')
      })

      // Color change event listener
      this.colorPicker.addEventListener('color-change', (event) => {
        this.context.strokeStyle = event.detail
      })

      // Click event for color button
      this.colorButton.addEventListener('click', () => {
        this.colorPicker.changeColor()
      })

      this.colorButton.addEventListener('click', () => {
        this.canvas.classList.remove('pen-cursor')
      })

      // Eraser button event listener
      this.eraserButton.addEventListener('click', () => {
        this.isPenActive = false
        this.toggleEraserMode()
        this.paintEraser.changeEraserSize()
      })

      // Eraser size change event listener
      this.paintEraser.addEventListener('eraser-size-change', (event) => {
        this.currentEraserSize = event.detail
        console.log('Eraser size set to:', this.currentEraserSize)
        // this.context.lineWidth = event.detail
        // this.paintEraser.changeEraserSize(event.detail)
        // console.log('Eraser size set to:', event.detail) // Debugging line
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
      this.canvas.addEventListener('click', () => {
        this.paintPen.hideSizeSelector()
        this.paintEraser.hideSizeSelector()
      })

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
        const { x, y } = this.getMousePosition(event)
        if (this.isDrawing) {
          if (this.isErasing) {
            this.erase(x, y)
          } else {
            this.draw(x, y)
          }
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
      if (!this.isDrawing || !this.isPenActive) return
      console.log('Drawing...')

      this.context.lineTo(x, y)
      this.context.stroke()
      this.context.beginPath()
      this.context.moveTo(x, y)
    }

    /**
     * Toggle the eraser.
     */
    toggleEraserMode () {
      this.isErasing = !this.isErasing
      this.context.globalCompositeOperation = this.isErasing ? 'destination-out' : 'source-over'
      this.canvas.classList.toggle('eraser-cursor', this.isErasing)
      this.canvas.classList.toggle('pen-cursor', !this.isErasing)
      console.log('Eraser mode:', this.isErasing)
    }

    /**
     * Erase drawing from canvas.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     */
    erase (x, y) {
      if (!this.isErasing) return

      const eraserSize = parseInt(this.currentEraserSize, 10)
      console.log('Eraser size:', eraserSize)

      this.context.save()
      this.context.globalCompositeOperation = 'destination-out'
      this.context.beginPath()
      this.context.arc(x, y, eraserSize / 2, 0, Math.PI * 2)
      this.context.fill()
      this.context.restore()
    }
    // Assuming the eraser size is set correctly
    /* const eraserSize = parseInt(this.currentEraserSize, 10)
      this.context.beginPath()
      this.context.arc(x, y, eraserSize / 2, 0, Math.PI * 2)
      this.context.fill()
    } */
    /*
      const eraserSize = parseInt(this.paintEraser.currentEraserSize)

      this.context.save()
      this.context.beginPath()
      this.context.arc(x, y, eraserSize, 0, 2 * Math.PI) // Draw a circle
      this.context.fillStyle = 'rgba(0,0,0,0)'
      this.context.fill()
      this.context.globalCompositeOperation = 'destination-out'
      this.context.closePath()
      this.context.restore()
    } */
  })
