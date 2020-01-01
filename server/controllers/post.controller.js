// const express = require('express');
// const router = express.Router();
// const config = require('../config');
// const models = require('../models');
//
// function posts(req, res) {
//   const userId = req.session.userId;
//   const userLogin = req.session.userLogin;
//   const perPage = +config.PER_PAGE;
//   const page = req.params.page || 1;
//
//   models.Post.find({})
//     .skip(perPage * page - perPage) //ограничиваем выборку, то есть пропускаем
//     .limit(perPage)
//     .then(posts => {
//       models.Post.count()
//         .then(count => {
//           res.render('recepti', {
//             post: posts,
//             current: page,
//             pages: Math.ceil(count / perPage),
//             user: {
//               id: userId,
//               login: userLogin
//             }
//           });
//         }).catch(err => console.log(err));
//     }).catch(err => console.log(err));
// }
//
// router.get('/', (req, res) => posts(req, res));
// router.get('/:page', (req, res) => posts(req, res));
//
//
// // on recept page article click
//
//
//
// module.exports = router;
