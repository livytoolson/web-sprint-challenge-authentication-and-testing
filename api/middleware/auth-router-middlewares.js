const User = require('../users/users-model');

const validatePayload = (req, res, next) => {
    let { username, password } = req.body
    if (!username || !password ) {
      res.status(401).json('username and password required')
    } else {
      next()
    }
}

const checkUsernameUnique = async (req, res, next) => {
    try {
      let { username } = req.body
      const rows = await User.findBy({ username: username })
      if (!rows.length) {
        next()
      } else {
        res.status(401).json('username taken')
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
      const rows = await User.findBy({ username: req.body.username })
      if (rows.length) {
          req.userData = rows[0]
          next()
      } else {
          res.status(401).json('invalid credentials')
      }
  } catch (error) {
      res.status(500).json({ message: error.message })
    }
}

module.exports = {
    validatePayload,
    checkUsernameUnique,
    checkUsernameExists
}