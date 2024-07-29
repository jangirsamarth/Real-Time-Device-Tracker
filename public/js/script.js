const socket = io();

// Watch the user's position and send updates
if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Sending location: Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging line
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

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "sam"
}).addTo(map);

// Store markers for each user
const markers = {};

// Variable to check if the map has been centered
let isMapCentered = false;

socket.on("receive-location", (data) => {
    const { userId, latitude, longitude } = data;

    console.log(`Received location: UserId: ${userId}, Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging line

    if (!markers[userId]) {
        // Create a new marker if it doesn't exist
        markers[userId] = L.marker([latitude, longitude]).addTo(map);
    } else {
        // Update the existing marker's position
        markers[userId].setLatLng([latitude, longitude]);
    }

    // Auto-center the map on the first device
    if (!isMapCentered) {
        map.setView([latitude, longitude], 10);
        isMapCentered = true;
    }
});
