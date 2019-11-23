const Router = require('express').Router
const postController = require('../controllers/post.controller')
const passport = require('passport')
const upload = require('../middleware/upload')

const router = Router()

router.post("/create", upload.single('image'), passport.authenticate('jwt', { session: false }), postController.create)
router.get("/", postController.getAll)
router.get("/:id", postController.getById)

module.exports = router