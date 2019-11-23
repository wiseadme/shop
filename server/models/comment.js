const Schema = require('mongoose').Schema
const model = require('mongoose').model

const comment = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  postId: {
    type: Schema.ObjectId,
    ref: 'Post',
    required: true
  }

}, {
    timestamps: true
  })

comment.set('toJSON', { virtuals: true });

module.exports = model('Comment', comment)
