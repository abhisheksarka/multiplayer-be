var passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    debugger;
    if (err) return res.apiError(err);
    if (!user) return res.apiError(err);
    debugger;
    req.user = user;
    next();
  })(req, res);
};
