var util = require(process.cwd() + '/lib/util');
var Model = require(process.cwd() + '/lib/Model');



var UserModel = function() {
  this.collectionName = 'projects';

  util.base(this);
};
util.inherits(UserModel, Model);

UserModel.prototype.getUsersCollection = function(success) {
  try {
    this.getCollection(callback);
  } catch (e) {
    console.log(e);
  }
};

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

UserModel.prototype.findOneByName = function(name, callback) {
  try {
    var props = {
      username: name
    };
    this.findOneByProps(name, callback);
  } catch (e) {
    console.log(e);
  }
};

UserModel.prototype.update = function(id, project, callback) {
  try {
    util.base(this, 'update', id, project, callback);
  } catch (e) {
    console.log(e);
  }
};

UserModel.prototype.del = function(projectId, callback) {
  try {
    util.base(this, 'del', projectId, callback);
  } catch (e) {
    console.log(e);
  }
};

UserModel.prototype.insert = function(projects, callback) {
  try {
    util.base(this, 'insert', projects, callback);
  } catch (e) {
    console.log(e);
  }
};

UserModel.prototype.findOneByName = function(name, callback)

module.exports = UserModel;