const express = require('express');
const router = express.Router();
const Person = require('./../state/Person.js');  // Import the Person model
const {authmiddlewear,generateToken}= require('./../jwt.js'); // Import authentication middleware

router.get('/',authmiddlewear, async (req, res) => {
    try {
      const persons = await Person.find();
      res.status(200).json({ message: 'Person data fetched successfully', data: persons });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching persons', error: err.message });
    }
  });
  router.post('/signup', async (req, res) => {
      try {
        const data = req.body;
        
        // Check if the email already exists
        const existingPerson = await Person.findOne({ email: data.email });
        if (existingPerson) {
          return res.status(400).json({ message: 'Email already exists' });
        }
    
        // If no person exists with that email, create the new person
        const newPerson = new Person(data);
        const savedPerson = await newPerson.save();
       const token = generateToken({ username: savedPerson.username });

        res.status(201).json({ message: 'Person created successfully', data: savedPerson ,token:token});
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating person', error: err.message });
      }
    });
   router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await Person.findOne({ username });

    // 2. If user not found or password doesn't match
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 3. Prepare payload
    const payload = {
      id: user.id,
      username: user.username
    };

    // 4. Generate JWT token
    const token = generateToken(payload);

    // 5. Respond with token
    res.status(200).json({ message: "Login successful", token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login error", error: err.message });
  }
});
router.get('/profile', authmiddlewear, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extract the ID from decoded token payload
    const user = await Person.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: 'Profile fetched successfully', data: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile fetch error", error: err.message });
  }
});


    router.get('/:worktype', async (req, res) => {
      try {
        const worktype = req.params.worktype;
        if (worktype === 'chef' || worktype === 'manager' || worktype === 'waiter') {
          const persons = await Person.find({ work: worktype });
          console.log("Saved successfully");
          res.status(200).json({ message: 'Person data fetched successfully', data: persons });
        } else {
          res.status(400).json({ message: 'Invalid worktype' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching persons', error: err.message });
      }
    });
    router.put('/:id', async (req, res) => {
      try {
        const personId = req.params.id;
        const updatedData = req.body;
    
        // Check if the email already exists for another person
        const existingPerson = await Person.findOne({ email: updatedData.email, _id: { $ne: personId } });
        if (existingPerson) {
          return res.status(400).json({ message: 'Email already exists' });
        }
    
        // If no other person exists with that email, update the person
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedData, { new: true });
        if (!updatedPerson) {
          return res.status(404).json({ message: 'Person not found' });
        }
    
        res.status(200).json({ message: 'Person updated successfully', data: updatedPerson });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating person', error: err.message });
      }
    });

module.exports= router;