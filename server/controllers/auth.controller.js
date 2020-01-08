const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const keys = require('../keys')

async function createUser(req, res) {
  const { email } = req.body
  const { login } = req.body
  const { password } = req.body

  let candidate = await User.findOne({ login })
  if (candidate) {
    res.status(404).json({
      ok: false,
      message: 'пользователь c таким логином уже зарегистрирован'
    })
  } else if (!candidate) {
    candidate = await User.findOne({ email })
    if (candidate) {
      console.log(candidate)
      res.status(404).json({
        ok: false,
        message: 'пользователь c такой почтой уже зарегистрирован'
      })
    } else {
      const salt = await bcrypt.genSaltSync(10)
      const hash = await bcrypt.hashSync(password, salt)
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        role: 'user',
        login,
        email,
        password: hash
      })
      try {
        await user.save().then(() => res.status(201).json({
            ok: true,
            message:
              'На указанную Вами почту, отправлено письмо, просим пройти по ссылке и подтвердить регистрацию.',
            user
          })
        )
      } catch (e) {
        errorHandler(res, e)
      }
    }
  }
}

async function login(req, res) {
  const { login } = req.body
  const { password } = req.body
  let candidate = await User.findOne({ login })

  if (candidate) {
    const pass = await bcrypt.compareSync(password, candidate.password)
    if (pass) {
      try {
        const token = await jwt.sign(
          {
            login: candidate.login,
            userId: candidate._id,
            role: candidate.role
          },
          keys.JWT_KEY,
          { expiresIn: 600 * 60 }
        )
        res.status(200).json({
          token: token,
          login: candidate.login,
          userId: candidate._id,
          role: candidate.role
        })
      } catch (err) {
        errorHandler(res, err)
      }
    } else {
      res.status(401).json({
        ok: false,
        message: 'Пароль или логин не верны'
      })
    }
  } else {
    res.status(404).json({
      ok: false,
      message: 'Пользователь не существует'
    })
  }
}

module.exports = { login, createUser }
