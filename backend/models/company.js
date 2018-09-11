const mongoose = require('mongoose');

// Company schema
const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  logo_image_url: String,
  cvr: { type: String, required: true },
  is_paid: { type: Boolean, default: false },
  is_enabled: { type: Boolean, default: false },
  is_visible: { type: Boolean, default: false },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;
