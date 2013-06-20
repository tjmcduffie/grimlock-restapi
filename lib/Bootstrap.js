var config = require(process.cwd() + '/config');
var util = require(process.cwd() + '/lib/util');
var fs = require('fs');



/**
 * Bootstrap the application by loading the controllers and extracting the
 * routes.
 * @param  {[type]} server [description]
 */
var Bootstrap = function(server) {
  if (!server) {
    throw new BootstrapError('The server is required to bootstrap the app');
  }
  console.log('bootstrapping application');

  this.server = server;

  this.appRoutes = [];

  this.controllerDir = process.cwd() + '/controllers';

  this.locateControllers_(this.controllerDir);
  console.log(this.appRoutes);
  this.appRoutes.forEach(this.registerRoute_, this);
};

Bootstrap.jsFileNameRegEx = /(\w)*\.js/;

Bootstrap.prototype.locateControllers_ = function(path) {
  var dirPath = path + '/';
  fs.readdirSync(dirPath).forEach(function(file) {
    var filePath = dirPath + file;
    if (fs.statSync(filePath).isDirectory()) {
      this.locateControllers_(filePath);
    } else if (Bootstrap.jsFileNameRegEx.test(file)) {
      console.log('>>> Loading Routes from ' + filePath);
      var Controller = require(filePath);
      this.appRoutes = this.appRoutes.concat(new Controller().routes);
    }
  }, this);
};

Bootstrap.prototype.registerRoute_ = function(route) {
  // throw an error if the method doesn't exist
  if (!this.server[route.method]) {
    console.error('Error thrown from ', route);
    throw new Error(route.method + ' method does not exist in the server');
  }

  // Method exists, register the route
  this.server[route.method](route.path, route.responder);
};



/**
 * Bootstrap error object. Inherits from Error.
 * @extends {Error}
 * @param {string} message Message to display in the error console.
 * @param {number=} opt_linenumber Line number where the error occurred.
 */
var BootstrapError = function(message, opt_linenumber) {
  util.base(this, message, __filename, opt_linenumber);

  this.name = 'BootstrapError';
  this.message = message;
};
util.inherits(BootstrapError, Error);



/**
 * Module exports.
 */
module.exports = function(server) {
  return new Bootstrap(server);
};