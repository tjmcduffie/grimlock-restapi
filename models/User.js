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
      fullName: name
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


UserModel.prototype.update = function(query, properties, callback) {
  try {
    util.base(this, 'update', query, properties, callback);
  } catch (e) {
    console.log(e);
  }
};


UserModel.prototype.del = function(params, callback) {
  try {
    util.base(this, 'del', params, callback);
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
  this.firstName = data.firstname || undefined;
  this.lastName = data.lastname || undefined;
  this.fullName = data.fullname || undefined;
  this.lid = data.lid || undefined;
  this.email = data.email || undefined;
};

module.exports = UserModel;