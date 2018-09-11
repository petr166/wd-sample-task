const mongoose = require('mongoose');

// Service schema
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: String,
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;
