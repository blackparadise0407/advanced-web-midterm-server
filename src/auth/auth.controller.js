const User = require('../user/user.model');
const utils = require('../utils');

const login = async ({ body: { email, password } }, res, next) => {
  try {
    const user = await User.findOne({ email })
    if (!user) throw res.status(400).json({ message: 'Invalid credentials' })
    if (!await utils.compareHashed(password, user.password)) {
      throw res.status(400).json({ message: 'Invalid credentials' })
    }
    const token = utils.genToken({ _id: user._id })
    return res.status(200).json({
      message: 'Login success', data: token
    })
  } catch (error) {
    next(error)
  }
}


const regsiter = async ({ body: { email, password } }, res, next) => {
  try {
    const user = await User.findOne({ email })
    if (user) {
      throw res.status(200).json({ message: 'User email already exists' })
    }
    const hashedPass = await utils.genHashed(password)
    const newUser = new User({
      email,
      password: hashedPass
    })
    await newUser.save()
    return res.status(200).json({ message: 'Register success' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  regsiter,
  login
}