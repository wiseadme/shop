const Router = require('express').Router
const controller = require('../controllers/category.controller.js')

const router = Router()

router.post('/create', controller.createCategory)
router.get('/all', controller.allCategories)

module.exports = router