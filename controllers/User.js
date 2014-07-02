var mongoose = require('mongoose');
var UserModel = require(process.cwd() + '/models/User.js');
var User = mongoose.model('User');
var crud = require(process.cwd() + '/lib/CRUDHelper');



module.exports = {
  createUser: function(req, res, next) {
    var user = new User(req.body);
    delete user.id;
    crud.create(user, res);
  },

  readOneUser: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);
    crud.readOne(User, res, id, {
      populate: 'profile'
    });
    // crud.readOne(Profile, res, id, {
    //   populate: (decodeURIComponent(req.params.detail) === 'full') ?
    //       'projects employments educations user' : undefined
    // });
    //
  },

  readManyUsers: function(req, res, next) {
    var page = decodeURIComponent(req.params.page) || 1;
    var isFull = decodeURIComponent(req.params.detail) === 'full';
    var limit = 20;
    var offset = (page - 1) * limit;

    crud.readMany(User, res, {
      limit: limit,
      populate: isFull ? 'profile' : undefined,
      skip: offset,
      select: (isFull) ? {} : {
        username: 1,
        email: 1,
        profile: 1
      }
    });
  },

  updateUser: function(req, res, next) {
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

  deleteUser: function(req, res, next) {
    var id = decodeURIComponent(req.params.id);
    crud.del(User, res, id);
  }
};
