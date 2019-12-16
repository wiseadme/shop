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

async function readCategory(req, res) {

}

async function allCategories(req, res) {
  try {
    let categories = await Category.find({})
    res.status(200).json({ categories })
  } catch (err) {
    errorHandler(err)
  }
}

async function updateCategory(req, res) {

}

async function deleteCategory(req, res) {

}

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  allCategories,
  deleteCategory
}