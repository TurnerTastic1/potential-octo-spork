// Validation
const Joi = require('@hapi/joi')

// Login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  })
  if (!schema.validate(req.body)) return res.status(400).send('validation error')
}

const verifyLogin = {
  loginValidation
}

module.exports = verifyLogin
