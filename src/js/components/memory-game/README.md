# Memory Game Web Component

## Description

The Memory Game is a custom web component designed to provide an interactive and engaging memory match experience. This game features a grid of cards, each with a unique image. Players must match pairs of cards, testing their memory and attention to detail. The game is easily integrated into web projects, offering a fun and interactive way to engage users.

## Features

- **Dynamic Grid Layout**: Choose between different grid sizes (4x4, 4x2, 2x2) to adjust the difficulty level.
- **Interactive Cards**: Cards flip to reveal images and flip back if a match is not found.
- **Attempts Counter**: Keeps track of the number of attempts made by the player.
- **Timer**: Keeps track of the time a game is played.
- **Winning Modal**: Displays a congratulatory message upon completing the game with the number of attempts and the time it took to find all the pairs.
- **Customizable Images**: Ability to customize card images through an array of image paths.
- **Responsive Design**: Adapts to various screen sizes and resolutions.

## Usage

Integrating the Memory Game into your web project is straightforward. Follow these simple steps:

1. Import the `memory-game.js` script into your HTML file.
2. Insert the `memory-game` tag where you want the Memory Game to appear.

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="./js/components/memory-game/index.js"></script>
    <!-- Head content -->
</head>
<body>
    <memory-game></memory-game>
    <!-- Additional content -->
</body>
</html>
```

## Methods

- `startGame(gridSize)`: Initializes the game with the - - selected grid size.
- `checkForMatch()`: Checks if the flipped cards are a matching pair.
- `disableCards()`: Disables cards that are matched.
- `unflipCards()`: Turns unmatched cards back over.
- `gameWon()`: Checks if all pairs are matched and displays the winning modal.
- `resetBoard()`: Resets the game board for a new game.

## Event Listeners

- **Card Click**: Flips a card when clicked and checks for matches or mismatches.
- **Start Game Button**: Begins a new game with the selected grid size.
- **Close Button on Modal**: Closes the winning modal and offers a new game option.

## Customization

### Card Images

Change the `cardImages` array within the component to customize the images on the cards.

### Styling

Customize the appearance via CSS. The default styles are defined within the component's template and can be overridden as per project requirements.

## Dependencies

This component is built with vanilla JavaScript and uses modern web standards. It requires a browser that supports Web Components and Shadow DOM.

## Author

Beatriz Sanssi - <bs222eh@student.lnu.se>
Version: 1.0.0
