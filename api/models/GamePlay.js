/**
 * GamePlay.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    status: {
      type: 'string',
      defaultsTo: 'waiting' // waiting -> started -> ended
    },
    statusUpdateAt: {
      type: 'date',
      require: true
    },
    gameId: {
      type: 'integer',
      required: true
    }
  },

  afterCreate: function(gamePlay, next) {
    new GamePlayRoomManager(gamePlay);
    next();
  }
};
