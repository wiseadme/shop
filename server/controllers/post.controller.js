// const mongoose = require('mongoose')
// const errorHandler = require('../utils/errorHandler')
// const keys = require('../keys')
// const Post = require('../models/Post')
//
// async function create(req, res) {
//   const postObject = req.body
//   const post = new Post({
//     _id: new mongoose.Types.ObjectId(),
//     date: postObject.date,
//     head: postObject.head,
//     post: postObject.post,
//     author: postObject.author,
//     image: req.file ? req.file.path : ''
//   })
//   try {
//     await post.save().then(post => res.status(201).json({ ok: true, post }))
//   } catch (err) {
//     errorHandler(res, err)
//   }
// }
//
// async function update(req, res) {
//   const $set = {
//     text: req.body.text
//   }
//   try {
//     const post = Post.findOneAndUpdate({
//       _id: req.params.id
//     }, { $set }, { new: true })
//     res.json(post)
//   } catch (err) {
//     errorHandler(err)
//   }
// }
//
// async function remove(req, res) {
//   try {
//     await Post.deleteOne({ _id: req.params.id })
//     res.json({ ok: true, message: 'Пост удален' })
//   } catch (err) {
//     errorHandler(err)
//   }
// }
//
// async function addViews(req, res) {
//   const $set = {
//     views: ++req.body.views
//   }
//   try {
//     await Post.findOneAndUpdate({ _id: req.params.id }, { $set })
//     res.status(204).json()
//   } catch (err) {
//     errorHandler(err)
//   }
// }
//
// async function getAll(req, res) {
//   try {
//     await Post.find({})
//       .sort({ date: -1 }) //сортируем в обратном порядке
//       .populate('author', ['login'])
//       .exec((err, posts) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.status(200).json({ ok: true, posts })
//         }
//       })
//   } catch (err) {
//     errorHandler(res, err)
//   }
// }
//
// async function getById(req, res) {
//   let id = req.params.id
//   try {
//     await Post.findById({ _id: id })
//       .populate('author', ['login'])
//       // .populate('comments')
//       .exec((err, post) => {
//         if (err) {
//           console.log(err)
//         } else {
//           res.status(200).json({ ok: true, post })
//         }
//       })
//   } catch (err) {
//     errorHandler(res, err)
//   }
// }
//
// module.exports = { create, getAll, getById, update, remove, addViews }
