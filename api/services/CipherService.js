var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = {
  /**
   * Hash the password field of the passed user.
   */
  hashPassword: function (user) {
    if (user.password) {
      user.password = bcrypt.hashSync(user.password);
    }
  },

  /**
   * Compare user password hash with unhashed password
   * @returns boolean indicating a match
   */
  comparePassword: function (password, user) {
    return bcrypt.compareSync(password, user.password);
  },

  /**
   * Create a token based on the passed user
   * @param user
   */
  createToken: function (user) {
    return jwt.sign({
        user: {
          id: user.id,
          username: user.username,
          createdAt: user.createdAt
        }
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: sails.config.jwtSettings.algorithm
      }
    );
  }
};
