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

  let url = transliter(parsed.head)
  url = url.toLowerCase()
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    url: url,
    slides: parsed.slides.map(f => `${url}/${f}`),
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
    const products = await Product.find().populate('category', ['name', 'url'])
    res.status(200).json({ products })
  }catch(err){
    errorHandler(res, err)
  }
}

async function getProductItem(req, res) {
  try {
    const item = await Product.findOne({ url: req.body.url })
    console.log(item)
    res.status(200).json(item)
  } catch (err) {
    errorHandler(res, err)
  }
}

async function updateProducts(req, res) {
  const body = req.body
  const $set = {}
  const updates = []
  body.forEach(it => {
    Object.keys(it).forEach(t => {
      if (t !== 'category') {
        $set[t] = it[t]
      } else {
        $set[t] = it[t].id
      }
    })
    Product.findOneAndUpdate({
      _id: it._id
    }, { $set }, { new: true })
      .then(pr => {
        updates.push(pr)
        console.log(updates)
      })
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
    Product.deleteOne({ _id: pr._id })
      .then(del => deleted.push(del))
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
