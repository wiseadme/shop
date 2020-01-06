const mongoose = require('mongoose')
const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')
const transliter = require('../utils/transliter.js')

async function createProduct(req, res) {
  const parsed = {}
  const keys = Object.keys(req.body)

  keys.forEach(key => {
    parsed[key] = JSON.parse(req.body[key])
  })

  const imageUrl = transliter(parsed.head)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: `${parsed.category.url}/${imageUrl.toLowerCase()}`,
    slides: parsed.slides.map(f => `${imageUrl.toLowerCase()}/${f}`),
    name: parsed.name,
    head: parsed.head,
    quantity: parsed.quantity,
    price: parsed.price,
    category: parsed.category.id,
    unit: parsed.unit,
    stock: parsed.stock,
    discount: parsed.discount,
    status: parsed.status,
    text: parsed.text
  })
  console.log(product)
  try {
    await product.save().then(pr => {
      res.status(201).json({ pr })
    })
  } catch (err) {
    errorHandler(err)
  }
}

async function getProducts(req, res) {
  const products = await Product.find().populate('category', ['name', 'url'])
  res.status(200).json({ products })
}

async function getProductItem(req, res) {
  try {
    const item = await Product.findOne({ url: req.body.url })
    res.status(200).json(item)
  } catch (err) {
    res.status(404).json({ ok: false, message: 'Нет такого продукта' })
  }
}

async function updateProducts(req, res) {

}

async function deleteProducts(req, res) {

}

module.exports = {
  createProduct,
  updateProducts,
  getProducts,
  deleteProducts,
  getProductItem
}
