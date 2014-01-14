// var UserSchema = require(process.cwd() + '/db/schema/User');
var util = require(process.cwd() + '/lib/util');
var Model = require(process.cwd() + '/lib/Model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



// var Model = require(process.cwd() + '/lib/Model');


var UserModel = function() {
  this.name = 'User';

  // util.base(this, 'User', User.schema, UserModel.schemaMethods);
  var schema = UserModel.createSchema_(UserModel.schema);
  return mongoose.model('User', schema);

};
util.inherits(UserModel, Model);

UserModel.schema = {
  email: String,
  name: {
    first: {type: String, index: true},
    last: {type: String, index: true}
  },
  lid: Number
};

UserModel.schema.VirtualProperties = {
  'name.full': {
    set: function(name) {
      var split = name.split(' ');
      this.name.first = split[0];
      this.name.last = split[1];
    }
  }
};

UserModel.schema.InstanceMethods = {};

UserModel.schema.StaticMethods = {};

UserModel.createSchema_ = function(Model) {
  var schema = new Schema(Model.schema, {autoIndex: false});
  for (var method in Model.schemaInstanceMethods) {
    if (Model.schemaInstanceMethods.hasOwnProperty(method)) {
      schema.methods[method] = Model.schemaInstanceMethods[method];
    }
  }
  for (var method in Model.schemaStaticMethods) {
    if (Model.schemaStaticMethods.hasOwnProperty(method)) {
      schema.statics[method] = Model.schemaStaticMethods[method];
    }
  }
  return schema;
};


module.exports = UserModel;