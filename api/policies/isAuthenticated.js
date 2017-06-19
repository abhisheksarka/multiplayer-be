module.exports = function(req, res, next) {
 if (req.isAuthenticated()) {
    return next();
  } else {
    return res.apiError(new TypeError('Authentication Error'));
  }
};
