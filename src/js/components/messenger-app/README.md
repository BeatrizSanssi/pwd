# Messenger App Web Component

## Description

The Messenger App is a custom web component designed to provide an interactive and user-friendly chat interface. It's built to be easily integrated into web projects, enabling real-time messaging with additional features like emoji support and nickname customization.

## Features

- Real-Time Messaging: Users can send and receive messages instantly.
- Emoji Picker: A wide range of emojis to enhance the chat experience.
- Nickname Customization: Users can set their nicknames for personalized communication.
- Dynamic Message Display: Messages are displayed with the sender's nickname and timestamp.
- Audio Notifications: Sounds for login, message sending, and message receiving events.

## Usage

To use the Messenger App in your project, import the messenger-app.js, emoji-picker.js, and nickname-form.js files and then use the respective tags in your HTML.

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
