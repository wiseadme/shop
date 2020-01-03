const mongoose = require('mongoose')
const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

async function createCategory(req, res) {
  const { name, url, icon, position } = req.body
  const check = Object.keys(req.body).every(it => req.body[it] !== '')
  if (check) {
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name,
      url,
      icon,
      position,
    })
    try {
      category.save().then(category => {
        res.status(200).json({
          ok: true,
          message: `Вы создали категорию ${req.body.name.toLowerCase()}`,
          category
        })
      })
    } catch (err) {
      errorHandler(err)
    }
  } else {
    res.status(501).json({
      ok: false,
      message: 'Заполните все обязательные поля'
    })
  }
}

async function allCategories(req, res) {
  try {
    let categories = await Category.find({})
    res.status(200).json({ categories })
  } catch (err) {
    errorHandler(err)
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
    Category.findOneAndUpdate({
      _id: it._id
    }, { $set }, { new: true })
      .then(ctg => updates.push(ctg))
  })
  try {
    await Promise.all(updates).then(ctg => res.status(201).json(ctg))
  } catch (err) {
    errorHandler(err)
  }
}

async function deleteCategories(req, res) {
  const categories = req.body
  const deleted = []
  categories.forEach(ctg => {
    Category.deleteOne({ _id: ctg._id })
      .then(del => deleted.push(del))
  })
  try {
    await Promise.all(deleted).then(ctg => res.status(201).json({ deleted: true }))
  } catch (err) {
    errorHandler(err)
  }
}

module.exports = {
  createCategory,
  updateCategories,
  allCategories,
  deleteCategories
}
