const express = require('express');
const router = express.Router();
const Menu = require('./../state/menu.js');  // Import the Menu model


// POST route for menu
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving menu item', error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json({ message: 'Menu fetched successfully', data: menuItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching menu', error: err.message });
  }
})
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    if (category === 'spicy' || category === 'sweet' || category === 'salty') {
      const menu = await Menu.find({ taste: category }); // <--- FIXED
      console.log("Saved successfully");
      res.status(200).json({ message: 'menu data fetched successfully', data: menu });
    } else {
      res.status(400).json({ message: 'Invalid worktype' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching menu', error: "menu is not defined" });
  }
});

// PUT route for menu
module.exports= router;