const Router = require('express').Router
const controller = require('../controllers/category.controller.js')

const router = Router()

router.post('/create', controller.createCategory)

module.exports = router