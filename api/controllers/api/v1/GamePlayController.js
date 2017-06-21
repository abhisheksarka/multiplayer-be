/**
 * GamePlayController
 *
 * @description :: Server-side logic for managing Game Listings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    GamePlay.findOrCreate({
      gameId: req.param('gameId'),
      status: 'waiting'
    }).exec(function(err, data){
      return StandardResponse(res, err, data);
    });
  },

  players: function(req, res) {
    // TODO: use promises and joins here
    GamePlayUser.find({
      gamePlayId: req.param('gamePlayId'),
      status: 'joined'
    }).exec(function(err, data){
      User.find({
        id: data.map(function(d) {
          return d.userId;
        })
      }).exec(function(err, data){
        return StandardResponse(res, err, data);
      })
    })
  }
};
