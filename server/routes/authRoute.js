const Router = require('express').Router
const authController = require('../controllers/auth.controller')
const passport = require('../middleware/passport')


const router = Router()

router.post('/login', authController.login)
router.post('/registration', authController.createUser)

module.exports = router
