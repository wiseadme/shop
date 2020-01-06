const mongoose = require('mongoose')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const transliter = require('../utils/transliter.js')

async function createProduct(req, res) {
  const parsed = {}
  const keys = Object.keys(req.body)

  keys.forEach(key => {
    if (key !== 'category') {
      return parsed[key] = JSON.parse(req.body[key])
    }
    parsed[key] = req.body[key]
  })

  const imageUrl = transliter(parsed.head)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: `/${imageUrl.toLowerCase()}`,
    slides: parsed.slides.map(f => `${imageUrl.toLowerCase()}/${f}` ),
    name: parsed.name,
    head: parsed.head,
    quantity: parsed.quantity,
    price: parsed.price,
    category: parsed.category,
    unit: parsed.unit,
    stock: parsed.stock,
    discount: parsed.discount,
    status: parsed.status,
    text: parsed.text
  })
  try {
    await product.save().then(pr => {
      res.status(201).json({ pr })
    })
  } catch (err) {
    errorHandler(err)
  }
}

async function getProducts(req, res) {
  const products = await Product.find().populate('category', ['name'])
  res.status(200).json({ products })
}

async function updateProducts(req, res) {

}

async function deleteProducts(req, res) {

}

module.exports = {
  createProduct,
  updateProducts,
  getProducts,
  deleteProducts
}
