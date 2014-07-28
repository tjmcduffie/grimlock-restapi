/** REQUIREMENTS */
var express = require('express');

// environment & config
var env = process.env.NODE_ENV || 'dev';
var config = require('./config/app')[env];

/** connect to mongo */
require('mongo-connector')();

/** Express */
// create server
var server = express();

// configure server
server.use(require('body-parser')());
server.use(require('compression')());

// apply routes
require('./config/routes')(server);

// listen to the supplied port
server.listen(config.ports.server, function() {
  console.log('listening to port ' + config.ports.server, config.name);
});
