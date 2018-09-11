const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('../helpers/crypto');
const AccessToken = require('./access_token');
const Company = require('./company');

// User schema
const UserSchema = new mongoose.Schema({
  active: { type: Boolean, default: false },
  profile_pic: String,
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: val => validator.isEmail(val),
      message: props => `${props.value} is not a valid email!`,
    },
  },
  user_role_id: mongoose.Schema.Types.ObjectId, // not required because it's not needed for the task
  password: { type: String, required: true }, // maybe not required if fb login hhm..
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  zip_code: { type: String, required: true },
  city: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: Date,
});

// Pre save hook
UserSchema.pre('save', function (next) {
  // encrypt the password before saving it to the db,
  // on first save and password modified
  if (this.isModified('password')) {
    return crypto.getHash(this.password).then((hash) => {
      this.password = hash;
    });
  }

  next();
});

/**
 * Validates the user credentials, then
 * creates an AccessToken
 * @param {Object} creds - user credentials
 * @param {String} email - user email
 * @param {String} password - user password
 * @returns {Promise} - resolves to token - jwt
 */
UserSchema.statics.login = function ({ email, password }) {
  const error = new Error('Wrong email or password');

  return this.findOne({ email }).then((user) => {
    if (!user) return Promise.reject(error);

    return crypto.compareHash(password, user.password).then((result) => {
      // passwords don't match
      if (!result) return Promise.reject(error);

      user.password = undefined;
      return AccessToken.create(user.toObject());
    });
  });
};

/**
 * Checks if the user has a company
 * @returns {Promise} - resolves to the company object
 */
UserSchema.methods.hasCompany = function () {
  return Company.findOne({ user_id: this.get('id') }).then(company => company);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
