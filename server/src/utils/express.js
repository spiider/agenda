const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const passport = require('passport');
const routes = require('../routes/v1');
const error = require('../middlewares/error');
const initDatabase = require('../utils/database');
const strategies = require('../utils/passport');

/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan('dev'));

// connect to mongo
initDatabase();

// parse body params and attache them to req.body
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
