
// Database connection string details
exports.database = {
  // default options
  base: {
    host: "localhost",
    port: 27017,
    serverOptions: {
      auto_reconnect: true
    },
    connectionOptions: {
    }
  },

  // dev overrides
  development: {
    name: "grimlock-dev",
  },

  // production overrides
  production: {
    name: "grimlock-prod",
  }
};