/**
 * The messenger-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './nickname-form.js'
// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
#messenger-app {
    font-family: 'NT Adventure';
    background-color: rgb(76, 99, 76);
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
}

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
<nickname-form></nickname-form>
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
    #nicknameForm
    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      this.#nicknameForm = this.shadowRoot.querySelector('nickname-form')
      this.socket = null
      this.username = localStorage.getItem('username') || this.promptUsername()
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback () {
      this.#nicknameForm.addEventListener('nicknameSubmitted', (event) => {
        const nickname = event.detail.nickname
        console.log(`Nickname submitted: ${nickname}`)
        this.#onSubmit()
      })
      this.#messageInput = this.shadowRoot.getElementById('message-input')
      this.#messages = this.shadowRoot.getElementById('messages')
      this.#sendButton = this.shadowRoot.getElementById('send-button')
      this.#sendButton.addEventListener('click', () => this.sendMessage())

      this.initializeWebSocket()
    }

    /**
     * Handles the click event when the Start Quiz button is clicked.
     * Starts the quiz, displays the next question, and starts the timer.
     */
    #onSubmit () {
      this.startMessengerApp()
    }

    /**
     * Initialize the WebSocket connection.
     */
    initializeWebSocket () {
      this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.socket.addEventListener('open', (event) => {
        console.log('WebSocket open:', event)
      })

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        this.handleIncomingMessage(message)
      })

      this.socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error)
      })
    }

    /**
     * Send a message.
     */
    sendMessage () {
      const message = this.#messageInput.value
      if (message) {
        const data = JSON.stringify({
          type: 'message',
          data: message,
          username: this.username,
          key: 'YOUR_API_KEY' // Replace with your API key
        })

        this.socket.send(data)
        this.#messageInput.value = ''
      }
    }

    /**
     * Handle incoming message.
     *
     * @param {object} message - The message object.
     */
    handleIncomingMessage (message) {
      // Logic to handle incoming message and display in UI
    }
  })
