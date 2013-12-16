var util = require(process.cwd() + '/lib/util');



/**
 * Route constructor. Creates an object containing the method, path and
 * responder for a given URL path.
 * @param {string} method HTTP method to bind to.
 * @param {string} path URI path to bind to.
 * @param {function} responder Function to execute when method is matched/
 * @param {boolean} opt_requireAuth Flag requireing authentication for access to
 *                                  the route. False by default.
 */
var Route = function(method, path, responder, opt_requireAuth) {
  if (arguments.length <=2 ) {
    responder = this.defaultResponder_;
  }
  this.isAuthRequired = opt_requireAuth || false;
  this.method = method;
  this.path = path;
  this.responder = responder;
};


Route.createResponse = function(statusCode, data, err) {
  var successRegExp = /20[0-6]{1}/;
  var response = {
    code: statusCode,
    data: data || [],
    error: err,
    status: successRegExp.test(statusCode) ? "success" : "fail"
  };
  return response;
};

module.exports = Route;