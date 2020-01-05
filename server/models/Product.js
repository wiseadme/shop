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
    type: String,
    required: true
  },

  slides: {
    type: Array,
    required: true
  },

  unit: {
    type: Object,
    required: true
  },

  quantity: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  status: {
    type: Object,
  },

  stock: {
    type: Object,
  },

  discount: {
    type: String,
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

module.exports = model('Product', product)
