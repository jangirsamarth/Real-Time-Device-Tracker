# Real-Time Device Tracker

## Overview

Real-Time Device Tracker is a dynamic application built with Node.js, Express, Socket.IO, and Leaflet that tracks and visualizes the locations of devices on a map in real time. It’s designed to provide a seamless experience for monitoring multiple devices and displaying their locations with live updates.

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
   git clone https://github.com/username/repository-name.git
   cd repository-name
