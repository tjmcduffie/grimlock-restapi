var util = require(process.cwd() + '/lib/util');
var Controller = require(process.cwd() + '/lib/Controller');

var UserController = function() {
  util.base(this);
};
util.inherits(UserController, Controller);

UserController.prototype.setRoutes = function() {
  this.addRoute('post', '/user', this.postUser);
  this.addRoute('get', '/user/:name', this.getUserByName);
  this.addRoute('put', '/user', this.putUser, this);
  this.addRoute('del', '/user', this.deleteUser, this);
};

UserController.prototype.postUser = function create(req, res, next) {
  // do some creation stuff here
  res.send(201, Math.random().toString(36).substr(3, 8));
  return next();
};

UserController.prototype.getUserByName = function(req, res, next) {
  // do some retrieval here
  var response = this.buildResponse(200, {foo: 'bar'}, 'youre fucking awesome');
  res.send(response);
  return next();
};

UserController.prototype.putUser = function(req, res, next) {
  // do some retrieval here
  var response = this.buildResponse(200, {foo: 'bar'}, 'youre fucking awesome');
  res.send(response);
  return next();
};

UserController.prototype.deleteUser = function(req, res, next) {
  // do some retrieval here
  var response = this.buildResponse(200, {foo: 'bar'}, 'youre fucking awesome');
  res.send(response);
  return next();
};

module.exports = UserController;