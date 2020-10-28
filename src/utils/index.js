const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { forEach, includes } = require("lodash");

const genToken = (payload = {}) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: 60 * 60 * 2,
  }); // exprires in 2 hours
  return {
    token,
    expiresIn: 60 * 60 * 2,
  };
};

const verifyToken = (token = "") => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (err) {
    throw err;
  }
};

const genHashed = async (str = "") => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(str, salt);
    return hashed;
  } catch (error) {
    throw error;
  }
};

const compareHashed = async (str = "", hashed = "") => {
  try {
    const valid = await bcrypt.compare(str, hashed);
    return valid;
  } catch (error) {
    throw error;
  }
};

const filterParams = (obj = {}, omit = []) => {
  return forEach(obj, (_val, key) => {
    if (includes(omit, key)) {
      delete obj[key];
    }
  });
};

module.exports = {
  genToken,
  verifyToken,
  genHashed,
  compareHashed,
  filterParams,
};
