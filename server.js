
var restify = require('restify');
var bootstrap = require(process.cwd() + '/lib/Bootstrap');
var config = require(process.cwd() + '/config');


var server = restify.createServer({
  "name": "Grimlock REST API Server"
});

server.use(restify.CORS());
server.use(restify.fullResponse());

bootstrap(server);

server.listen(8080, function() {
  console.log('listening to port 8080', server.name, server.url);
});
