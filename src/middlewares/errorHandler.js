const { model } = require("mongoose");

const errorHandler = (err, req, res) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log(err);
  res.json({ message: err.message });
  throw new Error(err.message);
};

module.exports = errorHandler