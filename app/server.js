/** REQUIREMENTS */
var express = require('express');
var Response = require('./lib/Response');

// environment & config
var env = process.env.NODE_ENV || 'dev';
var config = require('./config/app')[env];

/** connect to mongo */
require('./mongo-connector')();

/** Express */
// create server
var server = express();

// configure server
server.use(require('body-parser')());
server.use(require('compression')());

// apply routes
require('./config/routes')(server);

server.use(function(req, res, next) {
  // console.log(res);
  if (!req.route) {
    var err = new Error('not found');
    err.status = 404;
    err.msg = 'not found';
  }

  next(err);
});

// Error pages
server.use(function(err, req, res, next) {
  console.log('calling error middleware');
  var response = new Response(err, res.data);
  res.json(response.getCode(), response.getData());
});

// listen to the supplied port
server.listen(config.ports.server, function() {
  console.log('listening to port ' + config.ports.server, config.name);
});