const mongoose = require('mongoose');

// Boat schema
const BoatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true },
  boat_subtype_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BoatSubtype',
    required: true,
  },
  engine_id: mongoose.Schema.Types.ObjectId, // not required because it's not needed for the task
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  engine_serial_number: { type: Number, required: true },
  description: { type: String, required: true },
  length: { type: Number, required: true },
  address: { type: String, required: true },
  zip_code: { type: String, required: true },
  city: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

const Boat = mongoose.model('Boat', BoatSchema);
module.exports = Boat;
