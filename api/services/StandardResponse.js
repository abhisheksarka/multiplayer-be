/**
 * Generic response
 */

var StandardResponse = function(res, err, data) {
  if (err) {
    return res.apiError(err);
  } else {
    return res.apiSuccess(data);
  };
};


module.exports = StandardResponse;
