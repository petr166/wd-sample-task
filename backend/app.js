const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const errorMiddleware = require('./middleware/error');

// init models
require('./models');

// import routes
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const proposalsRoutes = require('./routes/proposals');

// set the global Promise lib to bluebird
global.Promise = Promise;

// app setup
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// healthcheck
app.get('/', (req, res) => {
  res.json({ success: true, msg: 'API is live' });
});

// set routes
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/proposals', proposalsRoutes);

// set error handling middleware
app.use(errorMiddleware);

module.exports = app;
