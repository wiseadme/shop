const { Router } = require('express')
const { create } = require('../controllers/comment.controller')
router = Router()

router.post('/', create)

module.exports = router
