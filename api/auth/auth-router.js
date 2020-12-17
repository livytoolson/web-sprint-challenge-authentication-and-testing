const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../users/users-model');
const { 
  validatePayload, 
  checkUsernameExists, 
  checkUsernameUnique 
} = require('../middleware/auth-router-middlewares');
const { generateToken } = require('../../config/generateToken');

router.post('/register', validatePayload, checkUsernameUnique, async (req, res) => {
  try {
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcrypt.hashSync(req.body.password, parseInt(rounds))
    req.body.password = hash
    const newUser = await User.add({ username: req.body.username, password: hash})
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

router.post('/login', validatePayload, checkUsernameExists, async (req, res) => {
  try {
    const verifies = bcrypt.compareSync(req.body.password, req.userData.password)
    if (verifies) {
      const token = generateToken(req.userData)
      res.status(200).json({ 
        message: 'Welcome, ' + req.userData.username, 
        token
      })
    } else {
      res.status(401).json('invalid credentials')
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

module.exports = router;
