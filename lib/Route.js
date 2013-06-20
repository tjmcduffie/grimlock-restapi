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
  this.responder_ = responder;
  this.responder = opt_requireAuth ? this.authRequiredResponder_ : responder;
};

Route.createResponse = function(statusCode, data, message) {
  var successRegExp = /20[0-6]{1}/;
  var response = {
    code: statusCode,
    status: successRegExp.test(statusCode) ? "success" : "fail",
    message: message,
    data: data || {}
  };
  return response;
};

Route.prototype.defaultResponder_ = function(req, res, next) {
  console.log('Using default responder');
  var message = "Request Successful";
  var response = Route.createResponse(200, {}, message);
  res.send(response);
};

Route.prototype.authRequiredResponder_ = function(req, res, next) {
  console.log('Using authenticated responder');
  console.log('@TODO: add authentication details and checking.');

  var isAuthenticated = true;
  var isAuthorized = true;
  var code = isAuthenticated ? (isAuthorized ? 200 : 403) : 401;

  switch (code) {
    case 200:
      this.responder_(req, res, next);
      break;
    case 401:
      res.send(Route.createResponse(code, {},
          "Authentication is required for access."));
      break;
    case 403:
      res.send(Route.createResponse(code, {}, "Access forbidden"));
      break;
  }
};

module.exports = Route;