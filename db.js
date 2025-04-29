const mongoose = require('mongoose');
require('dotenv').config(); 

  const mongooseurl = process.env.DB_URL // Replace with your MongoDB URI

mongoose.connect(mongooseurl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});
db.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});
db.on('disconnected', () => {
  console.log('⚠️ MongoDB has been disconnected');
});

module.exports = db;
