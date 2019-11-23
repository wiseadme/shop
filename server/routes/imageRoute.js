const Router = require('express').Router
const imageSender = require('../controllers/image.controller')

const router = Router()

router.get('/:dir/:img', imageSender)

module.exports = router