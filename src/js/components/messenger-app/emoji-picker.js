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
    float: right;
}
  
</style>
<div id="emoji-picker" class="emoji-picker">
<button id="emoji-button">😀</button>
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
      this.emojiPicker = this.shadowRoot.querySelector('emoji-picker')

      // Get the emojis element in the shadow root.
      this.emojis = this.shadowRoot.querySelectorAll('emoji')

      this.focusedIndex = 0

      // Add event listener to emoji picker
      this.emojiButton.addEventListener('click', () => this.toggleEmojiPicker())
      this.shadowRoot.querySelectorAll('.emoji').forEach(emoji => {
        emoji.addEventListener('click', () => this.insertEmoji(emoji.textContent))
      })

      // Add event listeners
      this.addEventListener('keydown', this.handleKeyDown.bind(this))
    }

    /**
     * Toggle the visibility of the emoji picker.
     */
    toggleVisbility () {
      if (this.style.display === 'none' || this.style.display === '') {
        this.style.display = 'block'
      } else {
        this.style.display = 'none'
      }
    }

    /**
     * Handle keydown events.
     *
     * @param {KeyboardEvent} event - The keydown event.
     */
    handleKeyDown (event) {
      const rowCount = 18 // Assuming 5 emojis per row, adjust as needed
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
    }

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
     * @param {number} index - The index of the emoji.
     */
    selectEmoji (index) {
      // Logic to handle emoji selection
      const selectedEmoji = this.emojis[index].textContent
      console.log('Selected emoji:', selectedEmoji)
    }
  })
