const mongoose = require('mongoose')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

async function createProduct(req, res) {
  const { name, head, text, images, unit, quantity, price, category } = req.body
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: '/gfhgjhfkjghfkg',
    name,
    head,
    text,
    images,
    quantity,
    unit,
    price,
    category
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
