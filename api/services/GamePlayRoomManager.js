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
  var self = this,
      attrs = {
        userId: user.id,
        gamePlayId: self.gamePlay.id,
        status: 'joined'
      };

  // TODO: use promises here to chain callbacks
  // and also check if the user is present in the system
  GamePlayUser.findOne(attrs).exec(function(err, gamePlayUser) {
    if (!gamePlayUser) {
      GamePlayUser.create(attrs).exec(function(err, gamePlayUser) {
        self.namespace().emit('joined', {username: user.username, id: user.id});
      });
    };
  });
};

module.exports = GamePlayRoomManager;
