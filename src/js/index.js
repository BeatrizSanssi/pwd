/**
 * The main script file of the application.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */
import '../js/components/memory-game/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
    /* Add your CSS styles here */
   </style>
    <memory-game></memory-game>
    <messenger-app></messenger-app>
`
customElements.define('desktop-app',
  /**
   * Represents the desktop app.
   */
  class extends HTMLElement {
    desktop
    dockIcons
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
      this.setUpEventListeners()
    }

    /**
     * Sets up event listeners.
     */
    setUpEventListeners () {
      this.desktop = document.getElementById('desktop')
      const dockIcons = document.querySelectorAll('.dock-icon')
      dockIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            this.openWindow(icon.dataset.app)
        })
      })
    }

    /**
     * Opens a new window.
     *
     * @param {string} appName - The name of the app to open.
     * @returns {void}
     */
    openWindow (appName) {
      console.log('openWindow called with:', appName)
      const windowTemplate = document.getElementById('windowTemplate')
      const windowClone = windowTemplate.content.cloneNode(true)
      const newWindow = windowClone.querySelector('.window')
      const titleBar = newWindow.querySelector('.title-bar')
      const closeButton = newWindow.querySelector('.close-button')
      const contentArea = newWindow.querySelector('.content')

      // Specific app content
      if (appName === 'memoryGame') {
        const memoryGame = document.createElement('memory-game')
        contentArea.appendChild(memoryGame)
      } else if (appName === 'messengerApp') {
        const messengerApp = document.createElement('messenger-app')
        contentArea.appendChild(messengerApp)
      }

      titleBar.addEventListener('mousedown', this.startDrag)
      closeButton.addEventListener('click', () => newWindow.remove())

      this.desktop.appendChild(newWindow)
    }

    /**
     * Starts dragging the window.
     *
     * @param {MouseEvent} e - The event object.
     * @param {HTMLElement} windowElement - The window element.
     */
    startDrag (e, windowElement) {
      let prevX = e.clientX
      let prevY = e.clientY

      /**
       * Handles the mouse move event.
       *
       * @param {MouseEvent} e - The event object.
       */
      const onMove = (e) => {
        const newX = prevX - e.clientX
        const newY = prevY - e.clientY
        const rect = windowElement.getBoundingClientRect()

        windowElement.style.left = rect.left - newX + 'px'
        windowElement.style.top = rect.top - newY + 'px'

        prevX = e.clientX
        prevY = e.clientY
      }

      /**
       * Handles the mouse up event.
       */
      const onUp = () => {
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    }
  })
