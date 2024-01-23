# App Window Web Component

## Description

The App Window is a custom web component designed to create movable and closable window elements in web projects. It offers a flexible way to add draggable windows with customizable content and title bars.

## Features

- **Movable Window**: Users can drag the window around the screen.
- **Closable Window**: Includes a close button to hide the window.
- **Customizable Content**: The window's content can be dynamically added.
- **Title Bar**: Features a title bar that displays the window's title.

## Installation

To use the App Window in your project, you can either install it via npm or include the `app-window.js` file directly.

## Usage

To use the App Window in your project, import the `app-window.js` file and then use the `<app-window></app-window>` tag in your HTML.

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="./js/components/window/index.js"></script>
    <!-- Head content -->
</head>
<body>
    <app-window></app-window>
    <!-- Additional content -->
</body>
</html>
```

## Methods

- `addContent(element, title)`: Adds content to the window and sets the title.
- `openWindow()`: Opens and displays the window.
- `closeWindow()`: Closes and hides the window.

## Event Listeners

The App Window component uses event listeners to provide interactive features:

- **Mouse Events for Dragging**: Listens for `mousedown`, `mousemove`, and `mouseup` events to enable the dragging functionality. Users can move the window around by clicking and dragging the window.
- `mousedown` on the window initiates the drag action.
- `mousemove` updates the window's position on the screen.
- `mouseup` releases the window and stops the dragging action.

- **Click Event for Closing**: The close button listens for a click event. When clicked, it triggers the `closeWindow()` method, hiding the window from view.

- **Content Addition Event**: Custom events can be dispatched to dynamically add content to the window. The `addContent(element, title)` method listens for these events, allowing content to be updated programmatically.

## Customization

The appearance of the window can be customized via CSS. Default styles are defined within the component's template and can be overridden as per the project's requirements.

## Dependencies

This component does not have external dependencies but requires a modern browser that supports Web Components and Shadow DOM.

## Author

Beatriz Sanssi

Email: <bs222eh@student.lnu.se>
Version: 1.0.0
