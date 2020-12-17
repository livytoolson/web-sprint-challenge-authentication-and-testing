const User = require('./users-model');
const router = require('express').Router();
const restricted = require('../middleware/restricted');

router.get('/', restricted, (req, res) => {
    User.findAll()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

module.exports = router;