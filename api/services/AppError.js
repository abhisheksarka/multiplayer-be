/**
 * Manages real time communication for game rooms
 */

var AppError = {
  forbidden: {
    httpCode: 403,
    message: 'You are not authorized to access this resource'
  },
  internalSeverError: {
    httpCode: 500,
    message: 'Internal server error'
  },
  createFailed: {
    message: 'Cannot create the required resource'
  },
  loadFailed: {
    message: 'Unable to load the required resource'
  },
  credentialsInvalid: {
    message: 'Credentials are not valid'
  }
}

module.exports = function(errName, errObject) {
  if (!errObject) {
    return null;
  };
  var e = AppError[errName];
      te = new TypeError(e.message);
  te.httpCode = e.httpCode;
  te.system = errObject.message;

  return te;
};
