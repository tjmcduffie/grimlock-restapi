// environment & config
var env = process.env.NODE_ENV || 'dev';
var config = require('./config/app')[env];
var mongoose = require('mongoose');

console.log('ENV = ' + env);

module.exports = function(callback) {

  /** MONGO */
  // connect to mongodb
  var connect = function () {
    var options = {
      server: {
        socketOptions: { keepAlive: 1 }
      }
    };
    mongoose.connect(config.db, options, callback);
  };
  connect();

  // Error handler
  mongoose.connection.on('error', function (err) {
    console.log('Mongo Error: ' + err);
  });

  // Reconnect when closed
  mongoose.connection.on('disconnected', function () {
    connect();
  });

};