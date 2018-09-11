/**
 * Error handlding middleware
 * So in the routes you can just call next(errorObj)
 */

module.exports = (err, req, res, next) => {
  const { message = 'Internal server error', status = 200 } = err;

  res.status(status).json({
    success: false,
    error: message,
  });

  next();
};
