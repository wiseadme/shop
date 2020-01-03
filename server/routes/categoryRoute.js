const Router = require('express').Router
const controller = require('../controllers/category.controller.js')
const passport = require('passport')

const router = Router()

router.get('/all', controller.allCategories)
router.post('/create', passport.authenticate('jwt', { session: false }), controller.createCategory)
router.patch('/update', passport.authenticate('jwt', { session: false }), controller.updateCategories)
router.post('/delete', passport.authenticate('jwt', { session: false }), controller.deleteCategories)

module.exports = router
