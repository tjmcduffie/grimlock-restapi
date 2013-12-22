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
  this.addRoute('get', '/user/:reqFullName', this.getUserByName);
  this.addRoute('put', '/user/:reqFullName', this.putUser, true);
  this.addRoute('del', '/user/:reqFullName', this.deleteUser, true);
};


UserController.prototype.postUser = function create(req, res, next) {
  // do some creation stuff here
  var data = {
    email: ParamCleaner.clean(req.params.email),
    firstName: ParamCleaner.clean(req.params.firstName),
    fullName: ParamCleaner.clean(req.params.fullName),
    lastName: ParamCleaner.clean(req.params.lastName),
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
  var reqFullName = ParamCleaner.clean(req.params.reqFullName);
  var users = [];
  this.model.findOneByFullName(reqFullName, function (result) {
    if (result) {
      users.push(result);
    }
    this.respondWith(res, { status: 200, content: users });
  }.bind(this));
  return next();
};


UserController.prototype.putUser = function(req, res, next) {
  // do some retrieval here
  var propKeys = ['firstName', 'lastName', 'fullName', 'email', 'lid'];
  var propsToSet = {};
  var query = {
    fullName: ParamCleaner.clean(req.params.reqFullName)
  };

  propKeys.forEach(function(elem) {
    if (req.params[elem]) {
      propsToSet[elem] = ParamCleaner.clean(req.params[elem]);
    }
  });

  this.model.update(query, { $set: util.flattenObject(propsToSet) }, function(results) {
    this.respondWith(res, { status: 200, content: [results] });
  }.bind(this));
  return next();
};


UserController.prototype.deleteUser = function(req, res, next) {
  // do some retrieval here
  var params = {
    fullName: ParamCleaner.clean(req.params.reqFullName)
  };
  this.model.del(params, function(numberOfRemovedResults) {
    this.respondWith(res, { status: 200 , content: numberOfRemovedResults});
  }.bind(this));
  return next();
};

module.exports = UserController;