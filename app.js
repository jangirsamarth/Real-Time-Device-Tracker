const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');
const User = require('./models/User');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Passport configuration
require('./config/passport')(passport);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());  // Initialize connect-flash middleware

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io setup
io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data });
        console.log(`Latitude: ${data.latitude}, Longitude: ${data.longitude}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        io.emit('user-disconnected', socket.id);
    });
});

// Routes

app.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true  // Enable flash messages for failure
}));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('User registration failed.');
    }
});

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.render('login', { message: req.flash('error') });  // Pass flash messages to EJS
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.set('view engine', 'ejs');

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
