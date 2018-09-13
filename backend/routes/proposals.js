const router = require('express').Router();

const authenticate = require('../middleware/authenticate');
const authenticateCompany = require('../middleware/authenticateCompany');
const Proposal = require('../models/proposal');
const Company = require('../models/company');

/**
 * GET - authenticated
 * query: { company_id, job_id, status }
 * success: { proposalList: [Proposal] }
 */
router.get('/', authenticate, authenticateCompany, (req, res, next) => {
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

/**
 * DELETE - authenticated
 * query: { company_id, id: proposalId }
 */
router.delete('/', authenticate, authenticateCompany, (req, res, next) => {
  const { company_id, id } = req.query;
  if (!company_id || !id) {
    return next(new Error('Missing request fields'));
  }

  Company.findById(company_id)
    .then((company) => {
      // check if the company belongs to requesting user
      const belongsToUser = company.user_id.toString() === req.userId.toString();
      if (!belongsToUser) {
        const errorObj = new Error('Unauthorized');
        errorObj.status = 401;
        return Promise.reject(errorObj);
      }

      return Proposal.findById(id);
    })
    .then((proposal) => {
      if (!proposal) {
        return Promise.reject(new Error('Proposal not found'));
      }

      return proposal.cancel();
    })
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
