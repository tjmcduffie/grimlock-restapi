require('../models/User');
var User = require('mongoose').model('User');
var crud = require('../lib/CRUDHelper');



module.exports = {
  createUser: function(req, res) {
    var user = new User(req.body);
    crud.create(user, res);
  },

  readOneUser: function(req, res) {
    var id = decodeURIComponent(req.params.id);
    crud.readOne(User, res, id, {
      populate: 'profile'
    });
  },

  readManyUsers: function(req, res) {
    var rawPage = parseInt(decodeURIComponent(req.params.page), 10);
    var page = (typeof rawPage === 'number' && !isNaN(rawPage))  ? rawPage : 1;
    var isFull = decodeURIComponent(req.params.detail) === 'full';
    var limit = 20;

    crud.readMany(User, res, {
      limit: limit,
      populate: isFull ? 'profile' : undefined,
      skip: (page - 1) * limit,
      select: (isFull) ? {} : {
        username: 1,
        email: 1,
        profile: 1
      }
    });
  },

  updateUser: function(req, res) {
    var id = decodeURIComponent(req.params.id);
    crud.update(User, res, id, {
      receivedData: req.body,
      $set: ['lid', 'name', 'email', 'username', 'hashed_password', 'salt',
        'profile', 'slug', 'editDomain', 'name.first', 'name.last', 'name.formatted',
        { key: 'updatedOn', value: req.body.updatedOn || Date.now()}
      ],
      $push: []
    });
  },

  deleteUser: function(req, res) {
    var id = decodeURIComponent(req.params.id);
    crud.del(User, res, id);
  }
};
