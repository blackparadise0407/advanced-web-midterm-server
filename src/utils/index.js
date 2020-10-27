const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const genToken = (payload = {}) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: 60 * 60 * 2 }) // exprires in 2 hours
  return {
    token,
    expiresIn: 60 * 60 * 2
  }
}

const verifyToken = (token = '') => {
  const decoded = jwt.verify(token, process.env.JWT_KEY)
  return decoded
}

const genHashed = async (str = '') => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(str, salt)
    return hashed
  } catch (error) {
    throw error
  }
}

const compareHashed = async (str = '', hashed = '') => {
  try {
    const valid = await bcrypt.compare(str, hashed);
    return valid
  } catch (error) {
    throw error
  }
}

module.exports = {
  genToken,
  verifyToken,
  genHashed,
  compareHashed
}