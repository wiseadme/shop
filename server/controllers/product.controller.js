const mongoose = require('mongoose')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const transliter = require('../utils/transliter.js')

async function createProduct(req, res) {
  let { name, head, text, slides, unit, quantity, price, category } = req.body
  let images = JSON.parse(slides)
  let imageUrl = transliter(head)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: `/${transliter(head)}`,
    slides: images.map(f => `${imageUrl.toLowerCase()}/${f}` ),
    name,
    head,
    text,
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
