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

.app-button {
  margin: 10px;
  padding: 10px;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: transparent;
  background-repeat: no-repeat;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
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
    <button class="app-button">
      <img src="css/img/seedling-solid.svg" class="dock-icon" data-app="memoryGame" data-title="Memory Game" alt="Memory Game Icon">
    </button>
    <button class="app-button">
      <img src="css/img/comments-solid.svg" class="dock-icon" data-app="messengerApp" data-title="Messenger App" alt="Messenger App Icon">
    </button>
    <button class="app-button">
      <img src="css/img/pen.svg" class="dock-icon" data-app="paintApp" data-title="Paint App" alt="Paint App Icon">
    </button>
    </div>
</div>
`
customElements.define('desktop-app',
  /**
   * Represents the desktop app.
   */
  class extends HTMLElement {
    #openWindows
    #focusableElements
    #dockIcons
    #appButton
    #dockIcon
    #openAppWindow
    #desktop
    #dock

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#dock = this.shadowRoot.getElementById('dock')
      this.#appButton = this.shadowRoot.querySelectorAll('.dock-icon')
      this.#openWindows = []
      this.#focusableElements = []
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      // Add event listener for keyboard navigation
      this.#dock.querySelectorAll('.app-button').forEach(button => {
        button.addEventListener('keydown', (event) => {
          this.handleKeyDown(event)
        })
      })

      // Add event listener for mouseover and mouseout events
      const dockIcons = this.shadowRoot.querySelectorAll('.dock-icon')
      dockIcons.forEach(Icon => {
        Icon.addEventListener('mouseover', (event) => {
          this.showTooltip(event)
          Icon.addEventListener('mouseout', (event) => {
            this.hideTooltip(event)
          })
        })
      })

      // Add event listener for dock icon clicks
      this.#dock.addEventListener('click', event => {
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
      tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`
      tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`

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
     * Handles the keydown event.
     *
     * @param {Event} event - The event.
     */
    handleKeyDown (event) {
      if (event.key === 'Tab') {
        event.preventDefault()
        // Move focus to the next or previous focusable element,
        // depending on whether the 'Shift' key is also pressed.
        this.moveFocus(event.target, event.shiftKey ? 'backward' : 'forward')
        // Check if the 'Enter' key is pressed
      } else if (event.key === 'Enter') {
        // Find the dock icon inside the button
        const dockIcon = event.target.querySelector('.dock-icon')
        if (dockIcon) {
          const appName = dockIcon.dataset.app
          this.openAppWindow(appName)
        }
      }
    }

    /**
     * Update the focusable elements.
     */
    updateFocusableElements () {
      this.#focusableElements = Array.from(this.#dock.querySelectorAll('.app-button'))
      this.#openWindows.forEach(window => {
        this.#focusableElements.push(window)
      })
    }

    /**
     * Moves focus to the next or previous icon.
     *
     * @param {HTMLElement} currentElement - The current element.
     * @param {string} direction - The direction to move focus to.
     */
    moveFocus (currentElement, direction) {
      this.updateFocusableElements()

      const currentIndex = this.#focusableElements.indexOf(currentElement)

      let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1
      if (nextIndex >= this.#focusableElements.length) {
        nextIndex = 0
      } else if (nextIndex < 0) {
        nextIndex = this.#focusableElements.length - 1
      }

      // Set focus to the next element
      this.#focusableElements[nextIndex].focus()
    }

    /**
     * Opens a new window.
     *
     * @param {string} appName - The name of the app to open.
     */
    openAppWindow (appName) {
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

      switch (appName) {
        case 'memoryGame':
          appElement = document.createElement('memory-game')
          title = 'Memory Game'
          break
        case 'messengerApp':
          appElement = document.createElement('messenger-app')
          title = 'Messenger App'
          break
        case 'paintApp':
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

      appWindow.tabIndex = 0

      // Set initial position for the new window
      appWindow.style.position = 'absolute'
      appWindow.style.left = '150px'
      appWindow.style.top = '150px'

      // Offset each window
      appWindow.style.left = `${150 + 40 * this.#openWindows.length}px`
      appWindow.style.top = `${150 + 40 * this.#openWindows.length}px`

      // Add the app to the window and set focus
      if (appElement) {
        appWindow.addContent(appElement, title)
        const desktop = this.shadowRoot.getElementById('desktop')
        desktop.appendChild(appWindow)
        this.#openWindows.push(appWindow)
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
      this.updateFocusableElements()
    }

    /**
     * Sets focus to the window.
     *
     * @param {HTMLElement} appWindow - The window to set focus to.
     */
    setFocus (appWindow) {
      const highestZIndex = this.getHighestZIndex()
      this.#openWindows.forEach(window => {
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
      this.#openWindows.forEach(win => {
        const zIndex = parseInt(win.style.zIndex)
        if (!isNaN(zIndex) && zIndex > maxZIndex) {
          maxZIndex = zIndex
        }
      })
      return maxZIndex
    }
  })
