/**
 * The emoji-picker web component module.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
<style>
.emoji-picker {
    position: absolute;
    display: none;
    border: 1px solid black;
    padding: 10px;
    background-color: white;
}

.emoji {
    cursor: pointer;
    padding: 5px;
}

#emoji-button {
    margin: 10px;
    padding: 5px;
}

.emoji:focus {
    outline: 2px solid blue; 
}
  
</style>
<button id="emoji-button">😀</button>
<div id="emoji-picker" class="emoji-picker" tabindex="-1">
    <span class="emoji">😀</span>
    <span class="emoji">😃</span>
    <span class="emoji">😄</span>
    <span class="emoji">😁</span>
    <span class="emoji">😆</span>
    <span class="emoji">😅</span>
    <span class="emoji">😂</span>
    <span class="emoji">🤣</span>
    <span class="emoji">😊</span>
    <span class="emoji">😇</span>
    <span class="emoji">🙂</span>
    <span class="emoji">🙃</span>
    <span class="emoji">😉</span>
    <span class="emoji">😌</span>
    <span class="emoji">😍</span>
    <span class="emoji">🥰</span>
    <span class="emoji">😘</span>
    <span class="emoji">😗</span>
    <span class="emoji">😙</span>
    <span class="emoji">😚</span>
    <span class="emoji">😋</span>
    <span class="emoji">😛</span>
    <span class="emoji">😝</span>
    <span class="emoji">😜</span>
    <span class="emoji">🤪</span>
    <span class="emoji">🤨</span>
    <span class="emoji">🧐</span>
    <span class="emoji">🤓</span>
    <span class="emoji">😎</span>
    <span class="emoji">🤩</span>
    <span class="emoji">🥳</span>
    <span class="emoji">😏</span>
    <span class="emoji">😒</span>
    <span class="emoji">😞</span>
    <span class="emoji">😔</span>
    <span class="emoji">😟</span>
    <span class="emoji">😕</span>
    <span class="emoji">🙁</span>
    <span class="emoji">☹️</span>
    <span class="emoji">😣</span>
    <span class="emoji">😖</span>
    <span class="emoji">😫</span>
    <span class="emoji">😩</span>
    <span class="emoji">🥺</span>
    <span class="emoji">😢</span>
    <span class="emoji">😭</span>
    <span class="emoji">😤</span>
    <span class="emoji">😠</span>
    <span class="emoji">😡</span>
    <span class="emoji">🤬</span>
    <span class="emoji">🤯</span>
    <span class="emoji">😳</span>
    <span class="emoji">🥵</span>
    <span class="emoji">🥶</span>
    <span class="emoji">😱</span>
    <span class="emoji">😨</span>
    <span class="emoji">😰</span>
    <span class="emoji">😥</span>
    <span class="emoji">😓</span>
    <span class="emoji">🤗</span>
    <span class="emoji">🤔</span>
    <span class="emoji">🤭</span>
    <span class="emoji">🤫</span>
    <span class="emoji">🤥</span>
    <span class="emoji">😶</span>
    <span class="emoji">😐</span>
    <span class="emoji">😑</span>
    <span class="emoji">😬</span>
    <span class="emoji">🙄</span>
    <span class="emoji">😯</span>
    <span class="emoji">😦</span>
    <span class="emoji">😧</span>
    <span class="emoji">😮</span>
    <span class="emoji">😲</span>
    <span class="emoji">🥱</span>
    <span class="emoji">😴</span>
    <span class="emoji">🤤</span>
    <span class="emoji">😪</span>
    <span class="emoji">😵</span>
    <span class="emoji">🤐</span>
    <span class="emoji">🥴</span>
    <span class="emoji">🤢</span>
    <span class="emoji">🤮</span>
    <span class="emoji">🤧</span>
    <span class="emoji">😷</span>
    <span class="emoji">🤒</span>
    <span class="emoji">🤕</span>
    <span class="emoji">🤑</span>
    <span class="emoji">🤠</span>
    <span class="emoji">😈</span>
    <span class="emoji">👿</span>
    <span class="emoji">👹</span>
    <span class="emoji">👺</span>
    <span class="emoji">🤡</span>
    <span class="emoji">💩</span>
    <span class="emoji">👻</span>
    <span class="emoji">💀</span>
    <span class="emoji">☠️</span>
    <span class="emoji">👽</span>
    <span class="emoji">👾</span>
    <span class="emoji">🤖</span>
    <span class="emoji">🎃</span>
    <span class="emoji">😺</span>
    <span class="emoji">😸</span>
    <span class="emoji">😹</span>
    <span class="emoji">😻</span>
    <span class="emoji">😼</span>
    <span class="emoji">😽</span>
    <span class="emoji">🙀</span>
    <span class="emoji">😿</span>
    <span class="emoji">😾</span>
    <span class="emoji">🙈</span>
    <span class="emoji">🙉</span>
    <span class="emoji">🙊</span>
    <span class="emoji">💋</span>
    <span class="emoji">💌</span>
    <span class="emoji">💘</span>
    <span class="emoji">💝</span>
    <span class="emoji">💖</span>
    <span class="emoji">💗</span>
    <span class="emoji">💓</span>
    <span class="emoji">💞</span>
    <span class="emoji">💕</span>
    <span class="emoji">💟</span>
    <span class="emoji">❣️</span>
    <span class="emoji">💔</span>
    <span class="emoji">❤️</span>
    <span class="emoji">🧡</span>
    <span class="emoji">💛</span>
    <span class="emoji">💚</span>
    <span class="emoji">💙</span>
    <span class="emoji">💜</span>
    <span class="emoji">🤎</span>
    <span class="emoji">🖤</span>
    <span class="emoji">🤍</span>
    <span class="emoji">💯</span>
    <span class="emoji">💢</span>
    <span class="emoji">💥</span>
    <span class="emoji">💫</span>
    <span class="emoji">💦</span>
    <span class="emoji">💨</span>
    <span class="emoji">🕳️</span>
    <span class="emoji">💣</span>
    <span class="emoji">💬</span>
    <span class="emoji">👁️‍🗨️</span>
    <span class="emoji">🗨️</span>
    <span class="emoji">🗯️</span>
    <span class="emoji">💭</span>
    <span class="emoji">💤</span>
    <span class="emoji">👋</span>
    <span class="emoji">🤚</span>
    <span class="emoji">🖐️</span>
    <span class="emoji">✋</span>
    <span class="emoji">🖖</span>
    <span class="emoji">👌</span>
    <span class="emoji">🤏</span>
    <span class="emoji">✌️</span>
    <span class="emoji">🤞</span>
    <span class="emoji">🤟</span>
    <span class="emoji">🤘</span>
    <span class="emoji">🤙</span>
    <span class="emoji">👈</span>
    <span class="emoji">👉</span>
    <span class="emoji">👆</span>
    <span class="emoji">🖕</span>
    <span class="emoji">👇</span>
    <span class="emoji">☝️</span>
    <span class="emoji">👍</span>
    <span class="emoji">👎</span>
    <span class="emoji">✊</span>
    <span class="emoji">👊</span>
    <span class="emoji">🤛</span>
    <span class="emoji">🤜</span>
    <span class="emoji">👏</span>
    <span class="emoji">🙌</span>
    <span class="emoji">👐</span>
    <span class="emoji">🤲</span>
    <span class="emoji">🤝</span>
    <span class="emoji">🙏</span>
    <span class="emoji">✍️</span>
    <span class="emoji">💅</span>
    <span class="emoji">🤳</span>
    <span class="emoji">💪</span>
    <span class="emoji">🦾</span>
    <span class="emoji">🦿</span>
    <span class="emoji">🦵</span>
    <span class="emoji">🦶</span>
    <span class="emoji">👂</span>
    <span class="emoji">🦻</span>
    <span class="emoji">👃</span>
    <span class="emoji">🧠</span>
    <span class="emoji">🦷</span>
    <span class="emoji">🦴</span>
    <span class="emoji">👀</span>
    <span class="emoji">👁️</span>
    <span class="emoji">👅</span>
    <span class="emoji">👄</span>
    <span class="emoji">👶</span>
    <span class="emoji">🧒</span>
    <span class="emoji">👦</span>
    <span class="emoji">👧</span>
    <span class="emoji">🧑</span>
    <span class="emoji">👱</span>
    <span class="emoji">👨</span>
    <span class="emoji">🧔</span>
    <span class="emoji">👨‍🦰</span>
    <span class="emoji">👨‍🦱</span>
    <span class="emoji">👨‍🦳</span>
    <span class="emoji">👨‍🦲</span>
    <span class="emoji">👩</span>
    <span class="emoji">👩‍🦰</span>
    <span class="emoji">🧑‍🦰</span>
    <span class="emoji">👩‍🦱</span>
    <span class="emoji">🧑‍🦱</span>
</div>

`

/*
 * Define custom element.
 */
