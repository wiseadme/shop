const Router = require('express').Router
const controller = require('../controllers/auth.controller')
const passport = require('../middleware/passport')


const router = Router()

router.post('/login', controller.login)
router.post('/registration', controller.createUser)

module.exports = router
