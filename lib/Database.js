var config = require(process.cwd() + '/config');
var util = require(process.cwd() + '/lib/util');
var Promise = require('q');
var mongoose = require('mongoose');


var dbconf = config.database.base;



/**
 * Database connection object.
 */
var Database = function() {

};


Database.connectionString = 'mongodb://' + dbconf.host + '/' + dbconf.name;


Database.connection = mongoose.connection;


Database.db = mongoose;


/**
 * Open the connection to the DB and store it.
 * @param  {Function} callback Callback function to execute after the connection
 *                             is opened
 * @return {Database} Database instance.
 */
Database.open = function(callback) {
  var deferred = Promise.defer();

  if (Database.connection._hasOpened) {
    return deferred.promise;
  }

  Database.db.connect(Database.connectionString);

  Database.connection.on('error', function(err) {
    deferred.reject(err);
    throw new DatabaseError(err.toString());
  });

  Database.connection.once('open', function() {
    console.log('db connection open');
    deferred.resolve();
  });

  return deferred.promise;
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
module.exports = Database;