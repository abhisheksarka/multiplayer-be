/**
 * GamePlayUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    gamePlayId: {
      type: 'integer',
      required: true
    },
    userId: {
      type: 'integer',
      required: true
    },
    status: {
      type: 'string',
      required: true,
      defaultsTo: 'joined' //joined -> left
    }
  }

};
