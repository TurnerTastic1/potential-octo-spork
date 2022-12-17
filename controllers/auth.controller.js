/**
 * Controller for authenticating user registration and login
 */

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../model/User')
const User = db.user

exports.signin = async (req, res) => {
  // Checking if user/email exists and is in DB
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email is not associated with any known accounts')

  // Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('Auth-token', token).send(token)
}
