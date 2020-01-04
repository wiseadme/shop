const multer = require('multer')
const path = require('path')
const fs = require('fs')
const transliter = require('../utils/transliter.js')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let dir = transliter(req.body.head)
    fs.mkdir(`server/uploads/${dir}`, (err) => {
      if (err) {
        return cb(null, path.resolve() + `/server/uploads/${dir}`)
      }
      cb(null, path.resolve() + `/server/uploads/${dir}`)
    })
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 2
}

module.exports = multer({
  storage,
  fileFilter,
  limits
})
