var util = require(process.cwd() + '/lib/util');
var Model = require(process.cwd() + '/lib/Model');



var UserModel = function() {
  this.collectionName = 'users';

  util.base(this);
};
util.inherits(UserModel, Model);


UserModel.prototype.findAll = function(callback) {
  try {
    util.base(this, 'findAll', callback);
  } catch (e) {
    console.log(e);
  }
};


UserModel.prototype.findOneById = function(id, callback) {
  try {
    util.base(this, 'findOneById', id, callback);
  } catch (e) {
    console.log(e);
  }
};


UserModel.prototype.findOneByFullName = function(name, callback) {
  try {
    var props = {
      fullname: name
    };
    this.findOneByProps(props, callback);
  } catch (e) {
    console.error(e);
  }
};


UserModel.prototype.findOneByLinkedInId = function(lid, callback) {
  try {
    var props = {
      lid: lid
    };
    this.findOneByProps(props, callback);
  } catch (e) {
    console.error(e);
  }
};


UserModel.prototype.update = function(id, user, callback) {
  try {
    util.base(this, 'update', id, user, callback);
  } catch (e) {
    console.log(e);
  }
};


UserModel.prototype.del = function(userId, callback) {
  try {
    util.base(this, 'del', userId, callback);
  } catch (e) {
    console.log(e);
  }
};


UserModel.prototype.insert = function(user, callback) {
  try {
    util.base(this, 'insert', user, callback);
  } catch (e) {
    console.log(e);
  }
};



UserModelData = function(data) {
  this._id = data._id;
  this.firstName = data.firstname || '';
  this.lastName = data.lastname || '';
  this.fullname = data.lastname || '';
  this.lid = data.lid;
  this.email = data.email || '';
};

module.exports = UserModel;