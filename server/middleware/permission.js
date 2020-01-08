const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/User')

module.exports = function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1
  let user = null
  return (req, res, next) => {
    const token = req.cookies['jwt-token']
    jwt.verify(token, keys.JWT_KEY, async function (err, decoded) {
      if (!user) {
        user = await User.findById(decoded.userId)
      }
      if (isAllowed(user.role)) {
        next()
      } else {
        res.status(403).json({
          ok: false,
          message: 'Ограничение прав доступа'
        })
      }
    })
  }
}
