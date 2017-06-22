/**
 * Manages real time communication for game rooms
 */

var GamePlayRoomManager = function(gamePlay) {
  var self = this;

  self.gamePlay = gamePlay;
  self.io = sails.config.sockets.io;
  self.namespace().on('connection', function(socket) {
    self.listen(socket);
  });
};

var proto = GamePlayRoomManager.prototype;


/**
 * Create a namespace for the current gamePlay
 */
proto.namespace = function() {
  return this.io.of('/gamePlay/' + this.gamePlay.id);
};


/**
 * Listen to all incoming events by a socket
 */
 proto.listen = function(socket) {
  var self = this,
      socketId = socket.id;

  socket.on('joined', function(user) { self.onJoined(user, socketId); });
  socket.on('disconnect', function() { self.onDisconnect(socketId); });
  socket.on('started', function() { self.onStarted(); });
  socket.on('gameData', function(res) { self.onGameData(res); });
};


/**
 * When a gameplay starts update the status in the db and let all
 * all the clients know as well
 */
proto.onStarted = function() {
  var self = this,
      g = self.gamePlay;

  GamePlay.findOne({id: g.id}).exec(function(err, g) {
    g.status = 'started';
    g.statusUpdateAt = new Date();
    g.save(function(err) {
      if (!err) {
        self.namespace().emit('started');
      }
    });
  });
};


/**
 * When a user joins a gameplay inform all existing users
 */
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


/**
 * When a user exits the room update the status and let others know
 * If this was the last user, end the gameplay session itself
 */
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


/**
 * When a user joins a gameplay inform all existing users
 */
proto.onGameData = function(res) {
  this.namespace().emit('gameData', res);
};

module.exports = GamePlayRoomManager;
