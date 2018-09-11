const router = require('express').Router();
const AccessToken = require('../models/access_token');
const authenticate = require('../middleware/authenticate');

/**
 * DELETE - authenticated
 */
router.delete('/logout', authenticate, (req, res, next) => {
  // remove token from db
  AccessToken.findOneAndDelete({ id: req.token })
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => next(err));
});

module.exports = router;
