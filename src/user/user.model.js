const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
    // required: true
  },
  password: {
    type: String,
    // required: true
  },
  googleId: String,
  facebookId: String,
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('User', userSchema)