
// Database connection string details
module.exports = {
  base: {
    ports: {
      mongo: 27017,
      server: 8080
    }
  },
  dev: {
    name: 'Grimlock REST API Server - DEV',
    db: 'mongodb://localhost/grimlock-dev',
    ports: {
      mongo: 27017,
      server: 8080
    }
  },
  test: {
    name: 'Grimlock REST API Server - TEST',
    db: 'mongodb://localhost/grimlock-test',
    ports: {
      mongo: 27017,
      server: 8080
    }
  }
};