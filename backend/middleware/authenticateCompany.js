/**
 * Company user authentication middleware
 * Checks if the user owns the company for which data he requested
 */

const User = require('../models/user');

module.exports = (req, res, next) => {
  const errorObj = new Error('Unauthorized');
  errorObj.status = 401;

  return User.findById(req.userId)
    .then(user => user.hasCompany())
    .then((company) => {
      if (!company) return Promise.reject(errorObj);

      const belongsToUser = company._id.toString() === req.query.company_id.toString();
      if (!belongsToUser) return Promise.reject(errorObj);

      next();
    })
    .catch(() => {
      return next(errorObj);
    });
};
