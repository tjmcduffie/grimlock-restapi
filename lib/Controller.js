var Route = require(process.cwd() + '/lib/Route');
var util = require(process.cwd() + '/lib/util');



var Controller = function() {
  this.routes = [];

  this.methodsRequiringAuth = ['post', 'put', 'del'];

  this.setRoutes();
};

Controller.prototype.basePath_ = '';

Controller.prototype.setRoutes = function() {
  // should be populared by child controllers.
};

Controller.prototype.addRoute = function(method, path, callback,
    opt_requireAuth) {
      var isAuthRequired = typeof opt_requireAuth === "boolean" ?
          opt_requireAuth : (this.methodsRequiringAuth.indexOf(method) !== -1 ?
          true : false);
      var route = new Route(method, path, util.bind(callback, this),
          isAuthRequired);
      this.routes.push(route);
};

module.exports = Controller;