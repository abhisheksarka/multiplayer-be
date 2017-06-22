/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.apiError(err || AppError('credentialsInvalid', {}));
      };
      return res.apiSuccess({
        token: CipherService.createToken(user),
        username: user.username,
        id: user.id
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    return res.apiSuccess({});
  }
};
