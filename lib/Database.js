var config = require(process.cwd() + '/config');
var util = require(process.cwd() + '/lib/util');
var engine = require('mongodb');
var extend = require('extend');



/**
 * Database objcet constructor. Creates and opens a connection to the DB
 * allowing the application to query form the DB.
 * @param  {string} dbname Name of database to connect to.
 * @param  {number} port Port used to establish connection.
 * @param  {string} host Host name to connect via.
 * @param  {object} serveropts DB Server options.
 * @param  {object} connectionopts Connection options.
 */
var Database = function(dbname, port, host, serveropts, connectionopts) {
  this.server = new engine.Server(host, port, {safe: false},
      {auto_reconnect: true}, {});
  this.db =  new engine.Db(dbname, this.server);

  // open the connection
  this.db.open(function() {});

  console.log('creating new DB connection');
};

/**
 * Instance of DB object.
 * @type {Database}
 */
Database.Instance = undefined;

Database.getInstance = function() {
  var dbconfig;

  if (!Database.Instance) {
    if (!config.database || !config.database.base) {
      throw new DatabaseError('Missing connection string info');
    }

    dbconfig = config.database.base;

    if (config.database[config.env]) {
      extend(true, dbconfig, config.database[config.env]);
    }

    Database.Instance = new Database(dbconfig.name, dbconfig.port,
        dbconfig.host, dbconfig.serverOptions, dbconfig.connectionOptions);
  }

  return Database.Instance.db;
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

module.exports = Database.getInstance();