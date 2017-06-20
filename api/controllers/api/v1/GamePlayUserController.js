/**
 * GamePlayUserController
 *
 * @description :: Server-side logic for managing GamePlay User relation
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    GamePlayUser.findOrCreate({
      userId: req.user.id,
      gamePlayId: req.param('gamePlayId'),
      status: 'joined'
    })
    .exec(function(err, data){
      if (err) {
        return res.apiError(err);
      } else {
        return res.apiSuccess(data);
      };
    });
  }
};
