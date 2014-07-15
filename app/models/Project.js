// var UserSchema = require(process.cwd() + '/db/schema/User');
var mongoose = require('mongoose');
// var urlify = require('urlify').create();

var Schema = mongoose.Schema;


/**
 * User model Schema
 * @type {Schema}
 */
var ProjectSchema = new Schema({
  title: String,
  slug: String,
  images: [String],
  description: String,
  role: String,
  skills: [String],
  employment: {type: Schema.Types.ObjectId, ref: 'Employment'},
  createdOn: {type: Date, 'default': Date.now},
  updatedOn: {type: Date, 'default': Date.now}
});


ProjectSchema.set('toObject', { getters: true });
ProjectSchema.set('toJSON', { getters: true });


// Schema Hooks
// ProjectSchema.pre('save', function (next) {
//   next();
// });


// Schema Validations
// ProjectSchema.path('name.first').validate(function (prop) {
//   return typeof prop !== 'undefined' && prop.length > 0;
// }, 'First name cannot be blank');


ProjectSchema.methods = {};

ProjectSchema.statics = {
  findBySlug: function(slug, callback) {
    var results = this.find({slug: slug});
    if (callback) {
      return results.exec(callback);
    }
    return results;
  },
  findOneBySlug: function(slug, callback) {
    var results = this.findOne({slug: slug});
    if (callback) {
      return results.exec(callback);
    }
    return results;
  }
};

mongoose.model('Project', ProjectSchema);