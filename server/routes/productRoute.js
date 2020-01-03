const Router = require('express').Router
const controller = require('../controllers/product.controller.js')
const passport = require('passport')
import upload from '../middleware/upload'

const router = Router()

router.get('/all', controller.getProducts)
router.post('/create', upload.array('image', 12), passport.authenticate('jwt', { session: false }), controller.createProduct)
router.patch('/update', passport.authenticate('jwt', { session: false }), controller.updateProducts)
router.post('/delete', passport.authenticate('jwt', { session: false }), controller.deleteProducts)

module.exports = router
