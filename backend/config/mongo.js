const mongoose = require('mongoose');
const Promise = require('bluebird');
const log = require('../log');

mongoose.Promise = Promise; // plug-in bluebird as mongoose Promise

// connect to mongo host, set retry on initial fail
const connectMongo = (config) => {
  mongoose
    .connect(config.host,
      config.options)
    .catch((err) => {
      log.err('mongo', 'error', err.message);
      setTimeout(() => {
        connectMongo(config);
      }, 2000);
    });
};

// to export: init mongo connection, set logging
const start = (config) => {
  return new Promise((resolve) => {
    mongoose.connection.once('open', () => {
      log.log('mongo', `connected to db: "${config.host}"`);
      return resolve(mongoose.connection);
    });
    connectMongo(config);
  });
};

module.exports = { start };
