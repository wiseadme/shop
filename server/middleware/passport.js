const pspjwt = require('passport-jwt')
const keys = require('../keys')
const User = require('../models/User')

const JwtStrategy = pspjwt.Strategy
const ExtractJwt = pspjwt.ExtractJwt

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT_KEY
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    }))
}