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
  var self = this,
      socketId = socket.id;

  socket.on('joined', function(user) { self.onJoined(user, socketId); });
  socket.on('disconnect', function() { self.onDisconnect(socketId); });
};

proto.onJoined = function(user, socketId) {
  var self = this,
      attrs = {
        userId: user.id,
        gamePlayId: self.gamePlay.id,
        status: 'joined',
        clientId: socketId
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

proto.onDisconnect = function (socketId) {
  var self = this,
      attrs = {
        clientId: socketId
      };

  GamePlayUser
  .findOne(attrs)
  .exec(function(err, gamePlayUser) {
    if (gamePlayUser) {
      gamePlayUser.status = 'left';
      gamePlayUser.save(function(err) {

        self.namespace().emit('left', {id: gamePlayUser.userId});
        GamePlay
        .findOne({id: gamePlayUser.gamePlayId})
        .exec(function(err, gamePlay) {
          gamePlay.ended();
        });
      });
    };
  })
}

module.exports = GamePlayRoomManager;
