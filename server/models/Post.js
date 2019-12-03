const Schema = require('mongoose').Schema
const model = require('mongoose').model

const post = new Schema({
  _id: Schema.Types.ObjectId,

  date: {
    type: String,
    required: true
  },

  head: {
    type: String,
    required: true
  },

  post: {
    type: Object,
    required: true
  },

  image: {},

  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },

  comments: [
    { type: Schema.Types.ObjectId, ref: 'Comment' }
  ]

}, {
    timestamps: true
  })

post.set('toJSON', { virtuals: true });

module.exports = model('Post', post)
