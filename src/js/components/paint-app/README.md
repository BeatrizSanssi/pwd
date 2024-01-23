# Paint App Web Component

## Description

The Paint App is a custom web component that provides a simple canvas for drawing, coloring, and erasing. It's designed to be easy to integrate into web projects and offers a range of basic drawing tools.

### Features

- **Adjustable Drawing Pen**: Offers a customizable pen tool for varied line thickness, ideal for both detailed drawing and broad strokes.

- **Adjustable Eraser**: Includes an eraser with adjustable size, perfect for precise corrections or erasing larger areas.

- **Color Picker**: A built-in color palette allows users to choose from a variety of colors.

- **Colorizing Tool**: The Paint Colorizer enables easy filling of specific canvas areas with the selected color.

- **Restart Button**: A single-click button to clear the canvas, providing a clean slate for new creations or for trying out different ideas.

- **Responsive Canvas**: The canvas responds fluidly to user inputs, offering a smooth drawing experience with accurate tracking of mouse or touch interactions.

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

## Methods

- `startDrawing(x, y)`: Initializes the drawing process at the specified x and y coordinates on the canvas.
- `draw(x, y)`: Continues the drawing path to the specified x and y coordinates.
- `erase(x, y)`: Erases content on the canvas at the specified x and y coordinates.
- `handleColorize(event, hexColor)`: Fills an area on the canvas with a specified color.
- `clearCanvas()`: Clears all content from the canvas.

## Event Listeners

The Paint App uses various event listeners for interactive functionality:

- **Canvas Mouse Events**: Listens to `mousedown`, `mouseup`, `mousemove` on the canvas for drawing and erasing.
- **Tool Button Clicks**: Detects clicks on tool buttons like the eraser, color picker, and restart button.
- **Color Change**: Listens for changes in color selection from the color picker.

## Attributes

- `canvasWidth`: Sets the width of the canvas.
- `canvasHeight`: Sets the height of the canvas.
- `defaultPenColor`: Specifies the default color of the pen.

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
