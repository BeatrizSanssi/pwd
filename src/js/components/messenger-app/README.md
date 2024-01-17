# Messenger App Web Component

## Description

The Messenger App is a custom web component designed to provide an interactive and user-friendly chat interface. It's built to be easily integrated into web projects, enabling real-time messaging with additional features like emoji support and nickname customization.

## Features

- **Real-Time Messaging**: Instantaneous communication between users.
- **Emoji Picker**: A wide range of emojis to enhance the chat experience.
- **Nickname Customization**: Users can set and display nicknames for a personalized touch.
- **Dynamic Message Display**: Shows messages with sender's nickname and timestamp.
- **Audio Notifications**: Audible alerts for login, message sending, and message receiving.

## Usage

To use the Messenger App in your project, import `messenger-app.js`, `emoji-picker.js`, and `nickname-form.js`. Then, use the `<messenger-app></messenger-app>` tag in your HTML.

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="path/to/messenger-app.js"></script>
    <!-- Head content -->
</head>
<body>
    
    <messenger-app></messenger-app>

    <!-- Additional content -->
</body>
</html>
```

## Methods

The Messenger App provides several methods to interact with the web component:

- `sendMessage()`: Sends the current message written in the message input.
- `handleIncomingMessage(message)`: Handles incoming messages and updates the chat interface.
- `displayMessages()`: Updates and displays messages in the chat interface with the nickname of the sender, the message, and the date and time of when the message was sent or recieved.
- `scrollMessagesToBottom()`: Automatically scrolls to the latest message in the chat interface.
- `insertEmoji(emoji)`: Inserts an emoji into the message input.
- `handleInputKeydown(event)`: Handles keyboard events for the message input, including sending messages with the Enter key.

### Event Listeners

The component also uses various event listeners to handle user interactions such as submitting a nickname, selecting an emoji, and closing the chat interface.

## Components

### Messenger App (messenger-app.js)

This is the main component that encapsulates the entire chat functionality, including message sending and receiving, emoji selection, and nickname setting.

### Emoji Picker (emoji-picker.js)

A subcomponent that provides an emoji selection interface, allowing users to express emotions and reactions in their messages.

### Nickname Form (nickname-form.js)

A form component that allows users to set and submit a nickname, which is then displayed alongside their messages.

## Customization

The component's appearance and behavior can be customized via CSS and JavaScript. Default styles and functionalities are defined within each component's template and can be overridden as per the project's requirements.

## Dependencies

This component requires a modern browser with support for Web Components, Shadow DOM, and WebSocket for real-time messaging.

## Author

Beatriz Sanssi

Email: <bs222eh@student.lnu.se>
Version: 1.0.0
