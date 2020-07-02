const mongoose = require('mongoose')
const Product = require('../models/Product')
const fs = require('fs-extra')
const path = require('path')
const errorHandler = require('../utils/errorHandler')
const transliter = require('../utils/transliter.js')

async function createProduct(req, res) {
  const parsed = {}
  const keys = Object.keys(req.body)

  keys.forEach(key => {
    parsed[key] = JSON.parse(req.body[key])
  })

  let url = transliter(parsed.head).toLowerCase()
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: url,
    slides: parsed.slides.map(f => `${ url }/${ f }`),
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
  try {
    await product.save().then(pr => {
      res.status(201).json({ pr })
    })
  } catch (err) {
    errorHandler(err)
  }
}

async function getProducts(req, res) {
  try {
    const products = await Product.find().populate('category', ['name', 'url', 'group'])
    res.status(200).json({ products })
  } catch (err) {
    errorHandler(res, err)
  }
}

async function getProductItem(req, res) {
  try {
    const item = await Product.findOne({ url: req.body.url })
    res.status(200).json(item)
  } catch (err) {
    errorHandler(res, err)
  }
}

async function updateProducts(req, res) {
  const body = req.body
  // let url = transliter(parsed.head).toLowerCase()
  let $set = {}
  const updates = []
  body.forEach(it => {
    $set = it
    it.category ? $set.category = it.category.id : false
    updates.push(Product.findOneAndUpdate({
      _id: it._id
    }, { $set }, { new: true }))
  })
  try {
    await Promise.all(updates).then(pr => res.status(201).json(pr))
  } catch (err) {
    errorHandler(res, err)
  }
}

async function deleteProducts(req, res) {
  const products = req.body
  const deleted = []
  products.forEach(pr => {
    const dir = path.join(__dirname, `../uploads/${ pr.url }`)
    fs.remove(dir)
      .then(() => console.log('directory deleted'))
      .then(() => deleted.push(Product.deleteOne({ _id: pr._id })))
      .catch(err => console.log(err, 'sorry, directory cannot be deleted'))
  })
  try {
    await Promise.all(deleted).then(ctg => res.status(201).json({ deleted: true }))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  createProduct,
  updateProducts,
  getProducts,
  deleteProducts,
  getProductItem
}
