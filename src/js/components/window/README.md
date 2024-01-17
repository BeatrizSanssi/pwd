# App Window Web Component

## Description

The App Window is a custom web component designed to create movable and closable window elements in web projects. It offers a flexible way to add draggable windows with customizable content and title bars.

## Features

- **Movable Window**: Users can drag the window around the screen.
- **Closable Window**: Includes a close button to hide the window.
- **Customizable Content**: The window's content can be dynamically added.
- **Title Bar**: Features a title bar that displays the window's title and serves as a drag handle.

- **Movable Window**: Users can drag and move the window around the screen.
- **Closable Window**: Features a close button for hiding the window.
- **Customizable Content**: Dynamic content can be added to the window.
- **Title Bar**: Includes a title bar that displays the window's title and can be used to drag the window.

## Installation

To use the App Window in your project, you can either install it via npm or include the `app-window.js` file directly.

## Usage

To use the App Window in your project, import the `app-window.js` file and then use the `<app-window></app-window>` tag in your HTML.

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="path/to/app-window.js"></script>
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

## Customization

The appearance of the window can be customized via CSS. Default styles are defined within the component's template and can be overridden as per the project's requirements.

## Dependencies

This component does not have external dependencies but requires a modern browser that supports Web Components and Shadow DOM.

## Author

Beatriz Sanssi

Email: <bs222eh@student.lnu.se>
Version: 1.0.0
