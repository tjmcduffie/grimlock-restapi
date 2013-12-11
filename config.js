
// Database connection string details
exports.database = {
  // default options
  base: {
    host: "localhost",
    name: "grimlock-dev",
    // name: "grimlock-prod",
    port: 27017,
    serverOptions: {
      auto_reconnect: true
    },
    connectionOptions: {
    }
  }
};

exports.server = {
  hostname: 'localhost',
  port: 8080
};