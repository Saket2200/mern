const authService = require('../services/authService');

async function signUp(req, res) {
    const { username, email, password } = req.body;
    try {
        await authService.signUp(username, email, password);
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;
    const user = await authService.signIn(email, password);
    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    // Implement session management or token-based authentication
    res.status(200).send('Sign in successful');
}

module.exports = { signUp, signIn };
