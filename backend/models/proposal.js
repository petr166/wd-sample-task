const mongoose = require('mongoose');

// Proposal schema
const ProposalSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // has time
  description: { type: String, required: true },
  negotiable: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'canceled'],
    default: 'pending',
  },
  company_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

/**
 * Wrapper around .find() to populate the needed props
 * @param {Object} query - get request query to search by
 * @param {String} query.company_id - company id
 * @param {String} query.job_id - job id
 * @param {String} query.status - status
 * @returns {Promise} - mongoose find promise
 */
ProposalSchema.statics.findPopulated = function (query) {
  // ge a clean query object
  const findQuery = {};
  Object.keys(query).forEach((key) => {
    const val = query[key];
    if (val !== undefined) findQuery[key] = val;
  });

  return this.find(findQuery)
    .populate('company_id')
    .populate({
      path: 'job_id',
      populate: [
        { path: 'user_id', select: '-password' },
        { path: 'boat_id', populate: { path: 'boat_subtype_id', select: 'name' } },
        { path: 'service_id', select: 'name' },
      ],
    });
};

const Proposal = mongoose.model('Proposal', ProposalSchema);
module.exports = Proposal;
