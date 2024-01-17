/**
 * The paint-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './paint-pen.js'
import './color-picker.js'
import './paint-eraser.js'
import './paint-colorizer.js'
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

.colorizer-cursor {
  cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVHhe7ZixTcRAEEWdEVLClUBICYSUcCUQEpJRBmUQXkhICZRASAr/ByNZ1sfePVv27Ow86SVGZ+374g58Q5IkSZIkSWPcw3d4gc+80BMP8Af+jnyDXaDiuxlhLt5sbgS+fxm2REm82cwIL5AHZtjcCDXxpvsRLN78b4Rr4k23I0zjzekIa+LNV+iOM1SHpTbCFvHmDXTH0ghbxdNb6JK5EbbS/Ych/wyqg28h/1V2+etvnOAXVIdfa8ZDt2Q8VIdfa/Px/MRmhPrZkiHiCSNqRwgTb9SMEC7eKB3hEbrl2nijZAR7dnDH2niDX36q1491N8JW8XfwG6p7THUzwhHx5uEj7BXP+6jr9AMewl7xfIQm6lH6Ex7y7L93vDEeobt4g9e7jT+UjIfqwDTjC8h4qO5BM94bXceTruOJOjDtIp6oQ/OLihKajyfq4CWPniHiiTo8nRshTDxRAaYaIVQ8URFjxyOEiycqZCpHeILh4omKqbXZeKKCamw6nqioUpuPJyqsxBDxRMUtGSY+SZIkSZKoDMMfLk4snvGAk3oAAAAASUVORK5CYII=') 4 28, auto;
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
              <paint-colorizer></paint-colorizer>
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

      // Initialize buttons
      this.penButton = this.shadowRoot.getElementById('pen-button')
      this.colorButton = this.shadowRoot.getElementById('color-button')
      this.eraserButton = this.shadowRoot.getElementById('eraser-button')
      this.colorizeButton = this.shadowRoot.getElementById('colorize-button')

      // Initialize other elements
      this.paintPen = this.shadowRoot.querySelector('paint-pen')
      this.colorPicker = this.shadowRoot.querySelector('color-picker')
      this.paintEraser = this.shadowRoot.querySelector('paint-eraser')
      this.paintColorizer = this.shadowRoot.querySelector('paint-colorizer')

      // Set default values
      this.isDrawing = false
      this.isPenActive = false
      this.defaultColor = '#cccccc'
      this.context.strokeStyle = this.defaultColor
      this.context.lineWidth = 5
      this.isErasing = false
      this.currentEraserSize = 30
      this.isColorizing = false
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
        this.isColorizing = false
        this.paintPen.changePenSize()
        this.canvas.classList.add('pen-cursor')
        this.canvas.classList.remove('eraser-cursor')
        this.canvas.classList.remove('colorize-cursor')
      })

      // Color change event listener
      this.colorPicker.addEventListener('color-change', (event) => {
        this.currentColor = event.detail
        console.log('Color changed to:', this.currentColor)
        // this.context.strokeStyle = event.detail
        // console.log('Color set to:', event.detail)
      })

      // Click event for color button
      this.colorButton.addEventListener('click', () => {
        this.colorPicker.changeColor()
      })

      // Click event for eraser button
      this.eraserButton.addEventListener('click', () => {
        this.isPenActive = false
        this.isColorizing = false
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

      // Click event for colorize button
      this.colorizeButton.addEventListener('click', () => {
        this.isPenActive = false
        this.isErasing = false
        this.isColorizing = true
        this.canvas.classList.add('colorizer-cursor')
        this.canvas.addEventListener('click', (event) => {
          if (this.isColorizing) {
            const currentColor = this.colorPicker.currentColor
            this.handleColorize(event, currentColor)
            this.isColorizing = false
            this.canvas.classList.remove('colorizer-cursor')
          }
        }, { once: true })
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
        this.colorPicker.hideColorPicker()
        this.paintColorizer.hideColorizer()
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
      this.context.strokeStyle = this.currentColor

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

    /**
     * Handle colorize.
     *
     * @param {event} event - The event.
     * @param {string} hexColor - The hex color.
     */
    handleColorize (event, hexColor) {
      console.log('handleColorize called with color:', hexColor)
      console.log('Color Picker Current Color:', this.colorPicker.currentColor) // this.isColorizing = !this.isColorizing
      if (!this.currentColor) {
        console.error('No color selected')
        return
      }
      // this.canvas.classList.toggle('colorizer-cursor', this.isColorizing)
      // this.canvas.classList.toggle('pen-cursor', !this.isColorizing)
      // this.canvas.classList.toggle('eraser-cursor', !this.isColorizing)
      const position = this.getMousePosition(event)
      // Assuming the colorPicker's currentColor returns a string like "#ff0000"
      // const hexColor = this.colorPicker.currentColor

      // Convert hex color to an RGBA object
      const rgbaColor = this.hexToRgba(hexColor)
      console.log('Applying flood fill at position:', position, 'with color:', rgbaColor)

      this.floodFill(this.canvas, position.x, position.y, rgbaColor)
      /*
      this.canvas.addEventListener('click', (e) => {
        const pos = this.getMousePosition(e)
        this.fillCanvas(pos.x, pos.y, this.colorPicker.currentColor)
      }, { once: true }) */
    }

    /**
     * Convert hex color to an RGBA object.
     *
     * @param {string} hexColor - The hex color.
     * @returns {object} The RGBA object.
     */
    hexToRgba (hexColor) {
      const r = parseInt(hexColor.slice(1, 3), 16)
      const g = parseInt(hexColor.slice(3, 5), 16)
      const b = parseInt(hexColor.slice(5, 7), 16)
      return { r, g, b, a: 255 } // Assuming full opacity
    }

    /**
     * Fill the canvas or a drawing with a color.
     *
     * @param {object} canvas - The canvas.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {string} fillColor - The color to fill the canvas with.
     */
    floodFill (canvas, x, y, fillColor) {
      const ctx = canvas.getContext('2d')
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const targetColor = this.getColorAtPixel(imageData, x, y)

      console.log(`Target Color at (${x}, ${y}):`, targetColor)
      console.log('Fill Color:', fillColor)

      if (this.colorsMatch(targetColor, fillColor)) {
        console.log('Target color matches fill color. Flood fill aborted.')
        return
      }

      const pixelsToCheck = [[x, y]]
      while (pixelsToCheck.length > 0) {
        const [currentX, currentY] = pixelsToCheck.pop()

        // Boundary check
        if (currentX < 0 || currentX >= canvas.width || currentY < 0 || currentY >= canvas.height) {
          continue
        }

        const currentColor = this.getColorAtPixel(imageData, currentX, currentY)
        if (this.colorsMatch(currentColor, targetColor)) {
          this.setColorAtPixel(imageData, currentX, currentY, fillColor)

          pixelsToCheck.push([currentX + 1, currentY])
          pixelsToCheck.push([currentX - 1, currentY])
          pixelsToCheck.push([currentX, currentY + 1])
          pixelsToCheck.push([currentX, currentY - 1])
        }
      }

      ctx.putImageData(imageData, 0, 0)
      console.log('Flood fill applied.')
    }

    /**
     * Get the color at a pixel.
     *
     * @param {object} imageData - The image data.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @returns {object} The color at the pixel.
     */
    getColorAtPixel (imageData, x, y) {
      x = Math.floor(x)
      y = Math.floor(y)

      const { width, data } = imageData
      const index = (y * width + x) * 4
      return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
      }
    }

    /**
     * Set the color at a pixel.
     *
     * @param {object} imageData - The image data.
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {string} color - The color to fill the canvas with.
     */
    setColorAtPixel (imageData, x, y, color) {
      x = Math.floor(x)
      y = Math.floor(y)

      const { width, data } = imageData
      const index = (y * width + x) * 4
      data[index] = color.r
      data[index + 1] = color.g
      data[index + 2] = color.b
      data[index + 3] = color.a
    }

    /**
     * Check if two colors match.
     *
     * @param {object} a - The first color.
     * @param {object} b - The second color.
     * @returns {boolean} True if the colors match, false otherwise.
     */
    colorsMatch (a, b) {
      return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a
    }

    /**
     * Fill the canvas with a color.
     *
     * @param {number} x - The x coordinate.
     * @param {number} y - The y coordinate.
     * @param {string} fillColor - The color to fill the canvas with.
     *
    fillCanvas (x, y, fillColor) {
      const canvasRect = this.canvas.getBoundingClientRect()
      const imageData = this.context.getImageData(0, 0, canvasRect.width, canvasRect.height)
      const data = imageData.data
      const startPos = (y * imageData.width + x) * 4
      const startColor = {
        r: data[startPos],
        g: data[startPos + 1],
        b: data[startPos + 2],
        a: data[startPos + 3]
      }
      // Simple flood fill algorithm
      const stack = [[x, y]]
      while (stack.length > 0) {
        const [x, y] = stack.pop()
        const pos = (y * imageData.width + x) * 4
        if (data[pos] === startColor.r && data[pos + 1] === startColor.g && data[pos + 2] === startColor.b && data[pos + 3] === startColor.a) {
          data[pos] = fillColor.r
          data[pos + 1] = fillColor.g
          data[pos + 2] = fillColor.b
          data[pos + 3] = 255 // set alpha to opaque
          stack.push([x + 1, y])
          stack.push([x - 1, y])
          stack.push([x, y + 1])
          stack.push([x, y - 1])
        }
      }
      this.context.putImageData(imageData, 0, 0)
    } */
  })
