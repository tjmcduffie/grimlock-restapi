
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

exports.routes = [
  { pattern: '/user', method: 'post', controller: 'User.postUser' },
  { pattern: '/user/:id', method: 'get', controller: 'User.getUserByName' },
  { pattern: '/user/:id', method: 'put', controller: 'User.putUser' },
  { pattern: '/user/:id', method: 'delete', controller: 'User.deleteUser' },
  { pattern: '/profile', method: 'post', controller: 'Profile.postProfile' },
  { pattern: '/profile/:userid', method: 'get', controller: 'Profile.getProfileByName' },
  { pattern: '/profile/:uesrid', method: 'put', controller: 'Profile.putProfile' },
  { pattern: '/profile/:userid', method: 'delete', controller: 'Profile.deleteProfile' }
];