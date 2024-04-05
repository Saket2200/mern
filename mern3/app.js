const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const matchRoutes = require('./routes/matchRoutes');

const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/auth', authRoutes);
app.use('/messages', authenticateToken, messageRoutes);
app.use('/matches', authenticateToken, matchRoutes);

// Redirect to sign-in page for root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

// Handle successful sign-in
app.post('/auth/signin', (req, res) => {
    // Assuming authentication is successful and you have a user object
    const user = {
        id: 1,
        username: 'example'
        // Add other user properties as needed
    };

    // Assuming you have a token generation mechanism
    const token = generateToken(user);

    // Redirect the user to the message page with the token as a query parameter
    res.redirect(`/messages?token=${token}`);
});

// Example function for generating JWT token
function generateToken(user) {
    // Implement your token generation logic here
    // For example, using jsonwebtoken library
    const jwt = require('jsonwebtoken');
    const secretKey = 'your_secret_key'; // Change this to your actual secret key
    const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
    return token;
}

// Middleware to handle requests from loveg.com
app.use((req, res, next) => {
    const hostname = req.hostname;
    if (hostname === 'loveg.com') {
        // Redirect to your app's URL
        res.redirect('https://loveg.com');
    } else {
        next();
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
