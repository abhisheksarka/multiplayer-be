module.exports = function apiError(err, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(500);

  // Set content type
  res.contentType('application/json');
  err = err || new TypeError('Internal Server Error');
  
  return res.json({success: false, info: err.toString()});
};
