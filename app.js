const express = require('express');
const app = express();
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket) {
    console.log('New connection: ' + socket.id);

    // Listen for the 'send-location' event
    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
        console.log(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        io.emit('remove-marker', socket.id);
        console.log('Disconnected: ' + socket.id);
    });
});

app.get('/', function(req, res) {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
