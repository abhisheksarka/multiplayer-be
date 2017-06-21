/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	_config: {
    model: 'User'
  },

	create: function (req, res) {
		User
		.create({
			username: req.param('username'),
			password: req.param('password')
		})
		.exec(function(err, data) {
      return StandardResponse(res, err, data);
		});
  },

  current: function(req, res) {

  }
};
