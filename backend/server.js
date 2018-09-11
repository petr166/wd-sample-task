const http = require('http');
const app = require('./app');
const log = require('./log');
const config = require('./config');
const connectMongo = require('./config/mongo').start;

// init server instance
const server = http.createServer(app);

const startServer = () => {
  server.listen(config.server.port, (err) => {
    log.log('env', `app starting in "${config.env}" mode...`);

    if (err) {
      log.err('server', 'could not start', err);
      process.exit();
    }

    log.log('server', `Express server is listening on ${config.server.port}...`);
  });
};

// connect to services, then start the server
connectMongo(config.mongo).then(startServer);
