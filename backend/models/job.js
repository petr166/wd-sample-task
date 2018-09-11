const mongoose = require('mongoose');

// Job schema
const JobSchema = new mongoose.Schema({
  is_emergency: { type: Boolean, default: false },
  title: { type: String, required: true },
  description: { type: String, required: true },
  allow_contact_by_app: { type: Boolean, default: false },
  can_user_bring_boat: { type: Boolean, default: false },
  allow_picking_from_spot: { type: Boolean, default: false },
  allow_repair_on_spot: { type: Boolean, default: false },
  allow_contact_by_phone: { type: Boolean, default: false },
  allow_contact_by_email: { type: Boolean, default: false },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  price: { type: Number, required: true },
  posted: { type: Boolean, default: false },
  due_date: { type: Date, required: true }, // has date and time
  is_done: { type: Boolean, default: false },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  boat_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Boat', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  awarded_company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
