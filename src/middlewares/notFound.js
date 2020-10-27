const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.protocol}://${req.hostname}${req.originalUrl}`);
  res.status('404');
  next(error);
};

module.exports = notFound