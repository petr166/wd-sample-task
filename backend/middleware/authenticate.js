/**
 * Reqeusts authentication middleware
 * Checks for the 'Authorization' header and compares it to the one in db
 */

const AccessToken = require('../models/access_token');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  const errorObj = new Error('Unauthorized');
  errorObj.status = 401;

  if (!authorization) {
    return next(errorObj);
  }

  const token = authorization.slice(7); // it starts with 'Bearer '

  return AccessToken.validateToken(token)
    .then((userId) => {
      // add the userId and token to the request obj for down the chain use convenience
      req.userId = userId;
      req.token = token;
      next();
    })
    .catch(() => {
      return next(errorObj);
    });
};
