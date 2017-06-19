/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    }
  },

  beforeCreate: function(user, cb) {
    CipherService.hashPassword(user);
    cb();
  },

  beforeUpdate: function(user, cb) {
    CipherService.hashPassword(user);
    cb();
  }

};
