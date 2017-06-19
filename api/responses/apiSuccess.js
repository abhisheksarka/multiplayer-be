module.exports = function apiSuccess(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(200);

  // Set content type
  res.contentType('application/json');
  return res.json({success: true, info: data});
};
