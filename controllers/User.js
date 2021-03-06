var util = require(process.cwd() + '/lib/util');
var Controller = require(process.cwd() + '/lib/Controller');
var Model = require(process.cwd() + '/models/User');
var ParamCleaner = require(process.cwd() + '/lib/ParamCleaner');



var UserController = function() {
  util.base(this);
  this.model = new Model();
};
util.inherits(UserController, Controller);


UserController.prototype.setRoutes = function() {
  this.addRoute('post', '/user', this.postUser, true);
  this.addRoute('get', '/user/:name', this.getUserByName);
  this.addRoute('put', '/user/:name', this.putUser, true);
  this.addRoute('del', '/user/:name', this.deleteUser, true);
};


UserController.prototype.postUser = function create(req, res, next) {
  // do some creation stuff here
  var data = {
    email: ParamCleaner.clean(req.params.email),
    firstName: ParamCleaner.clean(req.params.firstname),
    fullName: ParamCleaner.clean(req.params.fullname),
    lastName: ParamCleaner.clean(req.params.lastname),
    lid: ParamCleaner.clean(req.params.lid)
  };
  var user = [];
  this.model.insert(data, function(result) {
    if (result) {
      user.push(result);
    }
    this.respondWith(res, { status: 201, content: user });
  }.bind(this));
  return next();
};


UserController.prototype.getUserByName = function(req, res, next) {
  var name = ParamCleaner.clean(req.params.name);
  var users = [];
  this.model.findOneByFullName(name, function (result) {
    if (result) {
      users.push(result);
    }
    this.respondWith(res, { status: 200, content: users });
  }.bind(this));
  return next();
};


UserController.prototype.putUser = function(req, res, next) {
  // do some retrieval here
  var query = {
    fulName: ParamCleaner.clean(req.params.name)
  };
  var properties = this.flattenProperties_();
  this.model.update(query, properties, function(results) {
    this.respondWith(res, { status: 200, content: [results] });
  });
  return next();
};


UserController.prototype.deleteUser = function(req, res, next) {
  // do some retrieval here
  var params = {
    fullName: ParamCleaner.clean(req.params.name)
  };
  this.model.del(params, function(numberOfRemovedResults) {
    this.respondWith(res, { status: 200 , content: numberOfRemovedResults});
  }.bind(this));
  return next();
};

module.exports = UserController;