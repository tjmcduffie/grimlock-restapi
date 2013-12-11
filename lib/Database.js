var config = require(process.cwd() + '/config');
var util = require(process.cwd() + '/lib/util');
var engine = require('mongodb');
var extend = require('extend');



/**
 * Database connection object.
 */
var Database = function() {
  var Client = engine.MongoClient;
  var Server = engine.Server;

  this.conf = config.database.base;
  this.client = new Client(new Server('localhost', 27017));
  this.connection = undefined;
  this.db = undefined;
};


/**
 * Open the connection to the DB and store it.
 * @param  {Function} callback Callback function to execute after the connection
 *                             is opened
 * @return {Database} Database instance.
 */
Database.prototype.open = function(callback) {
  if (this.db) {
    callback(this);
    return this;
  }

  this.client.open(function(err, connection) {
    if (err) {
      throw new DatabaseError(err.toString());
    }

    this.connection = connection;
    this.db = connection.db(this.conf.name);
    callback(this);
  }.bind(this));

  return this;
};



/**
 * Bootstrap error object. Inherits from Error.
 * @extends {Error}
 * @param {string} message Message to display in the error console.
 * @param {number=} opt_linenumber Line number where the error occurred.
 */
var DatabaseError = function(message, opt_linenumber) {
  util.base(this, message, __filename, opt_linenumber);

  this.name = 'DatabaseError';
  this.message = message;
};
util.inherits(DatabaseError, Error);

// module.exports = Database.getInstance();
module.exports = new Database();