const mongoose = require('mongoose')
const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

async function createCategory(req, res) {
  const { name, url, icon, position, code } = req.body
  const check = Object.keys(req.body).every(it => req.body[it] !== '')
  if (check) {
    const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name,
      url,
      icon,
      position,
      code
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
    try {
      Category.findOneAndUpdate({
        _id: it._id
      }, { $set }, { new: true })
        .then(ctg => updates.push(ctg))
    } catch (err) {
      errorHandler(err)
    }
  })
  await Promise.all(updates).then(ctg => res.json(ctg))
}

async function deleteCategory(req, res) {

}

module.exports = {
  createCategory,
  updateCategories,
  allCategories,
  deleteCategory
}
