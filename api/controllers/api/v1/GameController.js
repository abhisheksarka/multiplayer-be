/**
 * GameController
 *
 * @description :: Server-side logic for managing Game Listings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {
    Game.find({id: { '>=': 1 }}).exec(
      function(err, data) {
        return StandardResponse(res, err, data);
      }
    )
  }
};
