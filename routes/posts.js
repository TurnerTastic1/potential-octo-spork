const router = require('express').Router()
const { verifyToken } = require('../middleware/verify')

router.get('/', verifyToken, (req, res) => {
  res.json({
    posts: {
      title: 'my first post', description: 'data you should not access'
    }
  })
})

module.exports = router
