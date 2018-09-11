/*
*  Promise-based abstraction for bcrypjs methods
*  Handle encoded hash values
*/

const bcryptjs = require('bcryptjs');

// get a hash value, use to hash passwords before saving to db
const getHash = (value, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(saltRounds, (err, salt) => {
      if (err) return reject(err);

      bcryptjs.hash(value, salt, (err1, hash) => {
        if (err1) return reject(err1);
        return resolve(hash);
      });
    });
  });
};

// compare a value to its hash, verify saved password
const compareHash = (value, toCompare) => {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(value, toCompare, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = { getHash, compareHash };
