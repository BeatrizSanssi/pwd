document.addEventListener('DOMContentLoaded', function() {
    const desktop = document.getElementById('desktop')
    const dock = document.getElementById('dock')

    // Example: Adding an icon to the dock
    let appIcon = document.createElement('img')
    appIcon.src = 'path_to_icon.png' // Replace with your icon path
    appIcon.addEventListener('click', function() {
        openApp('App1')
    })
    dock.appendChild(appIcon);

    function openApp(appName) {
        let appWindow = document.createElement('div')
        appWindow.innerText = appName
        appWindow.classList.add('app-window')
        desktop.appendChild(appWindow)

        // Make the app window draggable
        
    }
})