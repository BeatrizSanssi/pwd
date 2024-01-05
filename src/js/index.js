/**
 * The main script file of the application.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */
import '../js/components/memory-game/index.js'
import '../js/components/messenger-app/index.js'
import '../js/components/window/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
   
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
     */
    openWindow (appName) {
      console.log('openWindow called with:', appName)
      const newWindow = document.createElement('app-window') // Create an instance of your custom window element
      const titleBar = newWindow.shadowRoot.querySelector('.title-bar') // Find elements within your custom window
      const closeButton = newWindow.shadowRoot.querySelector('.close-button')
      const contentArea = newWindow.shadowRoot.querySelector('.content')

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