customElements.define('emoji-picker',
  /**
   * Represents a memory game
   */
  class extends HTMLElement {
    emojiPicker
    emojiButton

    /**
     * Creates an instance of the current type.
     */
    constructor () {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))

      // Get the emoji button element in the shadow root.
      this.emojiButton = this.shadowRoot.getElementById('emoji-button')

      // Get the emoji-picker element in the shadow root.
      this.emojiPicker = this.shadowRoot.querySelector('.emoji-picker')

      // Get the emojis element in the shadow root.
      // this.emojis = this.shadowRoot.querySelectorAll('emoji')
      // this.insertEmoji = this.insertEmoji.bind(this)
      this.focusedIndex = 0

      // Add event listener to emoji button
      this.emojiButton.addEventListener('click', (event) => {
        this.toggleEmojiPicker()
        event.stopPropagation() // Prevent event from propagating to the document
      }) // this.shadowRoot.querySelectorAll('emoji').forEach(emoji => {
      // emoji.addEventListener('click', () => this.insertEmoji(emoji.textContent))
      // })

      // Add event listeners to emojis
      this.emojiPicker.querySelectorAll('.emoji').forEach(emoji => {
        emoji.setAttribute('tabindex', '0')
        emoji.addEventListener('click', () => this.selectEmoji(emoji))
        emoji.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            this.selectEmoji(emoji)
            this.closeEmojiPicker()
          }
        })
      })

      /* // Add event listeners
      emoji.addEventListener('keydown', (event) ) => {
        if (event.key === 'Enter') {
            this.selectEmoji(emoji)
        const selectedEmoji = emoji.textContent
        this.dispatchEvent(new CustomEvent('emojiSelected', { detail: { emoji: selectedEmoji }, bubbles: true }))
      }) */
      // Close emoji picker when clicking outside
      document.addEventListener('click', (event) => {
        if (!this.contains(event.target) && this.emojiPicker.style.display === 'block') {
          this.toggleEmojiPicker()
        }
      })
    }

    /**
     * Close the emoji picker.
     */
    closeEmojiPicker () {
      this.emojiPicker.style.display = 'none'
    }

    /**
     * Toggle the visibility of the emoji picker.
     *
    toggleVisbility () {
      if (this.style.display === 'none' || this.style.display === '') {
        this.style.display = 'block'
      } else {
        this.style.display = 'none'
      }
    } */

    /**
     * Toggle the visibility of the emoji picker.
     */
    toggleEmojiPicker () {
      this.emojiPicker.style.display = this.emojiPicker.style.display === 'block' ? 'none' : 'block'
      this.emojiPicker.focus()
    }

    /**
     * Handle keydown events.
     *
     * @param {KeyboardEvent} event - The keydown event.
     */
    handleKeyDown (event) {
      if (event.key === 'Enter' && this.emojiPicker.style.display === 'block') {
        // Enter key is pressed while emoji picker is open, select the emoji
        const selectedEmoji = this.emojiPicker.querySelectorAll('.emoji.focused')[0]
        if (selectedEmoji) {
          console.log('Selected emoji:', selectedEmoji.textContent)
          this.toggleEmojiPicker()
        }
      }
    }
    /* const rowCount = 18 // Assuming 5 emojis per row, adjust as needed
      switch (event.key) {
        case 'ArrowRight':
          this.focusedIndex = (this.focusedIndex + 1) % this.emojis.length
          break
        case 'ArrowLeft':
          this.focusedIndex = (this.focusedIndex - 1 + this.emojis.length) % this.emojis.length
          break
        case 'ArrowDown':
          this.focusedIndex = (this.focusedIndex + rowCount) % this.emojis.length
          break
        case 'ArrowUp':
          this.focusedIndex = (this.focusedIndex - rowCount + this.emojis.length) % this.emojis.length
          break
        case 'Enter':
          this.selectEmoji(this.focusedIndex)
          break
        default:
          return // Ignore other keys
      }
      this.updateFocus()
    } */

    /**
     * Update the focus.
     */
    updateFocus () {
      // Remove focus from all emojis
      this.emojis.forEach(emoji => emoji.classList.remove('focused'))

      // Add focus to the new emoji
      this.emojis[this.focusedIndex].classList.add('focused')
    }

    /**
     * Select the emoji.
     *
     * @param {HTMLElement} emojiElement - The emoji element.
     */
    selectEmoji (emojiElement) {
      // Logic to handle emoji selection
      const selectedEmoji = emojiElement.textContent
      this.dispatchEvent(new CustomEvent('emojiSelected', { detail: { emoji: selectedEmoji }, bubbles: true }))
      console.log('Selected emoji:', selectedEmoji)
    }
  })
