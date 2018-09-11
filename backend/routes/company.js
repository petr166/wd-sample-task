const router = require('express').Router();
const User = require('../models/user');
const Company = require('../models/company');
const authenticate = require('../middleware/authenticate');

/**
 * POST
 * body: { email, password }
 * success: { token }
 */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error('Missing request fields'));
  }

  const error = new Error('Wrong email or password');

  // get the user
  User.findOne({ email }, '-password')
    .then((user) => {
      if (!user) return Promise.reject(error);
      // check for a company-user
      return user.hasCompany();
    })
    .then((company) => {
      if (!company) return Promise.reject(error);
      return User.login({ email, password }).then((token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET - authenticated
 * success: { user }
 */
router.get('/me', authenticate, (req, res, next) => {
  Promise.all([User.findById(req.userId, '-password'), Company.findOne({ user_id: req.userId })])
    .then(([user, company]) => {
      res.json({
        success: true,
        user,
        company,
      });
    })
    .catch(err => next(err));
});

module.exports = router;
