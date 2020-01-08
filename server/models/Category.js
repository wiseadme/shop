const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const category = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  },
  group: {
    type: Object,
    required: true
  },
  position: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

category.set('toObject', { virtuals: true })

module.exports = model('Category', category)
