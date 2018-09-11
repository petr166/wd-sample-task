const mongoose = require('mongoose');

// BoatSubtype schema
const BoatSubtypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: String,
  boat_type_id: mongoose.Schema.Types.ObjectId, // not required because it's not needed for the task
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

const BoatSubtype = mongoose.model('BoatSubtype', BoatSubtypeSchema);
module.exports = BoatSubtype;
