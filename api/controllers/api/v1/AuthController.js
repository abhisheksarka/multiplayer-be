/**
 * AuthController
 *
 * @description :: Server-side logic for managing Authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  login: function(req, res) {
    debugger;
    passport.authenticate('local', function(err, user, info) {
      debugger;
      if ((err) || (!user)) {
        return res.apiError(user);
      }
      req.logIn(user, function(err) {
        if (err) res.apiError(err);
        return res.apiSuccess(user);
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    return res.apiSuccess({});
  }
};
