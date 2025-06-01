const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  work: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Middleware to hash password before saving
personSchema.pre('save', async function (next) {
  const person = this;

  // Only hash the password if it's new or modified
  if (!person.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(person.password, salt);
    person.password = hashed;
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    return next(err);
  }
});

// Instance method to compare entered password with hashed password
personSchema.methods.comparePassword = async function (candidatePassword) {
  try{
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  }catch (err) {
    console.error("Error comparing password:", err);
    throw err; // Rethrow the error for handling in the calling function
  }
  
};



const Person = mongoose.model('Person', personSchema);

module.exports = Person;
