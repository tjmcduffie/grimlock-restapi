
var restify = require('restify');
var bootstrap = require(process.cwd() + '/lib/Bootstrap');
var config = require(process.cwd() + '/config');


var server = restify.createServer({
  "name": "Grimlock REST API Server"
});

server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(restify.bodyParser());

bootstrap(server);

server.listen(config.server.port, function() {
  console.log('listening to port 8080', server.name, server.url);
});
