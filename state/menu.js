const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner'],
    required: true,
  },
  description: {
    type: String,
  },
  taste:{
      type:String,
      required:true,
  },
}, {
  timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
