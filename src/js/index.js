/**
 * The main script file of the application.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */
import '../js/components/memory-game/index.js'
import '../js/components/messenger-app/index.js'
import '../js/components/paint-app/index.js'
import '../js/components/window/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
.tooltip {
  position: relative;
  background-color: rgb(76, 99, 76);
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 15px;
  visibility: hidden; 
  z-index: 1000; 
}

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
  gap: 20px;
  display: flex;
  flex-direction: row;
  top: 30px;
  left: 30px;
}
</style>
<div id="desktop">
  <!-- Icons in the dock to open windows -->
  <div id="dock">
    <img src="css/img/seedling-solid.svg" class="dock-icon" data-app="memoryGame" data-title="Memory Game" alt="Memory Game Icon">
    <img src="css/img/comments-solid.svg" class="dock-icon" data-app="messengerApp" data-title="Messenger App" alt="Messenger App Icon">
    <img src="css/img/draw.svg" class="dock-icon" data-app="paintApp" data-title="Paint App" alt="Paint App Icon">
  </div>
</div>
`
customElements.define('desktop-app',
  /**
   * Represents the desktop app.
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

      this.openWindows = []
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Set up event listeners for each dock icon
      const dockIcons = this.shadowRoot.querySelectorAll('.dock-icon')
      dockIcons.forEach(icon => {
        icon.addEventListener('mouseover', this.showTooltip.bind(this))
        icon.addEventListener('mouseout', this.hideTooltip.bind(this))
      })

      // Event delegation for dock icon clicks
      const dock = this.shadowRoot.getElementById('dock')
      dock.addEventListener('click', event => {
        const target = event.target
        if (target.classList.contains('dock-icon')) {
          const appName = target.dataset.app
          this.openAppWindow(appName)
        }
      })
      // Focus the window when it's clicked
      this.shadowRoot.addEventListener('click', event => {
        if (event.target.matches('app-window')) {
          this.setFocus(event.target)
        }
      })
    }

    /**
     * Shows the tooltip for the icon.
     *
     * @param {Event} event - The event.
     */
    showTooltip (event) {
      const icon = event.target
      const tooltipText = icon.getAttribute('data-title')

      // Create tooltip element
      const tooltip = document.createElement('div')
      tooltip.classList.add('tooltip')
      tooltip.textContent = tooltipText

      // Append tooltip to the shadow root
      this.shadowRoot.appendChild(tooltip)
      icon.tooltip = tooltip

      // Get the position of the icon
      const rect = icon.getBoundingClientRect()

      // Position the tooltip below the icon
      tooltip.style.position = 'absolute'
      tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px` // Center horizontally
      tooltip.style.top = `${rect.bottom + window.scrollY + 10}px` // Position below the icon, adjust with scrollY for scrolling

      tooltip.style.visibility = 'visible'
    }

    /**
     * Hides the tooltip for the icon.
     *
     * @param {Event} event - The event.
     */
    hideTooltip (event) {
      const targetIcon = event.target
      if (targetIcon.tooltip) {
        this.shadowRoot.removeChild(targetIcon.tooltip)
        targetIcon.tooltip = null
      }
    }

    /**
     * Opens a new window.
     *
     * @param {string} appName - The name of the app to open.
     */
    openAppWindow (appName) {
      console.log('openWindow called with:', appName)

      // Create a new window
      const appWindow = document.createElement('app-window')

      // Depending on the appName, append the correct app to the window
      let appElement
      let title
      if (appName === 'memoryGame') {
        appElement = document.createElement('memory-game')
      } else if (appName === 'messengerApp') {
        appElement = document.createElement('messenger-app')
      } else if (appName === 'paintApp') {
        appElement = document.createElement('paint-app')
      }

      console.log('Created app element:', appElement)
      switch (appName) {
        case 'memoryGame':
          console.log('Desktop App: Creating memory-game element')
          appElement = document.createElement('memory-game')
          title = 'Memory Game'
          break
        case 'messengerApp':
          console.log('Desktop App: Creating messenger-app element')
          appElement = document.createElement('messenger-app')
          title = 'Messenger App'
          break
        case 'paintApp':
          console.log('Desktop App: Creating paint-app element')
          appElement = document.createElement('paint-app')
          title = 'Paint App'
          break
        default:
          console.error(`Unknown app name: ${appName}`)
          return
      }

      if (!appElement) {
        console.error('Desktop App: Failed to create app element for:', appName)
        return
      }
      // Set initial position for the new window
      appWindow.style.position = 'absolute'
      appWindow.style.left = '150px'
      appWindow.style.top = '150px'

      // If you want to offset each window slightly
      appWindow.style.left = `${150 + 40 * this.openWindows.length}px`
      appWindow.style.top = `${150 + 40 * this.openWindows.length}px`

      // Add the app to the window and set focus
      if (appElement) {
        appWindow.addContent(appElement, title)
        const desktop = this.shadowRoot.getElementById('desktop')
        desktop.appendChild(appWindow)
        this.openWindows.push(appWindow)
        this.setFocus(appWindow)

        // Add event listener to the window
        appWindow.addEventListener('click', event => {
          this.setFocus(appWindow)
        })

        // If the title bar is a separate element inside appWindow, add an event listener to it as well
        const titleBar = appWindow.querySelector('.title-bar')
        if (titleBar) {
          titleBar.addEventListener('click', event => {
            this.setFocus(appWindow)
            event.stopPropagation()
          })
        }
      } else {
        console.error(`Failed to create ${appName} element`)
      }
    }

    /**
     * Sets focus to the window.
     *
     * @param {HTMLElement} appWindow - The window to set focus to.
     */
    setFocus (appWindow) {
      const highestZIndex = this.getHighestZIndex()
      this.openWindows.forEach(window => {
        window.style.zIndex = 100
        appWindow.style.zIndex = highestZIndex + 1
      })
    }

    /**
     * Gets the highest z-index of all open windows.
     *
     * @returns {number} The highest z-index.
     */
    getHighestZIndex () {
      let maxZIndex = 100
      this.openWindows.forEach(win => {
        const zIndex = parseInt(win.style.zIndex)
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
          maxZIndex = zIndex
        }
      })
      return maxZIndex
    }
  })
