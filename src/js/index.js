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
    <img src="css/img/seedling-solid.svg" class="dock-icon" data-app="memoryGame" alt="Memory Game Icon">
    <img src="css/img/comments-solid.svg" class="dock-icon" data-app="messengerApp" alt="Messenger App Icon">
  </div>
</div>
`
customElements.define('desktop-app',
  /**
   * Represents the desktop app.
   */
  class extends HTMLElement {
    /* #desktop
    #dockIcons
    #dockIcon
    #dock
    #memoryGame
    #messengerApp
    #appWindow */
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
    /*
      // Initialize the components and elements.
      this.#desktop = this.shadowRoot.getElementById('desktop')
      this.#dockIcons = this.shadowRoot.querySelectorAll('.dock-icon')
      this.#memoryGame = this.shadowRoot.querySelector('memory-game')
      this.#messengerApp = this.shadowRoot.querySelector('messenger-app')
      this.#appWindow = this.shadowRoot.querySelector('app-window')
      this.#dock = this.shadowRoot.getElementById('dock')
    }
    */

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Event delegation for dock icon clicks
      const dock = this.shadowRoot.getElementById('dock')
      dock.addEventListener('click', (event) => {
        const target = event.target
        if (target.classList.contains('dock-icon')) {
          const appName = target.dataset.app
          this.openAppWindow(appName)
        }
      })
    }

    /**
     * Sets up event listeners.
     *
    setUpEventListeners () {
      // this.desktop = this.shadowRoot.getElementById('desktop')
      this.#dockIcons = this.shadowRoot.querySelectorAll('dock-icon')
      this.#dockIcons.forEach(icon => {
        icon.addEventListener('click', () => {
          this.openWindow(icon.dataset.app)
        })
      })
    } */

    /**
     * Opens a new window.
     *
     * @param {string} appName - The name of the app to open.
     */
    openAppWindow (appName) {
      console.log('Desktop App: openAppWindow called with:', appName)

      // Create a new window
      const appWindow = document.createElement('app-window')

      // Depending on the appName, append the correct app to the window
      let appElement
      if (appName === 'memoryGame') {
        appElement = document.createElement('memory-game')
      } else if (appName === 'messengerApp') {
        appElement = document.createElement('messenger-app')
      }

      console.log('Created app element:', appElement)
      switch (appName) {
        case 'memoryGame':
          console.log('Desktop App: Creating memory-game element')
          appElement = document.createElement('memory-game')
          break
        case 'messengerApp':
          appElement = document.createElement('messenger-app')
          break
        default:
          console.error(`Unknown app name: ${appName}`)
          return
      }

      if (!appElement) {
        console.error('Desktop App: Failed to create app element for:', appName)
        return
      }

      appWindow.addContent(appElement)

      const desktop = this.shadowRoot.getElementById('desktop')
      if (desktop) {
        desktop.appendChild(appWindow)
      } else {
        console.error('Desktop element not found')
      }
    }
    // Append the new window with the app to the desktop
    // this.shadowRoot.getElementById('desktop').appendChild(newWindow)
    // }
    /* openWindow (appName) {
      console.log('openWindow called with:', appName)
      const newWindow = document.createElement('app-window')
      if (!newWindow) {
        console.error('Could not create new window.')
        return
      }

      let appElement
      if (appName === 'memoryGame') {
        appElement = document.createElement('memory-game')
        // newWindow.appendChild(memoryGame)
      } else if (appName === 'messengerApp') {
        appElement = document.createElement('messenger-app')
        // newWindow.appendChild(messengerApp)
      }
      if (!appElement) {
        console.error(`Failed to create ${appName} element`)
        return
      }

      newWindow.appendChild(appElement)
      const desktop = this.shadowRoot.getElementById('desktop')
      if (desktop) {
        desktop.appendChild(newWindow)
      } else {
        console.error('Desktop element not found')
      }
    } */

    /* this.#appWindow.removeEventListener('mousemove', onMove)
        .addEventListener('mousemove', onMove)
      this.#appWindow.removeEventListener('mousemove', onMove)
        .addEventListener('mouseup', onUp) */
  })
