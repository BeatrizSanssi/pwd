# Paint App Web Component

## Description

The Paint App is a custom web component that provides a simple canvas for drawing, coloring, and erasing. It's designed to be easy to integrate into web projects and offers a range of basic drawing tools.

### Features

- Drawing with adjustable pen size.
- Eraser tool with adjustable size.
- Color picker for selecting drawing colors.
- Colorize tool for filling areas with color.
- Restart button to clear the canvas.

### Usage

Integrating the Paint App into your web project is straightforward. Follow these simple steps:

1. Import the `paint-app.js` script into your HTML file.
2. Insert the `paint-app` tag where you want the Paint App to appear.

### Example

```html
<!DOCTYPE html>
<html>
<head> 
    <script type="module" src="path/to/paint-app.js"></script>
    <!-- Other head elements -->
</head>
<body>
    <!-- Your content -->
    <paint-app></paint-app>
    <!-- More content -->
</body>
</html>
```

## Components

### Paint Pen (paint-pen.js)

The Paint Pen component allows users to draw on the canvas. It includes functionality to change the pen size.

### Color Picker (color-picker.js)

The Color Picker component provides a color palette for choosing drawing colors.

### Paint Eraser (paint-eraser.js)

The Paint Eraser component offers erasing functionality with adjustable eraser size.

### Paint Colorizer (paint-colorizer.js)

The Paint Colorizer allows users to fill areas on the canvas with selected colors.

## Customization

The component's appearance can be customized via CSS. The default styles are set in the component's template.

## Dependencies

This component does not have external dependencies, but it requires a modern browser that supports Web Components and Shadow DOM.

## Author

Beatriz Sanssi - <bs222eh@student.lnu.se>
Version 1.0.0
