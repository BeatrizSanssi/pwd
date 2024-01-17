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

To use the Paint App in your project, import the paint-app.js file and then use the
<paint-app></paint-app> tag in your HTML.

Example:

html

<script type="module" src="path/to/paint-app.js"></script>
<paint-app></paint-app>

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
