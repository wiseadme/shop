const mongoose = require('mongoose')
const Category = require('../models/Category')

async function createCategory(req, res){
  res.status(200).json({
    ok: true,
    message: `Вы создали категорию ${req.body.name}`,
    category: req.body
  })
}

async function readCategory(req, res){

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