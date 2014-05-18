/** REQUIREMENTS */
var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');

// environment & config
var env = process.env.NODE_ENV || 'dev';
var config = require(process.cwd() + '/config/app')[env];


/** MONGO */
// connect to mongodb
var connect = function () {
  var options = {
    server: {
      socketOptions: { keepAlive: 1 }
    }
  };
  mongoose.connect(config.db, options);
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


/** Express */
// create server
var server = express();

// configure server
server.use(require('body-parser')());
server.use(require('compression')());

// load models
var models_path = __dirname + '/models';
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file);
});

// apply routes
require(process.cwd() + '/config/routes')(server);

// listen to the supplied port
server.listen(config.ports.server, function() {
  console.log('listening to port ' + config.ports.server, config.name);
});
