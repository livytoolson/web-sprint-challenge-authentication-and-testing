const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
        // do i need to add password here
    }

    const options = {
        expiresIn: '4h'
    }

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = {
    generateToken
}