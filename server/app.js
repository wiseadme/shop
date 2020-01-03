const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./middleware/passport')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.use(passport.initialize())
passportStrategy(passport)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use(function(req, res, next) {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
  next()
})

module.exports = app