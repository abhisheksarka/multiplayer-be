var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    bcrypt = require('bcryptjs');

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_OPTS = {
  usernameField: 'username',
  passwordField: 'password'
};

/**
 * Configuration object for JWT strategy
 */
var JWT_OPTS = {
  secretOrKey: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM", // should be stored in ENV config
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  algorithm: 'HS256'
};

passport.use(
  new JwtStrategy(
    JWT_OPTS,
    function(jwt_payload, done) {
      User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) { return done(err, false); };
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        };
      });
    }
));


passport.use(
  new LocalStrategy(
    LOCAL_STRATEGY_OPTS,
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Username is not correct' }) };

        bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Password is not correct'
            });
          var returnUser = {
            username: user.username,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
      });
    }
));

module.exports.jwtSettings = {
  secret: JWT_OPTS.secretOrKey,
  algorithm : JWT_OPTS.algorithms
};
