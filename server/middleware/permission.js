const keys = require('../keys')
const jwt = require('jsonwebtoken')

module.exports = function permit(...allowed) {
  const isAllowed = role => allowed.indexOf(role) > -1
  return (req, res, next) => {
    const token = req.cookies['jwt-token']
    jwt.verify(token, keys.JWT_KEY, function(err, decoded) {
      console.log(decoded.role)
      next()
    });
    // if (token && isAllowed(req.user.role)) next()
    // else {
    //   res.status(403).json({ message: 'Forbidden' })
    // }
  }
}
