var passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    var forbidden = AppError('forbidden', {});

    if (err) return res.apiError(forbidden);
    if (!user) return res.apiError(forbidden);

    req.user = user;
    next();
  })(req, res);
};
