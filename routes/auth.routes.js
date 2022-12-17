const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')

const controller = require('../controllers/auth.controller')

const { registerValidation } = require('../validation')

const { verifyLogin } = require('../middleware/verifyLogin')

router.post('/register', async (req, res) => {
  // Validate data from req
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if user is already in DB
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already in use!')

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })
  try {
    const savedUser = await user.save()
    res.send(savedUser._id)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Login
router.post('/login', [verifyLogin.loginValidation], controller.signin)

module.exports = router
