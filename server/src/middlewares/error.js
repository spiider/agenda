const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, _req, res) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (process.env.NODE_ENV !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};
exports.handler = handler;

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
// eslint-disable-next-line no-unused-vars
exports.converter = (err, req, res, _next) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = function notFound(req, res) {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
