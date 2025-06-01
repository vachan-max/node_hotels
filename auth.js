const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./state/Person'); // Correct relative import
const bcrypt = require('bcrypt');







passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log("username ,password",username,password)
      const user = await Person.findOne({ username });
      if (!user) return done(null, false, { message: 'Incorrect username.' });
  
      const isMatch = await user.comparePassword(password); // In production, use bcrypt
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
  
      return done(null, user);
    } catch (err) {
      return done(err,{message:"error"});
    }
  }));


  module.exports = passport;