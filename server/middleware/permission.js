const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/User')

module.exports = function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1
  return (req, res, next) => {
    const token = req.cookies['jwt-token']
    jwt.verify(token, keys.JWT_KEY, async function (err, decoded) {
      const user = await User.findById(decoded.userId)
      console.log(user, decoded.role)
      // if (decoded.role === 'admin')
      next()
    })
    // if (token && isAllowed(req.user.role)) next()
    // else {
    //   res.status(403).json({ message: 'Forbidden' })
    // }
  }
}
