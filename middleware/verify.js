const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(403).send({
      message: 'No token provided'
    })
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    // req.userId = decoded.id //! What is this?
    console.log('JWT correct')
    next()
  })
}
const verify = {
  verifyToken
}

module.exports = verify
