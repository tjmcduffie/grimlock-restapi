var util = require(process.cwd() + '/lib/util');
var Controller = require(process.cwd() + '/lib/Controller');



var ProfileController = function() {
  util.base(this);
};
util.inherits(ProfileController, Controller);


ProfileController.prototype.setRoutes = function() {
  this.addRoute('post', '/profile', this.postProfile);
  this.addRoute('get', '/profile/:name', this.getProfileByName);
  this.addRoute('put', '/profile', this.putProfile, this);
  this.addRoute('del', '/profile', this.deleteProfile, this);
};


ProfileController.prototype.postProfile = function create(req, res, next) {
  // do some creation stuff here
  this.respondWith(res, { status: 201, content: [{ foo: 'bar' }] });
  return next();
};


ProfileController.prototype.getProfileByName = function(req, res, next) {
  // do some retrieval here
  this.respondWith(res, { status: 200, content: [{ foo: 'bar' }] });
  return next();
};


ProfileController.prototype.putProfile = function(req, res, next) {
  // do some retrieval here
  this.respondWith(res, { status: 200, content: [{ foo: 'bar' }] });
  return next();
};


ProfileController.prototype.deleteProfile = function(req, res, next) {
  // do some retrieval here
  this.respondWith(res, { status: 200, content: [{ foo: 'bar' }] });
  return next();
};

module.exports = ProfileController;