const socket = io();

// Flag to track if the map has already been centered
let hasCentered = false;

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Initialize the map and assign it to a variable
const map = L.map("map").setView([0, 0], 10);

// Use the correct capitalization for Leaflet's tileLayer function and add it to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data © OpenStreetMap contributors"
}).addTo(map);

// Store markers for each user
const markers = {};

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;

    if (!markers[id]) {
        // Create a new marker if it doesn't exist
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    } else {
        // Update the existing marker's position
        markers[id].setLatLng([latitude, longitude]);
    }

    // Center the map on the latest location only if it hasn't been centered yet
    if (!hasCentered) {
        map.setView([latitude, longitude], 10);
        hasCentered = true;  // Set flag to true to prevent further auto-centering
    }
});

// Remove marker on disconnect
socket.on('remove-marker', (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
