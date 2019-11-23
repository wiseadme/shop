const multer = require('multer')
const moment = require('moment')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let dir = moment().format('DDMMYYYY-HHmmss_SSS')

    fs.mkdir(`server/uploads/${dir}`, (err) => {
      if (err) throw err
      cb(null, path.resolve() + `/server/uploads/${dir}`)
    })
  },
  filename(req, file, cb) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
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
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({
  storage,
  fileFilter,
  limits
})