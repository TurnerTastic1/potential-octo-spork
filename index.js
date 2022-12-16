const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Import Routes
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')

dotenv.config()

// Connect to db
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => console.log('connected to db')
)

// Middleware
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoutes)
app.use('/api/posts', postsRoutes)

app.listen(3000, () => console.log('Server up and running'))
