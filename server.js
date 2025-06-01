const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const passport = require('./auth.js');
const bcrypt = require('bcrypt');



const port = process.env.PORT || 3000;

// Connect to DB (assumes db.js handles the connection)
require('./db.js');

app.use(express.json()); // For parsing JSON request bodies

// Logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request to ${req.originalUrl}`);
  next();
});

// Initialize Passport (NO session setup)
app.use(passport.initialize());



const localhostmiddleware =passport.authenticate('local', { session: false })
// Routes
const menuRouter = require('./routes/menuroutes');
app.use('/menu', menuRouter);

const personRouter = require('./routes/Personroutes');
app.use('/person', personRouter);

// Root route
app.get('/', (req, res) => {
  res.send('Hello, world! thus');
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
