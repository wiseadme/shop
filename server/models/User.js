const Schema = require('mongoose').Schema
const model = require('mongoose').model

const user = new Schema({
  _id: Schema.Types.ObjectId,
  login: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

user.set('toObject', { virtuals: true })

module.exports = model('User', user)
