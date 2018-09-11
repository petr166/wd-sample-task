const router = require('express').Router();
const authenticate = require('../middleware/authenticate');
const Proposal = require('../models/proposal');

/**
 * GET - authenticated
 * query: { company_id, job_id, status }
 * success: { proposalList: [Proposal] }
 */
router.get('/', authenticate, (req, res, next) => {
  const { company_id, job_id, status } = req.query;
  // either company_id or job_id is required
  if (!company_id && !job_id) {
    return next(new Error('Missing request fields'));
  }

  Proposal.findPopulated({ company_id, job_id, status })
    .then((proposalList) => {
      res.json({
        success: true,
        proposalList,
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
