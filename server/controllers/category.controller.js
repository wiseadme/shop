const mongoose = require('mongoose')
const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')
const transliter = require('../utils/transliter.js')

async function createCategory(req, res) {
  const { name, icon, group, position } = req.body
  const ctgUrl = transliter(name)
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    url: ctgUrl.toLowerCase(),
    name,
    icon,
    group,
    position,
  })
  try {
    category.save().then(category => {
      res.status(200).json(category)
    })
  } catch (err) {
    errorHandler(res, err)
  }
}

async function allCategories(req, res) {
  try {
    let categories = await Category.find({})
    res.status(200).json({ categories })
  } catch (err) {
    errorHandler(res, err)
  }
}

async function updateCategories(req, res) {
  const body = req.body
  const $set = {}
  const updates = []
  body.forEach(it => {
    Object.keys(it).forEach(t => {
      if (t !== '_id') {
        $set[t] = it[t]
      }
    })
    updates.push(Category.findOneAndUpdate(
      { _id: it._id },
      { $set },
      { new: true }
    ))
  })
  try {
    await Promise.all(updates).then(ctg => res.status(201).json(ctg))
  } catch (err) {
    errorHandler(res, err)
  }
}

async function deleteCategories(req, res) {
  const categories = req.body
  const deleted = []
  categories.forEach(ctg => {
    deleted.push(Category.deleteOne({ _id: ctg._id }))
  })
  try {
    await Promise.all(deleted).then(ctg => res.status(201).json({ deleted: true }))
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports = {
  createCategory,
  updateCategories,
  allCategories,
  deleteCategories
}
