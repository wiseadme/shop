const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model

const category = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  }
},{
  timestamps: true
})

category.set('toJSON', { virtuals: true })

module.exports = model("Category", category)