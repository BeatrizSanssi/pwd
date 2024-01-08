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
    align-items: center;
    color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
    width: 100%;
    height: 100%;
}

#messages {
    font-family: 'NT Adventure';
    background-color: white;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    width: 90%;
    height: 90%;
}

#message-input {
    font-family: 'NT Adventure';
    background-color: white;
    color: rgb(76, 99, 76);
    padding: 10px;
    margin: 10px;
    width: 90%;
    height: 90%;
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
     * Start the messenger app.
     */
    startMessengerApp () {
      this.#nicknameForm.style.display = 'none'
      this.#messageInput.style.display = 'block'
      this.#messages.style.display = 'block'
      this.#sendButton.style.display = 'block'
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
        // Display error message to user
        this.#messages.innerHTML = '<p>Error connecting to server. Please try again later.</p>'
      })
    }

    /**
     * Send a message.
     */
    sendMessage () {
      const message = this.#messageInput.value
      const nickname = localStorage.getItem('nickname')

      if (message) {
        const data = JSON.stringify({
          type: 'message',
          data: message,
          username: nickname,
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd' // Replace with your API key
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
      if (message.type === 'heartbeat') {
        // Ignore heartbeats
        return
      }

      const messageDiv = document.createElement('div')
      messageDiv.textContent = `${message.username}: ${message.data}`
      this.#messages.appendChild(messageDiv)

      // Scroll to the bottom of the message list
      this.#messages.scrollTop = this.#messages.scrollHeight
    }
  })
