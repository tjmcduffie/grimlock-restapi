
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

// Linkedin app details
exports.linkedin = {
  company: 'Self Employed',
  application_name: 'timmcduffie.com api',
  api_key: '0m2ewzmu2sn7',
  secret_key: 'O0eLN3SVZLz0L28s',
  oauth_user_token: 'cd983a91-8097-4342-837f-728557581989',
  oauth_user_secret: '71a88231-706f-4488-bc7b-f2b8a612ac0b'
};