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
      type: 'date'
    },
    gameId: {
      type: 'integer',
      required: true
    },

    ended: function() {
      var hasEverybodyLeft = true,
          self = this;

      GamePlayUser
      .find({gamePlayId: self.id})
      .exec(function(err, gamePlayUsers) {
        gamePlayUsers.forEach(function(gamePlayUser) {
          if (gamePlayUser.status != 'left') {
            hasEverybodyLeft = false;
          };
        });
        if (hasEverybodyLeft) {
          self.status = 'ended';
          self.save();
        };
      })
    }
  },

  afterCreate: function(gamePlay, next) {
    new GamePlayRoomManager(gamePlay);
    next();
  }
};
