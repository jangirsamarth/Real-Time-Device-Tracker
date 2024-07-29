
# Real-Time Device Tracker

## Overview

Real-Time Device Tracker is a dynamic application built with Node.js, Express, Socket.IO, and Leaflet that tracks and visualizes the locations of devices on a map in real-time. It’s designed to provide a seamless experience for monitoring multiple devices and displaying their locations with live updates.

## Features

- **Real-Time Location Tracking**: Devices send their location data to the server, which broadcasts it to all connected clients.
- **Live Map Visualization**: Locations are visualized on a Leaflet map, with automatic updates as new location data is received.
- **Multiple Device Tracking**: Track and display locations of multiple devices simultaneously.
- **Auto-Center on First Device**: Automatically centers the map on the first device location, then maintains the view without auto-centering for subsequent updates.

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Socket.IO**: Real-time communication library for WebSocket support.
- **Leaflet**: Open-source JavaScript library for interactive maps.
- **Mongoose**: MongoDB object modeling tool (optional, if used).

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **Git** for version control.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jangirsamarth/Real-Time-Device-Tracker.git
   cd Real-Time-Device-Tracker
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create Environment File**

   Create a `.env` file in the root directory and add the following line:

   ```env
   MONGO_URI=<Your MongoDB URI>
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

5. **Access the Application**

   Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

## Usage

After starting the server, you can:

- **Log In**: Access the login page and enter your credentials.
- **Track Devices**: Once logged in, the real-time location of devices will be displayed on the map.

## Screenshots

_(Add screenshots of your application here)_

## Contributing

We welcome contributions to this project! If you have any ideas or improvements, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Samarth Jangir

Feel free to ⭐ this repository if you like it!

## Connect with me:

- [LinkedIn](https://www.linkedin.com/in/samarth-jangir)
- [GitHub](https://github.com/jangirsamarth)
```

You can adjust the repository link, add any screenshots, and update other details as needed.
