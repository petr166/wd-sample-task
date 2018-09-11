const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');

// AccessToken schema
const AccessTokenSchema = new mongoose.Schema({
  id: { type: String, required: true },
  ttl: { type: Number, default: config.tokenTtl },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

/**
 * Creates an AccessToken
 * @param {Object} userObj - plain user object to sign the jwt with
 * @return {Promise} - resolves to the token string
 */
AccessTokenSchema.statics.create = function (userObj) {
  const token = jwt.sign(userObj, config.secret, { expiresIn: config.tokenTtl });
  const accessToken = new this({ id: token, user_id: userObj._id });
  return accessToken.save().then(() => {
    return token;
  });
};

/**
 * Validates the access token
 * @param {String} token - jwt token (req.headers.authorization minus 'Bearer ')
 * @returns {Promise} - resolves to token's user id
 */
AccessTokenSchema.statics.validateToken = function (token) {
  const error = new Error('Unauthorized');
  const tokenModel = this;

  return new Promise((resolve, reject) => {
    // check if it is a valid jwt signed by this app
    jwt.verify(token, config.secret, { ignoreExpiration: true }, (err) => {
      if (err) return reject(error);

      return resolve(tokenModel.findOne({ id: token }).then((accessToken) => {
        if (!accessToken) return Promise.reject(error);

        // check if it is expired
        // i guess use the db saved 'ttl' instead of the baked jwt expiration
        const now = new Date();
        const created = new Date(accessToken.get('created_at'));
        if (now - created > accessToken.get('ttl')) {
          // remove the db entry
          accessToken.remove();
          return Promise.reject(error);
        }

        // resolve to user id
        return accessToken.get('user_id');
      }));
    });
  });
};

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);
module.exports = AccessToken;
