/**
 * The main script file of the application.
 *
 * @author Beatriz Sanssi <bs222eh@student.lnu.se>
 * @version 1.0.0
 */
import './components/memory/memory-game.js'
document.addEventListener('DOMContentLoaded', function () {
  const desktop = document.getElementById('desktop')
  const dockIcons = document.querySelectorAll('.dock-icon')

  dockIcons.forEach(icon => {
    icon.addEventListener('click', function () {
      openWindow(this.dataset.app)
    })
  })

  function openWindow (appName) {
    const windowTemplate = document.getElementById('windowTemplate')
    const windowClone = windowTemplate.content.cloneNode(true)
    const newWindow = windowClone.querySelector('.window')
    const titleBar = newWindow.querySelector('.title-bar')
    const closeButton = newWindow.querySelector('.close-button')

    titleBar.addEventListener('mousedown', startDrag)
    closeButton.addEventListener('click', () => newWindow.remove())

    desktop.appendChild(newWindow)
  }

  function startDrag (e) {
    const el = e.target.parentElement
    let prevX = e.clientX
    let prevY = e.clientY

    const onMove = (e) => {
      let newX = prevX - e.clientX
      let newY = prevY - e.clientY
      const rect = el.getBoundingClientRect()

      el.style.left = rect.left - newX + 'px'
      el.style.top = rect.top - newY + 'px'

      prevX = e.clientX
      prevY = e.clientY
    }

    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
})
