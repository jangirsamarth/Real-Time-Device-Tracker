const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('All fields are required');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
        console.error('Error registering user:', err);
    }
});

module.exports = router;
