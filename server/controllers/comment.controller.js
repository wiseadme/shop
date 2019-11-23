const Comment = require('../models/comment')
const Post = require('../models/post')
const errorHandler = require('../utils/errorHandler')

async function create(req, res) {
  const { name, text, postId } = req.body
  try {
    const comment = new Comment({ name, text, postId })
    await comment.save()
    const post = await Post.findById(postId)
    post.comments.push(comment._id)
    await post.save()

    res.status(201).json(comment)
  } catch (err) {
    errorHandler(err)
  }
}

module.exports = { create }