const Promise = require('bluebird');

// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 8080;
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'petru-wiredelta-sample';
const SECRET = process.env.SECRET || 'supersecretalltheway';
const TOKEN_TTL = process.env.TOKEN_TTL || 1209600000;

// config obj containing the app settings/constants
module.exports = {
  env: NODE_ENV,
  server: {
    port: PORT,
  },
  mongo: {
    host: MONGO_HOST,
    options: {
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true,
      dbName: DB_NAME,
      promiseLibrary: Promise,
    },
  },
  secret: SECRET,
  tokenTtl: TOKEN_TTL,
};
