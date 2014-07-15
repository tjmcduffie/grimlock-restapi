// var UserSchema = require(process.cwd() + '/db/schema/User');
var mongoose = require('mongoose');
// var urlify = require('urlify').create();

var Schema = mongoose.Schema;


/**
 * User model Schema
 * @type {Schema}
 */
var EducationSchema = new Schema({
  slug: String,
  name: String,
  dates: {
    start: Date,
    end: Date
  },
  degree: String,
  createdOn: {type: Date, 'default': Date.now},
  updatedOn: {type: Date, 'default': Date.now}
});


EducationSchema.set('toObject', { getters: true });
EducationSchema.set('toJSON', { getters: true });


// Schema Hooks
// EducationSchema.pre('save', function (next) {
//   next();
// });


// Schema Validations
// EducationSchema.path('name.first').validate(function (prop) {
//   return typeof prop !== 'undefined' && prop.length > 0;
// }, 'First name cannot be blank');


EducationSchema.methods = {};

EducationSchema.statics = {
  findOneBySlug : function(slug, callback) {
    this.findOne({'slug': slug})
      .exec(callback);
  }
};

mongoose.model('Education', EducationSchema);