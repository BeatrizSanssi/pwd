/**
 * The messenger-app web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

import './nickname-form.js'
import './emoji-picker.js'

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
  width: 500px;
  max-height: 100%;
}

#messages {
  font-family: 'NT Adventure';
  background-color: white;
  color: rgb(76, 99, 76);
  padding: 10px;
  margin: 10px;
  width: 80%;
  max-height: 300px;
  overflow-y: auto;
}

#message-input {
  font-family: 'NT Adventure';
  background-color: white;
  color: rgb(76, 99, 76);
  padding: 9px;
  margin: 8px;
  width: 80%;
  height: 90%;
}

.close {
  color: gray;
  float: right;
  font-size: 40px;
  font-weight: bold;
  margin: 10px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.message {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: flex-start; 
}

.message-header {
  display: flex;
  flex-wrap: nowrap;
}

.sent-message {
  text-align: right;
  padding: 10px;
}

.received-message {
  text-align: left;
  font-style: italic;
  padding: 10px;
}

.message-time {
  display: block;
  font-size: 0.8em;
  color: gray;
  margin-right: auto;
  margin-left: 15px;
  white-space: nowrap;
}

.message-content {
  flex-grow: 1;
  word-break: break-word;
  padding-left: 5px;
  margin-right: 20px;
}

.message-username {
  font-weight: bold;
  padding-right: 5px;
}

#send-button {
   margin: 10px;
}
  
</style>
<nickname-form></nickname-form>
<div id="messenger-app">
  <span class="close">&times;</span>
    <div id="messages"></div>
    <textarea id="message-input"></textarea>
    <emoji-picker></emoji-picker>
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
    #nicknameForm
    #emojiPicker
    #socket
    /**
     * The message input element.
     *
     * @type {HTMLTextAreaElement}
     */
    #messageInput
    /**
     * The messages div element.
     *
     * @type {HTMLDivElement}
     */
    #messages
    /**
     * The send button element.
     *
     * @type {HTMLButtonElement}
     */
    #sendButton
    /**
     * The messenger app div element.
     *
     * @type {HTMLDivElement}
     */
    #messengerApp
    /**
     * The close button element.
     *
     * @type {HTMLSpanElement}
     */
    #closeButton

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
      this.#messengerApp = this.shadowRoot.getElementById('messenger-app')
      this.#emojiPicker = this.shadowRoot.querySelector('emoji-picker')
      this.#socket = null
      this.messageBuffer = []

      // Create audio elements
      this.messageSound = new Audio('js/components/messenger-app/messenger-sounds/messageSound.mp3')
      this.logInSound = new Audio('js/components/messenger-app/messenger-sounds/logInSound.mp3')
      this.sendMessageSound = new Audio('js/components/messenger-app/messenger-sounds/sendMessageSound.mp3')

      // Add event listener
      this.#emojiPicker.addEventListener('emojiSelected', (event) => {
        const emoji = event.detail.emoji
        this.insertEmoji(emoji)
      })
    }

    /**
     * Called after the element is inserted into the DOM.
     */
    async connectedCallback () {
      // Add event listener to nickname form
      this.#nicknameForm.addEventListener('nicknameSubmitted', (event) => {
        const nickname = event.detail.nickname
        console.log(`Nickname submitted: ${nickname}`)
        this.onSubmit()
      })

      await this.hideMessengerComponents()
      this.#messageInput = this.shadowRoot.getElementById('message-input')
      this.#messages = this.shadowRoot.getElementById('messages')
      this.#sendButton = this.shadowRoot.getElementById('send-button')
      this.#closeButton = this.shadowRoot.querySelector('.close')

      // Add keydown event listener to message input
      this.#messageInput.addEventListener('keydown', (event) => {
        this.handleInputKeydown(event)
      })

      // Add event listener to send button
      this.#sendButton.addEventListener('click', () => this.sendMessage())

      // Add event listener to the close button
      this.#closeButton.addEventListener('click', async () => {
        const nickname = localStorage.getItem('nickname')
        if (this.#socket && this.#socket.readyState === WebSocket.OPEN) {
          // Send a message to the server that the user has left
          const logoutMessage = JSON.stringify({
            type: 'logout',
            data: `${nickname} has left the chat.`,
            username: nickname,
            key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
            timestamp: new Date()
          })
          await this.#socket.send(logoutMessage)

          // Close the WebSocket connection
          this.#socket.close()
        }

        // Hide the messenger app UI
        this.#messengerApp.style.display = 'none'
        this.#nicknameForm.innerHTML = ''
      })
      // Prevent elements from being dragged
      this.#nicknameForm.addEventListener('mousedown', (event) => {
        event.stopPropagation()
      })
      this.#messageInput.addEventListener('mousedown', (event) => {
        event.stopPropagation()
      })
      this.#emojiPicker.addEventListener('mousedown', (event) => {
        event.stopPropagation()
      })
      this.#sendButton.addEventListener('mousedown', (event) => {
        event.stopPropagation()
      })

      // Set attribute to make the elements focusable
      this.#messageInput.setAttribute('tabindex', '0')
      this.#sendButton.setAttribute('tabindex', '0')
      this.#closeButton.setAttribute('tabindex', '0')
    }

    /**
     * Hides the messenger components and displays the nickname form.
     */
    hideMessengerComponents () {
      this.#nicknameForm.style.display = 'block'
      this.#messengerApp.style.display = 'none'
      this.#emojiPicker.style.display = 'none'
    }

    /**
     * Starts the messenger app when the nickname is submitted.
     */
    async onSubmit () {
      await this.startMessengerApp()
      this.initializeWebSocket()
      this.logInSound.play()
    }

    /**
     * Hides the nickname form and displays the messenger app elements.
     */
    startMessengerApp () {
      this.#nicknameForm.style.display = 'none'
      this.#messengerApp.style.display = 'block'
      this.#emojiPicker.style.display = 'block'
    }

    /**
     * Initializes the WebSocket connection.
     */
    initializeWebSocket () {
      this.#socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

      this.#socket.addEventListener('open', (event) => {
        console.log('WebSocket open:', event)
      })

      this.#socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data)
        this.handleIncomingMessage(message)
        this.scrollMessagesToBottom()
      })

      this.#socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error)
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Error connecting to server. Please try again later.'
        errorMessage.style.color = 'red'
        // Append error message to the message list
        this.#messages.appendChild(errorMessage)
      })

      // Add event listener to the WebSocket close event
      this.#socket.addEventListener('close', (event) => {
        console.log('WebSocket closed:', event)
      })
    }

    /**
     * Inserts an emoji into the message input.
     *
     * @param {string} emoji - The emoji to insert.
     */
    insertEmoji (emoji) {
      this.#messageInput.value += emoji
      this.#messageInput.focus()
    }

    /**
     * Sends a message.
     */
    async sendMessage () {
      const message = this.#messageInput.value
      const nickname = localStorage.getItem('nickname')

      if (message) {
        const data = JSON.stringify({
          type: 'message',
          data: message,
          username: nickname,
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd',
          timestamp: new Date()
        })

        await this.#socket.send(data)
        this.#messageInput.value = ''
        this.sendMessageSound.play()
      }
    }

    /**
     * Handles incoming message.
     *
     * @param {object} message - The message object.
     */
    async handleIncomingMessage (message) {
      if (message.type === 'heartbeat') {
        // Ignore heartbeats
        return
      }

      // Add new message to the buffer
      this.messageBuffer.push(message)

      // Get the current user's nickname
      const nickname = localStorage.getItem('nickname')

      // Add a timestamp to the message
      message.timestamp = new Date()

      if (message.type === 'message' && message.username !== nickname) {
        this.messageSound.play()
      }

      // Keep only the latest 20 messages
      if (this.messageBuffer.length > 20) {
        this.messageBuffer.shift()
      }

      // Update the message list
      await this.displayMessages()
    }

    /**
     * Displays messages.
     */
    displayMessages () {
      this.#messages.innerHTML = ''

      // Iterate over the message buffer and create elements for each message
      this.messageBuffer.forEach(message => {
        const messageDiv = document.createElement('div')
        messageDiv.classList.add('message')

        // Check if the message is from the current user or another user
        const isSentByCurrentUser = message.username === this.username

        // Format date and time
        const dateTime = message.timestamp.toLocaleString('sv-SE')

        // Apply different styles based on the sender
        if (isSentByCurrentUser) {
          messageDiv.classList.add('sent-message')
        } else {
          messageDiv.classList.add('received-message')
        }

        // Set the innerHTML of the message
        messageDiv.innerHTML = `
        <span class="message-header">
          <span class="message-username"> ${message.username} </span>:
        </span>
        <span class="message-content">  ${message.data} </span>
        <span class="message-time"> - ${dateTime}</span>
        `
        this.#messages.appendChild(messageDiv)
      })

      // Scroll to the bottom of the message list
      this.#messages.scrollTop = this.#messages.scrollHeight
    }

    /**
     * Scrolls messages to bottom.
     */
    scrollMessagesToBottom () {
      setTimeout(() => {
        this.#messages.scrollTop = this.#messages.scrollHeight
      }, 100)
    }

    /**
     * Handles input keydown.
     *
     * @param {Event} event - The event.
     */
    handleInputKeydown (event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.sendMessage()
      }
    }
  })
