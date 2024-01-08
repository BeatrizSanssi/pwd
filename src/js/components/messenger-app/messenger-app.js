/**
 * The messenger-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>


  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  
</style>

<div id="messenger-app">
    <div id="messages"></div>
    <textarea id="message-input"></textarea>
    <button id="send-button">Send</button>
</div>


`

/*
 * Define custom element.
 */
customElements.define('messenger-app',
  /**
   * Represents a memory game
   */
  class extends HTMLElement {
    #messageInput
    #messages
    #sendButton
    #sendMessage
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
      * Called after the element is inserted into the DOM.
      */
    connectedCallback () {
      this.#messageInput = this.shadowRoot.getElementById('message-input')
      this.#messages = this.shadowRoot.getElementById('messages')
      this.#sendButton = this.shadowRoot.getElementById('send-button')
      this.#sendButton.addEventListener('click', this.#sendMessage)

      document.addEventListener('DOMContentLoaded', () => {
        const socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
        let username = localStorage.getItem('username') || promptUsername()

        // Handle WebSocket events
        /**
         *
         */
        socket.onopen = () => { /* ... */ }
        /**
         *
         */
        socket.onmessage = (event) => { /* ... */ }
        socket.onerror = (error) => {/* ... */}

        // Send message
        document.getElementById('send-button').addEventListener('click', sendMessage)
      })
      function promptUsername() {
        // Prompt for username and store it
      }

      function sendMessage() {
        // Send message logic
      }
    }
  })