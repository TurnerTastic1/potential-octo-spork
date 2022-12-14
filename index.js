const express = require("express");
const app = express();


// Import Routes
const authRoutes = require("./routes/auth");


// Route Middlewares
app.use('/api/user', authRoutes); 




app.listen(3000, () => console.log('Server up and running'));