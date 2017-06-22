/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  function callback(err, cb) {
    if (err) {
      console.log(err);
    };
  }
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  Game.findOrCreate({name: 'Click It', status: 1}).exec(callback);
  Game.findOrCreate({name: 'Space Race', status: 0}).exec(callback);
  Game.findOrCreate({name: 'Cross', status: 0}).exec(callback);
  Game.findOrCreate({name: 'Jump', status: 0}).exec(callback);
  
  cb();
};
