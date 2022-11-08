const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports.defaultResponse = {
  ok: true,
  message: '',
  results: null,
}

module.exports.jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //token duoc lay tu header Bearer,
  secretOrKey: process.env.JWT_SECRET,
};
