var passport = require('passport');

module.exports = function(req, res, next) {
  GamePlay.findOne({
    id: req.param('gamePlayId'),
    status: 'waiting'
  }).exec(function(err, gamePlay) {
    if (!gamePlay) {
      return res.apiError(gamePlay);
    };
    req.gamePlay = gamePlay;
    next();
  });
};
