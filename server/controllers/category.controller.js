const mongoose = require('mongoose')
const Category = require('../models/Category')
const errorHandler = require('../utils/errorHandler')

async function createCategory(req, res) {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name
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
}

async function readCategory(req, res) {

}

async function updateCategory(req, res) {

}

async function deleteCategory(req, res) {

}

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory
}