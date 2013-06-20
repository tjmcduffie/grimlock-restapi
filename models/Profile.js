var util = require(process.cwd() + '/lib/util');
var Model = require(process.cwd() + '/lib/Model');



var ProfileModel = function() {
  this.collectionName = 'projects';

  util.base(this);
};
util.inherits(ProfileModel, Model);

ProfileModel.prototype.getProfileCollection = function(success) {
  try {
    this.getCollection(callback);
  } catch (e) {
    console.log(e);
  }
};

ProfileModel.prototype.fetch = function(callback) {
  try {
    util.base(this, 'findAll', callback);
  } catch (e) {
    console.log(e);
  }
};

ProfileModel.prototype.findOneById = function(id, callback) {
  try {
    util.base(this, 'findOneById', id, callback);
  } catch (e) {
    console.log(e);
  }
};

ProfileModel.prototype.update = function(id, project, callback) {
  try {
    util.base(this, 'update', id, project, callback);
  } catch (e) {
    console.log(e);
  }
};

ProfileModel.prototype.del = function(projectId, callback) {
  try {
    util.base(this, 'del', projectId, callback);
  } catch (e) {
    console.log(e);
  }
};

ProfileModel.prototype.insert = function(projects, callback) {
  try {
    util.base(this, 'insert', projects, callback);
  } catch (e) {
    console.log(e);
  }
};

module.exports = ProfileModel;