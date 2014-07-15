// var UserSchema = require(process.cwd() + '/db/schema/User');
var mongoose = require('mongoose');
// var urlify = require('urlify').create();

var Schema = mongoose.Schema;


/**
 * User model Schema
 * @type {Schema}
 */
var EmploymentSchema = new Schema({
  title: String,
  slug: String,
  date: {
    start: Date,
    end: Date
  },
  isCurrent: Boolean,
  company: String,
  description: String,
  createdOn: {type: Date, 'default': Date.now},
  updatedOn: {type: Date, 'default': Date.now}
});


EmploymentSchema.set('toObject', { getters: true });
EmploymentSchema.set('toJSON', { getters: true });


// Schema Hooks
// EmploymentSchema.pre('save', function (next) {
//   next();
// });


// Schema Validations
// EmploymentSchema.path('name.first').validate(function (prop) {
//   return typeof prop !== 'undefined' && prop.length > 0;
// }, 'First name cannot be blank');


EmploymentSchema.methods = {};

EmploymentSchema.statics = {
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

mongoose.model('Employment', EmploymentSchema);