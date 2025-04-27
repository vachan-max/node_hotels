const express = require('express');
const app = express();
const port = 3000;
const db = require('./db.js');  // Import the DB connection


// Middleware
app.use(express.json());  // Parse JSON request bodies

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



  const menurouter = require('./routes/menuroutes.js');  // Import the Menu routes
app.use('/menu', menurouter);  // Use the menu routes

const personRouter = require('./routes/Personroutes.js');  // Import the Person routes
app.use('/person', personRouter);  // Use the person routes


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
