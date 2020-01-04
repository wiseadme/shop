const Schema = require('mongoose').Schema
const model = require('mongoose').model

const product = new Schema({
  _id: Schema.Types.ObjectId,

  name: {
    type: String,
    required: true
  },

  head: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  text: {
    type: Object,
    required: true
  },

  images: {
    type: Array,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  category: {
    type: Schema.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
})

product.set('toJSON', { virtuals: true })

module.exports = model('Post', product)
