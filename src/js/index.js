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
.dock-icon {
margin: 10px;
padding: 10px;
width: 100px;
height: 100px;
cursor: pointer;
align-items: center;
background-color: transparent;
background-repeat: no-repeat;
border-radius: 5px;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
transition: transform 0.2s;
}

.dock-icon:hover {
transform: scale(1.1);
}

#dock {
position: absolute;
display: flex;
flex-direction: row;
top: 30px;
left: 30px;
}
</style>
<div id="desktop">
  <!-- Icons in the dock to open windows -->
  <div id="dock">
    <img src="/src/css/img/seedling-solid.svg" class="dock-icon" data-app="memoryGame" alt="Memory Game Icon">
    <img src="/src/css/img/comments-solid.svg" class="dock-icon" data-app="messengerApp" alt="Messenger App Icon">
  </div>
  <memory-game></memory-game>
  <messenger-app></messenger-app>
  <app-window></app-window>
</div>
`
customElements.define('desktop-app',
  /**
   * Represents the desktop app.
   */
  class extends HTMLElement {
    #desktop
    #dockIcons
    #dockIcon
    #dock
    #memoryGame
    #messengerApp
    #appWindow
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Initialize the components and elements.
      this.#desktop = this.shadowRoot.getElementById('desktop')
      this.#dockIcons = this.shadowRoot.querySelectorAll('.dock-icon')
      this.#memoryGame = this.shadowRoot.querySelector('memory-game')
      this.#messengerApp = this.shadowRoot.querySelector('messenger-app')
      this.#appWindow = this.shadowRoot.querySelector('app-window')
      this.#dock = this.shadowRoot.getElementById('dock')
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.setUpEventListeners()
      // this.dock.style.display = 'block'
    }

    /**
     * Sets up event listeners.
     */
    setUpEventListeners () {
      // this.desktop = this.shadowRoot.getElementById('desktop')
      this.#dockIcons = this.shadowRoot.querySelectorAll('dock-icon')
      this.#dockIcons.forEach(icon => {
        icon.addEventListener('click', () => {
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
      const newWindow = document.createElement('app-window')

      if (appName === 'memoryGame') {
        const memoryGame = document.createElement('memory-game')
        newWindow.appendChild(memoryGame)
      } else if (appName === 'messengerApp') {
        const messengerApp = document.createElement('messenger-app')
        newWindow.appendChild(messengerApp)
      }

      this.shadowRoot.getElementById('desktop').appendChild(newWindow)
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
        this.#appWindow.removeEventListener('mousemove', onMove)
        this.#appWindow.removeEventListener('mousemove', onMove)
          .removeEventListener('mouseup', onUp)
      }

      this.#appWindow.removeEventListener('mousemove', onMove)
        .addEventListener('mousemove', onMove)
      this.#appWindow.removeEventListener('mousemove', onMove)
        .addEventListener('mouseup', onUp)
    }
  })
