var GamePlayRoomManager = function(gamePlay) {
  var self = this;

  self.gamePlay = gamePlay;
  self.io = sails.config.sockets.io;
  self.namespace().on('connection', function(socket) {
    self.listen(socket);
  });
};

var proto = GamePlayRoomManager.prototype;

proto.namespace = function() {
  return this.io.of('/gamePlay/' + this.gamePlay.id);
};

proto.listen = function(socket) {
  var self = this;
  socket.on('joined', function(user) { self.onJoined(user); });
};

proto.onJoined = function(user) {
  var self = this;

  // TODO: use promises here to chain callbacks
  User.findOne({id: user.id})
  .exec(function(err, user) {
    if (user) {
      GamePlayUser.findOrCreate({
        userId: user.id,
        gamePlayId: self.gamePlay.id,
        status: 'joined'
      }).exec(function(err, gamePlayUser) {
        self.namespace().emit('joined', {username: user.username, id: user.id});
      });
    };
  });
};

module.exports = GamePlayRoomManager;
