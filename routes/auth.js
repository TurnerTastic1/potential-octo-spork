const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcryptjs')

const { registerValidation, loginValidation } = require('../validation')

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
router.post('/login', async (req, res) => {
  // Validate data from req
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Checking if user/email exists and is in DB
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not associated with any known accounts')

  // Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('Auth-token', token).send(token)
})

module.exports = router
